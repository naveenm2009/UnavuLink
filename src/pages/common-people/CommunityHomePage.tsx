import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { TamilNaduMap, TN_CITIES } from '../../components/maps/TamilNaduMap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  AlertTriangle,
  Radio,
  Users,
  Heart,
  CheckCircle2,
  Send,
  PlusCircle,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export const CommunityHomePage: React.FC = () => {
  const { user, isVolunteerApproved } = useAuth();
  const { hotspots, hubs, reportHotspot, impactStats } = useData();
  const navigate = useNavigate();

  // Report need/hotspot form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [city, setCity] = useState('Coimbatore');
  const [hotspotType, setHotspotType] = useState<any>('high_hunger_need');
  const [urgency, setUrgency] = useState<any>('medium');
  const [submitted, setSubmitted] = useState(false);

  // Volunteer interest registration state
  const [volunteerMode, setVolunteerMode] = useState('two_wheeler');
  const [registeredVolunteer, setRegisteredVolunteer] = useState(false);

  const handleSubmitHotspot = (e: React.FormEvent) => {
    e.preventDefault();
    const cityCoords = TN_CITIES.find((c) => c.name === city)?.coords || [11.0168, 76.9558];

    reportHotspot({
      reporter_id: user?.id || 'p-reporter',
      reporter_name: user?.full_name || 'Citizen Contributor',
      title,
      description,
      location_name: locationName,
      city,
      latitude: cityCoords[0],
      longitude: cityCoords[1],
      hotspot_type: hotspotType,
      urgency_level: urgency,
      status: 'verified',
    });

    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setLocationName('');
      setSubmitted(false);
    }, 2500);
  };

  const handleRegisterVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredVolunteer(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/20">
              Community Intelligence Portal
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            Tamil Nadu Community Food Network
          </h2>
          <p className="text-xs text-mutedGrey">
            Crowdsourced Hunger Reporting • Community Cold Fridges • Citizen Volunteer Mobilisation
          </p>
        </div>

        {isVolunteerApproved ? (
          <Link
            to="/volunteer/tasks"
            className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
          >
            Go to Active Rescue Tasks →
          </Link>
        ) : (
          <a
            href="#volunteer-section"
            className="bg-warmOrange hover:bg-warmOrange-dark text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition"
          >
            Register as Volunteer
          </a>
        )}
      </div>

      {/* Community Map Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-forest" /> Public Food Distribution Points & Community Hubs
          </h3>
          <span className="text-xs text-mutedGrey">Coimbatore, Erode, Salem & Region</span>
        </div>
        <TamilNaduMap hotspots={hotspots} hubs={hubs} height="400px" />
      </div>

      {/* Two Column Grid: Crowdsourced Report Form vs Community Fridges List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form: Report Need or Waste Hotspot */}
        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-softSage">
            <Radio className="w-5 h-5 text-forest" />
            <div>
              <h4 className="font-bold text-sm text-deepCharcoal">
                Report Food Waste or Community Hunger Need
              </h4>
              <p className="text-[11px] text-mutedGrey">
                Directly alerts local rescue volunteers and participating community kitchens
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-statusGreen/10 border border-statusGreen/30 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-statusGreen mx-auto" />
              <h5 className="font-bold text-sm text-deepCharcoal">Thank you! Report logged.</h5>
              <p className="text-xs text-mutedGrey">
                The local coordinator in {city} has been alerted to review and dispatch a response.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitHotspot} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-deepCharcoal mb-1">Report Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 50+ migrant families in need of evening dinner"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-deepCharcoal mb-1">Report Category *</label>
                  <select
                    value={hotspotType}
                    onChange={(e) => setHotspotType(e.target.value)}
                    className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="high_hunger_need">High Hunger Need Area</option>
                    <option value="surplus_zone">Surplus Food Dump Risk</option>
                    <option value="frequent_event_area">Frequent Event / Marriage Hall Cluster</option>
                    <option value="community_kitchen_needed">Community Kitchen Needed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-deepCharcoal mb-1">Tamil Nadu City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                  >
                    {TN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-deepCharcoal mb-1">Location Landmark *</label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Near Ukkadam Bus Terminal Shelter #3"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block font-bold text-deepCharcoal mb-1">Situation Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide approximate number of people, preferred timing, or contact person."
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl p-3 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest hover:bg-forest-dark text-white font-bold text-xs py-2.5 rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit Hotspot Report
              </button>
            </form>
          )}
        </div>

        {/* Community Smart Hubs & Fridges */}
        <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-softSage">
            <Building2 className="w-5 h-5 text-forest" />
            <div>
              <h4 className="font-bold text-sm text-deepCharcoal">
                Tamil Nadu Verified Community Cold Hubs
              </h4>
              <p className="text-[11px] text-mutedGrey">
                Temperature-controlled 24/7 food access points operated by verified trusts
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {hubs.map((hub) => (
              <div
                key={hub.id}
                className="p-3.5 bg-warmCream/40 rounded-xl border border-softSage space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-deepCharcoal">{hub.hub_name}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {hub.storage_type}
                  </span>
                </div>
                <p className="text-[11px] text-mutedGrey">📍 {hub.address}, {hub.city}</p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-mutedGrey">
                    Operator: <strong>{hub.operator_name}</strong>
                  </span>
                  <span className="text-forest font-semibold">
                    Load: {hub.current_load_kg} / {hub.capacity_kg} kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Registration Section */}
      <section
        id="volunteer-section"
        className="bg-gradient-to-r from-forest-dark to-forest text-white p-8 rounded-3xl shadow-elevated space-y-4"
      >
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-warmOrange">
            Join the Rescue Force
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            Become an Approved Volunteer in Your City
          </h3>
          <p className="text-xs text-warmCream/90 leading-relaxed">
            Help transport surplus meals from banquet halls and restaurants to nearby child shelters and old age homes. Earn verified social impact credits and build community trust.
          </p>
        </div>

        {registeredVolunteer ? (
          <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-xs font-medium text-warmCream max-w-md">
            ✓ Application received! Admin verification is in progress. Once approved, your role will unlock "My Rescue Tasks" on the navigation bar.
          </div>
        ) : (
          <form onSubmit={handleRegisterVolunteer} className="flex flex-wrap items-center gap-3 pt-2">
            <select
              value={volunteerMode}
              onChange={(e) => setVolunteerMode(e.target.value)}
              className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-white outline-none"
            >
              <option value="two_wheeler" className="text-deepCharcoal">Two Wheeler (Bike / Scooter)</option>
              <option value="autorickshaw" className="text-deepCharcoal">Auto Rickshaw</option>
              <option value="car" className="text-deepCharcoal">Car</option>
              <option value="van" className="text-deepCharcoal">Delivery Van / Small Commercial</option>
              <option value="bicycle" className="text-deepCharcoal">Bicycle / Walking</option>
            </select>

            <button
              type="submit"
              className="bg-warmOrange hover:bg-warmOrange-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow"
            >
              Submit Volunteer Interest
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
