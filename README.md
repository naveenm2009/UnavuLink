# UNAVULINK
### Predicting Surplus. Prioritising Need. Delivering Food Safely.
> *Every Meal Deserves a Destination. Every Rescue Makes a Difference.*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e.svg)](https://supabase.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-OpenStreetMap-199900.svg)](https://leafletjs.com/)

---

## 🌟 Executive Summary

**UnavuLink** is a comprehensive, full-stack, responsive web application and PWA engineered for social impact across **Tamil Nadu, India** (Coimbatore, Salem, Erode, Tiruppur, Chennai, Madurai, Trichy, etc.).

Rather than simply connecting surplus food with recipients by proximity, UnavuLink solves the complete food rescue problem:
1. **Identifies surplus** and checks food safety before allocation.
2. **Evaluates handling conditions** through an automated **Food Safety Gate**.
3. **Mints unique QR Food Safety Passports** for end-to-end traceability.
4. **Allocates food ethically** using the **FairShare Multi-Factor Algorithm** ($S = 0.30D + 0.25T + 0.20C + 0.15R + 0.10V$).
5. **Coordinates volunteers** using **Dual-OTP Handover Verification** (Pickup OTP + Delivery OTP).
6. **Autonomously recovers** when volunteers cancel or vehicles break down via the **Rescue Failure Recovery Engine**.
7. **Simulates rescue disruptions** in the **Food Rescue Digital Twin**.
8. **Tracks live verified impact** in kilograms rescued, meals served, and CO₂ diverted.

---

## 🎨 Brand & Design System

| Brand Purpose | Color Name | Hex Code |
|---|---|---|
| Primary Navigation & Identity | Forest Green | `#2E6B3F` |
| Secondary Action & Progress | Warm Orange | `#F28C28` |
| Critical Safety Alerts & Recall | Cherry Red | `#D92243` |
| Background Canvas | Warm Cream | `#F6F3EB` |
| Surface Elements | White | `#FFFFFF` |
| High-Contrast Typography | Deep Charcoal | `#26332B` |

---

## 👥 Five Primary Roles & Dashboards

1. **Admin (Command Centre):** Oversight of all food listings, verification of donors & NGOs, active mission monitoring, safety freeze execution, emergency mode dispatch, and Digital Twin simulations.
2. **Donor:** Restaurants, banquet halls, caterers, and hostels; post food surplus with AI assistance, monitor pickup progress, review requests, and confirm handover via Pickup OTP.
3. **Acceptor:** Receiving homes and community shelters; browse eligible food, request portions, track incoming deliveries, and confirm receipt via Delivery OTP.
4. **NGO:** Orphanages, shelters, and community kitchens; manage receiving capacities, track live missions, dispatch volunteers, and record verified meal distributions.
5. **Common People:** Citizens who discover nearby smart fridges, report hunger hotspots and food waste, and register as approved rapid rescue volunteers.

---

## 🏆 Three Standout Hackathon Demonstrations

### Demo A — Rescue Failure Recovery Engine
- **Scenario:** An assigned volunteer breaks down on Avinashi Road with a 45kg wedding feast.
- **Action:** Click **"Simulate Failure"** on any active mission or in the Admin / Donor dashboard.
- **Outcome:** The engine detects 90 minutes remaining shelf-life, automatically reassigns the mission to **Priya Muruganandham (Van Driver, 1.8km away)**, updates ETA to 18m, and logs the change to the Food Safety Passport.

### Demo B — Food Safety Incident Freeze & Recall Protocol
- **Scenario:** A temperature breach (33°C in seafood meal) is flagged by an inspector.
- **Action:** Click **"Report Safety Concern (Freeze)"**.
- **Outcome:** Instantly locks the batch across all NGO feeds, invalidates delivery OTPs, marks the Food Safety Passport as **EMERGENCY SAFETY FREEZE**, and alerts the command coordinator.

### Demo C — Food Rescue Digital Twin Simulation
- **Scenario:** Refrigerator breakdown at an NGO or sudden bulk wedding cancellation.
- **Action:** Open **Admin → Digital Twin Simulation** and run the deterministic model.
- **Outcome:** View the side-by-side comparison: **Initial Dispatch Plan** vs. **Injected Failure Point** vs. **Proposed AI Contingency** (projecting 98.5% meal protection).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js LTS v18+ (tested on Node.js v26.13.1)
- npm v10+

### 2. Installation
```bash
git clone https://github.com/your-username/unavulink.git
cd unavulink
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

### 4. Compiling Production Build
```bash
npm run build
```
Generates production-optimized SPA bundle in `dist/`.

---

## 🗄️ Database Migrations (Supabase)

1. Open your Supabase project SQL Editor.
2. Execute `supabase/migrations/20261112000000_unavulink_core_schema.sql` (Creates 26 tables, triggers, indexes, and full Row Level Security policies).
3. Execute `supabase/seed.sql` to populate realistic Tamil Nadu demonstration datasets.
4. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
*(Note: UnavuLink includes a built-in localStorage demo provider if Supabase keys are left unset).*

---

## 📱 Viewport & Mobile Testing
Optimized for:
- Small Mobile (320px)
- Standard Mobile (375px)
- Tablet Portrait & Landscape (768px – 1024px)
- Laptops & Desktops (1366px – 1920px)

---

## 📄 License & Attribution
Developed for the 24-Hour Social Impact Hackathon 2026. Built with OpenStreetMap, Leaflet, and Supabase.
