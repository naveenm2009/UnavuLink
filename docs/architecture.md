# UNAVULINK — SYSTEM ARCHITECTURE SPECIFICATION

## High-Level Architectural Diagram

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|                       React 18 + Vite 6 + Tailwind CSS                          |
|                                                                                 |
|  +--------------------+   +-----------------------+   +----------------------+  |
|  | Multi-Role Nav     |   | Leaflet Map (OSM TN)  |   | QR Passport Viewer   |  |
|  +--------------------+   +-----------------------+   +----------------------+  |
|  | FairShare Engine   |   | Dual-OTP Modal        |   | Digital Twin Sandbox |  |
|  +--------------------+   +-----------------------+   +----------------------+  |
+---------------------------------------+-----------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------+
|                               INTEGRATION LAYER                                 |
|                                                                                 |
|  +-------------------+    +----------------------+    +----------------------+  |
|  | Gemini Vision API |    | Supabase Client      |    | OSRM Routing Engine  |  |
|  +-------------------+    +----------------------+    +----------------------+  |
+---------------------------------------+-----------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------+
|                                BACKEND TIER                                     |
|                    Supabase Cloud PostgreSQL + Auth + Storage                   |
|                                                                                 |
|  - 26 Relational Tables with Foreign Key Constraints                            |
|  - Granular Row-Level Security (RLS) across all 5 roles                         |
|  - Realtime Change Subscriptions                                                |
+---------------------------------------------------------------------------------+
```

## Six Signature Intelligence Engines

1. **Surplus Predictor:** Forecasts surplus quantities based on event category and guest attendance.
2. **Food Safety Gate:** Mandatory automated eligibility filter evaluating handling windows, temperature ranges, and allergen declarations.
3. **Matching Engine:** Computes geospatial and dietary compatibility between donors and receiving organizations.
4. **FairShare Priority Engine:** Multi-factor formula $S = 0.30D + 0.25T + 0.20C + 0.15R + 0.10V$.
5. **Route Optimiser:** Generates pickup and delivery corridors across Tamil Nadu via Leaflet & OpenStreetMap.
6. **Recovery Engine:** Recovers failed operations when volunteers cancel or recipient capacity drops without food waste.
