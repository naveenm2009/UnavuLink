import React from 'react';
import { useData } from '../../contexts/DataContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  UtensilsCrossed,
  Droplets,
  CloudRain,
} from 'lucide-react';

export const LiveImpactPage: React.FC = () => {
  const { impactStats } = useData();

  const cityImpactData = [
    { city: 'Coimbatore', kg: 5400, meals: 13500, co2: 11340 },
    { city: 'Salem', kg: 3100, meals: 7750, co2: 6510 },
    { city: 'Erode', kg: 2600, meals: 6500, co2: 5460 },
    { city: 'Tiruppur', kg: 2100, meals: 5250, co2: 4410 },
    { city: 'Chennai', kg: 1620, meals: 4050, co2: 3402 },
  ];

  const monthlyGrowth = [
    { month: 'Jun', meals: 1800 },
    { month: 'Jul', meals: 2900 },
    { month: 'Aug', meals: 4500 },
    { month: 'Sep', meals: 7200 },
    { month: 'Oct', meals: 11500 },
    { month: 'Nov', meals: 14820 },
  ];

  const categoryShare = [
    { name: 'Cooked Meals', value: 52, color: '#2E6B3F' },
    { name: 'Bakery & Bread', value: 22, color: '#F28C28' },
    { name: 'Dairy & Milk', value: 14, color: '#5B7E3C' },
    { name: 'Farm Produce', value: 12, color: '#E58B20' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest bg-forest/10 px-3 py-1 rounded-full border border-forest/20">
            Immutable 2026 Audit Trail
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-deepCharcoal mt-2">
            Verified Social & Environmental Impact
          </h2>
          <p className="text-xs text-mutedGrey mt-1 max-w-xl">
            Realtime metrics calculated strictly from verified dual-OTP delivery and distribution handovers across Tamil Nadu.
          </p>
        </div>

        <div className="bg-warmCream/60 p-4 rounded-2xl border border-softSage text-right shrink-0">
          <span className="text-[11px] text-mutedGrey block uppercase font-bold">
            Total Rescue Operations
          </span>
          <strong className="text-2xl font-extrabold text-forest">
            {impactStats.total_meals_served.toLocaleString()}
          </strong>
          <span className="text-[10px] text-mutedGrey block">Nutritious Meals Served</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle">
          <span className="text-xs text-mutedGrey block font-medium">Food Rescued</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-deepCharcoal mt-1 block">
            {impactStats.total_kg_rescued.toLocaleString()} kg
          </span>
          <span className="text-[10px] text-forest font-semibold block mt-1">
            Zero-Waste Diversion
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle">
          <span className="text-xs text-mutedGrey block font-medium">Verified Meals</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-warmOrange mt-1 block">
            {impactStats.total_meals_served.toLocaleString()}
          </span>
          <span className="text-[10px] text-mutedGrey block mt-1">
            Confirmed via Dual OTP
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle">
          <span className="text-xs text-mutedGrey block font-medium">CO₂ Prevented</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-forest mt-1 block">
            {impactStats.total_co2_kg_saved.toLocaleString()} kg
          </span>
          <span className="text-[10px] text-statusGreen block mt-1">
            Landfill Methane Avoided
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle">
          <span className="text-xs text-mutedGrey block font-medium">Water Conserved</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 block">
            185,000 L
          </span>
          <span className="text-[10px] text-mutedGrey block mt-1">
            Embedded Agricultural Water
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: City Rescue Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
          <h4 className="font-bold text-sm text-deepCharcoal">
            Food Rescued by Tamil Nadu Urban Centres (kg)
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="city" stroke="#68736C" fontSize={11} />
                <YAxis stroke="#68736C" fontSize={11} />
                <Tooltip />
                <Bar dataKey="kg" fill="#2E6B3F" radius={[6, 6, 0, 0]} name="kg Rescued" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cumulative Rescued Meals Growth */}
        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
          <h4 className="font-bold text-sm text-deepCharcoal">
            Cumulative Rescued Meals Growth Trend
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" stroke="#68736C" fontSize={11} />
                <YAxis stroke="#68736C" fontSize={11} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="meals"
                  stroke="#F28C28"
                  strokeWidth={3}
                  name="Meals Distributed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
