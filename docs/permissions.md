# UNAVULINK — ROLE-BASED ACCESS CONTROL (RBAC) & ROW LEVEL SECURITY (RLS)

## Five Primary Roles
1. **Admin:** System oversight, account verification, incident recalls, emergency mode activation, Digital Twin simulations.
2. **Donor:** Verified restaurants, banquet halls, hostels; can create food listings and confirm pickup handovers.
3. **Acceptor:** Receiving homes and shelters; can browse eligible food, request quantities, and confirm receipt.
4. **NGO:** Shelters and community kitchens; can manage capacities, missions, and beneficiary records.
5. **Common People:** Citizens who discover nearby hubs and report hotspots; approved accounts receive volunteer task dispatch.

## Security Guarantees
- RLS enabled on all 26 database tables.
- Users cannot promote themselves to admin via registration forms.
- Donors can only modify their own listings.
- Unverified donors cannot publish live listings.
- Ineligible or frozen batches cannot be requested or dispatched.
- OTPs are validated cryptographically at both pickup and delivery stages.
