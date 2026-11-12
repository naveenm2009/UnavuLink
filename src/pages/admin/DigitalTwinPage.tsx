import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Cpu, Play, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const { scenarios } = useData();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(true);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationCompleted(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationCompleted(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-warmOrange/15 text-warmOrange font-bold text-xs">
              <Cpu className="w-4 h-4 inline mr-1" /> Prototype Feature 9
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-mutedGrey">
              Deterministic Contingency Sandbox
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-deepCharcoal mt-1">
            Food Rescue Digital Twin Simulator
          </h2>
          <p className="text-xs text-mutedGrey">
            Simulate operational disruptions before they happen without corrupting live rescue records
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Computing Algorithmic Re-Route...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Simulation Model
            </>
          )}
        </button>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            onClick={() => {
              setSelectedScenarioId(sc.id);
              setSimulationCompleted(true);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition ${
              selectedScenarioId === sc.id
                ? 'border-forest bg-forest/5 shadow-subtle ring-1 ring-forest'
                : 'border-softSage bg-white hover:bg-warmCream/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-warmCream text-deepCharcoal border border-softSage">
                {sc.simulation_type.replace('_', ' ')}
              </span>
              <span className="text-xs font-bold text-forest">
                {sc.estimated_impact_recovery_rate}% Recovery Projected
              </span>
            </div>
            <h4 className="font-bold text-sm text-deepCharcoal">{sc.title}</h4>
          </div>
        ))}
      </div>

      {/* Side-by-Side Simulation Breakdown: Original Plan vs Disruption vs Contingency */}
      {activeScenario && simulationCompleted && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Original Rescue Dispatch */}
          <div className="bg-white p-5 rounded-2xl border border-softSage shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-forest uppercase tracking-wider">
                1. Initial Dispatch Plan
              </span>
              <CheckCircle2 className="w-4 h-4 text-forest" />
            </div>

            <div className="bg-warmCream/60 p-3 rounded-xl border border-softSage space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-mutedGrey">Batch Reference:</span>
                <strong className="font-mono text-deepCharcoal">
                  {activeScenario.original_plan.batch_id}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-mutedGrey">Initial Transport:</span>
                <span className="text-deepCharcoal font-semibold">
                  {activeScenario.original_plan.assigned_volunteer || 'Van Dispatch'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-mutedGrey">Planned Target:</span>
                <span className="text-deepCharcoal font-semibold">
                  {activeScenario.original_plan.destination || activeScenario.original_plan.target_ngo}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-mutedGrey">Initial ETA:</span>
                <span className="text-forest font-bold">
                  {activeScenario.original_plan.eta_minutes || 20} mins
                </span>
              </div>
            </div>
            <p className="text-[11px] text-mutedGrey italic">
              Original plan calculated by standard FairShare priority dispatch.
            </p>
          </div>

          {/* Card 2: Simulated Injected Disruption */}
          <div className="bg-white p-5 rounded-2xl border border-cherryRed/30 shadow-subtle space-y-3 bg-red-50/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cherryRed uppercase tracking-wider">
                2. Injected Failure Point
              </span>
              <AlertTriangle className="w-4 h-4 text-cherryRed" />
            </div>

            <div className="bg-red-50 p-3 rounded-xl border border-cherryRed/20 space-y-2 text-xs">
              <div>
                <span className="text-cherryRed font-bold block mb-1">Trigger Event:</span>
                <p className="text-deepCharcoal leading-relaxed">
                  {activeScenario.failure_point.trigger}
                </p>
              </div>

              {activeScenario.failure_point.location && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-mutedGrey">Failure Spot:</span>
                  <span className="font-semibold text-deepCharcoal">
                    {activeScenario.failure_point.location}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-mutedGrey">Shelf-Life Risk:</span>
                <span className="font-bold text-cherryRed">
                  Critical Spoilage within {activeScenario.failure_point.time_to_spoilage_mins || 90}m
                </span>
              </div>
            </div>
            <p className="text-[11px] text-cherryRed/80 italic">
              Simulation detects hazard without human dispatch delay.
            </p>
          </div>

          {/* Card 3: Autonomous Contingency Recommendation */}
          <div className="bg-white p-5 rounded-2xl border border-forest/30 shadow-subtle space-y-3 bg-green-50/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-statusGreen uppercase tracking-wider">
                3. Proposed AI Recovery
              </span>
              <Sparkles className="w-4 h-4 text-statusGreen" />
            </div>

            <div className="bg-green-50 p-3 rounded-xl border border-statusGreen/20 space-y-2 text-xs">
              <div>
                <span className="text-statusGreen font-bold block mb-1">Autonomous Recovery:</span>
                <p className="text-deepCharcoal leading-relaxed">
                  {activeScenario.proposed_recovery.recovery_action}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-mutedGrey">Protected Meals:</span>
                <strong className="text-statusGreen text-sm">
                  {activeScenario.proposed_recovery.meals_protected || 120} portions
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-mutedGrey">Carbon Saved:</span>
                <span className="font-bold text-forest">
                  {activeScenario.proposed_recovery.estimated_carbon_saved_kg || 94.5} kg CO₂
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Contingency plan verified. In live mode, this action safely executes via the Recovery Engine.')}
              className="w-full bg-forest hover:bg-forest-dark text-white font-bold text-xs py-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Apply Contingency into Live Queue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
