import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { SafetyIncidentModal } from '../../components/modals/SafetyIncidentModal';
import { Link } from 'react-router-dom';
import {
  AlertOctagon,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  PlusCircle,
  FileText,
  Search,
} from 'lucide-react';

export const SafetyIncidentsPage: React.FC = () => {
  const { incidents, resolveIncident } = useData();
  const [showModal, setShowModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filtered = incidents.filter((i) =>
    filterSeverity === 'all' ? true : i.severity === filterSeverity
  );

  return (
    <div className="space-y-6">
      {showModal && <SafetyIncidentModal onClose={() => setShowModal(false)} />}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cherryRed bg-red-100 px-2.5 py-0.5 rounded-full border border-cherryRed/30">
              Protocol Feature 7
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-mutedGrey">
              FSSAI & Tamil Nadu Food Safety Standards
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            Food Safety Incidents & Recall Management
          </h2>
          <p className="text-xs text-mutedGrey">
            Immediate batch freezing, containment audits, and transparent recall closure
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-cherryRed hover:bg-cherryRed-dark text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
        >
          <AlertOctagon className="w-4 h-4" />
          Log Safety Incident (Freeze Batch)
        </button>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-deepCharcoal">
            Logged Safety Incidents ({filtered.length})
          </h3>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-white border border-softSage rounded-xl px-3 py-1.5 text-xs text-deepCharcoal font-semibold"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High Only</option>
            <option value="medium">Medium Only</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.map((inc) => (
            <div
              key={inc.id}
              className={`p-5 rounded-2xl border shadow-subtle bg-white space-y-3 ${
                inc.is_frozen ? 'border-cherryRed/50' : 'border-softSage'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-softSage">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-xs bg-red-100 text-cherryRed px-2.5 py-1 rounded-lg">
                    {inc.incident_code}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-deepCharcoal">
                      Batch: {inc.batch_id} — {inc.food_name || 'Food Batch'}
                    </h4>
                    <span className="text-[11px] text-mutedGrey">
                      Reported by: <strong>{inc.reporter_name}</strong> on{' '}
                      {new Date(inc.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      inc.severity === 'critical'
                        ? 'bg-cherryRed text-white'
                        : 'bg-warmOrange text-white'
                    }`}
                  >
                    {inc.severity} SEVERITY
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      inc.is_frozen
                        ? 'bg-red-50 text-cherryRed border border-cherryRed/30'
                        : 'bg-green-50 text-statusGreen border border-statusGreen/30'
                    }`}
                  >
                    {inc.is_frozen ? '🔒 BATCH FROZEN' : 'CLEARED'}
                  </span>
                </div>
              </div>

              <div className="bg-warmCream/40 p-3 rounded-xl border border-softSage text-xs">
                <span className="font-bold text-deepCharcoal block mb-0.5">Observation / Hazard:</span>
                <p className="text-deepCharcoal leading-relaxed">{inc.description}</p>
                {inc.resolution_notes && (
                  <p className="text-forest font-semibold mt-1.5 pt-1.5 border-t border-softSage">
                    Resolution: {inc.resolution_notes}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link
                  to={`/passport/${inc.batch_id}`}
                  className="text-xs font-bold text-forest hover:underline"
                >
                  View Passport Audit Record →
                </Link>

                {inc.is_frozen && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        resolveIncident(inc.id, 'cleared', 'Cleared after laboratory inspection')
                      }
                      className="bg-statusGreen text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-forest transition"
                    >
                      Clear & Release Batch
                    </button>
                    <button
                      onClick={() =>
                        resolveIncident(
                          inc.id,
                          'recalled',
                          'Official recall confirmed. Safe disposal executed.'
                        )
                      }
                      className="bg-cherryRed text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-cherryRed-dark transition"
                    >
                      Confirm Permanent Recall
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
