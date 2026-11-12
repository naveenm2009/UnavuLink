import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { TN_CITIES } from '../../components/maps/TamilNaduMap';
import { UserPlus, ShieldCheck, Mail, Lock, Phone, MapPin, Building2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('donor');
  const [city, setCity] = useState('Coimbatore');
  const [orgName, setOrgName] = useState('');
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept terms and food rescue safety protocol.');
      return;
    }

    const cityCoords = TN_CITIES.find((c) => c.name === city)?.coords || [11.0168, 76.9558];

    await signup({
      full_name: role === 'donor' || role === 'ngo' ? `${orgName || fullName}` : fullName,
      email,
      phone,
      role,
      is_volunteer: isVolunteer,
      location: `${city}, Tamil Nadu`,
      latitude: cityCoords[0],
      longitude: cityCoords[1],
    });

    if (role === 'donor') navigate('/donor/dashboard');
    else if (role === 'ngo') navigate('/ngo/dashboard');
    else if (role === 'acceptor') navigate('/acceptor/dashboard');
    else navigate('/community/home');
  };

  return (
    <div className="max-w-xl mx-auto my-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-softSage shadow-elevated space-y-4">
        <div className="text-center space-y-1">
          <div className="inline-flex p-2 rounded-full bg-forest/10 text-forest mb-1">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-deepCharcoal">Join the UnavuLink Ecosystem</h2>
          <p className="text-xs text-mutedGrey">
            Register your organisation or community profile across Tamil Nadu
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Full Name / Contact Person *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. K. Sundar"
                className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-mutedGrey absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl pl-9 pr-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-mutedGrey absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@organisation.org"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl pl-9 pr-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-mutedGrey absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl pl-9 pr-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Primary Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="donor">Food Donor (Hotel / Caterer / Hall / Restaurant)</option>
                <option value="ngo">Verified NGO / Orphanage / Shelter</option>
                <option value="acceptor">Food Acceptor (Community Kitchen)</option>
                <option value="common_people">Common People (Citizen / Volunteer)</option>
              </select>
              <span className="text-[10px] text-mutedGrey mt-0.5 block italic">
                * Note: Admin privileges are assigned through internal administrative verification only.
              </span>
            </div>

            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Tamil Nadu City / District *</label>
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

          {(role === 'donor' || role === 'ngo' || role === 'acceptor') && (
            <div>
              <label className="block font-bold text-deepCharcoal mb-1">Organisation / Kitchen Name *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-mutedGrey absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Coimbatore Grand Wedding Palace"
                  className="w-full bg-warmCream/40 border border-softSage rounded-xl pl-9 pr-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>
          )}

          {role === 'common_people' && (
            <label className="flex items-center space-x-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={isVolunteer}
                onChange={(e) => setIsVolunteer(e.target.checked)}
                className="w-4 h-4 text-forest rounded"
              />
              <span className="font-semibold text-deepCharcoal">
                I want to apply as a rapid delivery volunteer with my vehicle
              </span>
            </label>
          )}

          <label className="flex items-start space-x-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-forest rounded mt-0.5 shrink-0"
            />
            <span className="text-[11px] text-mutedGrey">
              I accept the UnavuLink Terms of Rescue, FSSAI Food Hygiene Declaration, and Privacy Charter.
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-forest hover:bg-forest-dark text-white font-bold text-xs py-3 rounded-xl shadow transition mt-2 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            Complete Registration
          </button>
        </form>

        <p className="text-center text-xs text-mutedGrey pt-2">
          Already registered?{' '}
          <Link to="/login" className="text-forest font-bold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};
