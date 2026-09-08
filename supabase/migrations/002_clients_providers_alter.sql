-- ============================================================
-- ServiceNest — Migration 002
-- File: 002_clients_providers_alter.sql
-- Date: 2026-06-23
-- ============================================================
-- Changes:
--   1. Add isonboarding column to providers
--   2. Drop provider_id column from clients
--      (providers find their clients through bookings.provider_id)
--   3. Drop clients_unique_per_provider index (relied on provider_id)
--   4. Drop clients_select_provider policy (relied on provider_id)
--   5. Replace with booking-based provider_view_clients policy
-- ============================================================


-- ------------------------------------------------------------
-- 1. Add isonboarding to providers
-- Default true — flipped to false by complete-provider-onboarding
-- Edge Function once provider has set up their profile + packages.
-- ------------------------------------------------------------
ALTER TABLE providers
ADD COLUMN isonboarding BOOLEAN NOT NULL DEFAULT true;


-- ------------------------------------------------------------
-- 2. Drop provider_id from clients
-- Providers no longer own clients directly.
-- A client belongs to a provider only through a booking.
-- ------------------------------------------------------------
ALTER TABLE clients
DROP COLUMN provider_id;


-- ------------------------------------------------------------
-- 3. Drop partial unique index that relied on provider_id
-- ------------------------------------------------------------
DROP INDEX IF EXISTS clients_unique_per_provider;


-- ------------------------------------------------------------
-- 4. Drop old provider-sees-clients policy (used provider_id)
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "clients_select_provider" ON clients;


-- ------------------------------------------------------------
-- 5. Replace with booking-based policy
-- Provider can see any client who has booked with them.
-- ------------------------------------------------------------
CREATE POLICY "provider_view_clients"
ON clients FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT client_id FROM bookings WHERE provider_id = auth.uid()
  )
);


-- ============================================================
-- END OF MIGRATION 002
-- ============================================================
