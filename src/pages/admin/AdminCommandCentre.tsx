import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { TamilNaduMap } from '../../components/maps/TamilNaduMap';
import { VolunteerRecoveryModal } from '../../components/modals/VolunteerRecoveryModal';
import { SafetyIncidentModal } from '../../components/modals/SafetyIncidentModal';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  UtensilsCrossed,
  Truck,
  AlertTriangle,
  Flame,
  Radio,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const AdminCommandCentre: React.FC = () => {
  const { listings, missions, hotspots, hubs, incidents, emergencyModeActive, toggleEmergencyMode } =
    useData();

  const [selectedMissionForRecovery, setSelectedMissionForRecovery] = useState<string | null>(null);
  const [showIncidentModal, setShowIncidentModal] = useState<boolean>(false);

  const activeMissions = missions.filter(
    (m) => m.mission_status === 'in_transit' || m.mission_status === 'assigned'
  );

  return (
    <div className="space-y-6">
      {/* Recovery Modal */}
      {selectedMissionForRecovery && (
        <VolunteerRecoveryModal
          missionId={selectedMissionForRecovery}
          onClose={() => setSelectedMissionForRecovery(null)}
        />
      )}

      {/* Safety Incident Modal */}
      {showIncidentModal && (
        <SafetyIncidentModal onClose={() => setShowIncidentModal(false)} />
      )}

      {/* Top Header & Emergency Mode Action */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-statusGreen animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Central Command Active
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            Tamil Nadu Humanitarian Logistics Command
          </h2>
          <p className="text-xs text-mutedGrey">
            Realtime oversight across Donors, NGOs, Active Volunteers & Safety Gates
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowIncidentModal(true)}
            className="bg-cherryRed/10 hover:bg-cherryRed/20 text-cherryRed border border-cherryRed/30 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            Report Safety Concern (Freeze)
          </button>

          <button
            onClick={() => toggleEmergencyMode(!emergencyModeActive)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 ${
              emergencyModeActive
                ? 'bg-cherryRed text-white animate-pulse'
                : 'bg-warmCream hover:bg-softSage text-deepCharcoal border border-softSage'
            }`}
          >
            <Flame className="w-4 h-4 text-warmOrange" />
            {emergencyModeActive ? 'Deactivate Emergency Mode' : 'Activate Emergency Mode'}
          </button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Verified Donors</span>
          <span className="text-2xl font-extrabold text-deepCharcoal mt-0.5 block">10</span>
          <span className="text-[10px] text-forest font-medium flex items-center gap-0.5 mt-1">
            <ShieldCheck className="w-3 h-3" /> FSSAI Verified
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Partner NGOs</span>
          <span className="text-2xl font-extrabold text-deepCharcoal mt-0.5 block">6</span>
          <span className="text-[10px] text-blue-600 font-medium flex items-center gap-0.5 mt-1">
            <Building2 className="w-3 h-3" /> 820 Daily Portions
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Active Volunteers</span>
          <span className="text-2xl font-extrabold text-forest mt-0.5 block">4</span>
          <span className="text-[10px] text-mutedGrey block mt-1">Bikes, Autos & Vans</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Available Surplus</span>
          <span className="text-2xl font-extrabold text-warmOrange mt-0.5 block">
            {listings.filter((l) => l.safety_status === 'eligible').length}
          </span>
          <span className="text-[10px] text-forest block mt-1">Safety Gate Cleared</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-softSage shadow-subtle">
          <span className="text-[11px] font-semibold text-mutedGrey block">Active Missions</span>
          <span className="text-2xl font-extrabold text-forest mt-0.5 block">
            {activeMissions.length}
          </span>
          <span className="text-[10px] text-forest block mt-1">Dual-OTP En Route</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cherryRed/30 shadow-subtle bg-red-50/20">
          <span className="text-[11px] font-semibold text-cherryRed block">Safety Incidents</span>
          <span className="text-2xl font-extrabold text-cherryRed mt-0.5 block">
            {incidents.filter((i) => i.is_frozen).length}
          </span>
          <span className="text-[10px] text-cherryRed font-bold block mt-1">Batches Frozen</span>
        </div>
      </div>

      {/* Main Interactive Map & Standout Demo Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-wider text-mutedGrey flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-forest" /> Live Tamil Nadu Rescue Mission Operations
            </h3>
            <span className="text-xs text-mutedGrey">OSRM / OpenStreetMap Realtime</span>
          </div>

          <TamilNaduMap
            listings={listings}
            missions={missions}
            hotspots={hotspots}
            hubs={hubs}
            height="420px"
          />
        </div>

        {/* Right Rail: Three Standout Demonstrations Box */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-forest-dark to-forest text-white p-5 rounded-2xl shadow-elevated space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-warmOrange bg-white/10 px-2 py-0.5 rounded">
              Hackathon Evaluation Fast-Track
            </span>
            <h4 className="font-extrabold text-base">Three Standout Demonstrations</h4>
            <p className="text-xs text-warmCream/90 leading-relaxed">
              Trigger autonomous failure recovery, safety recall lockdown, and Digital Twin simulations in one click.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => setSelectedMissionForRecovery(missions[0]?.id || '')}
                className="w-full bg-white hover:bg-warmCream text-deepCharcoal font-bold text-xs p-2.5 rounded-xl transition text-left flex items-center justify-between shadow-sm"
              >
                <span>Demo A: Volunteer Breakdown Recovery</span>
                <ArrowRight className="w-3.5 h-3.5 text-forest" />
              </button>

              <button
                onClick={() => setShowIncidentModal(true)}
                className="w-full bg-cherryRed/90 hover:bg-cherryRed text-white font-bold text-xs p-2.5 rounded-xl transition text-left flex items-center justify-between shadow-sm"
              >
                <span>Demo B: Trigger Food Safety Freeze</span>
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
              </button>

              <Link
                to="/admin/digital-twin"
                className="w-full bg-warmOrange hover:bg-warmOrange-dark text-white font-bold text-xs p-2.5 rounded-xl transition text-left flex items-center justify-between shadow-sm block"
              >
                <span>Demo C: Launch Digital Twin Simulation</span>
                <Cpu className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Safety Incidents List */}
          <div className="bg-white p-4 rounded-2xl border border-softSage shadow-subtle space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-cherryRed" /> Active Safety Incident Holds
            </h5>

            {incidents.length === 0 ? (
              <p className="text-xs text-mutedGrey py-2">No active safety holds.</p>
            ) : (
              incidents.slice(0, 2).map((inc) => (
                <div key={inc.id} className="p-2.5 bg-red-50/60 rounded-xl border border-cherryRed/20 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-cherryRed font-mono">{inc.incident_code}</strong>
                    <span className="text-[10px] uppercase font-bold text-cherryRed bg-red-100 px-1.5 py-0.5 rounded">
                      FROZEN
                    </span>
                  </div>
                  <p className="text-deepCharcoal text-[11px] font-semibold">{inc.batch_id}</p>
                  <p className="text-mutedGrey text-[11px] line-clamp-2 mt-0.5">{inc.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Active Rescue Operations Table */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-forest" /> Active Rescue Operations & Dual-OTP Chain of Custody
          </h3>
          <span className="text-xs text-mutedGrey font-medium">{missions.length} Missions Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmCream/60 border-y border-softSage text-mutedGrey font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Mission Code</th>
                <th className="py-2.5 px-3">Batch ID</th>
                <th className="py-2.5 px-3">Donor Origin</th>
                <th className="py-2.5 px-3">Recipient NGO</th>
                <th className="py-2.5 px-3">Assigned Volunteer</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Dual OTPs</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-softSage/60">
              {missions.map((m) => (
                <tr key={m.id} className="hover:bg-warmCream/30 transition">
                  <td className="py-3 px-3 font-mono font-bold text-deepCharcoal">{m.mission_code}</td>
                  <td className="py-3 px-3 font-mono text-mutedGrey">
                    <Link to={`/passport/${m.batch_id}`} className="text-forest hover:underline">
                      {m.batch_id}
                    </Link>
                  </td>
                  <td className="py-3 px-3 font-medium text-deepCharcoal">{m.donor_name}</td>
                  <td className="py-3 px-3 font-medium text-deepCharcoal">{m.recipient_name}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-deepCharcoal">{m.volunteer_name || 'Unassigned'}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        m.mission_status === 'delivered'
                          ? 'bg-statusGreen/15 text-statusGreen'
                          : m.mission_status === 'in_transit'
                          ? 'bg-warmOrange/15 text-warmOrange-dark'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {m.mission_status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px]">
                    <span className="text-warmOrange">P: {m.pickup_otp}</span> |{' '}
                    <span className="text-forest">D: {m.delivery_otp}</span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedMissionForRecovery(m.id)}
                      className="text-xs text-warmOrange hover:underline font-bold"
                    >
                      Simulate Failure
                    </button>
                    <Link
                      to={`/passport/${m.batch_id}`}
                      className="text-xs text-forest hover:underline font-bold"
                    >
                      Passport
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
