import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { FoodListingCard } from '../../components/cards/FoodListingCard';
import { predictEventSurplus } from '../../services/geminiService';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  UtensilsCrossed,
  Award,
  Clock,
  Truck,
  Sparkles,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Inbox,
  ArrowRight,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { listings, missions, passports } = useData();

  // Predictive Surplus Widget State (Feature 10)
  const [eventType, setEventType] = useState('Marriage Reception Feast');
  const [guestCount, setGuestCount] = useState(400);
  const [prediction, setPrediction] = useState(() =>
    predictEventSurplus('Marriage Reception Feast', 400, 'cooked_meals')
  );

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setPrediction(predictEventSurplus(eventType, guestCount, 'cooked_meals'));
  };

  const donorListings = listings.filter((l) => l.donor_id === user?.id || listings.slice(0, 4));
  const activeDonorMissions = missions.filter((m) => m.mission_status !== 'delivered');

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Action */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/20">
              Verified Commercial Kitchen • Coimbatore
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            {user?.full_name || 'Anand Grand Banquet & Caterers'}
          </h2>
          <p className="text-xs text-mutedGrey">
            Surplus Food Registration, QR Traceability Passports & Safe Handover Management
          </p>
        </div>

        <Link
          to="/donor/donate"
          className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Donate Food Surplus
        </Link>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Total Food Rescued</span>
          <span className="text-2xl font-extrabold text-deepCharcoal mt-0.5 block">1,840 kg</span>
          <span className="text-[10px] text-forest font-medium flex items-center gap-0.5 mt-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Zero Landfill
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Verified Meals Served</span>
          <span className="text-2xl font-extrabold text-warmOrange mt-0.5 block">4,600</span>
          <span className="text-[10px] text-mutedGrey block mt-1">Distributed to 8 Shelters</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Rescue Credits Earned</span>
          <span className="text-2xl font-extrabold text-forest mt-0.5 block">920 PTS</span>
          <span className="text-[10px] text-forest font-bold block mt-1">Tier: Champion Donor</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Active Batches</span>
          <span className="text-2xl font-extrabold text-deepCharcoal mt-0.5 block">
            {donorListings.length}
          </span>
          <span className="text-[10px] text-mutedGrey block mt-1">QR Passports Live</span>
        </div>
      </div>

      {/* Feature 10: AI Food Waste Intelligence & Predictive Surplus Calculator */}
      <div className="bg-gradient-to-r from-warmCream via-white to-forest/5 p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-warmOrange" />
          <div>
            <h3 className="font-extrabold text-sm text-deepCharcoal">
              Feature 10: Predictive Surplus Estimator (AI Waste Intelligence)
            </h3>
            <p className="text-xs text-mutedGrey">
              Forecast expected surplus prior to large receptions to pre-book volunteers
            </p>
          </div>
        </div>

        <form onSubmit={handlePredict} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-deepCharcoal mb-1">
              Event / Meal Occasion
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full bg-white border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium"
            >
              <option value="Marriage Reception Feast">Marriage Reception Feast (Kalyanam)</option>
              <option value="Corporate Buffet Luncheon">Corporate Buffet Luncheon</option>
              <option value="College Hostel Mess Surplus">College Hostel Mess Surplus</option>
              <option value="Community Festival Spread">Community Festival Spread</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-deepCharcoal mb-1">
              Expected Attendance
            </label>
            <input
              type="number"
              min="50"
              step="25"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full bg-white border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-warmOrange hover:bg-warmOrange-dark text-white font-bold text-xs py-2.5 rounded-xl transition shadow-sm"
            >
              Recalculate Surplus Forecast
            </button>
          </div>
        </form>

        {prediction && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-3 rounded-xl border border-softSage text-xs">
              <span className="text-mutedGrey block text-[11px]">Estimated Surplus</span>
              <strong className="text-forest text-sm font-extrabold">
                {prediction.predictedSurplusKgRange[0]} - {prediction.predictedSurplusKgRange[1]} kg
              </strong>
              <span className="text-[10px] text-mutedGrey block">
                (~{prediction.predictedMealsRange[0]} - {prediction.predictedMealsRange[1]} meals)
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-softSage text-xs">
              <span className="text-mutedGrey block text-[11px]">Ideal Rescue Window</span>
              <strong className="text-deepCharcoal text-xs">
                {prediction.recommendedRescueWindow}
              </strong>
            </div>

            <div className="bg-white p-3 rounded-xl border border-softSage text-xs">
              <span className="text-mutedGrey block text-[11px]">Waste Prevention Advice</span>
              <p className="text-[11px] text-deepCharcoal line-clamp-2">
                {prediction.wastePreventionTips[0]}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Active Food Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
            <UtensilsCrossed className="w-4 h-4 text-forest" /> Current Registered Food Batches
          </h3>
          <Link to="/donor/listings" className="text-xs font-bold text-forest hover:underline">
            Manage Listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donorListings.map((listing) => (
            <FoodListingCard key={listing.id} listing={listing} showActions={false} />
          ))}
        </div>
      </div>

      {/* Active Rescue Operations with Handover OTPs */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-forest" /> Live Rescue Handover Tracking
          </h3>
          <span className="text-xs text-mutedGrey">Provide Pickup OTP to Volunteer Upon Handover</span>
        </div>

        <div className="space-y-3">
          {activeDonorMissions.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-warmCream/40 rounded-xl border border-softSage flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-deepCharcoal font-mono">{m.mission_code}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-warmOrange/20 text-warmOrange-dark uppercase">
                    {m.mission_status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="font-semibold text-deepCharcoal">{m.food_name}</p>
                <p className="text-mutedGrey text-[11px]">
                  Assigned Volunteer: <strong>{m.volunteer_name || 'En Route'}</strong> • Destination:{' '}
                  <strong>{m.recipient_name}</strong>
                </p>
              </div>

              {/* Crucial Handover OTP Box */}
              <div className="bg-white p-3 rounded-xl border border-softSage flex items-center space-x-4 shrink-0 shadow-sm">
                <div>
                  <span className="text-[10px] text-mutedGrey block font-semibold uppercase">
                    Your Pickup OTP
                  </span>
                  <strong className="text-xl font-mono text-forest tracking-widest block">
                    {m.pickup_otp}
                  </strong>
                </div>
                <Link
                  to={`/passport/${m.batch_id}`}
                  className="bg-forest text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-forest-dark transition"
                >
                  View Passport
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
