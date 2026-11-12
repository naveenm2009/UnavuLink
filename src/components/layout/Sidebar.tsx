import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Users,
  UtensilsCrossed,
  Truck,
  AlertTriangle,
  Flame,
  Radio,
  Cpu,
  BarChart3,
  FileText,
  Settings,
  PlusCircle,
  Inbox,
  QrCode,
  Sparkles,
  Award,
  Bell,
  User,
  HeartHandshake,
  MapPin,
  ClipboardList,
  History,
  CheckCircle,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, role, isVolunteerApproved } = useAuth();

  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { name: 'Command Centre', path: '/admin/command-centre', icon: LayoutDashboard },
          { name: 'User & Org Verifications', path: '/admin/verifications', icon: ShieldCheck },
          { name: 'Food Listings Oversight', path: '/admin/food-listings', icon: UtensilsCrossed },
          { name: 'Rescue Operations', path: '/admin/rescue-operations', icon: Truck },
          { name: 'Safety Incidents & Recalls', path: '/admin/safety-incidents', icon: AlertTriangle },
          { name: 'Emergency Mode', path: '/admin/emergency-mode', icon: Flame },
          { name: 'Community Hotspots', path: '/admin/hotspots', icon: Radio },
          { name: 'Digital Twin Simulation', path: '/admin/digital-twin', icon: Cpu },
          { name: 'Impact Analytics', path: '/admin/analytics', icon: BarChart3 },
          { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileText },
        ];

      case 'donor':
        return [
          { name: 'Donor Dashboard', path: '/donor/dashboard', icon: LayoutDashboard },
          { name: 'Donate Food', path: '/donor/donate', icon: PlusCircle },
          { name: 'My Listings', path: '/donor/listings', icon: UtensilsCrossed },
          { name: 'Donation Requests', path: '/donor/requests', icon: Inbox },
          { name: 'Rescue Tracking', path: '/donor/rescue-tracking', icon: Truck },
          { name: 'Food Safety Passports', path: '/donor/passports', icon: QrCode },
          { name: 'Predictive Surplus', path: '/donor/predictive-surplus', icon: Sparkles },
          { name: 'Impact & Credits', path: '/donor/impact-rewards', icon: Award },
          { name: 'Profile & Kitchen Settings', path: '/profile', icon: Settings },
        ];

      case 'acceptor':
        return [
          { name: 'Acceptor Dashboard', path: '/acceptor/dashboard', icon: LayoutDashboard },
          { name: 'Available Food', path: '/acceptor/available-food', icon: UtensilsCrossed },
          { name: 'My Requests', path: '/acceptor/my-requests', icon: Inbox },
          { name: 'Incoming Deliveries', path: '/acceptor/incoming-deliveries', icon: Truck },
          { name: 'Receipt Confirmation (OTP)', path: '/acceptor/receipt-confirmation', icon: CheckCircle },
          { name: 'Food Receipt History', path: '/acceptor/food-history', icon: History },
          { name: 'Profile & Settings', path: '/profile', icon: Settings },
        ];

      case 'ngo':
        return [
          { name: 'NGO Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
          { name: 'Eligible Food Feed', path: '/ngo/available-food', icon: UtensilsCrossed },
          { name: 'My Food Requests', path: '/ngo/my-requests', icon: Inbox },
          { name: 'Rescue Missions', path: '/ngo/rescue-missions', icon: Truck },
          { name: 'Volunteer Dispatch', path: '/ngo/volunteers', icon: Users },
          { name: 'Capacity & Restrictions', path: '/ngo/capacity', icon: Building2 },
          { name: 'Beneficiary Management', path: '/ngo/beneficiaries', icon: HeartHandshake },
          { name: 'Distribution Records', path: '/ngo/distribution', icon: ClipboardList },
          { name: 'Impact Reports', path: '/ngo/impact-reports', icon: BarChart3 },
          { name: 'Profile & Settings', path: '/profile', icon: Settings },
        ];

      case 'common_people':
      default:
        const baseItems = [
          { name: 'Community Home', path: '/community/home', icon: LayoutDashboard },
          { name: 'Nearby Food Points', path: '/community/nearby-food', icon: UtensilsCrossed },
          { name: 'Tamil Nadu Rescue Map', path: '/community-map', icon: MapPin },
          { name: 'Report Food Waste', path: '/community/report-waste', icon: AlertTriangle },
          { name: 'Report Community Need', path: '/community/report-need', icon: Radio },
        ];

        if (isVolunteerApproved) {
          baseItems.push(
            { name: 'My Rescue Tasks (Active)', path: '/volunteer/tasks', icon: Truck },
            { name: 'Volunteer Rescue History', path: '/volunteer/history', icon: History }
          );
        } else {
          baseItems.push({
            name: 'Register as Volunteer',
            path: '/community/volunteer-register',
            icon: Users,
          });
        }

        baseItems.push({ name: 'Profile Settings', path: '/profile', icon: Settings });
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-softSage min-h-[calc(100vh-6rem)] hidden lg:flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* User Card */}
        <div className="flex items-center space-x-3 p-3 bg-warmCream/60 rounded-xl mb-4 border border-softSage">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-forest"
          />
          <div className="overflow-hidden">
            <h5 className="font-bold text-xs text-deepCharcoal truncate">{user?.full_name}</h5>
            <span className="text-[10px] uppercase font-bold text-forest block truncate">
              {role.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-forest text-white shadow-sm'
                      : 'text-deepCharcoal hover:bg-warmCream/70 hover:text-forest'
                  }`
                }
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Trust & Safety Verified Badge */}
      <div className="p-3 bg-forest/5 rounded-xl border border-forest/20 text-center">
        <ShieldCheck className="w-5 h-5 text-forest mx-auto mb-1" />
        <span className="text-[11px] font-bold text-forest block">Verified Organisation</span>
        <span className="text-[10px] text-mutedGrey">TN Food Safety Standards 2026</span>
      </div>
    </aside>
  );
};
