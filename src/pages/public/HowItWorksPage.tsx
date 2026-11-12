import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  QrCode,
  Scale,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Radio,
  Building2,
  Award,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-forest bg-forest/10 px-3 py-1 rounded-full border border-forest/20">
          Architecture & Operational Protocol
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-deepCharcoal">
          How UnavuLink Delivers Food Safely & Fairly
        </h1>
        <p className="text-xs sm:text-sm text-mutedGrey max-w-2xl mx-auto leading-relaxed">
          The problem is not simply that surplus food exists. The bigger problem is that there is no sufficiently coordinated way to identify surplus, check food-handling information, find appropriate recipients, allocate quantities fairly, arrange collection, track deliveries and verify the actual impact. UnavuLink solves this through one connected system.
        </p>
      </div>

      {/* 4 Pillars of UnavuLink */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deepCharcoal">
            1. Automated Food Safety Gate
          </h3>
          <p className="text-xs text-mutedGrey leading-relaxed">
            Surplus food cannot be distributed blindly. Donors must record preparation time, hot/cold holding temperatures, and allergen disclosures. If a batch fails the safety check or exceeds permitted handling time, it is automatically halted before matching begins.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-warmOrange/10 flex items-center justify-center text-warmOrange">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deepCharcoal">
            2. QR Food Safety Passport
          </h3>
          <p className="text-xs text-mutedGrey leading-relaxed">
            Every food donation mints a unique QR-linked digital passport. It records donor identity, preparation timestamp, storage instructions, and an append-only audit trail updated at each physical handover checkpoint.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deepCharcoal">
            3. FairShare Matching Algorithm
          </h3>
          <p className="text-xs text-mutedGrey leading-relaxed">
            Rather than dumping all food at the nearest organization, our FairShare engine balances distance (T), dietary compatibility (D), receiving capacity (C), cold-storage readiness (R), and volunteer density (V) so all community shelters get fed equitably.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-statusGreen">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deepCharcoal">
            4. Self-Recovering Rescue Dispatch
          </h3>
          <p className="text-xs text-mutedGrey leading-relaxed">
            If an assigned volunteer experiences a vehicle breakdown, or an NGO refrigerator loses power, the Rescue Failure Recovery Engine automatically re-routes the surplus to an alternative verified recipient within the remaining safe consumption window.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-forest-dark to-forest text-white p-8 rounded-3xl shadow-elevated text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-white">
          Ready to Make a Difference?
        </h3>
        <p className="text-xs text-warmCream/90 max-w-lg mx-auto">
          Join restaurants, wedding halls, verified NGOs, and volunteer champions across Tamil Nadu in ending food waste and hunger.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/donor/donate"
            className="bg-warmOrange hover:bg-warmOrange-dark text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow"
          >
            Donate Surplus Food
          </Link>
          <Link
            to="/community/volunteer-register"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs px-6 py-3 rounded-xl transition"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </div>
  );
};
