import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { TamilNaduMap } from '../../components/maps/TamilNaduMap';
import { FoodListingCard } from '../../components/cards/FoodListingCard';
import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  QrCode,
  AlertTriangle,
  Scale,
  Award,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const LandingPage: React.FC = () => {
  const { listings, missions, hotspots, hubs, impactStats } = useData();
  const { switchDemoRole } = useAuth();
  const { t } = useLanguage();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Environmental Impact Chart Data
  const impactChartData = [
    { city: 'Coimbatore', kg: 5400, meals: 13500 },
    { city: 'Salem', kg: 3100, meals: 7750 },
    { city: 'Erode', kg: 2600, meals: 6500 },
    { city: 'Tiruppur', kg: 2100, meals: 5250 },
    { city: 'Chennai', kg: 1620, meals: 4050 },
  ];

  const categoryShareData = [
    { name: 'Cooked Meals', value: 52, color: '#2E6B3F' },
    { name: 'Bakery & Bread', value: 22, color: '#F28C28' },
    { name: 'Dairy & Milk', value: 14, color: '#5B7E3C' },
    { name: 'Farm Produce', value: 12, color: '#E58B20' },
  ];

  const availableListings = listings.filter((l) => l.safety_status === 'eligible').slice(0, 3);

  const faqs = [
    {
      q: 'How does UnavuLink guarantee that surplus food is safe to eat?',
      a: 'UnavuLink applies a strict automated Food Safety Gate before any food is matched or dispatched. Donors must record preparation time, storage condition (hot holding >=60°C or chilling <=5°C), and allergen declarations. Every batch receives a unique QR-linked Food Safety Passport that traces temperature and dual-OTP handovers.',
    },
    {
      q: 'What is the FairShare Allocation Algorithm?',
      a: 'Unlike traditional apps that blindly send food to the closest organization, UnavuLink balances dietary compatibility, remaining safe window, storage capacity, prior allocations, and unmet community hunger. This guarantees equitable food security across all orphanages, shelters, and community kitchens.',
    },
    {
      q: 'How does the Dual-OTP Handover protect volunteers and recipients?',
      a: 'When a volunteer collects surplus from a hotel or banquet, the donor confirms handover using a 4-digit Pickup OTP. Upon delivery to the NGO, the recipient enters the Delivery OTP, confirming quantity and temperature. This eliminates discrepancies and creates an immutable digital chain of custody.',
    },
    {
      q: 'What happens if an assigned volunteer cancels at the last minute?',
      a: 'Our Rescue Failure Recovery Engine automatically detects cancellations, checks remaining food shelf-life, and re-dispatches the mission to the next available approved volunteer or vehicle in the local zone.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-dark via-forest to-forest-kelly text-white p-8 sm:p-12 lg:p-16 shadow-elevated">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-warmCream border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-warmOrange" />
            <span>AI-Powered Food Rescue & Redistribution Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Every Meal Deserves a <span className="text-warmOrange">Destination.</span>
          </h1>

          <p className="text-sm sm:text-base text-warmCream/90 leading-relaxed font-normal max-w-2xl">
            UnavuLink connects surplus food with communities that need it through intelligent matching, safer handling, verified delivery, and self-recovering rescue operations across Tamil Nadu.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/donor/donate"
              className="bg-warmOrange hover:bg-warmOrange-dark text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2"
            >
              Donate Food <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/explore-food"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-xl font-bold text-sm transition"
            >
              Find Available Food
            </Link>

            <Link
              to="/community/volunteer-register"
              className="text-warmCream hover:text-white underline text-xs font-semibold px-2 py-3"
            >
              Become a Volunteer →
            </Link>
          </div>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-warmCream">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {impactStats.total_kg_rescued.toLocaleString()} kg
              </span>
              <span className="block text-xs opacity-80">Food Rescued</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-warmOrange">
                {impactStats.total_meals_served.toLocaleString()}
              </span>
              <span className="block text-xs opacity-80">Meals Served</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {impactStats.active_missions}
              </span>
              <span className="block text-xs opacity-80">Active Missions</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-green-300">
                {impactStats.total_co2_kg_saved.toLocaleString()} kg
              </span>
              <span className="block text-xs opacity-80">CO₂ Prevented</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE TAMIL NADU RESCUE MAP PREVIEW */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-forest uppercase tracking-wider">
              Real-World Geospatial Intelligence
            </span>
            <h2 className="text-2xl font-extrabold text-deepCharcoal mt-0.5">
              Live Tamil Nadu Food Rescue Grid
            </h2>
            <p className="text-xs text-mutedGrey">
              Coimbatore, Salem, Erode, Tiruppur, Chennai, Madurai and regional humanitarian hubs
            </p>
          </div>

          <Link
            to="/community-map"
            className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
          >
            Open Full Screen Interactive Map <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <TamilNaduMap
          listings={listings}
          missions={missions}
          hotspots={hotspots}
          hubs={hubs}
          height="480px"
        />
      </section>

      {/* 3. HOW UNAVULINK WORKS (4-STEP REVOLUTIONARY PIPELINE) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-forest uppercase tracking-wider">
            Predictive • Fair • Self-Recovering
          </span>
          <h2 className="text-2xl font-extrabold text-deepCharcoal">
            The 4-Step Food Rescue Lifecycle
          </h2>
          <p className="text-xs text-mutedGrey">
            From banquet surplus to verified nutritious meal on a child's plate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle space-y-2 relative">
            <span className="text-3xl font-extrabold text-forest/20 absolute top-4 right-4">01</span>
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-deepCharcoal">1. AI Vision & Safety Gate</h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Donors upload food photos; Gemini extracts draft portions. The Safety Gate checks temperature, hygiene, and handling deadlines.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle space-y-2 relative">
            <span className="text-3xl font-extrabold text-forest/20 absolute top-4 right-4">02</span>
            <div className="w-10 h-10 rounded-xl bg-warmOrange/10 flex items-center justify-center text-warmOrange">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-deepCharcoal">2. QR Safety Passport</h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              A tamper-proof QR code is minted for each batch, encoding storage condition, allergens, and an immutable audit timeline.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle space-y-2 relative">
            <span className="text-3xl font-extrabold text-forest/20 absolute top-4 right-4">03</span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-deepCharcoal">3. FairShare Allocation</h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Food is allocated based on dietary preferences, capacity headroom, and prior allocation equity—not just physical proximity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle space-y-2 relative">
            <span className="text-3xl font-extrabold text-forest/20 absolute top-4 right-4">04</span>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-statusGreen">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-deepCharcoal">4. Dual-OTP Handover</h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Volunteers verify collection with Donor Pickup OTP and delivery with NGO Delivery OTP, updating verified meals served.
            </p>
          </div>
        </div>
      </section>

      {/* 4. RECENT ELIGIBLE FOOD SURPLUS READY FOR RESCUE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-forest uppercase tracking-wider">
              Immediate Rescue Pipeline
            </span>
            <h2 className="text-2xl font-extrabold text-deepCharcoal">
              Available Surplus Ready for Delivery
            </h2>
          </div>

          <Link
            to="/explore-food"
            className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
          >
            View All ({listings.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableListings.map((listing) => (
            <FoodListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* 5. IMPACT & ENVIRONMENTAL ANALYTICS (RECHARTS) */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-softSage shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-softSage">
          <div>
            <span className="text-xs font-bold text-forest uppercase tracking-wider">
              Transparent Social Impact
            </span>
            <h3 className="text-xl font-extrabold text-deepCharcoal">
              Verified Food Rescued Across Tamil Nadu Districts
            </h3>
          </div>
          <span className="text-xs font-mono bg-warmCream px-3 py-1 rounded-full text-mutedGrey border border-softSage">
            Updated Realtime • 2026 Audit Trail
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Bar Chart: Rescued kg by City */}
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="city" stroke="#68736C" fontSize={11} />
                <YAxis stroke="#68736C" fontSize={11} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value} ${name === 'kg' ? 'kg Rescued' : 'Meals Served'}`,
                    name === 'kg' ? 'Food Rescued' : 'Meals',
                  ]}
                />
                <Bar dataKey="kg" fill="#2E6B3F" radius={[6, 6, 0, 0]} name="kg" />
                <Bar dataKey="meals" fill="#F28C28" radius={[6, 6, 0, 0]} name="meals" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Surplus Category Breakdown */}
          <div className="h-64 w-full flex flex-col items-center justify-center bg-warmCream/40 rounded-2xl p-4 border border-softSage">
            <span className="text-xs font-bold text-deepCharcoal mb-2">
              Rescued Surplus by Category
            </span>
            <ResponsiveContainer width="100%" height="75%">
              <PieChart>
                <Pie
                  data={categoryShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 text-[10px] text-mutedGrey mt-1">
              {categoryShareData.map((c) => (
                <span key={c.name} className="flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name} ({c.value}%)
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. THREE STANDOUT INNOVATION HIGHLIGHTS */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-forest uppercase tracking-wider">
            Signature Architectural Innovations
          </span>
          <h2 className="text-2xl font-extrabold text-deepCharcoal">
            Engineered for Real-World Resilience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-deepCharcoal">
              Demo A: Rescue Failure Recovery
            </h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              When a volunteer breaks down or an NGO cancels, our system recalculates remaining shelf-life and automatically reassigns the mission without food spoiling.
            </p>
            <Link
              to="/donor/rescue-tracking"
              className="text-xs font-bold text-forest hover:underline flex items-center gap-1 pt-1"
            >
              Inspect Recovery Engine →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cherryRed/30 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cherryRed/10 flex items-center justify-center text-cherryRed">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-deepCharcoal">
              Demo B: Food Safety Incident Freeze
            </h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Instant one-click safety alert freezes affected batches across all dashboards, blocks pickup OTPs, and halts distribution to protect beneficiaries.
            </p>
            <Link
              to="/admin/safety-incidents"
              className="text-xs font-bold text-cherryRed hover:underline flex items-center gap-1 pt-1"
            >
              View Recall Protocol →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-warmOrange/10 flex items-center justify-center text-warmOrange">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-deepCharcoal">
              Demo C: Food Rescue Digital Twin
            </h4>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Simulate high-volume wedding cancellations, refrigerator breakdowns, or traffic route blocks to observe automated contingency recommendations.
            </p>
            <Link
              to="/admin/digital-twin"
              className="text-xs font-bold text-warmOrange hover:underline flex items-center gap-1 pt-1"
            >
              Launch Digital Twin →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-softSage shadow-subtle space-y-4">
        <h3 className="text-xl font-extrabold text-deepCharcoal mb-2">
          Frequently Asked Questions
        </h3>

        <div className="divide-y divide-softSage">
          {faqs.map((faq, index) => (
            <div key={index} className="py-3">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left font-bold text-sm text-deepCharcoal flex items-center justify-between py-1 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  className={`w-4 h-4 text-forest transition-transform ${
                    activeFaq === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeFaq === index && (
                <p className="text-xs text-mutedGrey mt-2 leading-relaxed bg-warmCream/40 p-3 rounded-xl border border-softSage">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
