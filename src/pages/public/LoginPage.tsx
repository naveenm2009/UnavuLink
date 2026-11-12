import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { ShieldCheck, LogIn, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('donor');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role);
    redirectToRole(role);
  };

  const handleQuickDemo = (roleKey: 'admin' | 'donor' | 'acceptor' | 'ngo' | 'common_people' | 'volunteer') => {
    switchDemoRole(roleKey);
    if (roleKey === 'admin') navigate('/admin/command-centre');
    else if (roleKey === 'donor') navigate('/donor/dashboard');
    else if (roleKey === 'ngo') navigate('/ngo/dashboard');
    else if (roleKey === 'acceptor') navigate('/acceptor/dashboard');
    else if (roleKey === 'volunteer') navigate('/volunteer/tasks');
    else navigate('/community/home');
  };

  const redirectToRole = (targetRole: UserRole) => {
    switch (targetRole) {
      case 'admin':
        navigate('/admin/command-centre');
        break;
      case 'donor':
        navigate('/donor/dashboard');
        break;
      case 'acceptor':
        navigate('/acceptor/dashboard');
        break;
      case 'ngo':
        navigate('/ngo/dashboard');
        break;
      case 'common_people':
      default:
        navigate('/community/home');
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 space-y-6">
      {/* Hackathon Fast-Track Evaluation Box */}
      <div className="bg-gradient-to-r from-forest/10 to-warmOrange/15 p-5 rounded-2xl border border-softSage shadow-subtle space-y-3">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-forest" />
          <h4 className="font-extrabold text-sm text-deepCharcoal">
            Hackathon One-Click Persona Login
          </h4>
        </div>
        <p className="text-xs text-mutedGrey">
          Instantly authenticate into any of the five primary roles with verified permissions:
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1 text-xs font-bold">
          <button
            onClick={() => handleQuickDemo('admin')}
            className="p-2 rounded-xl bg-deepCharcoal text-white hover:bg-black transition shadow-sm"
          >
            Admin
          </button>
          <button
            onClick={() => handleQuickDemo('donor')}
            className="p-2 rounded-xl bg-forest text-white hover:bg-forest-dark transition shadow-sm"
          >
            Donor
          </button>
          <button
            onClick={() => handleQuickDemo('ngo')}
            className="p-2 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition shadow-sm"
          >
            NGO
          </button>
          <button
            onClick={() => handleQuickDemo('acceptor')}
            className="p-2 rounded-xl bg-purple-700 text-white hover:bg-purple-800 transition shadow-sm"
          >
            Acceptor
          </button>
          <button
            onClick={() => handleQuickDemo('volunteer')}
            className="p-2 rounded-xl bg-warmOrange text-white hover:bg-warmOrange-dark transition shadow-sm"
          >
            Volunteer
          </button>
          <button
            onClick={() => handleQuickDemo('common_people')}
            className="p-2 rounded-xl bg-warmCream text-deepCharcoal border border-softSage hover:bg-softSage/50 transition"
          >
            Public
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-softSage shadow-elevated space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold text-deepCharcoal">Sign In to UnavuLink</h2>
          <p className="text-xs text-mutedGrey">
            Predicting Surplus. Prioritising Need. Delivering Food Safely.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-deepCharcoal mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-mutedGrey absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. anand.grand@demo.unavulink.org"
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

          <div>
            <label className="block font-bold text-deepCharcoal mb-1">Select Persona Role *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
            >
              <option value="donor">Food Donor (Restaurant / Hotel / Banquet)</option>
              <option value="ngo">Verified NGO / Orphanage / Shelter</option>
              <option value="acceptor">Food Acceptor (Community Kitchen / Home)</option>
              <option value="common_people">Common People (Citizen / Volunteer)</option>
              <option value="admin">Platform Administrator (Command Centre)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-forest hover:bg-forest-dark text-white font-bold text-xs py-3 rounded-xl shadow transition mt-2 flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </form>

        <p className="text-center text-xs text-mutedGrey pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-forest font-bold hover:underline">
            Register your organisation
          </Link>
        </p>
      </div>
    </div>
  );
};
