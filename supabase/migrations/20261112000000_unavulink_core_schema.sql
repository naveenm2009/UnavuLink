-- ==============================================================================
-- UNAVULINK DATABASE MIGRATION - CORE SCHEMA & SECURITY
-- Comprehensive PostgreSQL Schema for Supabase
-- Target: Tamil Nadu Food Rescue, Redistribution & Community Intelligence Platform
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'donor', 'acceptor', 'ngo', 'common_people')),
    is_volunteer BOOLEAN DEFAULT FALSE,
    volunteer_status TEXT DEFAULT 'none' CHECK (volunteer_status IN ('none', 'pending', 'approved', 'rejected', 'suspended')),
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'suspended')),
    account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deactivated')),
    location TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_name TEXT NOT NULL,
    organization_type TEXT NOT NULL CHECK (organization_type IN ('restaurant', 'hotel', 'caterer', 'wedding_hall', 'hostel', 'ngo', 'shelter', 'orphanage', 'community_kitchen')),
    registration_number TEXT,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Coimbatore',
    state TEXT DEFAULT 'Tamil Nadu',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    contact_information JSONB DEFAULT '{}'::jsonb,
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'suspended')),
    receiving_capacity NUMERIC(10, 2) DEFAULT 0,
    storage_capabilities JSONB DEFAULT '{"dry": true, "refrigerated": false, "freezer": false}'::jsonb,
    operating_hours TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FOOD LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.food_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id TEXT UNIQUE NOT NULL,
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    food_name TEXT NOT NULL,
    description TEXT,
    image_path TEXT,
    food_category TEXT NOT NULL CHECK (food_category IN ('cooked_meals', 'bakery_items', 'raw_produce', 'dairy', 'packaged_groceries', 'buffet_spread')),
    dietary_category TEXT NOT NULL CHECK (dietary_category IN ('veg', 'non_veg', 'vegan', 'halal', 'jain')),
    quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
    unit TEXT NOT NULL DEFAULT 'kg' CHECK (unit IN ('kg', 'portions', 'litres', 'boxes', 'crates')),
    estimated_portions INTEGER NOT NULL DEFAULT 1 CHECK (estimated_portions > 0),
    preparation_time TIMESTAMPTZ NOT NULL,
    storage_information TEXT NOT NULL,
    storage_condition TEXT NOT NULL DEFAULT 'ambient' CHECK (storage_condition IN ('ambient', 'refrigerated', 'hot_holding', 'frozen')),
    current_temperature_celsius NUMERIC(5, 2),
    ingredients TEXT,
    allergens TEXT[] DEFAULT '{}',
    packaging_information TEXT,
    handling_information TEXT,
    permitted_handling_deadline TIMESTAMPTZ NOT NULL,
    pickup_location TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    pickup_start TIMESTAMPTZ NOT NULL,
    pickup_end TIMESTAMPTZ NOT NULL,
    safety_status TEXT NOT NULL DEFAULT 'under_review' CHECK (safety_status IN ('under_review', 'eligible', 'ineligible', 'frozen', 'recalled', 'expired')),
    listing_status TEXT NOT NULL DEFAULT 'available' CHECK (listing_status IN ('draft', 'under_review', 'available', 'matched', 'request_received', 'approved', 'pickup_pending', 'picked_up', 'in_transit', 'delivered', 'completed', 'rejected', 'frozen', 'recalled', 'expired', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FOOD SAFETY CHECKS TABLE
CREATE TABLE IF NOT EXISTS public.food_safety_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    food_listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
    checklist_data JSONB NOT NULL,
    missing_information TEXT[],
    flagged_concerns TEXT[],
    reviewer_id UUID REFERENCES public.profiles(id),
    review_status TEXT NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'conditional')),
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DONATION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.donation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    food_listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    requested_quantity NUMERIC(10, 2) NOT NULL CHECK (requested_quantity > 0),
    request_status TEXT NOT NULL DEFAULT 'pending' CHECK (request_status IN ('pending', 'approved', 'rejected', 'partially_approved', 'cancelled')),
    donor_response TEXT,
    approved_quantity NUMERIC(10, 2) DEFAULT 0,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FOOD ALLOCATIONS (FairShare calculation results)
CREATE TABLE IF NOT EXISTS public.food_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    allocated_quantity NUMERIC(10, 2) NOT NULL CHECK (allocated_quantity > 0),
    fairshare_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
    score_breakdown JSONB DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'confirmed', 'declined', 'reallocated')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FOOD BATCH PASSPORTS (QR Traceability)
CREATE TABLE IF NOT EXISTS public.food_batch_passports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id TEXT UNIQUE NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
    qr_code_payload TEXT NOT NULL,
    donor_name TEXT NOT NULL,
    food_name TEXT NOT NULL,
    preparation_time TIMESTAMPTZ NOT NULL,
    expiry_time TIMESTAMPTZ NOT NULL,
    storage_conditions TEXT NOT NULL,
    allergens TEXT[] DEFAULT '{}',
    safety_gate_cleared BOOLEAN DEFAULT FALSE,
    current_status TEXT NOT NULL DEFAULT 'created',
    history_log JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. RESCUE MISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.rescue_missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_code TEXT UNIQUE NOT NULL,
    batch_id TEXT NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
    donor_id UUID NOT NULL REFERENCES public.profiles(id),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id),
    volunteer_id UUID REFERENCES public.profiles(id),
    mission_status TEXT NOT NULL DEFAULT 'assigned' CHECK (mission_status IN ('draft', 'assigned', 'accepted', 'en_route_pickup', 'picked_up', 'in_transit', 'delivered', 'confirmed', 'cancelled', 'failed', 'reassigned')),
    pickup_deadline TIMESTAMPTZ NOT NULL,
    pickup_otp TEXT NOT NULL,
    delivery_otp TEXT NOT NULL,
    otp_attempts INTEGER DEFAULT 0,
    pickup_verified_at TIMESTAMPTZ,
    delivery_verified_at TIMESTAMPTZ,
    pickup_latitude DOUBLE PRECISION,
    pickup_longitude DOUBLE PRECISION,
    delivery_latitude DOUBLE PRECISION,
    delivery_longitude DOUBLE PRECISION,
    pickup_address TEXT,
    delivery_address TEXT,
    estimated_distance_km NUMERIC(6, 2),
    estimated_duration_mins INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 9. VOLUNTEER TASKS TABLE
CREATE TABLE IF NOT EXISTS public.volunteer_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rescue_mission_id UUID NOT NULL REFERENCES public.rescue_missions(id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    pickup_location TEXT NOT NULL,
    delivery_location TEXT NOT NULL,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    pickup_time TIMESTAMPTZ,
    delivery_time TIMESTAMPTZ,
    task_status TEXT NOT NULL DEFAULT 'pending' CHECK (task_status IN ('pending', 'accepted', 'en_route_pickup', 'picked_up', 'in_transit', 'delivered', 'cancelled')),
    collected_quantity NUMERIC(10, 2),
    delivered_quantity NUMERIC(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PICKUP AND DELIVERY VERIFICATION RECORDS
CREATE TABLE IF NOT EXISTS public.pickup_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.rescue_missions(id) ON DELETE CASCADE,
    batch_id TEXT NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL REFERENCES public.profiles(id),
    donor_id UUID NOT NULL REFERENCES public.profiles(id),
    collected_quantity NUMERIC(10, 2) NOT NULL,
    verified_otp BOOLEAN DEFAULT TRUE,
    qr_scanned BOOLEAN DEFAULT TRUE,
    temperature_at_pickup NUMERIC(5, 2),
    notes TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.delivery_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.rescue_missions(id) ON DELETE CASCADE,
    batch_id TEXT NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL REFERENCES public.profiles(id),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id),
    received_quantity NUMERIC(10, 2) NOT NULL,
    discrepancy_quantity NUMERIC(10, 2) DEFAULT 0,
    discrepancy_reason TEXT,
    verified_otp BOOLEAN DEFAULT TRUE,
    qr_scanned BOOLEAN DEFAULT TRUE,
    temperature_at_delivery NUMERIC(5, 2),
    notes TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 11. RESCUE INCIDENTS & SAFETY RECALLS
CREATE TABLE IF NOT EXISTS public.rescue_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_code TEXT UNIQUE NOT NULL,
    batch_id TEXT NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES public.profiles(id),
    incident_type TEXT NOT NULL CHECK (incident_type IN ('suspected_spoilage', 'incorrect_info', 'allergen_mismatch', 'temperature_breach', 'packaging_damage', 'foreign_object', 'other')),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT NOT NULL,
    evidence_url TEXT,
    is_frozen BOOLEAN DEFAULT TRUE,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_investigation', 'resolved_cleared', 'resolved_recalled', 'closed')),
    resolution_notes TEXT,
    resolved_by UUID REFERENCES public.profiles(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. TEMPERATURE & COLD-CHAIN LOGS
CREATE TABLE IF NOT EXISTS public.temperature_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.rescue_missions(id) ON DELETE CASCADE,
    batch_id TEXT NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    temperature_celsius NUMERIC(5, 2) NOT NULL,
    is_simulated BOOLEAN DEFAULT TRUE,
    is_breach BOOLEAN DEFAULT FALSE,
    recorded_by UUID NOT NULL REFERENCES public.profiles(id),
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. BENEFICIARIES TABLE
CREATE TABLE IF NOT EXISTS public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    internal_beneficiary_reference TEXT NOT NULL,
    beneficiary_count INTEGER NOT NULL CHECK (beneficiary_count > 0),
    distribution_location TEXT NOT NULL,
    dietary_requirements TEXT,
    record_status TEXT NOT NULL DEFAULT 'active' CHECK (record_status IN ('active', 'inactive', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. DISTRIBUTION RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.distribution_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ngo_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    batch_id TEXT NOT NULL REFERENCES public.food_listings(batch_id) ON DELETE CASCADE,
    quantity_received NUMERIC(10, 2) NOT NULL,
    quantity_accepted NUMERIC(10, 2) NOT NULL,
    quantity_distributed NUMERIC(10, 2) NOT NULL,
    meals_served INTEGER NOT NULL CHECK (meals_served >= 0),
    remaining_quantity NUMERIC(10, 2) DEFAULT 0,
    distribution_date TIMESTAMPTZ DEFAULT NOW(),
    location TEXT NOT NULL,
    reported_issues TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. WASTE REPORTS (Community Crowdsourced)
CREATE TABLE IF NOT EXISTS public.waste_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    food_type TEXT NOT NULL,
    estimated_quantity NUMERIC(10, 2),
    report_description TEXT NOT NULL,
    image_path TEXT,
    report_status TEXT NOT NULL DEFAULT 'reported' CHECK (report_status IN ('reported', 'verified', 'dispatched', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. COMMUNITY HOTSPOTS TABLE
CREATE TABLE IF NOT EXISTS public.community_hotspots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location_name TEXT NOT NULL,
    city TEXT DEFAULT 'Coimbatore',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    hotspot_type TEXT NOT NULL CHECK (hotspot_type IN ('surplus_zone', 'high_hunger_need', 'community_kitchen_needed', 'frequent_event_area')),
    urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'verified', 'addressed')),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. COMMUNITY HUBS & FRIDGES TABLE
CREATE TABLE IF NOT EXISTS public.community_hubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hub_name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Coimbatore',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    operator_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    opening_hours TEXT NOT NULL,
    capacity_kg NUMERIC(10, 2) NOT NULL DEFAULT 50,
    current_load_kg NUMERIC(10, 2) NOT NULL DEFAULT 0,
    storage_type TEXT NOT NULL DEFAULT 'refrigerated',
    accepted_categories TEXT[] DEFAULT '{"cooked_meals", "bakery_items", "raw_produce"}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. VOLUNTEER PROFILES
CREATE TABLE IF NOT EXISTS public.volunteer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    transport_mode TEXT NOT NULL CHECK (transport_mode IN ('two_wheeler', 'car', 'van', 'autorickshaw', 'bicycle', 'walking')),
    max_capacity_kg NUMERIC(6, 2) NOT NULL DEFAULT 20,
    is_available BOOLEAN DEFAULT TRUE,
    preferred_area TEXT DEFAULT 'Coimbatore City',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    completed_missions INTEGER DEFAULT 0,
    total_credits INTEGER DEFAULT 0,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. RESCUE CREDITS TABLE
CREATE TABLE IF NOT EXISTS public.rescue_credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount > 0),
    reason TEXT NOT NULL,
    reference_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('listing', 'request', 'mission', 'safety', 'volunteer', 'system', 'incident')),
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. RECOVERY TASKS (Rescue Failure Recovery Engine)
CREATE TABLE IF NOT EXISTS public.recovery_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.rescue_missions(id) ON DELETE CASCADE,
    failure_type TEXT NOT NULL CHECK (failure_type IN ('volunteer_cancellation', 'ngo_rejection', 'delivery_delayed', 'recipient_unavailable', 'capacity_exhausted')),
    trigger_reason TEXT NOT NULL,
    original_assignee_id UUID REFERENCES public.profiles(id),
    new_assignee_id UUID REFERENCES public.profiles(id),
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'resolved', 'escalated_to_admin', 'failed')),
    action_log JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 22. DIGITAL TWIN SIMULATION SCENARIOS
CREATE TABLE IF NOT EXISTS public.digital_twin_scenarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    simulation_type TEXT NOT NULL CHECK (simulation_type IN ('ngo_rejection', 'volunteer_cancellation', 'delayed_pickup', 'capacity_drop', 'route_blockage')),
    original_plan JSONB NOT NULL,
    failure_point JSONB NOT NULL,
    proposed_recovery JSONB NOT NULL,
    estimated_impact_recovery_rate NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. IMPACT REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.impact_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_kg_rescued NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_meals_served INTEGER NOT NULL DEFAULT 0,
    total_co2_kg_saved NUMERIC(12, 2) NOT NULL DEFAULT 0,
    active_donors INTEGER NOT NULL DEFAULT 0,
    active_ngos INTEGER NOT NULL DEFAULT 0,
    active_volunteers INTEGER NOT NULL DEFAULT 0,
    active_missions INTEGER NOT NULL DEFAULT 0,
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. PREDICTIVE SURPLUS RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.predictive_surplus_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    expected_attendance INTEGER NOT NULL,
    predicted_surplus_kg NUMERIC(8, 2) NOT NULL,
    confidence_pct NUMERIC(5, 2) NOT NULL DEFAULT 85.0,
    actual_surplus_kg NUMERIC(8, 2),
    prediction_date TIMESTAMPTZ DEFAULT NOW()
);

-- 26. NGO REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS public.ngo_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ngo_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    daily_food_requirement_kg NUMERIC(10, 2) NOT NULL DEFAULT 50,
    max_receiving_capacity_kg NUMERIC(10, 2) NOT NULL DEFAULT 100,
    dietary_preferences TEXT[] DEFAULT '{"veg", "non_veg"}',
    allergen_restrictions TEXT[] DEFAULT '{}',
    refrigeration_available BOOLEAN DEFAULT TRUE,
    storage_facilities TEXT[] DEFAULT '{"cold_storage", "dry_pantry"}',
    receiving_hours TEXT DEFAULT '09:00 - 20:00',
    service_area TEXT DEFAULT 'Coimbatore District',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE & GEOSPATIAL SEARCH
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_coords ON public.profiles(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_listings_batch ON public.food_listings(batch_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.food_listings(listing_status, safety_status);
CREATE INDEX IF NOT EXISTS idx_listings_donor ON public.food_listings(donor_id);
CREATE INDEX IF NOT EXISTS idx_listings_coords ON public.food_listings(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_missions_status ON public.rescue_missions(mission_status);
CREATE INDEX IF NOT EXISTS idx_missions_volunteer ON public.rescue_missions(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_hotspots_coords ON public.community_hotspots(latitude, longitude);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_safety_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_batch_passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recovery_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_twin_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictive_surplus_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_requirements ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES POLICIES
CREATE POLICY "Public profiles are readable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  -- Users cannot promote themselves to admin
  AND (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
  -- Users cannot verify themselves
  AND (verification_status = (SELECT verification_status FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id AND role != 'admin');

CREATE POLICY "Admins have full access to profiles"
ON public.profiles FOR ALL
TO authenticated
USING (public.is_admin());

-- 2. FOOD LISTINGS POLICIES
CREATE POLICY "Anyone can view eligible available listings"
ON public.food_listings FOR SELECT
TO authenticated
USING (
  listing_status IN ('available', 'matched', 'request_received', 'approved', 'pickup_pending', 'in_transit', 'delivered')
  OR donor_id = auth.uid()
  OR public.is_admin()
);

CREATE POLICY "Verified Donors can insert listings"
ON public.food_listings FOR INSERT
TO authenticated
WITH CHECK (
  donor_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() 
      AND role = 'donor' 
      AND verification_status = 'verified'
  )
);

CREATE POLICY "Donors can update own listings"
ON public.food_listings FOR UPDATE
TO authenticated
USING (donor_id = auth.uid() OR public.is_admin())
WITH CHECK (donor_id = auth.uid() OR public.is_admin());

-- 3. FOOD BATCH PASSPORTS POLICIES
CREATE POLICY "Passport readable by authenticated users"
ON public.food_batch_passports FOR SELECT
TO authenticated
USING (true);

-- 4. DONATION REQUESTS POLICIES
CREATE POLICY "Donors, requesters and admins can view requests"
ON public.donation_requests FOR SELECT
TO authenticated
USING (
  requester_id = auth.uid()
  OR EXISTS (SELECT 1 FROM public.food_listings WHERE id = food_listing_id AND donor_id = auth.uid())
  OR public.is_admin()
);

CREATE POLICY "Verified NGOs and Acceptors can create requests"
ON public.donation_requests FOR INSERT
TO authenticated
WITH CHECK (
  requester_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('acceptor', 'ngo') AND verification_status = 'verified'
  )
);

CREATE POLICY "Donors can update request status for their listings"
ON public.donation_requests FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.food_listings WHERE id = food_listing_id AND donor_id = auth.uid())
  OR public.is_admin()
);

-- 5. RESCUE MISSIONS POLICIES
CREATE POLICY "Participants and admins can view missions"
ON public.rescue_missions FOR SELECT
TO authenticated
USING (
  donor_id = auth.uid()
  OR recipient_id = auth.uid()
  OR volunteer_id = auth.uid()
  OR public.is_admin()
);

CREATE POLICY "Volunteers and admins can update mission progress"
ON public.rescue_missions FOR UPDATE
TO authenticated
USING (
  volunteer_id = auth.uid()
  OR donor_id = auth.uid()
  OR recipient_id = auth.uid()
  OR public.is_admin()
);

-- 6. NOTIFICATIONS POLICIES
CREATE POLICY "Users can only view their own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications read state"
ON public.notifications FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- 7. INCIDENTS POLICIES
CREATE POLICY "Authenticated users can report incidents"
ON public.rescue_incidents FOR INSERT
TO authenticated
WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Reporters, affected participants and admins can view incidents"
ON public.rescue_incidents FOR SELECT
TO authenticated
USING (
  reporter_id = auth.uid()
  OR public.is_admin()
  OR EXISTS (SELECT 1 FROM public.food_listings WHERE batch_id = rescue_incidents.batch_id AND donor_id = auth.uid())
);

CREATE POLICY "Admins can resolve incidents"
ON public.rescue_incidents FOR UPDATE
TO authenticated
USING (public.is_admin());

-- 8. BENEFICIARIES POLICIES
CREATE POLICY "NGOs can view and manage only their own beneficiaries"
ON public.beneficiaries FOR ALL
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.organizations WHERE id = beneficiaries.organization_id AND owner_id = auth.uid())
  OR public.is_admin()
);

-- 9. COMMUNITY HOTSPOTS POLICIES
CREATE POLICY "Anyone can view hotspots"
ON public.community_hotspots FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can report hotspots"
ON public.community_hotspots FOR INSERT
TO authenticated
WITH CHECK (reporter_id = auth.uid());

-- 10. IMPACT REPORTS POLICIES
CREATE POLICY "Public read for impact reports"
ON public.impact_reports FOR SELECT
TO authenticated, anon
USING (true);
