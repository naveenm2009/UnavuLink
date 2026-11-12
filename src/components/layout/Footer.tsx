import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deepCharcoal text-white pt-12 pb-8 border-t border-forest-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <img src="/logo/favicon.svg" alt="UnavuLink" className="w-8 h-8" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Unavu<span className="text-warmOrange">Link</span>
              </span>
            </div>
            <p className="text-xs text-softSage leading-relaxed">
              Predicting Surplus. Prioritising Need. Delivering Food Safely.
            </p>
            <p className="text-[11px] text-mutedGrey">
              Every Meal Deserves a Destination. Every Rescue Makes a Difference.
            </p>
          </div>

          {/* Platform Links */}
          <div className="text-xs space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-warmCream/90 mb-3">Platform</h5>
            <p><Link to="/explore-food" className="text-softSage hover:text-white transition">Explore Food Surplus</Link></p>
            <p><Link to="/community-map" className="text-softSage hover:text-white transition">Tamil Nadu Rescue Map</Link></p>
            <p><Link to="/live-impact" className="text-softSage hover:text-white transition">Live Impact Metrics</Link></p>
            <p><Link to="/how-it-works" className="text-softSage hover:text-white transition">How UnavuLink Works</Link></p>
            <p><Link to="/community/volunteer-register" className="text-softSage hover:text-white transition">Become a Volunteer</Link></p>
          </div>

          {/* Safety & Compliance */}
          <div className="text-xs space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-warmCream/90 mb-3">Food Safety First</h5>
            <p className="text-softSage flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
              QR Food Safety Passport
            </p>
            <p className="text-softSage flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
              Automated Safety Eligibility Gate
            </p>
            <p className="text-softSage flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
              Dual OTP Chain-of-Custody
            </p>
            <p className="text-softSage flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
              Cold Chain & Recall Management
            </p>
          </div>

          {/* Regional Hubs & Contact */}
          <div className="text-xs space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-warmCream/90 mb-3">Tamil Nadu Command</h5>
            <p className="text-softSage flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-warmOrange shrink-0" />
              Coimbatore Central Command Hub, TN
            </p>
            <p className="text-softSage flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-warmOrange shrink-0" />
              Toll-Free Rescue Helpline: 1800-425-UNAVU
            </p>
            <p className="text-softSage flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-warmOrange shrink-0" />
              rescue@unavulink.org
            </p>
            <div className="pt-2">
              <span className="inline-block bg-forest/30 border border-forest/40 text-[10px] text-warmCream font-medium px-2 py-1 rounded">
                TN Hackathon 2026 Evaluation Prototype
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-mutedGrey">
          <p>© 2026 UnavuLink Ecosystem. Built for Social Good across Tamil Nadu, India.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Rescue</Link>
            <Link to="/fssai-guidelines" className="hover:text-white transition">FSSAI Hygiene Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
