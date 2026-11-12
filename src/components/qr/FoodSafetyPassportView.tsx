import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { FoodBatchPassport } from '../../types';
import { ShieldCheck, AlertOctagon, CheckCircle2, Clock, MapPin, Thermometer, UserCheck, QrCode } from 'lucide-react';

interface FoodSafetyPassportViewProps {
  passport: FoodBatchPassport;
}

export const FoodSafetyPassportView: React.FC<FoodSafetyPassportViewProps> = ({ passport }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(
      passport.qr_code_payload || `https://unavulink.org/passport/${passport.batch_id}`,
      {
        width: 180,
        margin: 1,
        color: {
          dark: '#26332B',
          light: '#FFFFFF',
        },
      }
    )
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error', err));
  }, [passport]);

  const isFrozen = !passport.safety_gate_cleared || passport.current_status.includes('FREEZE');

  return (
    <div className="bg-white rounded-2xl border border-softSage shadow-elevated p-6 max-w-2xl mx-auto">
      {/* Header Banner */}
      <div
        className={`p-4 rounded-xl mb-6 flex items-center justify-between ${
          isFrozen
            ? 'bg-cherryRed/10 border border-cherryRed/30 text-cherryRed'
            : 'bg-forest/10 border border-forest/20 text-forest'
        }`}
      >
        <div className="flex items-center space-x-3">
          {isFrozen ? (
            <AlertOctagon className="w-8 h-8 text-cherryRed shrink-0" />
          ) : (
            <ShieldCheck className="w-8 h-8 text-forest shrink-0" />
          )}
          <div>
            <h3 className="font-bold text-lg leading-tight">
              {isFrozen ? 'SAFETY PROTOCOL LOCKDOWN' : 'QR FOOD SAFETY PASSPORT'}
            </h3>
            <p className="text-xs opacity-90">
              {isFrozen
                ? 'Batch locked against redistribution due to safety concern'
                : 'Blockchain-style Traceable Handover Record • Tamil Nadu Protocol'}
            </p>
          </div>
        </div>

        <span className="font-mono text-xs px-2.5 py-1 bg-white rounded-md shadow-sm border border-softSage font-bold text-deepCharcoal">
          {passport.batch_id}
        </span>
      </div>

      {/* Main Content Grid: QR on Left, Details on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 bg-warmCream/60 rounded-xl border border-softSage text-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code for batch ${passport.batch_id}`}
              className="w-36 h-36 rounded-lg shadow-sm border border-white"
            />
          ) : (
            <div className="w-36 h-36 flex items-center justify-center bg-white rounded-lg">
              <QrCode className="w-12 h-12 text-mutedGrey animate-pulse" />
            </div>
          )}
          <span className="text-[11px] font-semibold text-mutedGrey mt-2">
            Scan to inspect batch authenticity
          </span>
          <span className="text-[10px] text-mutedGrey/70">Traceability Token</span>
        </div>

        {/* Batch Metadata */}
        <div className="md:col-span-2 space-y-3">
          <div>
            <span className="text-xs text-mutedGrey block">Food Batch Name</span>
            <h4 className="font-bold text-base text-deepCharcoal">{passport.food_name}</h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-warmCream/40 p-2 rounded-lg border border-softSage/60">
              <span className="text-mutedGrey block text-[11px]">Donor Source</span>
              <strong className="text-deepCharcoal">{passport.donor_name}</strong>
            </div>
            <div className="bg-warmCream/40 p-2 rounded-lg border border-softSage/60">
              <span className="text-mutedGrey block text-[11px]">Current Status</span>
              <strong
                className={isFrozen ? 'text-cherryRed font-bold' : 'text-forest font-bold'}
              >
                {passport.current_status}
              </strong>
            </div>
          </div>

          <div className="text-xs space-y-1 bg-white p-3 rounded-lg border border-softSage">
            <div className="flex items-center justify-between">
              <span className="text-mutedGrey flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-forest" /> Prepared At:
              </span>
              <span className="font-medium text-deepCharcoal">
                {new Date(passport.preparation_time).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mutedGrey flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cherryRed" /> Handling Deadline:
              </span>
              <span className="font-medium text-deepCharcoal">
                {new Date(passport.expiry_time).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mutedGrey flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-warmOrange" /> Storage Protocol:
              </span>
              <span className="font-medium text-deepCharcoal">{passport.storage_conditions}</span>
            </div>
          </div>

          {/* Declared Allergens */}
          <div className="text-xs">
            <span className="text-mutedGrey block mb-1">Declared Allergens:</span>
            <div className="flex flex-wrap gap-1">
              {passport.allergens && passport.allergens.length > 0 ? (
                passport.allergens.map((alg) => (
                  <span
                    key={alg}
                    className="px-2 py-0.5 rounded-full bg-cherryRed/10 text-cherryRed font-semibold text-[11px]"
                  >
                    ⚠️ {alg}
                  </span>
                ))
              ) : (
                <span className="text-statusGreen font-medium">None declared</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Audit Trail Timeline */}
      <div className="border-t border-softSage pt-4">
        <h5 className="font-bold text-xs uppercase tracking-wider text-mutedGrey mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-forest" /> Immutable Handover Audit Log
        </h5>

        <div className="space-y-3">
          {passport.history_log.map((log, index) => (
            <div key={index} className="flex items-start space-x-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-forest mt-1.5 shrink-0" />
              <div className="flex-1 bg-warmCream/40 p-2.5 rounded-lg border border-softSage/50">
                <div className="flex items-center justify-between mb-0.5">
                  <strong className="text-deepCharcoal">{log.step}</strong>
                  <span className="text-[10px] text-mutedGrey font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {log.actor && (
                  <p className="text-[11px] text-forest font-medium">By: {log.actor}</p>
                )}
                {log.details && (
                  <p className="text-[11px] text-deepCharcoal/80 mt-0.5">{log.details}</p>
                )}
                {log.gate && (
                  <p className="text-[10px] text-mutedGrey italic mt-0.5 font-mono">
                    Gate Check: {log.gate}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Disclaimer */}
      <p className="text-[10px] text-mutedGrey mt-5 text-center italic border-t border-softSage/60 pt-2">
        Note: The QR Food Safety Passport ensures digital traceability and recorded compliance checkpoints. It does not replace visual and sensory inspection prior to consumption.
      </p>
    </div>
  );
};
