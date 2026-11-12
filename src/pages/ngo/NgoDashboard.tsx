import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { FoodListingCard } from '../../components/cards/FoodListingCard';
import { DualOtpModal } from '../../components/modals/DualOtpModal';
import { FairShareMatchingPanel } from '../../features/matching/FairShareMatchingPanel';
import { Link } from 'react-router-dom';
import {
  Building2,
  HeartHandshake,
  UtensilsCrossed,
  Truck,
  CheckCircle2,
  Scale,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import { FoodListing, RescueMission } from '../../types';

export const NgoDashboard: React.FC = () => {
  const { user } = useAuth();
  const { listings, missions, requestFood } = useData();

  const [selectedListingForRequest, setSelectedListingForRequest] = useState<FoodListing | null>(null);
  const [selectedMissionForDelivery, setSelectedMissionForDelivery] = useState<RescueMission | null>(null);
  const [requestQuantity, setRequestQuantity] = useState<number>(30);

  // Beneficiaries summary for Annai Teresa Karunai Illam
  const beneficiariesStats = {
    totalBeneficiaries: 180,
    shelterLocations: 3,
    dailyRequirementKg: 120,
    currentReceivingCapacityKg: 250,
  };

  const incomingMissions = missions.filter(
    (m) => m.mission_status === 'in_transit' || m.mission_status === 'assigned'
  );

  const eligibleListings = listings.filter((l) => l.safety_status === 'eligible');

  const handleConfirmRequest = (listing: FoodListing) => {
    requestFood(
      listing.id,
      requestQuantity,
      user?.id || 'n0000000-0000-0000-0000-000000000001',
      user?.full_name || 'Annai Teresa Karunai Illam'
    );
    setSelectedListingForRequest(null);
    alert(`Request submitted for ${requestQuantity} ${listing.unit}. Waiting for donor approval.`);
  };

  return (
    <div className="space-y-6">
      {/* Dual OTP Delivery Handover Modal */}
      {selectedMissionForDelivery && (
        <DualOtpModal
          mission={selectedMissionForDelivery}
          stage="delivery"
          onClose={() => setSelectedMissionForDelivery(null)}
        />
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
              Verified NGO Partner • Coimbatore
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            {user?.full_name || 'Annai Teresa Karunai Illam'}
          </h2>
          <p className="text-xs text-mutedGrey">
            Shelter & Orphanage Operations • Receiving Capacity & Verified Meal Distribution
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/ngo/beneficiaries"
            className="bg-warmCream hover:bg-softSage text-deepCharcoal font-bold text-xs px-4 py-2.5 rounded-xl border border-softSage transition"
          >
            Manage Beneficiaries
          </Link>
          <Link
            to="/ngo/capacity"
            className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition"
          >
            Update Capacity
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Daily Need</span>
          <span className="text-2xl font-extrabold text-deepCharcoal mt-0.5 block">
            {beneficiariesStats.dailyRequirementKg} kg
          </span>
          <span className="text-[10px] text-mutedGrey block mt-1">~300 Cooked Portions</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Receiving Capacity</span>
          <span className="text-2xl font-extrabold text-forest mt-0.5 block">
            {beneficiariesStats.currentReceivingCapacityKg} kg
          </span>
          <span className="text-[10px] text-statusGreen font-medium flex items-center gap-0.5 mt-1">
            <CheckCircle2 className="w-3 h-3" /> Cold Storage Ready
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Shelter Beneficiaries</span>
          <span className="text-2xl font-extrabold text-blue-700 mt-0.5 block">
            {beneficiariesStats.totalBeneficiaries}
          </span>
          <span className="text-[10px] text-mutedGrey block mt-1">Children & Senior Citizens</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Incoming Rescues</span>
          <span className="text-2xl font-extrabold text-warmOrange mt-0.5 block">
            {incomingMissions.length}
          </span>
          <span className="text-[10px] text-warmOrange font-bold block mt-1">En Route Delivery</span>
        </div>
      </div>

      {/* Incoming Rescue Deliveries (Requires Dual-OTP Receipt Confirmation) */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-forest" /> Incoming Deliveries Awaiting Dual-OTP Handover
          </h3>
          <span className="text-xs text-mutedGrey">Enter Delivery OTP upon receipt</span>
        </div>

        {incomingMissions.length === 0 ? (
          <p className="text-xs text-mutedGrey py-4 text-center">No incoming deliveries at this moment.</p>
        ) : (
          <div className="space-y-3">
            {incomingMissions.map((mission) => (
              <div
                key={mission.id}
                className="p-4 bg-warmCream/40 rounded-xl border border-softSage flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold font-mono text-deepCharcoal">{mission.mission_code}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-warmOrange/20 text-warmOrange-dark uppercase">
                      {mission.mission_status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="font-semibold text-deepCharcoal">{mission.food_name}</p>
                  <p className="text-mutedGrey text-[11px]">
                    Donor: <strong>{mission.donor_name}</strong> • Volunteer:{' '}
                    <strong>{mission.volunteer_name || 'En Route'}</strong> • ETA: ~{mission.estimated_duration_mins || 20}m
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="bg-white p-2.5 rounded-xl border border-softSage text-right">
                    <span className="text-[10px] text-mutedGrey block font-semibold">Your Delivery OTP</span>
                    <strong className="text-lg font-mono text-forest tracking-wider block">
                      {mission.delivery_otp}
                    </strong>
                  </div>

                  <button
                    onClick={() => setSelectedMissionForDelivery(mission)}
                    className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Receipt (Dual OTP)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Eligible Food Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-forest" /> Eligible Surplus Food Available in Tamil Nadu
            </h3>
            <p className="text-xs text-mutedGrey">
              Cleared by Food Safety Gate • Ranked by FairShare Algorithm
            </p>
          </div>

          <Link to="/ngo/available-food" className="text-xs font-bold text-forest hover:underline">
            View All ({eligibleListings.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eligibleListings.slice(0, 3).map((listing) => (
            <FoodListingCard
              key={listing.id}
              listing={listing}
              onRequest={() => setSelectedListingForRequest(listing)}
            />
          ))}
        </div>
      </div>

      {/* Request Modal if selected */}
      {selectedListingForRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepCharcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-modal border border-softSage space-y-4">
            <h3 className="font-extrabold text-base text-deepCharcoal">
              Request Food Allocation
            </h3>
            <p className="text-xs text-mutedGrey">
              Request portions of <strong>{selectedListingForRequest.food_name}</strong> for Annai Teresa Karunai Illam beneficiaries.
            </p>

            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1">
                Requested Quantity ({selectedListingForRequest.unit})
              </label>
              <input
                type="number"
                min="1"
                max={selectedListingForRequest.quantity}
                value={requestQuantity}
                onChange={(e) => setRequestQuantity(Number(e.target.value))}
                className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-sm font-bold text-deepCharcoal"
              />
              <span className="text-[11px] text-mutedGrey block mt-1">
                Max available: {selectedListingForRequest.quantity} {selectedListingForRequest.unit}
              </span>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedListingForRequest(null)}
                className="text-xs font-semibold text-mutedGrey hover:text-deepCharcoal px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmRequest(selectedListingForRequest)}
                className="bg-forest text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-forest-dark transition"
              >
                Submit Allocation Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
