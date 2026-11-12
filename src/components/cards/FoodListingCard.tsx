import React, { useState, useEffect } from 'react';
import { FoodListing } from '../../types';
import { ShieldCheck, Clock, MapPin, Thermometer, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FoodListingCardProps {
  listing: FoodListing;
  onRequest?: (listing: FoodListing) => void;
  showActions?: boolean;
}

export const FoodListingCard: React.FC<FoodListingCardProps> = ({
  listing,
  onRequest,
  showActions = true,
}) => {
  // Live Urgency Timer (Feature 4: Live Expiry and Urgency Timer)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; isUrgent: boolean; isExpired: boolean }>({
    hours: 0,
    minutes: 0,
    isUrgent: false,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const deadline = new Date(listing.permitted_handling_deadline).getTime();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, isUrgent: true, isExpired: true });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const isUrgent = hours < 3; // Less than 3 hours remaining is urgent

      setTimeLeft({ hours, minutes, isUrgent, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [listing.permitted_handling_deadline]);

  const isFrozen = listing.safety_status === 'frozen';

  return (
    <div
      className={`bg-white rounded-2xl border transition duration-200 overflow-hidden flex flex-col justify-between shadow-subtle hover:shadow-elevated ${
        isFrozen
          ? 'border-cherryRed/60 bg-red-50/20'
          : timeLeft.isUrgent
          ? 'border-warmOrange'
          : 'border-softSage'
      }`}
    >
      <div>
        {/* Card Image with Badges */}
        <div className="relative h-44 w-full bg-softSage/30 overflow-hidden">
          <img
            src={
              listing.image_path ||
              'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80'
            }
            alt={listing.food_name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Safety Status Pill */}
          <div className="absolute top-2.5 left-2.5">
            {isFrozen ? (
              <span className="bg-cherryRed text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> SAFETY FREEZE
              </span>
            ) : listing.safety_status === 'eligible' ? (
              <span className="bg-statusGreen text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SAFETY GATE CLEARED
              </span>
            ) : (
              <span className="bg-statusWarning text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                UNDER REVIEW
              </span>
            )}
          </div>

          {/* Dietary Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase shadow-sm border ${
                listing.dietary_category === 'veg'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-red-100 text-red-800 border-red-300'
              }`}
            >
              {listing.dietary_category === 'veg' ? '🟢 Pure Veg' : '🔴 Non-Veg'}
            </span>
          </div>

          {/* Live Expiry / Urgency Timer Banner */}
          <div
            className={`absolute bottom-0 inset-x-0 py-1 px-3 text-[11px] font-bold flex items-center justify-between backdrop-blur-md ${
              isFrozen
                ? 'bg-cherryRed/90 text-white'
                : timeLeft.isExpired
                ? 'bg-gray-800/90 text-white'
                : timeLeft.isUrgent
                ? 'bg-warmOrange/95 text-white animate-pulse'
                : 'bg-deepCharcoal/80 text-white'
            }`}
          >
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timeLeft.isExpired
                ? 'Permitted Window Expired'
                : isFrozen
                ? 'Locked by Safety Protocol'
                : `Rescue Window: ${timeLeft.hours}h ${timeLeft.minutes}m left`}
            </span>
            <span className="font-mono text-[10px] opacity-90">{listing.batch_id}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          <div>
            <span className="text-[11px] font-semibold text-mutedGrey uppercase tracking-wider block">
              {listing.donor_name || 'Verified Donor'}
            </span>
            <h4 className="font-bold text-base text-deepCharcoal leading-snug line-clamp-2 mt-0.5">
              {listing.food_name}
            </h4>
          </div>

          <p className="text-xs text-mutedGrey line-clamp-2 leading-relaxed">
            {listing.description || 'Verified food batch prepared under hygienic conditions.'}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-warmCream/60 p-2.5 rounded-xl border border-softSage">
            <div>
              <span className="text-[11px] text-mutedGrey block">Available Quantity</span>
              <strong className="text-deepCharcoal text-sm">
                {listing.quantity} {listing.unit}
              </strong>
              <span className="text-[10px] text-mutedGrey block">
                (~{listing.estimated_portions} portions)
              </span>
            </div>

            <div>
              <span className="text-[11px] text-mutedGrey block">Storage & Handling</span>
              <strong className="text-deepCharcoal text-xs capitalize flex items-center gap-1 mt-0.5">
                <Thermometer className="w-3.5 h-3.5 text-forest" />
                {listing.storage_condition}
                {listing.current_temperature_celsius ? ` (${listing.current_temperature_celsius}°C)` : ''}
              </strong>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center text-xs text-mutedGrey pt-1">
            <MapPin className="w-3.5 h-3.5 text-forest shrink-0 mr-1.5" />
            <span className="truncate">{listing.pickup_location}</span>
            {listing.distance_km && (
              <span className="ml-auto font-bold text-deepCharcoal shrink-0">
                {listing.distance_km} km away
              </span>
            )}
          </div>

          {/* Allergen Declarations */}
          {listing.allergens && listing.allergens.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap text-[10px]">
              <span className="text-mutedGrey font-medium">Allergens:</span>
              {listing.allergens.map((alg) => (
                <span
                  key={alg}
                  className="px-1.5 py-0.5 rounded bg-cherryRed/10 text-cherryRed font-semibold"
                >
                  {alg}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0 border-t border-softSage/50 mt-2 flex items-center justify-between">
        <Link
          to={`/passport/${listing.batch_id}`}
          className="text-xs font-bold text-forest hover:text-forest-dark flex items-center gap-1"
        >
          <ShieldCheck className="w-3.5 h-3.5" /> View Passport
        </Link>

        {showActions && (
          <div>
            {isFrozen ? (
              <span className="text-xs font-bold text-cherryRed">Distribution Blocked</span>
            ) : onRequest ? (
              <button
                onClick={() => onRequest(listing)}
                className="bg-forest hover:bg-forest-dark text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                Request Food <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <Link
                to={`/explore-food?batch=${listing.batch_id}`}
                className="bg-warmOrange hover:bg-warmOrange-dark text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                Inspect <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
