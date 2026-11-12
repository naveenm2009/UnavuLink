# UNAVULINK — INSTALLATION & SETUP GUIDE

## Prerequisites
- Node.js v18+ (tested on Node.js LTS v26.13.1)
- npm v10+

## Quick Start (Local Development)

1. Clone or navigate to the project directory:
   ```bash
   cd unavulink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. Build for production:
   ```bash
   npm run build
   ```
   Output is generated in `dist/`.

## Supabase Database Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261112000000_unavulink_core_schema.sql` and run it to create all tables, indexes, triggers, and Row Level Security policies.
4. Open `supabase/seed.sql` and run it to populate realistic Tamil Nadu demonstration datasets.
5. In your `.env` file, populate:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
   *Note:* If Supabase credentials are not provided, UnavuLink operates seamlessly using its built-in realistic Tamil Nadu local storage demo engine.
