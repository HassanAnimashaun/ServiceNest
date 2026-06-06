-- ============================================================
-- ServiceNest — Current Schema (All Migrations Applied)
-- Last updated: 2026-05-29
-- ============================================================
-- Migration history:
--   001_initial_schema.sql      — base schema
--   002_update_clients.sql      — clients progressive profile
--   003_update_providers.sql    — providers progressive onboarding
-- ============================================================
-- HOW TO USE:
-- This is a reference document showing the CURRENT state of
-- the database. If rebuilding from scratch, run this file
-- instead of the individual migration files.
-- ============================================================


-- ============================================================
-- SECTION 1: ENUMS
-- ============================================================

CREATE TYPE business_type_enum AS ENUM (
  'detailing',
  'mechanic',
  'landscaping'
);

CREATE TYPE subscription_status_enum AS ENUM (
  'trial',
  'active',
  'past_due',
  'cancelled'
);

CREATE TYPE vehicle_size_enum AS ENUM (
  'sedan',
  'suv',
  'truck',
  'van',
  'oversized'
);

CREATE TYPE booking_status_enum AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE notification_type_enum AS ENUM (
  'booking_confirmation',
  'booking_reminder',
  'booking_cancellation'
);

CREATE TYPE recipient_type_enum AS ENUM (
  'client',
  'provider'
);


-- ============================================================
-- SECTION 2: TABLES
-- ============================================================

-- ------------------------------------------------------------
-- providers
-- Root table. Every other table traces back to a provider.
-- providers.id = auth.users.id (1:1 with Supabase auth)
--
-- ONBOARDING FIELDS (nullable — collected after signup):
--   address, city, state, zip
--   home_base_lat, home_base_lng
--   service_radius_miles
--
-- SIGNUP FIELDS (required immediately):
--   business_name, full_name, phone
-- ------------------------------------------------------------
CREATE TABLE providers (
  id                              UUID PRIMARY KEY,
  business_type                   business_type_enum NOT NULL DEFAULT 'detailing',
  business_name                   TEXT NOT NULL,
  full_name                       TEXT NOT NULL,
  phone                           TEXT NOT NULL,
  address                         TEXT,               -- nullable: set during onboarding
  city                            TEXT,               -- nullable: set during onboarding
  state                           TEXT,               -- nullable: set during onboarding
  zip                             TEXT,               -- nullable: set during onboarding
  home_base_lat                   NUMERIC(10,7),      -- nullable: geocoded during onboarding
  home_base_lng                   NUMERIC(10,7),      -- nullable: geocoded during onboarding
  service_radius_miles            NUMERIC(5,2),       -- nullable: set during onboarding
  subscription_status             subscription_status_enum NOT NULL DEFAULT 'trial',
  subscription_started_at         TIMESTAMPTZ,
  subscription_current_period_end TIMESTAMPTZ,
  trial_ends_at                   TIMESTAMPTZ,
  stripe_customer_id              TEXT,
  stripe_subscription_id          TEXT,
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- clients
-- Progressive profile — row may not exist until first booking.
--
-- SIGNUP: only auth.users row is created (no clients row yet)
-- BOOKING: clients row is created with provider_id + full profile
--
-- provider_id nullable: null until client books with a provider
-- full_name nullable: stored in user_metadata at signup,
--                     copied to clients row at booking time
-- phone nullable: collected at profile completion before booking
--
-- Composite partial unique index (replaces original UNIQUE constraint)
-- prevents same person booking the same provider twice,
-- while allowing null provider_id during profile setup.
-- ------------------------------------------------------------
CREATE TABLE clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id  UUID NOT NULL,
  provider_id   UUID REFERENCES providers(id) ON DELETE CASCADE,  -- nullable
  full_name     TEXT,                                              -- nullable
  phone         TEXT,                                             -- nullable
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Partial unique index: only enforce uniqueness when provider_id is set
-- Replaces the original UNIQUE (auth_user_id, provider_id) constraint
CREATE UNIQUE INDEX clients_unique_per_provider
ON clients (auth_user_id, provider_id)
WHERE provider_id IS NOT NULL;

-- ------------------------------------------------------------
-- vehicles
-- A client's vehicles. Soft deleted via deleted_at.
-- ------------------------------------------------------------
CREATE TABLE vehicles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  year          INT NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM now()) + 1),
  make          TEXT NOT NULL,
  model         TEXT NOT NULL,
  vehicle_size  vehicle_size_enum NOT NULL,
  color         TEXT,               -- nullable: optional field
  deleted_at    TIMESTAMPTZ,        -- null = active, timestamp = soft deleted
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- working_hours
-- Provider's weekly availability. One row per day (0=Sun, 6=Sat).
-- start_time and end_time are null when is_open = false.
-- ------------------------------------------------------------
CREATE TABLE working_hours (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id   UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  day_of_week   INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_open       BOOLEAN NOT NULL DEFAULT true,
  start_time    TIME,               -- null when is_open = false
  end_time      TIME,               -- null when is_open = false
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider_id, day_of_week)
);

-- ------------------------------------------------------------
-- packages
-- Services a provider offers. Price lives in package_prices.
-- ------------------------------------------------------------
CREATE TABLE packages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id       UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  package_name      TEXT NOT NULL,
  description       TEXT,           -- nullable: optional marketing copy
  duration_minutes  INT NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- package_prices
-- Pricing matrix: one row per (package x vehicle_size).
-- Composite unique prevents duplicate prices per size.
-- price is numeric(10,2) — NEVER use float for money.
-- ------------------------------------------------------------
CREATE TABLE package_prices (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id    UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  vehicle_size  vehicle_size_enum NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (package_id, vehicle_size)
);

-- ------------------------------------------------------------
-- bookings
-- Central hub table. All other tables connect through bookings.
--
-- SNAPSHOT FIELDS (copied at booking time, never updated):
--   package_name_snapshot — preserves name even if package renamed
--   total_price           — preserves price even if package repriced
--
-- INSERT blocked for clients via RLS.
-- Booking creation goes through Edge Function:
--   /supabase/functions/create-booking/index.ts
-- Edge Function validates:
--   - slot availability
--   - service area (client address within provider radius)
--   - working hours (slot within provider's open hours)
-- ------------------------------------------------------------
CREATE TABLE bookings (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id               UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  provider_id             UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  package_id              UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  vehicle_id              UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  package_name_snapshot   TEXT NOT NULL,
  total_price             NUMERIC(10,2) NOT NULL,
  service_address         TEXT NOT NULL,
  service_city            TEXT NOT NULL,
  service_state           TEXT NOT NULL,
  service_zip             TEXT NOT NULL,
  service_lat             NUMERIC(10,7) NOT NULL,
  service_lng             NUMERIC(10,7) NOT NULL,
  scheduled_start         TIMESTAMPTZ NOT NULL,
  scheduled_end           TIMESTAMPTZ NOT NULL,
  booking_status          booking_status_enum NOT NULL DEFAULT 'pending',
  notes                   TEXT,               -- nullable: optional client notes
  cancelled_at            TIMESTAMPTZ,        -- null until cancelled
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- notifications
-- Log of every email sent.
-- sent_at null     = not sent yet (pending)
-- sent_at set      = successfully sent
-- error_message    = null if no error, text if failed
-- Used by hourly cron to find and send pending reminders
-- without sending duplicates.
-- ------------------------------------------------------------
CREATE TABLE notifications (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id          UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  recipient_type      recipient_type_enum NOT NULL,
  recipient_email     TEXT NOT NULL,      -- snapshot: email at time of send
  notification_type   notification_type_enum NOT NULL,
  sent_at             TIMESTAMPTZ,        -- null = not sent yet
  error_message       TEXT,               -- null = no error
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================
-- SECTION 3: INDEXES
-- ============================================================

-- providers
CREATE INDEX ON providers (business_type);
CREATE INDEX ON providers (subscription_status);

-- clients
CREATE INDEX ON clients (provider_id);
CREATE INDEX ON clients (auth_user_id);

-- vehicles
CREATE INDEX ON vehicles (client_id);

-- working_hours
CREATE INDEX ON working_hours (provider_id);

-- packages
CREATE INDEX ON packages (provider_id);

-- package_prices
CREATE INDEX ON package_prices (package_id);

-- bookings
CREATE INDEX ON bookings (provider_id);
CREATE INDEX ON bookings (client_id);
CREATE INDEX ON bookings (scheduled_start);

-- notifications
CREATE INDEX ON notifications (booking_id);
CREATE INDEX ON notifications (sent_at);


-- ============================================================
-- SECTION 4: AUTH.USERS FOREIGN KEY CONSTRAINTS
-- auth.users is created and managed by Supabase automatically.
-- We never create it — we only reference it here.
-- ============================================================

-- providers.id must match a real Supabase auth user
ALTER TABLE providers
ADD CONSTRAINT providers_id_fkey
FOREIGN KEY (id)
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- clients.auth_user_id must match a real Supabase auth user
ALTER TABLE clients
ADD CONSTRAINT clients_auth_user_id_fkey
FOREIGN KEY (auth_user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;


-- ============================================================
-- SECTION 5: ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE providers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_hours  ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------
-- PROVIDERS POLICIES
-- Only the provider can see, insert, and update their own row
-- ------------------------------------------------------------
CREATE POLICY "providers_select_own"
ON providers FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "providers_insert_own"
ON providers FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

CREATE POLICY "providers_update_own"
ON providers FOR UPDATE
TO authenticated
USING (id = auth.uid());


-- ------------------------------------------------------------
-- CLIENTS POLICIES
-- Provider sees their own clients
-- Client sees and manages their own profile
-- ------------------------------------------------------------
CREATE POLICY "clients_select_provider"
ON clients FOR SELECT
TO authenticated
USING (provider_id = auth.uid());

CREATE POLICY "clients_select_own"
ON clients FOR SELECT
TO authenticated
USING (auth_user_id = auth.uid());

CREATE POLICY "clients_insert_own"
ON clients FOR INSERT
TO authenticated
WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "clients_update_own"
ON clients FOR UPDATE
TO authenticated
USING (auth_user_id = auth.uid());


-- ------------------------------------------------------------
-- VEHICLES POLICIES
-- Client manages their own vehicles
-- Provider can view vehicles of their clients
-- ------------------------------------------------------------
CREATE POLICY "vehicles_select_own_client"
ON vehicles FOR SELECT
TO authenticated
USING (
  client_id IN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  )
);

CREATE POLICY "vehicles_select_provider"
ON vehicles FOR SELECT
TO authenticated
USING (
  client_id IN (
    SELECT id FROM clients WHERE provider_id = auth.uid()
  )
);

CREATE POLICY "vehicles_insert_own"
ON vehicles FOR INSERT
TO authenticated
WITH CHECK (
  client_id IN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  )
);

CREATE POLICY "vehicles_update_own"
ON vehicles FOR UPDATE
TO authenticated
USING (
  client_id IN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  )
);

CREATE POLICY "vehicles_delete_own"
ON vehicles FOR DELETE
TO authenticated
USING (
  client_id IN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  )
);


-- ------------------------------------------------------------
-- WORKING HOURS POLICIES
-- Public read — clients need to see availability before booking
-- Only provider can modify their own hours
-- ------------------------------------------------------------
CREATE POLICY "working_hours_select_public"
ON working_hours FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "working_hours_insert_own"
ON working_hours FOR INSERT
TO authenticated
WITH CHECK (provider_id = auth.uid());

CREATE POLICY "working_hours_update_own"
ON working_hours FOR UPDATE
TO authenticated
USING (provider_id = auth.uid());

CREATE POLICY "working_hours_delete_own"
ON working_hours FOR DELETE
TO authenticated
USING (provider_id = auth.uid());


-- ------------------------------------------------------------
-- PACKAGES POLICIES
-- Public read — clients browse packages before signing up
-- Only provider can modify their own packages
-- ------------------------------------------------------------
CREATE POLICY "packages_select_public"
ON packages FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "packages_insert_own"
ON packages FOR INSERT
TO authenticated
WITH CHECK (provider_id = auth.uid());

CREATE POLICY "packages_update_own"
ON packages FOR UPDATE
TO authenticated
USING (provider_id = auth.uid());

CREATE POLICY "packages_delete_own"
ON packages FOR DELETE
TO authenticated
USING (provider_id = auth.uid());


-- ------------------------------------------------------------
-- PACKAGE PRICES POLICIES
-- Public read
-- Only provider can modify prices for their own packages
-- ------------------------------------------------------------
CREATE POLICY "package_prices_select_public"
ON package_prices FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "package_prices_insert_own"
ON package_prices FOR INSERT
TO authenticated
WITH CHECK (
  package_id IN (
    SELECT id FROM packages WHERE provider_id = auth.uid()
  )
);

CREATE POLICY "package_prices_update_own"
ON package_prices FOR UPDATE
TO authenticated
USING (
  package_id IN (
    SELECT id FROM packages WHERE provider_id = auth.uid()
  )
);

CREATE POLICY "package_prices_delete_own"
ON package_prices FOR DELETE
TO authenticated
USING (
  package_id IN (
    SELECT id FROM packages WHERE provider_id = auth.uid()
  )
);


-- ------------------------------------------------------------
-- BOOKINGS POLICIES
-- Provider sees and updates their own bookings
-- Client sees their own bookings
-- INSERT blocked for clients — goes through Edge Function
-- See: /supabase/functions/create-booking/index.ts
-- ------------------------------------------------------------
CREATE POLICY "bookings_select_provider"
ON bookings FOR SELECT
TO authenticated
USING (provider_id = auth.uid());

CREATE POLICY "bookings_select_client"
ON bookings FOR SELECT
TO authenticated
USING (
  client_id IN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  )
);

CREATE POLICY "bookings_update_provider"
ON bookings FOR UPDATE
TO authenticated
USING (provider_id = auth.uid());

CREATE POLICY "bookings_update_client"
ON bookings FOR UPDATE
TO authenticated
USING (
  client_id IN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  )
);


-- ------------------------------------------------------------
-- NOTIFICATIONS POLICIES
-- Provider and client involved in the booking can see
-- their own notifications
-- ------------------------------------------------------------
CREATE POLICY "notifications_select_own"
ON notifications FOR SELECT
TO authenticated
USING (
  booking_id IN (
    SELECT id FROM bookings
    WHERE provider_id = auth.uid()
    OR client_id IN (
      SELECT id FROM clients WHERE auth_user_id = auth.uid()
    )
  )
);


-- ============================================================
-- END OF SCHEMA
-- ============================================================
