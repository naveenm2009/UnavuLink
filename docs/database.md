# UNAVULINK — DATABASE DESIGN & DATA MODEL

## Schema Highlights
- Primary Keys: UUIDs via `uuid_generate_v4()`
- Foreign Keys: Strongly constrained cascading relationships
- Unique Batch Identifiers: Formatted as `UNV-TN-[YYYYMMDD]-[RANDOM]`
- Geospatial Search: Supported via latitude/longitude double precision indexes and PostGIS coordinates

## Core Tables Overview
1. `profiles`: User identity, role, volunteer approval status, verification state.
2. `organizations`: Donors, caterers, halls, orphanages, shelters, community kitchens.
3. `food_listings`: Batch details, quantities, preparation times, storage conditions, allergens, permitted deadlines.
4. `food_safety_checks`: Hygiene checkpoints, reviewer notes, compliance logs.
5. `food_batch_passports`: Immutable QR-linked audit records with JSONB history logs.
6. `rescue_missions`: Coordination of pickup, destination, assigned volunteer, pickup OTP, and delivery OTP.
7. `rescue_incidents`: Spoilage, temperature breach, and safety recall tracking.
8. `community_hotspots`: Crowdsourced hunger needs and event surplus corridors across Tamil Nadu.
9. `community_hubs`: 24/7 smart community cold fridges.
10. `volunteer_profiles`: Approved volunteer capabilities, transport modes, and earned rescue credits.
11. `digital_twin_scenarios`: Stored simulation contingencies for disruption modeling.
12. `impact_reports`: Aggregated kilograms rescued, meals served, and CO₂ diverted.
