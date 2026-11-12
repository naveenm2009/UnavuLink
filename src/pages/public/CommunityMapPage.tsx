import React from 'react';
import { useData } from '../../contexts/DataContext';
import { TamilNaduMap } from '../../components/maps/TamilNaduMap';
import { MapPin, ShieldCheck, Info } from 'lucide-react';

export const CommunityMapPage: React.FC = () => {
  const { listings, missions, hotspots, hubs } = useData();

  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-deepCharcoal flex items-center gap-2">
            <MapPin className="w-5 h-5 text-forest" />
            Tamil Nadu Community Food Rescue Grid
          </h2>
          <p className="text-xs text-mutedGrey mt-0.5">
            Realtime geospatial monitoring of verified donors, hunger hotspots, and in-transit rescue missions
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-deepCharcoal bg-warmCream/60 px-3 py-1.5 rounded-xl border border-softSage">
          <ShieldCheck className="w-4 h-4 text-forest" />
          <span>FSSAI Hygiene Verified Zones</span>
        </div>
      </div>

      <TamilNaduMap
        listings={listings}
        missions={missions}
        hotspots={hotspots}
        hubs={hubs}
        height="650px"
      />
    </div>
  );
};
