export type UserRole = 'admin' | 'donor' | 'acceptor' | 'ngo' | 'common_people';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'suspended';

export type AccountStatus = 'active' | 'suspended' | 'deactivated';

export type VolunteerStatus = 'none' | 'pending' | 'approved' | 'rejected' | 'suspended';

export type FoodCategory =
  | 'cooked_meals'
  | 'bakery_items'
  | 'raw_produce'
  | 'dairy'
  | 'packaged_groceries'
  | 'buffet_spread';

export type DietaryCategory = 'veg' | 'non_veg' | 'vegan' | 'halal' | 'jain';

export type StorageCondition = 'ambient' | 'refrigerated' | 'hot_holding' | 'frozen';

export type SafetyStatus =
  | 'under_review'
  | 'eligible'
  | 'ineligible'
  | 'frozen'
  | 'recalled'
  | 'expired';

export type ListingStatus =
  | 'draft'
  | 'under_review'
  | 'available'
  | 'matched'
  | 'request_received'
  | 'approved'
  | 'pickup_pending'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'completed'
  | 'rejected'
  | 'frozen'
  | 'recalled'
  | 'expired'
  | 'cancelled';

export type MissionStatus =
  | 'draft'
  | 'assigned'
  | 'accepted'
  | 'en_route_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'confirmed'
  | 'cancelled'
  | 'failed'
  | 'reassigned';

export type TransportMode =
  | 'two_wheeler'
  | 'car'
  | 'van'
  | 'autorickshaw'
  | 'bicycle'
  | 'walking';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  is_volunteer: boolean;
  volunteer_status: VolunteerStatus;
  verification_status: VerificationStatus;
  account_status: AccountStatus;
  location?: string;
  latitude?: number;
  longitude?: number;
  avatar_url?: string;
  created_at?: string;
}

export interface Organization {
  id: string;
  owner_id: string;
  organization_name: string;
  organization_type:
    | 'restaurant'
    | 'hotel'
    | 'caterer'
    | 'wedding_hall'
    | 'hostel'
    | 'ngo'
    | 'shelter'
    | 'orphanage'
    | 'community_kitchen';
  registration_number?: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  verification_status: VerificationStatus;
  receiving_capacity: number;
  storage_capabilities?: {
    dry?: boolean;
    refrigerated?: boolean;
    freezer?: boolean;
  };
  operating_hours?: string;
}

export interface FoodListing {
  id: string;
  batch_id: string;
  donor_id: string;
  donor_name?: string;
  donor_organization?: string;
  food_name: string;
  description?: string;
  image_path?: string;
  food_category: FoodCategory;
  dietary_category: DietaryCategory;
  quantity: number;
  unit: 'kg' | 'portions' | 'litres' | 'boxes' | 'crates';
  estimated_portions: number;
  preparation_time: string;
  storage_information: string;
  storage_condition: StorageCondition;
  current_temperature_celsius?: number;
  ingredients?: string;
  allergens: string[];
  packaging_information?: string;
  handling_information?: string;
  permitted_handling_deadline: string;
  pickup_location: string;
  latitude: number;
  longitude: number;
  pickup_start: string;
  pickup_end: string;
  safety_status: SafetyStatus;
  listing_status: ListingStatus;
  created_at?: string;
  distance_km?: number;
}

export interface FoodSafetyCheck {
  id: string;
  food_listing_id: string;
  checklist_data: {
    temp_checked: boolean;
    covered_packaging: boolean;
    hygienic_handling: boolean;
    time_limit_valid: boolean;
    allergen_declared: boolean;
    visual_inspection_ok: boolean;
  };
  missing_information?: string[];
  flagged_concerns?: string[];
  review_status: 'pending' | 'approved' | 'rejected' | 'conditional';
  review_notes?: string;
}

export interface DonationRequest {
  id: string;
  food_listing_id: string;
  listing?: FoodListing;
  requester_id: string;
  requester_name?: string;
  requester_org?: string;
  requested_quantity: number;
  request_status: 'pending' | 'approved' | 'rejected' | 'partially_approved' | 'cancelled';
  donor_response?: string;
  approved_quantity: number;
  rejection_reason?: string;
  created_at?: string;
}

export interface RescueMission {
  id: string;
  mission_code: string;
  batch_id: string;
  listing_id: string;
  donor_id: string;
  donor_name?: string;
  recipient_id: string;
  recipient_name?: string;
  volunteer_id?: string;
  volunteer_name?: string;
  mission_status: MissionStatus;
  pickup_deadline: string;
  pickup_otp: string;
  delivery_otp: string;
  pickup_address: string;
  delivery_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  delivery_latitude: number;
  delivery_longitude: number;
  estimated_distance_km: number;
  estimated_duration_mins: number;
  pickup_verified_at?: string;
  delivery_verified_at?: string;
  created_at?: string;
  food_name?: string;
  quantity?: number;
  unit?: string;
}

export interface FoodBatchPassport {
  id: string;
  batch_id: string;
  listing_id: string;
  qr_code_payload: string;
  donor_name: string;
  food_name: string;
  preparation_time: string;
  expiry_time: string;
  storage_conditions: string;
  allergens: string[];
  safety_gate_cleared: boolean;
  current_status: string;
  history_log: Array<{
    step: string;
    timestamp: string;
    actor?: string;
    details?: string;
    gate?: string;
  }>;
}

export interface CommunityHotspot {
  id: string;
  reporter_id: string;
  reporter_name?: string;
  title: string;
  description: string;
  location_name: string;
  city: string;
  latitude: number;
  longitude: number;
  hotspot_type: 'surplus_zone' | 'high_hunger_need' | 'community_kitchen_needed' | 'frequent_event_area';
  urgency_level: 'low' | 'medium' | 'high' | 'emergency';
  status: 'open' | 'under_review' | 'verified' | 'addressed';
  created_at: string;
}

export interface CommunityHub {
  id: string;
  hub_name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  operator_name: string;
  contact_phone: string;
  opening_hours: string;
  capacity_kg: number;
  current_load_kg: number;
  storage_type: string;
  accepted_categories: string[];
  is_active: boolean;
}

export interface RescueIncident {
  id: string;
  incident_code: string;
  batch_id: string;
  food_name?: string;
  reporter_id: string;
  reporter_name?: string;
  incident_type:
    | 'suspected_spoilage'
    | 'incorrect_info'
    | 'allergen_mismatch'
    | 'temperature_breach'
    | 'packaging_damage'
    | 'foreign_object'
    | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence_url?: string;
  is_frozen: boolean;
  status: 'open' | 'under_investigation' | 'resolved_cleared' | 'resolved_recalled' | 'closed';
  resolution_notes?: string;
  created_at: string;
}

export interface DigitalTwinScenario {
  id: string;
  title: string;
  simulation_type: 'ngo_rejection' | 'volunteer_cancellation' | 'delayed_pickup' | 'capacity_drop' | 'route_blockage';
  original_plan: Record<string, any>;
  failure_point: Record<string, any>;
  proposed_recovery: Record<string, any>;
  estimated_impact_recovery_rate: number;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'listing' | 'request' | 'mission' | 'safety' | 'volunteer' | 'system' | 'incident';
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface ImpactStats {
  total_kg_rescued: number;
  total_meals_served: number;
  total_co2_kg_saved: number;
  active_donors: number;
  active_ngos: number;
  active_volunteers: number;
  active_missions: number;
  water_saved_litres?: number;
}
