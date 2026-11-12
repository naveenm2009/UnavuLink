import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FoodListing, RescueMission, CommunityHotspot, CommunityHub } from '../../types';
import { MapPin, Navigation, AlertTriangle, ShieldCheck, Clock, Layers, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix Leaflet default marker assets in React/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG Icons for UnavuLink Roles & Entities
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-unavu-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 13px;
        ">${label}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const ICONS = {
  donor: createCustomIcon('#2E6B3F', 'D'),
  availableFood: createCustomIcon('#F28C28', '🍲'),
  ngo: createCustomIcon('#1D4ED8', 'N'),
  communityHub: createCustomIcon('#7C3AED', 'H'),
  safetyAlert: createCustomIcon('#D92243', '⚠️'),
  hotspot: createCustomIcon('#EAB308', '🔥'),
  volunteer: createCustomIcon('#059669', 'V'),
};

// Preset Tamil Nadu Cities for quick flyTo
export const TN_CITIES = [
  { name: 'Coimbatore', coords: [11.0168, 76.9558] as [number, number], zoom: 12 },
  { name: 'Chennai', coords: [13.0827, 80.2707] as [number, number], zoom: 12 },
  { name: 'Madurai', coords: [9.9252, 78.1198] as [number, number], zoom: 12 },
  { name: 'Tiruchirappalli', coords: [10.7905, 78.7047] as [number, number], zoom: 12 },
  { name: 'Salem', coords: [11.6643, 78.1460] as [number, number], zoom: 12 },
  { name: 'Tiruppur', coords: [11.1085, 77.3411] as [number, number], zoom: 12 },
  { name: 'Erode', coords: [11.3410, 77.7172] as [number, number], zoom: 12 },
  { name: 'Tiruchengode', coords: [11.3789, 77.8943] as [number, number], zoom: 13 },
  { name: 'Thanjavur', coords: [10.7870, 79.1378] as [number, number], zoom: 12 },
  { name: 'Namakkal', coords: [11.2189, 78.1674] as [number, number], zoom: 12 },
];

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

interface TamilNaduMapProps {
  listings?: FoodListing[];
  missions?: RescueMission[];
  hotspots?: CommunityHotspot[];
  hubs?: CommunityHub[];
  selectedCity?: string;
  showFilters?: boolean;
  activeMissionRoute?: RescueMission | null;
  height?: string;
  onSelectListing?: (listing: FoodListing) => void;
}

export const TamilNaduMap: React.FC<TamilNaduMapProps> = ({
  listings = [],
  missions = [],
  hotspots = [],
  hubs = [],
  selectedCity = 'Coimbatore',
  showFilters = true,
  activeMissionRoute = null,
  height = '540px',
  onSelectListing,
}) => {
  const [currentCenter, setCurrentCenter] = useState<[number, number]>([11.0168, 76.9558]);
  const [currentZoom, setCurrentZoom] = useState<number>(12);
  const [filterType, setFilterType] = useState<string>('all');
  const [activeCityName, setActiveCityName] = useState<string>(selectedCity);

  const handleCityChange = (cityName: string) => {
    const city = TN_CITIES.find((c) => c.name === cityName);
    if (city) {
      setCurrentCenter(city.coords);
      setCurrentZoom(city.zoom);
      setActiveCityName(cityName);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-softSage shadow-elevated bg-white">
      {/* Top Filter and City Selector Toolbar */}
      {showFilters && (
        <div className="p-3 bg-white/95 backdrop-blur border-b border-softSage flex flex-wrap items-center justify-between gap-2 z-10 relative">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-forest" />
            <span className="text-xs font-bold uppercase tracking-wider text-mutedGrey">
              Tamil Nadu Region:
            </span>
            <select
              value={activeCityName}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-warmCream/60 border border-softSage text-deepCharcoal text-sm font-semibold rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-forest outline-none"
            >
              {TN_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Layer Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-full transition ${
                filterType === 'all'
                  ? 'bg-deepCharcoal text-white'
                  : 'bg-warmCream hover:bg-softSage/50 text-mutedGrey'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setFilterType('food')}
              className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                filterType === 'food'
                  ? 'bg-warmOrange text-white'
                  : 'bg-warmCream hover:bg-softSage/50 text-mutedGrey'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-warmOrange"></span> Surplus Food
            </button>
            <button
              onClick={() => setFilterType('missions')}
              className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                filterType === 'missions'
                  ? 'bg-forest text-white'
                  : 'bg-warmCream hover:bg-softSage/50 text-mutedGrey'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-forest"></span> Active Rescues
            </button>
            <button
              onClick={() => setFilterType('hotspots')}
              className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                filterType === 'hotspots'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-warmCream hover:bg-softSage/50 text-mutedGrey'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Hotspots
            </button>
            <button
              onClick={() => setFilterType('hubs')}
              className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                filterType === 'hubs'
                  ? 'bg-purple-600 text-white'
                  : 'bg-warmCream hover:bg-softSage/50 text-mutedGrey'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-600"></span> Community Hubs
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div style={{ height }}>
        <MapContainer
          center={currentCenter}
          zoom={currentZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapController center={currentCenter} zoom={currentZoom} />

          {/* OpenStreetMap Standard Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | UnavuLink TN'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 1. Food Listings Markers */}
          {(filterType === 'all' || filterType === 'food') &&
            listings.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={item.safety_status === 'frozen' ? ICONS.safetyAlert : ICONS.availableFood}
              >
                <Popup className="unavulink-map-popup">
                  <div className="p-1 max-w-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          item.safety_status === 'frozen'
                            ? 'bg-cherryRed/10 text-cherryRed'
                            : 'bg-warmOrange/15 text-warmOrange-dark'
                        }`}
                      >
                        {item.safety_status === 'frozen' ? 'SAFETY FREEZE' : 'AVAILABLE SURPLUS'}
                      </span>
                      <span className="text-xs text-mutedGrey font-mono">{item.batch_id}</span>
                    </div>

                    <h4 className="font-bold text-sm text-deepCharcoal leading-tight mb-1">
                      {item.food_name}
                    </h4>

                    <p className="text-xs text-mutedGrey mb-2 line-clamp-2">
                      {item.pickup_location}
                    </p>

                    <div className="grid grid-cols-2 gap-1 text-[11px] mb-2 bg-warmCream/60 p-2 rounded-lg">
                      <div>
                        <span className="text-mutedGrey block">Quantity:</span>
                        <strong className="text-deepCharcoal">
                          {item.quantity} {item.unit} ({item.estimated_portions} portions)
                        </strong>
                      </div>
                      <div>
                        <span className="text-mutedGrey block">Storage:</span>
                        <strong className="text-deepCharcoal capitalize">
                          {item.storage_condition}
                          {item.current_temperature_celsius ? ` (${item.current_temperature_celsius}°C)` : ''}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-softSage">
                      <Link
                        to={`/passport/${item.batch_id}`}
                        className="text-xs text-forest hover:underline font-bold flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" /> Passport
                      </Link>

                      {onSelectListing && item.safety_status !== 'frozen' && (
                        <button
                          onClick={() => onSelectListing(item)}
                          className="bg-forest text-white px-2.5 py-1 rounded-md text-xs font-semibold hover:bg-forest-dark"
                        >
                          Request
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* 2. Active Rescue Missions & Volunteer Routes */}
          {(filterType === 'all' || filterType === 'missions') &&
            missions.map((mission) => {
              const polylinePositions: [number, number][] = [
                [mission.pickup_latitude, mission.pickup_longitude],
                [mission.delivery_latitude, mission.delivery_longitude],
              ];

              return (
                <React.Fragment key={mission.id}>
                  {/* Pickup Marker */}
                  <Marker
                    position={[mission.pickup_latitude, mission.pickup_longitude]}
                    icon={ICONS.donor}
                  >
                    <Popup>
                      <div className="p-1">
                        <span className="text-[10px] font-bold text-forest bg-forest/10 px-1.5 py-0.5 rounded">
                          PICKUP ORIGIN
                        </span>
                        <p className="font-bold text-xs mt-1">{mission.donor_name}</p>
                        <p className="text-[11px] text-mutedGrey">{mission.pickup_address}</p>
                        <p className="text-[11px] mt-1 font-mono text-warmOrange">
                          Pickup OTP: <strong>{mission.pickup_otp}</strong>
                        </p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Delivery Destination Marker */}
                  <Marker
                    position={[mission.delivery_latitude, mission.delivery_longitude]}
                    icon={ICONS.ngo}
                  >
                    <Popup>
                      <div className="p-1">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                          DELIVERY DESTINATION
                        </span>
                        <p className="font-bold text-xs mt-1">{mission.recipient_name}</p>
                        <p className="text-[11px] text-mutedGrey">{mission.delivery_address}</p>
                        <p className="text-[11px] mt-1 font-mono text-forest">
                          Delivery OTP: <strong>{mission.delivery_otp}</strong>
                        </p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Route Polyline */}
                  <Polyline
                    positions={polylinePositions}
                    pathOptions={{
                      color: mission.mission_status === 'in_transit' ? '#F28C28' : '#2E6B3F',
                      weight: 4,
                      dashArray: mission.mission_status === 'in_transit' ? '6, 8' : undefined,
                      opacity: 0.85,
                    }}
                  />
                </React.Fragment>
              );
            })}

          {/* 3. Community Hotspots (Crowdsourced Needs & Surplus Hubs) */}
          {(filterType === 'all' || filterType === 'hotspots') &&
            hotspots.map((h) => (
              <Marker key={h.id} position={[h.latitude, h.longitude]} icon={ICONS.hotspot}>
                <Popup>
                  <div className="p-1 max-w-xs">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                      {h.hotspot_type.replace(/_/g, ' ')}
                    </span>
                    <h5 className="font-bold text-xs mt-1 text-deepCharcoal">{h.title}</h5>
                    <p className="text-[11px] text-mutedGrey my-1">{h.description}</p>
                    <p className="text-[10px] text-mutedGrey">
                      📍 {h.location_name}, {h.city}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* 4. Community Hubs / Smart Fridges */}
          {(filterType === 'all' || filterType === 'hubs') &&
            hubs.map((hub) => (
              <Marker key={hub.id} position={[hub.latitude, hub.longitude]} icon={ICONS.communityHub}>
                <Popup>
                  <div className="p-1 max-w-xs">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      COMMUNITY COLD HUB
                    </span>
                    <h5 className="font-bold text-xs mt-1 text-deepCharcoal">{hub.hub_name}</h5>
                    <p className="text-[11px] text-mutedGrey my-1">{hub.address}</p>
                    <div className="text-[11px] bg-purple-50 p-1.5 rounded">
                      <span className="block text-mutedGrey">
                        Capacity: {hub.current_load_kg} / {hub.capacity_kg} kg
                      </span>
                      <span className="text-purple-700 font-semibold">{hub.storage_type}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* Map Legend Footer */}
      <div className="p-2.5 bg-warmCream/80 border-t border-softSage flex flex-wrap items-center justify-between text-xs text-deepCharcoal">
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-forest"></span> Verified Donor
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-warmOrange"></span> Surplus Food
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span> Receiving NGO
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600"></span> Community Hub
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Hunger Hotspot
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cherryRed"></span> Safety Alert
          </div>
        </div>

        <span className="text-[11px] text-mutedGrey font-medium">
          Live GPS Coordinate Grid • Tamil Nadu State
        </span>
      </div>
    </div>
  );
};
