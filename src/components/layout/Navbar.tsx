import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../contexts/DataContext';
import {
  Bell,
  Globe,
  Menu,
  X,
  ShieldAlert,
  UserCheck,
  ChevronDown,
  LogOut,
  MapPin,
  Flame,
  Award,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, isVolunteerApproved, switchDemoRole, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, emergencyModeActive } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifications = notifications.filter((n) => !n.is_read);

  const getDashboardPath = () => {
    switch (role) {
      case 'admin':
        return '/admin/command-centre';
      case 'donor':
        return '/donor/dashboard';
      case 'acceptor':
        return '/acceptor/dashboard';
      case 'ngo':
        return '/ngo/dashboard';
      case 'common_people':
        return isVolunteerApproved ? '/volunteer/tasks' : '/community/home';
      default:
        return '/';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-softSage shadow-subtle">
      {/* Critical Emergency Banner if activated by Admin */}
      {emergencyModeActive && (
        <div className="bg-cherryRed text-white px-4 py-1.5 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center space-x-2 mx-auto">
            <Flame className="w-4 h-4 animate-bounce" />
            <span>
              EMERGENCY FOOD RESCUE PROTOCOL ACTIVATED: High-Volume Surplus Mobilization in Progress Across Tamil Nadu
            </span>
          </div>
        </div>
      )}

      {/* Demo Switcher Quick Toolbar (Hackathon Evaluator Friendly) */}
      <div className="bg-warmCream/80 border-b border-softSage/60 px-4 py-1 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-deepCharcoal hidden sm:inline">Active Demo Persona:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-forest/15 text-forest capitalize">
            {role.replace('_', ' ')} {isVolunteerApproved ? '(Approved Volunteer)' : ''}
          </span>
          <span className="text-mutedGrey hidden md:inline text-[11px]">• Switch persona to test all 5 role permissions:</span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => { switchDemoRole('admin'); navigate('/admin/command-centre'); }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${role === 'admin' ? 'bg-forest text-white' : 'hover:bg-softSage/50 text-deepCharcoal'}`}
          >
            Admin
          </button>
          <button
            onClick={() => { switchDemoRole('donor'); navigate('/donor/dashboard'); }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${role === 'donor' ? 'bg-forest text-white' : 'hover:bg-softSage/50 text-deepCharcoal'}`}
          >
            Donor
          </button>
          <button
            onClick={() => { switchDemoRole('ngo'); navigate('/ngo/dashboard'); }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${role === 'ngo' ? 'bg-forest text-white' : 'hover:bg-softSage/50 text-deepCharcoal'}`}
          >
            NGO
          </button>
          <button
            onClick={() => { switchDemoRole('acceptor'); navigate('/acceptor/dashboard'); }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${role === 'acceptor' ? 'bg-forest text-white' : 'hover:bg-softSage/50 text-deepCharcoal'}`}
          >
            Acceptor
          </button>
          <button
            onClick={() => { switchDemoRole('volunteer'); navigate('/volunteer/tasks'); }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${isVolunteerApproved ? 'bg-forest text-white' : 'hover:bg-softSage/50 text-deepCharcoal'}`}
          >
            Volunteer
          </button>
          <button
            onClick={() => { switchDemoRole('common_people'); navigate('/community/home'); }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${role === 'common_people' && !isVolunteerApproved ? 'bg-forest text-white' : 'hover:bg-softSage/50 text-deepCharcoal'}`}
          >
            Public
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo/unavulink-logo.svg" alt="UnavuLink Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-deepCharcoal">
            <Link
              to="/"
              className={`hover:text-forest transition ${location.pathname === '/' ? 'text-forest font-bold' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/explore-food"
              className={`hover:text-forest transition ${location.pathname === '/explore-food' ? 'text-forest font-bold' : ''}`}
            >
              {t('explore_food')}
            </Link>
            <Link
              to="/community-map"
              className={`hover:text-forest transition ${location.pathname === '/community-map' ? 'text-forest font-bold' : ''}`}
            >
              {t('community_map')}
            </Link>
            <Link
              to="/live-impact"
              className={`hover:text-forest transition ${location.pathname === '/live-impact' ? 'text-forest font-bold' : ''}`}
            >
              {t('live_impact')}
            </Link>
            <Link
              to="/how-it-works"
              className={`hover:text-forest transition ${location.pathname === '/how-it-works' ? 'text-forest font-bold' : ''}`}
            >
              {t('how_it_works')}
            </Link>
          </nav>

          {/* Right Action Icons: Language, Notifications, Role Dashboard CTA */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle (English / Tamil) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center space-x-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-softSage bg-warmCream/60 hover:bg-softSage/40 transition text-deepCharcoal"
              title="Toggle English / தமிழ்"
            >
              <Globe className="w-3.5 h-3.5 text-forest" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-deepCharcoal hover:bg-warmCream transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cherryRed rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-modal border border-softSage p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-softSage">
                    <span className="font-bold text-xs uppercase tracking-wider text-mutedGrey">
                      Notifications
                    </span>
                    <span className="text-[11px] text-forest font-semibold">
                      {unreadNotifications.length} unread
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-softSage/50 mt-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-mutedGrey py-4 text-center">No notifications</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div key={n.id} className="py-2.5 hover:bg-warmCream/50 px-1 rounded transition">
                          <Link
                            to={n.link || '#'}
                            onClick={() => setNotificationsOpen(false)}
                            className="block"
                          >
                            <h6 className="font-bold text-xs text-deepCharcoal leading-tight">
                              {n.title}
                            </h6>
                            <p className="text-[11px] text-mutedGrey mt-0.5">{n.message}</p>
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Dashboard Button */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={getDashboardPath()}
                  className="bg-forest hover:bg-forest-dark text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-1.5"
                >
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="p-2 text-mutedGrey hover:text-cherryRed transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-forest hover:text-forest-dark px-3 py-1.5"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-warmOrange hover:bg-warmOrange-dark text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  {t('register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-deepCharcoal hover:bg-warmCream"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-softSage px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-deepCharcoal hover:text-forest"
          >
            Home
          </Link>
          <Link
            to="/explore-food"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-deepCharcoal hover:text-forest"
          >
            {t('explore_food')}
          </Link>
          <Link
            to="/community-map"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-deepCharcoal hover:text-forest"
          >
            {t('community_map')}
          </Link>
          <Link
            to="/live-impact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-deepCharcoal hover:text-forest"
          >
            {t('live_impact')}
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-deepCharcoal hover:text-forest"
          >
            {t('how_it_works')}
          </Link>

          <div className="pt-3 border-t border-softSage flex flex-col gap-2">
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-forest text-white py-2 rounded-xl text-sm font-bold"
            >
              Go to {role.toUpperCase()} Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
