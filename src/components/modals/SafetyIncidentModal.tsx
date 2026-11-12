import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { AlertOctagon, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

interface SafetyIncidentModalProps {
  batchId?: string;
  onClose: () => void;
}

export const SafetyIncidentModal: React.FC<SafetyIncidentModalProps> = ({
  batchId,
  onClose,
}) => {
  const { user } = useAuth();
  const { listings, reportSafetyIncident } = useData();

  const [selectedBatch, setSelectedBatch] = useState<string>(batchId || listings[0]?.batch_id || '');
  const [incidentType, setIncidentType] = useState<any>('temperature_breach');
  const [severity, setSeverity] = useState<any>('critical');
  const [description, setDescription] = useState(
    'Temperature probe measured 33°C (ambient danger zone). Container lid was found loose upon pickup.'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportSafetyIncident(
      selectedBatch,
      incidentType,
      severity,
      description,
      user?.id || 'usr-reporter',
      user?.full_name || 'Safety Inspector'
    );
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepCharcoal/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-modal border border-cherryRed/30 relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-cherryRed/10 flex items-center justify-center text-cherryRed">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-deepCharcoal">
              Demo B — Food Safety Incident & Recall Protocol
            </h3>
            <p className="text-xs text-mutedGrey">
              Immediate batch lockdown, participant alerts & recall audit logging
            </p>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1">
                Affected Food Batch ID *
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full bg-warmCream/50 border border-softSage rounded-xl px-3 py-2 text-xs font-mono font-bold text-deepCharcoal outline-none focus:ring-2 focus:ring-cherryRed"
              >
                {listings.map((l) => (
                  <option key={l.id} value={l.batch_id}>
                    {l.batch_id} — {l.food_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-deepCharcoal mb-1">
                  Incident Type *
                </label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full bg-warmCream/50 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal outline-none focus:ring-2 focus:ring-cherryRed"
                >
                  <option value="temperature_breach">Temperature Breach (Danger Zone)</option>
                  <option value="suspected_spoilage">Suspected Spoilage / Off-odour</option>
                  <option value="allergen_mismatch">Undeclared Allergen Found</option>
                  <option value="packaging_damage">Container Seal Compromised</option>
                  <option value="foreign_object">Foreign Matter Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-deepCharcoal mb-1">
                  Severity Level *
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-warmCream/50 border border-softSage rounded-xl px-3 py-2 text-xs font-bold text-cherryRed outline-none focus:ring-2 focus:ring-cherryRed"
                >
                  <option value="critical">Critical (Immediate Freeze)</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1">
                Inspector / Volunteer Observations *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-warmCream/50 border border-softSage rounded-xl p-3 text-xs text-deepCharcoal outline-none focus:ring-2 focus:ring-cherryRed"
              />
            </div>

            <div className="p-3 bg-red-50 border border-cherryRed/20 rounded-xl text-xs text-cherryRed flex items-start space-x-2">
              <Lock className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>System Action:</strong> Submitting this report will instantly freeze Batch <strong>{selectedBatch}</strong> across all NGO feeds, invalidate pickup/delivery OTPs, and alert the central command coordinator.
              </span>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-mutedGrey hover:text-deepCharcoal px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cherryRed hover:bg-cherryRed-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
              >
                <AlertOctagon className="w-4 h-4" />
                Submit Incident & Freeze Batch
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-cherryRed/30 rounded-xl text-xs text-deepCharcoal space-y-2">
              <div className="flex items-center space-x-2 text-cherryRed font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-cherryRed" />
                <span>Batch {selectedBatch} has been Frozen!</span>
              </div>
              <p className="text-mutedGrey text-xs">
                The food batch is locked out of the distribution pipeline. The Food Safety Passport status has been updated to <strong>EMERGENCY SAFETY FREEZE</strong>. All participants have been notified.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-deepCharcoal text-white font-bold text-xs py-2.5 rounded-xl hover:bg-black transition"
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
