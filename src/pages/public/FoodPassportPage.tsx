import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { FoodSafetyPassportView } from '../../components/qr/FoodSafetyPassportView';
import { ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';

export const FoodPassportPage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const { getPassport, passports } = useData();

  const passport = batchId ? getPassport(batchId) : passports[0];

  if (!passport) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <AlertTriangle className="w-12 h-12 text-cherryRed mx-auto" />
        <h3 className="font-extrabold text-lg text-deepCharcoal">Passport Not Found</h3>
        <p className="text-xs text-mutedGrey">
          Batch ID <strong>{batchId}</strong> does not match any registered food passport in the database.
        </p>
        <Link
          to="/"
          className="inline-block bg-forest text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-xs font-bold text-mutedGrey hover:text-deepCharcoal flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Platform
        </Link>

        <span className="text-xs font-bold text-forest bg-forest/10 px-3 py-1 rounded-full border border-forest/20">
          Official FSSAI & Tamil Nadu Protocol Verified
        </span>
      </div>

      <FoodSafetyPassportView passport={passport} />
    </div>
  );
};
