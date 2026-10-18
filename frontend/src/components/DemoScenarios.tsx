import React from 'react';
import { Accessibility, Train, Languages, ArrowRight, Sparkles } from 'lucide-react';
import type { DemoScenario } from '../types';

interface DemoScenariosProps {
  scenarios: DemoScenario[];
  activeScenarioId?: string;
  onSelectScenario: (scenario: DemoScenario) => void;
}

export const DemoScenarios: React.FC<DemoScenariosProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'accessibility':
        return <Accessibility className="w-5 h-5 text-emerald-400" />;
      case 'train':
        return <Train className="w-5 h-5 text-osaka-red" />;
      case 'languages':
        return <Languages className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>Official Hackathon Demo Scenarios</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-osaka-red/20 text-osaka-red border border-osaka-red/40 uppercase tracking-wider font-bold">
              1-Click Test
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pre-configured real-world Osaka navigation challenges for international tourists & elderly visitors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map(scenario => {
          const isActive = activeScenarioId === scenario.id;
          return (
            <div
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-b from-osaka-card to-osaka-surface border-osaka-cyan shadow-neon-cyan scale-[1.02]'
                  : 'bg-osaka-card/80 border-osaka-border hover:border-slate-500 hover:bg-osaka-card hover:scale-[1.01]'
              }`}
            >
              {/* Badge & Icon */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-osaka-surface flex items-center justify-center border border-osaka-border group-hover:border-slate-500 transition-colors">
                    {getIcon(scenario.icon)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                    scenario.category === 'accessibility'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : scenario.category === 'transit'
                      ? 'bg-osaka-red/15 text-red-300 border border-osaka-red/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}>
                    {scenario.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-osaka-cyan transition-colors mb-1">
                  {scenario.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mb-3">
                  {scenario.subtitle}
                </p>

                <div className="p-3 rounded-xl bg-osaka-surface/90 border border-osaka-border/60 text-xs text-slate-300 italic mb-4">
                  "{scenario.user_query}"
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-osaka-border/50 flex items-center justify-between text-xs font-bold text-osaka-cyan group-hover:translate-x-1 transition-transform">
                <span>Run Scenario</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
