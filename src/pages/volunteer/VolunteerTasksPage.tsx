import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { DualOtpModal } from '../../components/modals/DualOtpModal';
import { TamilNaduMap } from '../../components/maps/TamilNaduMap';
import { Link } from 'react-router-dom';
import {
  Truck,
  MapPin,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Award,
  Navigation,
  Clock,
  QrCode,
  AlertTriangle,
} from 'lucide-react';
import { RescueMission } from '../../types';

export const VolunteerTasksPage: React.FC = () => {
  const { user } = useAuth();
  const { missions } = useData();

  const [activeStageModal, setActiveStageModal] = useState<{
    mission: RescueMission;
    stage: 'pickup' | 'delivery';
  } | null>(null);

  // Filter missions assigned to this volunteer (or demo volunteer)
  const myMissions = missions.filter(
    (m) =>
      m.volunteer_id === user?.id ||
      m.volunteer_id === 'v0000000-0000-0000-0000-000000000001' ||
      m.volunteer_name?.includes('Karthik')
  );

  return (
    <div className="space-y-6">
      {/* Handover OTP Modal */}
      {activeStageModal && (
        <DualOtpModal
          mission={activeStageModal.mission}
          stage={activeStageModal.stage}
          onClose={() => setActiveStageModal(null)}
        />
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/20">
              Verified Volunteer Dispatch • Coimbatore Urban
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            {user?.full_name || 'Karthik Subramanian (Volunteer)'}
          </h2>
          <p className="text-xs text-mutedGrey">
            Active Rescue Tasks • Dual-OTP Handover Verification • Live Route Tracking
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-warmCream/60 p-3 rounded-xl border border-softSage">
          <Award className="w-8 h-8 text-warmOrange" />
          <div>
            <span className="text-[11px] text-mutedGrey font-semibold uppercase block">
              Rescue Credits
            </span>
            <strong className="text-xl font-extrabold text-forest block">760 PTS</strong>
          </div>
        </div>
      </div>

      {/* Active Volunteer Rescue Tasks */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-forest" /> Assigned Food Rescue Missions
        </h3>

        {myMissions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-softSage text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-forest mx-auto" />
            <h4 className="font-bold text-base text-deepCharcoal">All current tasks completed!</h4>
            <p className="text-xs text-mutedGrey max-w-sm mx-auto">
              You will receive a notification as soon as a new surplus food batch is allocated in your sector.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myMissions.map((mission) => {
              const isDelivered = mission.mission_status === 'delivered';
              const isInTransit = mission.mission_status === 'in_transit';

              return (
                <div
                  key={mission.id}
                  className="bg-white rounded-2xl border border-softSage p-5 shadow-subtle flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-softSage">
                      <div>
                        <span className="text-xs font-mono font-bold text-mutedGrey">
                          {mission.mission_code}
                        </span>
                        <h4 className="font-bold text-base text-deepCharcoal leading-tight">
                          {mission.food_name}
                        </h4>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                          isDelivered
                            ? 'bg-statusGreen/15 text-statusGreen'
                            : isInTransit
                            ? 'bg-warmOrange/15 text-warmOrange-dark animate-pulse'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {mission.mission_status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    {/* Step-by-Step Pickup and Delivery Coordinates */}
                    <div className="space-y-2 text-xs">
                      {/* Step 1: Pickup */}
                      <div className="bg-warmCream/40 p-3 rounded-xl border border-softSage flex items-start space-x-2.5">
                        <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-forest uppercase block">
                            Step 1: Pickup from Donor
                          </span>
                          <strong className="text-deepCharcoal block">{mission.donor_name}</strong>
                          <p className="text-mutedGrey text-[11px] mt-0.5">{mission.pickup_address}</p>
                          <span className="text-[10px] text-mutedGrey mt-1 block">
                            Pickup Deadline: {new Date(mission.pickup_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Step 2: Delivery */}
                      <div className="bg-warmCream/40 p-3 rounded-xl border border-softSage flex items-start space-x-2.5">
                        <Navigation className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-blue-600 uppercase block">
                            Step 2: Deliver to Recipient NGO
                          </span>
                          <strong className="text-deepCharcoal block">{mission.recipient_name}</strong>
                          <p className="text-mutedGrey text-[11px] mt-0.5">{mission.delivery_address}</p>
                          <span className="text-[10px] text-mutedGrey mt-1 block">
                            Estimated Route: ~{mission.estimated_distance_km} km ({mission.estimated_duration_mins} mins)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Handover Buttons */}
                  <div className="pt-2 border-t border-softSage flex items-center justify-between">
                    <Link
                      to={`/passport/${mission.batch_id}`}
                      className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Passport
                    </Link>

                    <div className="flex items-center space-x-2">
                      {!isInTransit && !isDelivered && (
                        <button
                          onClick={() => setActiveStageModal({ mission, stage: 'pickup' })}
                          className="bg-forest hover:bg-forest-dark text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          Verify Pickup (OTP: {mission.pickup_otp})
                        </button>
                      )}

                      {isInTransit && (
                        <button
                          onClick={() => setActiveStageModal({ mission, stage: 'delivery' })}
                          className="bg-warmOrange hover:bg-warmOrange-dark text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5 animate-pulse"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verify Delivery (OTP: {mission.delivery_otp})
                        </button>
                      )}

                      {isDelivered && (
                        <span className="text-statusGreen font-bold text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Completed & Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Volunteer Live Route Map */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase tracking-wider text-mutedGrey flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-forest" /> Live Navigation & Transit Grid
        </h4>
        <TamilNaduMap missions={myMissions} height="380px" />
      </div>
    </div>
  );
};
