import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { AlertTriangle, RefreshCw, CheckCircle2, Truck, UserCheck, ShieldAlert, ArrowRight } from 'lucide-react';

interface VolunteerRecoveryModalProps {
  missionId: string;
  onClose: () => void;
}

export const VolunteerRecoveryModal: React.FC<VolunteerRecoveryModalProps> = ({
  missionId,
  onClose,
}) => {
  const { missions, triggerVolunteerRecovery } = useData();
  const [isExecuting, setIsExecuting] = useState(false);
  const [recoveryResult, setRecoveryResult] = useState<{
    originalVolunteer: string;
    newVolunteer: string;
    newEta: number;
  } | null>(null);

  const mission = missions.find((m) => m.id === missionId) || missions[0];

  const handleSimulateFailure = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = triggerVolunteerRecovery(mission.id);
      setRecoveryResult(res);
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepCharcoal/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-modal border border-softSage relative">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-warmOrange/10 flex items-center justify-center text-warmOrange">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-deepCharcoal">
              Demo A — Rescue Failure Recovery Engine
            </h3>
            <p className="text-xs text-mutedGrey">
              Autonomous self-recovery when volunteer cancels or breaks down
            </p>
          </div>
        </div>

        {/* Failure Context */}
        <div className="bg-warmCream/60 p-4 rounded-xl border border-softSage text-xs space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-mutedGrey">Target Mission:</span>
            <strong className="font-mono text-deepCharcoal">{mission?.mission_code}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mutedGrey">Assigned Volunteer:</span>
            <strong className="text-deepCharcoal">{mission?.volunteer_name || 'Karthik Subramanian'}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mutedGrey">Batch & Quantity:</span>
            <span className="text-forest font-semibold">{mission?.food_name} ({mission?.quantity} {mission?.unit})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mutedGrey">Pickup Location:</span>
            <span className="text-deepCharcoal truncate max-w-[200px]">{mission?.pickup_address}</span>
          </div>
        </div>

        {!recoveryResult ? (
          <div>
            <div className="p-3 bg-red-50 border border-cherryRed/30 rounded-xl mb-4 text-xs text-cherryRed flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Simulated Trigger:</strong> Assigned volunteer reports a flat tyre / breakdown on Avinashi Road. Meal is time-sensitive with 90 minutes remaining before quality degradation.
              </span>
            </div>

            <button
              onClick={handleSimulateFailure}
              disabled={isExecuting}
              className="w-full bg-cherryRed hover:bg-cherryRed-dark text-white font-bold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running FairShare Reassignment Engine...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Trigger Cancellation & Execute Auto-Recovery
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-statusGreen/10 border border-statusGreen/30 rounded-xl text-xs text-deepCharcoal space-y-2">
              <div className="flex items-center space-x-2 text-statusGreen font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Autonomous Reassignment Successful!</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-statusGreen/20">
                <div>
                  <span className="text-mutedGrey block text-[11px]">Previous Volunteer</span>
                  <span className="line-through text-mutedGrey">{recoveryResult.originalVolunteer}</span>
                </div>
                <div>
                  <span className="text-mutedGrey block text-[11px]">Replacement Volunteer</span>
                  <strong className="text-forest">{recoveryResult.newVolunteer}</strong>
                </div>
              </div>

              <p className="text-[11px] text-mutedGrey pt-1">
                New volunteer was dispatched based on van transport mode and proximity (1.8km away). New pickup ETA: <strong>{recoveryResult.newEta} minutes</strong>. Food Safety Passport immutable history updated.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-forest text-white font-bold text-xs py-2.5 rounded-xl hover:bg-forest-dark transition"
            >
              Close & View Live Mission
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-xs text-mutedGrey hover:text-deepCharcoal font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
