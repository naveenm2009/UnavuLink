-- ==============================================================================
-- UNAVULINK SEED DATA - TAMIL NADU DEMONSTRATION DATASET
-- Explicitly designated as Realistic Demonstration Data for Hackathon Evaluation
-- Real coordinates across Coimbatore, Salem, Erode, Tiruppur, Chennai, Madurai, etc.
-- ==============================================================================

-- 1. SEED PROFILES
-- IDs correspond to simulated auth accounts for 5 roles
INSERT INTO public.profiles (id, full_name, email, phone, role, is_volunteer, volunteer_status, verification_status, account_status, location, latitude, longitude)
VALUES
-- ADMIN
('a0000000-0000-0000-0000-000000000001', 'Dr. Sundar Rajan (Admin)', 'admin@unavulink.org', '+91 94431 23456', 'admin', false, 'none', 'verified', 'active', 'Gandhipuram, Coimbatore', 11.0168, 76.9558),

-- DONORS (Hotels, Caterers, Wedding Halls, Hostels, Restaurants)
('d0000000-0000-0000-0000-000000000001', 'Anand Grand Banquet & Caterers', 'anand.grand@demo.unavulink.org', '+91 98422 11001', 'donor', false, 'none', 'verified', 'active', 'Avinashi Road, Peelamedu, Coimbatore', 11.0284, 77.0104),
('d0000000-0000-0000-0000-000000000002', 'Sri Krishna Sweets & Bakery Hub', 'krishna.bakery@demo.unavulink.org', '+91 98422 11002', 'donor', false, 'none', 'verified', 'active', 'DB Road, RS Puram, Coimbatore', 11.0089, 76.9482),
('d0000000-0000-0000-0000-000000000003', 'Kongu Convention Palace', 'kongu.palace@demo.unavulink.org', '+91 98422 11003', 'donor', false, 'none', 'verified', 'active', 'Perundurai Road, Erode', 11.3410, 77.7172),
('d0000000-0000-0000-0000-000000000004', 'Salem Royal Residency & Mess', 'salem.royal@demo.unavulink.org', '+91 98422 11004', 'donor', false, 'none', 'verified', 'active', 'Five Roads, Salem', 11.6643, 78.1460),
('d0000000-0000-0000-0000-000000000005', 'Tiruppur Textile City Caterers', 'tiruppur.caterers@demo.unavulink.org', '+91 98422 11005', 'donor', false, 'none', 'verified', 'active', 'Kangayam Road, Tiruppur', 11.1085, 77.3411),
('d0000000-0000-0000-0000-000000000006', 'Madurai Meenakshi Residency', 'madurai.residency@demo.unavulink.org', '+91 98422 11006', 'donor', false, 'none', 'verified', 'active', 'KK Nagar, Madurai', 9.9252, 78.1408),
('d0000000-0000-0000-0000-000000000007', 'Trichy Rockfort Central Kitchen', 'trichy.rockfort@demo.unavulink.org', '+91 98422 11007', 'donor', false, 'none', 'verified', 'active', 'Thillai Nagar, Tiruchirappalli', 10.8269, 78.6888),
('d0000000-0000-0000-0000-000000000008', 'Chennai Marina Bay Banquets', 'chennai.marina@demo.unavulink.org', '+91 98422 11008', 'donor', false, 'none', 'verified', 'active', 'OMR Thoraipakkam, Chennai', 12.9348, 80.2312),
('d0000000-0000-0000-0000-000000000009', 'Namakkal Poultry & Farm Hub', 'namakkal.farms@demo.unavulink.org', '+91 98422 11009', 'donor', false, 'none', 'verified', 'active', 'Paramathi Road, Namakkal', 11.2189, 78.1674),
('d0000000-0000-0000-0000-000000000010', 'Thanjavur Delta Feast Caterers', 'thanjavur.feast@demo.unavulink.org', '+91 98422 11010', 'donor', false, 'none', 'pending', 'active', 'Medical College Road, Thanjavur', 10.7870, 79.1378),

-- ACCEPTORS
('c0000000-0000-0000-0000-000000000001', 'Grace Old Age Home Caretaker (Acceptor)', 'grace.home@demo.unavulink.org', '+91 97890 22001', 'acceptor', false, 'none', 'verified', 'active', 'Singanallur, Coimbatore', 11.0016, 77.0270),
('c0000000-0000-0000-0000-000000000002', 'Hope Children Shelter Coordinator', 'hope.shelter@demo.unavulink.org', '+91 97890 22002', 'acceptor', false, 'none', 'verified', 'active', 'Rathinapuri, Coimbatore', 11.0321, 76.9622),
('c0000000-0000-0000-0000-000000000003', 'Surabhi Destitute Relief Warden', 'surabhi.relief@demo.unavulink.org', '+91 97890 22003', 'acceptor', false, 'none', 'verified', 'active', 'Surampatti, Erode', 11.3268, 77.7241),

-- NGOS
('n0000000-0000-0000-0000-000000000001', 'Annai Teresa Karunai Illam', 'annai.teresa@demo.unavulink.org', '+91 94441 33001', 'ngo', false, 'none', 'verified', 'active', 'Ukkadam, Coimbatore', 10.9882, 76.9616),
('n0000000-0000-0000-0000-000000000002', 'Kovai Pasumai & Food Bank Trust', 'kovai.foodbank@demo.unavulink.org', '+91 94441 33002', 'ngo', false, 'none', 'verified', 'active', 'Gandhipuram 4th Street, Coimbatore', 11.0180, 76.9650),
('n0000000-0000-0000-0000-000000000003', 'Erode Hunger Zero Mission', 'erode.hungerzero@demo.unavulink.org', '+91 94441 33003', 'ngo', false, 'none', 'verified', 'active', 'Brough Road, Erode', 11.3441, 77.7274),
('n0000000-0000-0000-0000-000000000004', 'Salem Seva Social Welfare Society', 'salem.seva@demo.unavulink.org', '+91 94441 33004', 'ngo', false, 'none', 'verified', 'active', 'Hasthampatti, Salem', 11.6789, 78.1620),
('n0000000-0000-0000-0000-000000000005', 'Tiruppur Weaver Community Support', 'tiruppur.support@demo.unavulink.org', '+91 94441 33005', 'ngo', false, 'none', 'verified', 'active', 'Avinashi Road, Tiruppur', 11.1124, 77.3489),
('n0000000-0000-0000-0000-000000000006', 'Madurai Pasumalai Relief Care', 'madurai.relief@demo.unavulink.org', '+91 94441 33006', 'ngo', false, 'none', 'verified', 'active', 'Pasumalai, Madurai', 9.8974, 78.0841),

-- COMMON PEOPLE & VOLUNTEERS
('v0000000-0000-0000-0000-000000000001', 'Karthik Subramanian (Volunteer Champion)', 'karthik.volunteer@demo.unavulink.org', '+91 99401 44001', 'common_people', true, 'approved', 'verified', 'active', 'RS Puram, Coimbatore', 11.0112, 76.9490),
('v0000000-0000-0000-0000-000000000002', 'Priya Muruganandham (Van Driver Volunteer)', 'priya.murugan@demo.unavulink.org', '+91 99401 44002', 'common_people', true, 'approved', 'verified', 'active', 'Hopes College, Peelamedu, Coimbatore', 11.0245, 77.0019),
('v0000000-0000-0000-0000-000000000003', 'Muthu Kumar (Bike Rapid Rescue)', 'muthu.kumar@demo.unavulink.org', '+91 99401 44003', 'common_people', true, 'approved', 'verified', 'active', 'Saibaba Colony, Coimbatore', 11.0256, 76.9467),
('v0000000-0000-0000-0000-000000000004', 'Dinesh Selvan (Auto Rickshaw Volunteer)', 'dinesh.selvan@demo.unavulink.org', '+91 99401 44004', 'common_people', true, 'approved', 'verified', 'active', 'Perundurai, Erode', 11.2750, 77.5850),
('p0000000-0000-0000-0000-000000000001', 'Lakshmi Narayanan (Citizen Reporter)', 'lakshmi.citizen@demo.unavulink.org', '+91 99401 55001', 'common_people', false, 'none', 'verified', 'active', 'Saravanampatti, Coimbatore', 11.0789, 76.9950),
('p0000000-0000-0000-0000-000000000002', 'Vignesh Balaji (Public Contributor)', 'vignesh.balaji@demo.unavulink.org', '+91 99401 55002', 'common_people', false, 'none', 'verified', 'active', 'Town Hall, Coimbatore', 10.9972, 76.9620)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED ORGANIZATIONS
INSERT INTO public.organizations (id, owner_id, organization_name, organization_type, registration_number, address, city, latitude, longitude, receiving_capacity, storage_capabilities, operating_hours)
VALUES
('o0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Anand Grand Banquet & Caterers', 'caterer', 'TN-CBE-CAT-2024-89', 'Avinashi Road, Peelamedu', 'Coimbatore', 11.0284, 77.0104, 0, '{"dry": true, "refrigerated": true, "freezer": true}', '06:00 - 23:00'),
('o0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Sri Krishna Sweets & Bakery Hub', 'restaurant', 'TN-CBE-RES-2023-14', 'DB Road, RS Puram', 'Coimbatore', 11.0089, 76.9482, 0, '{"dry": true, "refrigerated": true, "freezer": false}', '07:00 - 22:00'),
('o0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Kongu Convention Palace', 'wedding_hall', 'TN-ERD-WED-2022-77', 'Perundurai Road', 'Erode', 11.3410, 77.7172, 0, '{"dry": true, "refrigerated": true, "freezer": true}', '24 Hours'),
('o0000000-0000-0000-0000-000000000004', 'n0000000-0000-0000-0000-000000000001', 'Annai Teresa Karunai Illam', 'orphanage', 'TN-NGO-ACT-1998-45', 'Ukkadam Lake Road', 'Coimbatore', 10.9882, 76.9616, 250.0, '{"dry": true, "refrigerated": true, "freezer": false}', '07:00 - 21:00'),
('o0000000-0000-0000-0000-000000000002', 'n0000000-0000-0000-0000-000000000002', 'Kovai Pasumai & Food Bank Trust', 'community_kitchen', 'TN-NGO-TRUST-2021-12', 'Gandhipuram 4th Street', 'Coimbatore', 11.0180, 76.9650, 400.0, '{"dry": true, "refrigerated": true, "freezer": true}', '06:00 - 22:30'),
('o0000000-0000-0000-0000-000000000003', 'n0000000-0000-0000-0000-000000000003', 'Erode Hunger Zero Mission', 'ngo', 'TN-NGO-ERD-2020-09', 'Brough Road', 'Erode', 11.3441, 77.7274, 180.0, '{"dry": true, "refrigerated": true, "freezer": false}', '08:00 - 20:00'),
('o0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'Grace Old Age Home', 'shelter', 'TN-SHL-CBE-2019-33', 'Singanallur Trichy Road', 'Coimbatore', 11.0016, 77.0270, 120.0, '{"dry": true, "refrigerated": false, "freezer": false}', '08:00 - 19:30')
ON CONFLICT (id) DO NOTHING;

-- 3. SEED VOLUNTEER PROFILES
INSERT INTO public.volunteer_profiles (user_id, transport_mode, max_capacity_kg, is_available, preferred_area, rating, completed_missions, total_credits, approved_at)
VALUES
('v0000000-0000-0000-0000-000000000001', 'two_wheeler', 25.0, true, 'Peelamedu & RS Puram', 4.95, 38, 760, NOW() - INTERVAL '60 days'),
('v0000000-0000-0000-0000-000000000002', 'van', 350.0, true, 'Coimbatore Urban & Periphery', 5.0, 54, 1420, NOW() - INTERVAL '90 days'),
('v0000000-0000-0000-0000-000000000003', 'two_wheeler', 20.0, true, 'Saibaba Colony & Gandhipuram', 4.88, 26, 520, NOW() - INTERVAL '30 days'),
('v0000000-0000-0000-0000-000000000004', 'autorickshaw', 80.0, true, 'Erode & Perundurai Belt', 4.90, 19, 410, NOW() - INTERVAL '45 days')
ON CONFLICT (user_id) DO NOTHING;

-- 4. SEED FOOD LISTINGS (Real Tamil Nadu Batches with QR Traceability)
INSERT INTO public.food_listings (id, batch_id, donor_id, food_name, description, food_category, dietary_category, quantity, unit, estimated_portions, preparation_time, storage_information, storage_condition, current_temperature_celsius, ingredients, allergens, packaging_information, handling_information, permitted_handling_deadline, pickup_location, latitude, longitude, pickup_start, pickup_end, safety_status, listing_status)
VALUES
-- Batch 1: Wedding Reception Sambar Rice & Poriyal
('f0000000-0000-0000-0000-000000000001', 'UNV-CBE-202611-001', 'd0000000-0000-0000-0000-000000000001', 'South Indian Feast: Sambar Rice, Potato Poriyal & Appalam', 'Surplus from 450-person wedding reception. Kept in food-grade thermal containers above 65°C.', 'cooked_meals', 'veg', 45.0, 'kg', 120, NOW() - INTERVAL '2 hours', 'Stored in double-walled insulated stainless containers', 'hot_holding', 68.5, 'Sona Masoori Rice, Toor Dal, Drumsticks, Carrots, Ghee, Spices, Potatoes', '{"mustard"}', 'Sealed stainless insulated containers (3 units)', 'Maintain heat above 60°C. Transport in covered clean vehicle.', NOW() + INTERVAL '4 hours', 'Anand Grand Banquet, Avinashi Road, Peelamedu, Coimbatore', 11.0284, 77.0104, NOW(), NOW() + INTERVAL '2 hours', 'eligible', 'available'),

-- Batch 2: Fresh Bakery Loaves & Veg Puffs
('f0000000-0000-0000-0000-000000000002', 'UNV-CBE-202611-002', 'd0000000-0000-0000-0000-000000000002', 'Whole Wheat Bread Loaves & Vegetable Baked Puffs', 'Freshly baked evening batch, unconsumed counter inventory wrapped individually.', 'bakery_items', 'veg', 28.0, 'kg', 85, NOW() - INTERVAL '3 hours', 'Air conditioned dry counter at 22°C', 'ambient', 22.0, 'Whole wheat flour, dry yeast, vegetables, refined butter, pepper', '{"gluten"}', 'Food grade wax paper liners in corrugated trays', 'Keep dry. Avoid crushing.', NOW() + INTERVAL '18 hours', 'Sri Krishna Sweets & Bakery Hub, DB Road, RS Puram, Coimbatore', 11.0089, 76.9482, NOW(), NOW() + INTERVAL '3 hours', 'eligible', 'approved'),

-- Batch 3: Wedding Dinner Vegetable Biryani & Kurma
('f0000000-0000-0000-0000-000000000003', 'UNV-ERD-202611-003', 'd0000000-0000-0000-0000-000000000003', 'Kongu Style Dum Vegetable Biryani & Brinjal Gravy', 'High quality Seeraga Samba vegetable biryani from evening reception at Kongu Palace.', 'cooked_meals', 'veg', 60.0, 'kg', 160, NOW() - INTERVAL '1 hour', 'Thermal degchi insulated with safety clamp', 'hot_holding', 71.0, 'Seeraga Samba rice, Paneer, Green Peas, Mint, Ghee, Brinjal, Sesame paste', '{"dairy", "sesame"}', 'Two 30L food grade aluminium containers with tight lids', 'Urgent rescue within 3 hours. Fragile gravy container.', NOW() + INTERVAL '3 hours', 'Kongu Convention Palace, Perundurai Road, Erode', 11.3410, 77.7172, NOW(), NOW() + INTERVAL '2 hours', 'eligible', 'available'),

-- Batch 4: Salem Royal Chicken Curry & Ghee Rice (Non-veg)
('f0000000-0000-0000-0000-000000000004', 'UNV-SLM-202611-004', 'd0000000-0000-0000-0000-000000000004', 'Salem Style Chicken Curry & Fragrant Ghee Rice', 'Catering surplus from corporate conference luncheon. Cold-stored immediately.', 'cooked_meals', 'non_veg', 35.0, 'kg', 90, NOW() - INTERVAL '3 hours', 'Chilled blast cooler at 4°C', 'refrigerated', 4.2, 'Chicken, Ghee, Basmati rice, Shallots, Coconut paste, Spices', '{"dairy"}', 'Plastic sealed heavy food containers', 'Requires cold-chain insulated transit bag or rapid delivery.', NOW() + INTERVAL '5 hours', 'Salem Royal Residency, Five Roads, Salem', 11.6643, 78.1460, NOW(), NOW() + INTERVAL '2 hours', 'eligible', 'available'),

-- Batch 5: Fresh Organically Grown Farm Vegetables
('f0000000-0000-0000-0000-000000000005', 'UNV-NMK-202611-005', 'd0000000-0000-0000-0000-000000000009', 'Farm Fresh Tomatoes, Cabbage & Capsicum Crates', 'Post-sorting grade A fresh farm vegetables harvested morning.', 'raw_produce', 'vegan', 120.0, 'kg', 300, NOW() - INTERVAL '6 hours', 'Ventilated shaded warehouse at ambient 26°C', 'ambient', 25.5, 'Raw vegetables directly from farm', '{}', 'Crates with aeration holes (6 crates)', 'Stack upright.', NOW() + INTERVAL '48 hours', 'Namakkal Farmer Hub, Paramathi Road, Namakkal', 11.2189, 78.1674, NOW(), NOW() + INTERVAL '12 hours', 'eligible', 'available'),

-- Batch 6: Chilled Milk & Curd Packets
('f0000000-0000-0000-0000-000000000006', 'UNV-CBE-202611-006', 'd0000000-0000-0000-0000-000000000001', 'Pasteurized Toned Milk & Probiotic Curd Packets', 'Surplus dairy order from morning breakfast banquet. Kept at 3°C.', 'dairy', 'veg', 40.0, 'litres', 150, NOW() - INTERVAL '4 hours', 'Deep refrigeration at 3°C', 'refrigerated', 3.4, 'Pasteurized cow milk, starter bacterial culture', '{"dairy"}', 'Standard sealed dairy polyethylene pouches in plastic crates', 'Keep below 5°C throughout transit.', NOW() + INTERVAL '12 hours', 'Anand Grand Banquet, Avinashi Road, Peelamedu, Coimbatore', 11.0284, 77.0104, NOW(), NOW() + INTERVAL '4 hours', 'eligible', 'in_transit'),

-- Batch 7: FROZEN BATCH (Simulated Safety Recall / Incident)
('f0000000-0000-0000-0000-000000000007', 'UNV-TRP-202611-007', 'd0000000-0000-0000-0000-000000000005', 'Mixed Seafood Gravy & Parottas (FLAGGED FOR REVIEW)', 'Reported temperature drop during transport. Batch safety gate triggered lockdown.', 'cooked_meals', 'non_veg', 22.0, 'kg', 50, NOW() - INTERVAL '5 hours', 'Storage temperature unmonitored during loading', 'ambient', 33.0, 'Fish, Prawns, Maida parotta, Coconut paste', '{"crustacean", "fish", "gluten"}', 'Disposable aluminium foil trays', 'FROZEN. DO NOT DISTRIBUTE.', NOW() - INTERVAL '1 hour', 'Tiruppur Textile City Caterers, Kangayam Road, Tiruppur', 11.1085, 77.3411, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '1 hour', 'frozen', 'frozen')
ON CONFLICT (id) DO NOTHING;

-- 5. SEED FOOD BATCH PASSPORTS (QR Traceability Data)
INSERT INTO public.food_batch_passports (id, batch_id, listing_id, qr_code_payload, donor_name, food_name, preparation_time, expiry_time, storage_conditions, allergens, safety_gate_cleared, current_status, history_log)
VALUES
('b0000000-0000-0000-0000-000000000001', 'UNV-CBE-202611-001', 'f0000000-0000-0000-0000-000000000001', 
 'https://unavulink.org/passport/UNV-CBE-202611-001', 'Anand Grand Banquet & Caterers', 'South Indian Feast: Sambar Rice & Potato Poriyal', 
 NOW() - INTERVAL '2 hours', NOW() + INTERVAL '4 hours', 'Hot holding >= 65°C', '{"mustard"}', true, 'allocated_pending_pickup',
 '[{"step": "created", "timestamp": "2026-11-12T13:00:00Z", "actor": "Anand Grand Banquet"}, {"step": "safety_gate_cleared", "timestamp": "2026-11-12T13:02:15Z", "gate": "automated_rule_pass"}, {"step": "fairshare_ranked", "timestamp": "2026-11-12T13:05:00Z", "top_recipient": "Annai Teresa Karunai Illam"}]'::jsonb),

('b0000000-0000-0000-0000-000000000002', 'UNV-CBE-202611-002', 'f0000000-0000-0000-0000-000000000002', 
 'https://unavulink.org/passport/UNV-CBE-202611-002', 'Sri Krishna Sweets & Bakery Hub', 'Whole Wheat Bread Loaves & Vegetable Baked Puffs', 
 NOW() - INTERVAL '3 hours', NOW() + INTERVAL '18 hours', 'Dry ambient 22°C', '{"gluten"}', true, 'approved_mission_created',
 '[{"step": "created", "timestamp": "2026-11-12T12:00:00Z", "actor": "Sri Krishna Sweets"}, {"step": "safety_gate_cleared", "timestamp": "2026-11-12T12:01:30Z", "gate": "automated_rule_pass"}]'::jsonb),

('b0000000-0000-0000-0000-000000000007', 'UNV-TRP-202611-007', 'f0000000-0000-0000-0000-000000000007', 
 'https://unavulink.org/passport/UNV-TRP-202611-007', 'Tiruppur Textile City Caterers', 'Mixed Seafood Gravy & Parottas', 
 NOW() - INTERVAL '5 hours', NOW() - INTERVAL '1 hour', 'Ambience breach recorded', '{"crustacean", "fish", "gluten"}', false, 'FROZEN_SAFETY_ALERT',
 '[{"step": "created", "timestamp": "2026-11-12T10:00:00Z"}, {"step": "incident_reported", "timestamp": "2026-11-12T11:45:00Z", "reason": "temperature_breach_detected"}, {"step": "batch_frozen_by_system", "timestamp": "2026-11-12T11:45:02Z"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED RESCUE MISSIONS (With Secure OTPs for Pickup and Delivery Handover)
INSERT INTO public.rescue_missions (id, mission_code, batch_id, listing_id, donor_id, recipient_id, volunteer_id, mission_status, pickup_deadline, pickup_otp, delivery_otp, pickup_latitude, pickup_longitude, delivery_latitude, delivery_longitude, pickup_address, delivery_address, estimated_distance_km, estimated_duration_mins)
VALUES
-- Mission 1: In Progress Rescue in Coimbatore
('m0000000-0000-0000-0000-000000000001', 'MSN-CBE-9821', 'UNV-CBE-202611-006', 'f0000000-0000-0000-0000-000000000006',
 'd0000000-0000-0000-0000-000000000001', 'n0000000-0000-0000-0000-000000000001', 'v0000000-0000-0000-0000-000000000002',
 'in_transit', NOW() + INTERVAL '1 hour', '7492', '3185',
 11.0284, 77.0104, 10.9882, 76.9616,
 'Anand Grand Banquet, Avinashi Road, Peelamedu, Coimbatore',
 'Annai Teresa Karunai Illam, Ukkadam, Coimbatore',
 7.4, 22),

-- Mission 2: Assigned Rescue ready for Pickup
('m0000000-0000-0000-0000-000000000002', 'MSN-CBE-9822', 'UNV-CBE-202611-002', 'f0000000-0000-0000-0000-000000000002',
 'd0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'v0000000-0000-0000-0000-000000000001',
 'assigned', NOW() + INTERVAL '2 hours', '5814', '9203',
 11.0089, 76.9482, 11.0016, 77.0270,
 'Sri Krishna Sweets & Bakery Hub, DB Road, RS Puram, Coimbatore',
 'Grace Old Age Home, Singanallur Trichy Road, Coimbatore',
 8.9, 26)
ON CONFLICT (id) DO NOTHING;

-- 7. SEED COMMUNITY HOTSPOTS (Tamil Nadu Crowdsourced Areas)
INSERT INTO public.community_hotspots (id, reporter_id, title, description, location_name, city, latitude, longitude, hotspot_type, urgency_level, status)
VALUES
('h0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'Coimbatore Railway Junction Night Shelter Need', 'Approx 40-50 migrant daily wage workers and shelter seekers in need of packaged or evening cooked meals.', 'Near Platform 1A Rear Exit, Coimbatore Junction', 'Coimbatore', 10.9982, 76.9667, 'high_hunger_need', 'high', 'verified'),
('h0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 'RS Puram Marriage Hall Cluster Surplus Hub', 'Dense corridor of 6 large kalyana mandapams with regular weekend surplus food between 21:00 and 23:00.', 'Cowley Brown Road, RS Puram', 'Coimbatore', 11.0150, 76.9450, 'frequent_event_area', 'medium', 'verified'),
('h0000000-0000-0000-0000-000000000003', 'v0000000-0000-0000-0000-000000000004', 'Erode Central Bus Stand Transit Workers', 'Need for morning and late afternoon tea snacks and breakfast packets for sanitation and transit crews.', 'Brough Road, Erode Bus Stand', 'Erode', 11.3435, 77.7280, 'high_hunger_need', 'medium', 'open')
ON CONFLICT (id) DO NOTHING;

-- 8. SEED COMMUNITY HUBS & SMART FRIDGES
INSERT INTO public.community_hubs (id, hub_name, address, city, latitude, longitude, operator_name, contact_phone, opening_hours, capacity_kg, current_load_kg, storage_type)
VALUES
('u0000000-0000-0000-0000-000000000001', 'Kovai Community Cold Hub #1 (RS Puram)', 'Near Corporation Library, DB Road', 'Coimbatore', 11.0102, 76.9501, 'Kovai Pasumai Trust', '+91 94441 33002', '06:00 - 22:00', 100.0, 34.5, 'refrigerated'),
('u0000000-0000-0000-0000-000000000002', 'Peelamedu Food Rescue Kiosk #2', 'Opposite PSG Tech Bus Shelter, Avinashi Rd', 'Coimbatore', 11.0267, 77.0045, 'Peelamedu Youth Alliance', '+91 94441 33010', '07:00 - 21:30', 80.0, 18.0, 'refrigerated'),
('u0000000-0000-0000-0000-000000000003', 'Erode Perundurai Community Fridge', 'Collectorate Roundabout, Perundurai Road', 'Erode', 11.3389, 77.7198, 'Erode Hunger Zero Mission', '+91 94441 33003', '08:00 - 20:00', 60.0, 42.0, 'refrigerated')
ON CONFLICT (id) DO NOTHING;

-- 9. SEED SAFETY INCIDENT (Demonstrates Feature 7 — Incident & Recall Management)
INSERT INTO public.rescue_incidents (id, incident_code, batch_id, reporter_id, incident_type, severity, description, evidence_url, is_frozen, status, resolution_notes)
VALUES
('i0000000-0000-0000-0000-000000000001', 'INC-202611-042', 'UNV-TRP-202611-007', 'v0000000-0000-0000-0000-000000000003', 'temperature_breach', 'critical',
 'Seafood meal container felt warm upon pickup inspection. Digital infrared probe measured 33°C (ambient danger zone). Immediate automatic freeze triggered to protect end recipients.',
 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b', true, 'open',
 'Batch automatically locked in Food Safety Passport. Donor alerted. Replacement mission initiated for alternative verified donor.')
ON CONFLICT (id) DO NOTHING;

-- 10. SEED DIGITAL TWIN SIMULATION SCENARIO (Demonstrates Feature 9 — Digital Twin)
INSERT INTO public.digital_twin_scenarios (id, title, simulation_type, original_plan, failure_point, proposed_recovery, estimated_impact_recovery_rate)
VALUES
('s0000000-0000-0000-0000-000000000001', 'Simulation A: Volunteer Sudden Bike Breakdown during 45kg Feast Rescue', 'volunteer_cancellation',
 '{"batch_id": "UNV-CBE-202611-001", "assigned_volunteer": "Karthik Subramanian (Bike)", "eta_minutes": 15, "destination": "Annai Teresa Karunai Illam"}'::jsonb,
 '{"trigger": "Volunteer sends emergency breakdown alert 5 minutes before pickup", "location": "Gandhipuram Flyover", "time_to_spoilage_mins": 110}'::jsonb,
 '{"recovery_action": "FairShare Dispatch switches task to Priya Muruganandham (Van Driver, 1.8km away)", "new_eta_minutes": 18, "meals_protected": 120, "estimated_carbon_saved_kg": 94.5}'::jsonb,
 98.5),
('s0000000-0000-0000-0000-000000000002', 'Simulation B: Target NGO Refrigerator Failure / Sudden Capacity Drop', 'capacity_drop',
 '{"batch_id": "UNV-SLM-202611-004", "target_ngo": "Salem Seva Social Welfare Society", "requested_kg": 35.0}'::jsonb,
 '{"trigger": "NGO power cut reported. Inability to chill 35kg chicken curry safely.", "risk": "Spontaneous food waste within 2.5 hours"}'::jsonb,
 '{"recovery_action": "Reroute automatically to Kovai Pasumai Community Kitchen with operational generator and blast chiller (12 mins transit)", "secondary_recipient": "Grace Shelter", "allocation_split": "20kg / 15kg"}'::jsonb,
 96.0)
ON CONFLICT (id) DO NOTHING;

-- 11. SEED IMPACT REPORT METRICS (Real calculations for Tamil Nadu ecosystem)
INSERT INTO public.impact_reports (id, total_kg_rescued, total_meals_served, total_co2_kg_saved, active_donors, active_ngos, active_volunteers, active_missions, period_start, period_end)
VALUES
('r0000000-0000-0000-0000-000000000001', 14820.50, 37050, 31123.05, 42, 28, 86, 14, NOW() - INTERVAL '30 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- 12. SEED NOTIFICATIONS
INSERT INTO public.notifications (user_id, title, message, type, link)
VALUES
('d0000000-0000-0000-0000-000000000001', 'Rescue Mission Dispatched', 'Volunteer Priya Muruganandham is in transit to pickup Batch UNV-CBE-202611-006.', 'mission', '/donor/rescue-tracking'),
('n0000000-0000-0000-0000-000000000001', 'Incoming Delivery Expected', 'Batch UNV-CBE-202611-006 (40L Dairy) arriving in approx 22 minutes.', 'mission', '/ngo/rescue-missions'),
('a0000000-0000-0000-0000-000000000001', 'Safety Incident Alert', 'Batch UNV-TRP-202611-007 frozen due to temperature breach report in Tiruppur.', 'incident', '/admin/safety-incidents')
ON CONFLICT DO NOTHING;
