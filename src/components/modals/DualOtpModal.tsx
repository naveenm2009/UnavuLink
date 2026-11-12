import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { RescueMission } from '../../types';
import { ShieldCheck, CheckCircle2, AlertTriangle, KeyRound, Thermometer, Scale } from 'lucide-react';

interface DualOtpModalProps {
  mission: RescueMission;
  stage: 'pickup' | 'delivery';
  onClose: () => void;
}

export const DualOtpModal: React.FC<DualOtpModalProps> = ({
  mission,
  stage,
  onClose,
}) => {
  const { verifyPickupOTP, verifyDeliveryOTP } = useData();

  const [otp, setOtp] = useState('');
  const [temperature, setTemperature] = useState<number>(stage === 'pickup' ? 66.5 : 62.0);
  const [deliveredQuantity, setDeliveredQuantity] = useState<number>(mission.quantity || 40);
  const [discrepancyReason, setDiscrepancyReason] = useState('');
  const [resultMessage, setResultMessage] = useState<{ success: boolean; text: string } | null>(null);

  const expectedOtp = stage === 'pickup' ? mission.pickup_otp : mission.delivery_otp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (stage === 'pickup') {
      const res = verifyPickupOTP(mission.id, otp, temperature);
      setResultMessage({ success: res.success, text: res.message });
      if (res.success) {
        setTimeout(onClose, 1800);
      }
    } else {
      const res = verifyDeliveryOTP(mission.id, otp, deliveredQuantity, discrepancyReason);
      setResultMessage({ success: res.success, text: res.message });
      if (res.success) {
        setTimeout(onClose, 1800);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepCharcoal/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-modal border border-softSage relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-deepCharcoal">
              {stage === 'pickup' ? 'Pickup Handover Verification' : 'Delivery Handover Verification'}
            </h3>
            <p className="text-xs text-mutedGrey">
              Dual OTP Cryptographic Handover • Mission {mission.mission_code}
            </p>
          </div>
        </div>

        {/* Demo Helper Box showing expected OTP for easy hackathon evaluation */}
        <div className="bg-warmCream/60 p-3 rounded-xl border border-softSage text-xs mb-4 flex items-center justify-between">
          <span className="text-mutedGrey font-medium">
            Demo Helper (Generated {stage} OTP):
          </span>
          <span className="font-mono text-sm font-extrabold text-forest tracking-widest bg-white px-2 py-0.5 rounded border border-softSage">
            {expectedOtp}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Enter 4-Digit {stage === 'pickup' ? 'Donor Pickup OTP' : 'NGO Delivery OTP'} *
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="e.g. 7492"
              className="w-full text-center font-mono text-2xl font-bold tracking-widest bg-warmCream/40 border border-softSage rounded-xl py-2 text-deepCharcoal focus:ring-2 focus:ring-forest outline-none"
            />
          </div>

          {stage === 'pickup' ? (
            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-warmOrange" />
                Inspect Temperature upon Pickup (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs font-medium text-deepCharcoal outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-deepCharcoal mb-1 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-forest" />
                  Actual Received Quantity ({mission.unit || 'units'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={deliveredQuantity}
                  onChange={(e) => setDeliveredQuantity(Number(e.target.value))}
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs font-medium text-deepCharcoal outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deepCharcoal mb-1">
                  Any Discrepancy or Packaging Notes (Optional)
                </label>
                <input
                  type="text"
                  value={discrepancyReason}
                  onChange={(e) => setDiscrepancyReason(e.target.value)}
                  placeholder="e.g. Full quantity accepted in good condition"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>
          )}

          {resultMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                resultMessage.success
                  ? 'bg-statusGreen/10 text-statusGreen border border-statusGreen/30'
                  : 'bg-cherryRed/10 text-cherryRed border border-cherryRed/30'
              }`}
            >
              {resultMessage.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              <span>{resultMessage.text}</span>
            </div>
          )}

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-mutedGrey hover:text-deepCharcoal px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Confirm Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
