import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { FoodListingCard } from '../../components/cards/FoodListingCard';
import { DualOtpModal } from '../../components/modals/DualOtpModal';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Truck, CheckCircle2, History, ShieldCheck, Inbox } from 'lucide-react';
import { FoodListing, RescueMission } from '../../types';

export const AcceptorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { listings, missions, requestFood } = useData();

  const [selectedMissionForReceipt, setSelectedMissionForReceipt] = useState<RescueMission | null>(null);
  const [selectedListingForRequest, setSelectedListingForRequest] = useState<FoodListing | null>(null);
  const [quantity, setQuantity] = useState<number>(20);

  const eligibleListings = listings.filter((l) => l.safety_status === 'eligible');
  const incomingDeliveries = missions.filter((m) => m.mission_status !== 'delivered');
  const completedHistory = missions.filter((m) => m.mission_status === 'delivered');

  const handleRequestSubmit = (listing: FoodListing) => {
    requestFood(
      listing.id,
      quantity,
      user?.id || 'c0000000-0000-0000-0000-000000000001',
      user?.full_name || 'Grace Old Age Home Caretaker'
    );
    setSelectedListingForRequest(null);
    alert(`Request submitted for ${quantity} portions. The food donor has been notified.`);
  };

  return (
    <div className="space-y-6">
      {/* Handover OTP Modal */}
      {selectedMissionForReceipt && (
        <DualOtpModal
          mission={selectedMissionForReceipt}
          stage="delivery"
          onClose={() => setSelectedMissionForReceipt(null)}
        />
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/20">
              Approved Acceptor Organisation
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            {user?.full_name || 'Grace Old Age Home Caretaker'}
          </h2>
          <p className="text-xs text-mutedGrey">
            Surplus Food Allocation Requests, Incoming Deliveries & Dual-OTP Receipt Verification
          </p>
        </div>

        <Link
          to="/explore-food"
          className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <UtensilsCrossed className="w-4 h-4" />
          Browse Surplus Food
        </Link>
      </div>

      {/* Incoming Deliveries (Requires Dual-OTP) */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-forest" /> Incoming Deliveries to Your Location
          </h3>
          <span className="text-xs text-mutedGrey">Provide Delivery OTP upon safe receipt</span>
        </div>

        {incomingDeliveries.length === 0 ? (
          <p className="text-xs text-mutedGrey py-4 text-center">No incoming deliveries right now.</p>
        ) : (
          <div className="space-y-3">
            {incomingDeliveries.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-warmCream/40 rounded-xl border border-softSage flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold font-mono text-deepCharcoal">{m.mission_code}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-warmOrange/20 text-warmOrange-dark uppercase">
                      {m.mission_status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="font-semibold text-deepCharcoal">{m.food_name}</p>
                  <p className="text-mutedGrey text-[11px]">
                    Donor: <strong>{m.donor_name}</strong> • Volunteer:{' '}
                    <strong>{m.volunteer_name || 'En Route'}</strong>
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="bg-white p-2.5 rounded-xl border border-softSage text-right">
                    <span className="text-[10px] text-mutedGrey block font-semibold">
                      Your Delivery OTP
                    </span>
                    <strong className="text-lg font-mono text-forest tracking-wider block">
                      {m.delivery_otp}
                    </strong>
                  </div>

                  <button
                    onClick={() => setSelectedMissionForReceipt(m)}
                    className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Delivery (Dual OTP)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Food to Request */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
          <UtensilsCrossed className="w-4 h-4 text-forest" /> Available Food Eligible for Acceptance
        </h3>

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

      {/* Request Modal */}
      {selectedListingForRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepCharcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-modal border border-softSage space-y-4">
            <h3 className="font-extrabold text-base text-deepCharcoal">
              Request Food for Residents
            </h3>
            <p className="text-xs text-mutedGrey">
              Batch: <strong>{selectedListingForRequest.food_name}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1">
                Requested Quantity ({selectedListingForRequest.unit})
              </label>
              <input
                type="number"
                min="1"
                max={selectedListingForRequest.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-sm font-bold text-deepCharcoal"
              />
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
                onClick={() => handleRequestSubmit(selectedListingForRequest)}
                className="bg-forest text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-forest-dark transition"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
