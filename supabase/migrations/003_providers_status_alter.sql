-- ============================================================
-- ServiceNest — Migration 003
-- File: 003_providers_status_alter.sql
-- Date: 2026-08-20
-- ============================================================
-- Changes:
--   1. Providers cant manual update subscription and Onboarding 
--      or change Trial end date   
-- ============================================================

-- ------------------------------------------------------------
-- 1. Providers can't manual update sub,onboarding or trial start
-- ------------------------------------------------------------
CREATE POLICY "providers_update_own"
ON provider FOR SELECT
TO authenticated
USING (
  (id = auth.uid())
) with check(
  (((id = auth.uid()) AND (NOT (isonboarding IS DISTINCT FROM ( SELECT p.isonboarding
   FROM providers p
  WHERE (p.id = auth.uid())))) AND (NOT (subscription_status IS DISTINCT FROM ( SELECT p.subscription_status
   FROM providers p
  WHERE (p.id = auth.uid())))) AND (NOT (stripe_customer_id IS DISTINCT FROM ( SELECT p.stripe_customer_id
   FROM providers p
  WHERE (p.id = auth.uid())))) AND (NOT (trial_ends_at IS DISTINCT FROM ( SELECT p.trial_ends_at
   FROM providers p
  WHERE (p.id = auth.uid())))))
  )
)


-- ============================================================
-- END OF MIGRATION 003
-- ============================================================
