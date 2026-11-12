import React, { useState } from 'react';
import { FoodListing } from '../../types';
import { computeFairShareMatches, FairShareMatchResult } from '../../services/aiMatchingEngine';
import { ShieldCheck, Sparkles, Scale, Info, CheckCircle2, ArrowRight } from 'lucide-react';

interface FairShareMatchingPanelProps {
  listing: FoodListing;
  onAllocate?: (match: FairShareMatchResult) => void;
}

// Sample verified recipient NGOs in Tamil Nadu for FairShare evaluation
const POTENTIAL_RECIPIENTS = [
  {
    id: 'n0000000-0000-0000-0000-000000000001',
    name: 'Annai Teresa Karunai Illam',
    type: 'Orphanage & Children Care (Ukkadam)',
    latitude: 10.9882,
    longitude: 76.9616,
    capacityKg: 250.0,
    acceptsNonVeg: true,
    hasRefrigeration: true,
  },
  {
    id: 'n0000000-0000-0000-0000-000000000002',
    name: 'Kovai Pasumai Community Kitchen',
    type: 'Community Kitchen (Gandhipuram)',
    latitude: 11.018,
    longitude: 76.965,
    capacityKg: 400.0,
    acceptsNonVeg: true,
    hasRefrigeration: true,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    name: 'Grace Old Age Home',
    type: 'Elderly Shelter (Singanallur)',
    latitude: 11.0016,
    longitude: 77.027,
    capacityKg: 80.0,
    acceptsNonVeg: false, // Strict veg
    hasRefrigeration: false,
  },
  {
    id: 'n0000000-0000-0000-0000-000000000003',
    name: 'Erode Hunger Zero Mission',
    type: 'Regional NGO (Brough Road, Erode)',
    latitude: 11.3441,
    longitude: 77.7274,
    capacityKg: 180.0,
    acceptsNonVeg: true,
    hasRefrigeration: true,
  },
];

export const FairShareMatchingPanel: React.FC<FairShareMatchingPanelProps> = ({
  listing,
  onAllocate,
}) => {
  const matches = computeFairShareMatches(listing, POTENTIAL_RECIPIENTS);
  const [selectedMatch, setSelectedMatch] = useState<FairShareMatchResult | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-softSage p-5 shadow-subtle space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-softSage">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-warmOrange/15 flex items-center justify-center text-warmOrange">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-deepCharcoal">
              AI FairShare Priority Engine
            </h4>
            <p className="text-[11px] text-mutedGrey">
              Ethical Multi-Factor Allocation • Preventing Monopolisation of Surplus
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-warmCream px-2 py-1 rounded border border-softSage text-mutedGrey">
          S = 0.30D + 0.25T + 0.20C + 0.15R + 0.10V
        </span>
      </div>

      {/* Target Batch Info */}
      <div className="bg-warmCream/60 p-3 rounded-xl border border-softSage text-xs flex items-center justify-between">
        <div>
          <span className="text-mutedGrey block text-[11px]">Evaluating Batch:</span>
          <strong className="text-deepCharcoal">{listing.food_name}</strong>
        </div>
        <div className="text-right">
          <span className="text-mutedGrey block text-[11px]">Quantity:</span>
          <span className="font-bold text-forest">
            {listing.quantity} {listing.unit} (~{listing.estimated_portions} portions)
          </span>
        </div>
      </div>

      {/* Ranked Recipient List */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-deepCharcoal uppercase tracking-wider block">
          Ranked Eligible Recipients:
        </span>

        {matches.length === 0 ? (
          <div className="p-4 bg-red-50 text-cherryRed rounded-xl text-xs text-center">
            No compatible recipients available for this batch under current safety criteria.
          </div>
        ) : (
          matches.map((m) => (
            <div
              key={m.recipientId}
              onClick={() => setSelectedMatch(m)}
              className={`p-3 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedMatch?.recipientId === m.recipientId
                  ? 'border-forest bg-forest/5 ring-1 ring-forest'
                  : 'border-softSage bg-white hover:bg-warmCream/40'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      m.rank === 1
                        ? 'bg-statusGreen text-white'
                        : 'bg-warmCream text-deepCharcoal border border-softSage'
                    }`}
                  >
                    #{m.rank}
                  </span>
                  <h5 className="font-bold text-xs text-deepCharcoal">{m.recipientName}</h5>
                  <span className="text-[10px] text-mutedGrey">({m.distanceKm} km away)</span>
                </div>

                <p className="text-[11px] text-mutedGrey">{m.organizationType}</p>
                <p className="text-[11px] text-forest font-medium">{m.explanation}</p>
              </div>

              {/* Score Breakdown Pill */}
              <div className="flex items-center space-x-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-mutedGrey block">FairShare Score</span>
                  <strong className="text-base font-extrabold text-forest">
                    {m.fairShareTotalScore}
                    <span className="text-xs text-mutedGrey font-normal">/100</span>
                  </strong>
                </div>

                {onAllocate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAllocate(m);
                    }}
                    className="bg-forest hover:bg-forest-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition"
                  >
                    Allocate
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fairness Protocol Notice */}
      <p className="text-[10px] text-mutedGrey italic">
        * FairShare evaluates distance (T), dietary compliance (D), capacity headroom (C), cold-storage readiness (R), and volunteer density (V). Organizations are rotated fairly to guarantee equity across all community partners.
      </p>
    </div>
  );
};
