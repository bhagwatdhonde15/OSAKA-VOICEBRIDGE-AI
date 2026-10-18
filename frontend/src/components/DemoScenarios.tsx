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
        return <Accessibility className="w-4 h-4 text-bridge-cyan" />;
      case 'train':
        return <Train className="w-4 h-4 text-bridge-violet" />;
      case 'languages':
        return <Languages className="w-4 h-4 text-bridge-osakaGold" />;
      default:
        return <Sparkles className="w-4 h-4 text-bridge-cyan" />;
    }
  };

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-bridge-text flex items-center gap-2">
            <span>Verified Hackathon Scenarios</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30 uppercase tracking-wider">
              1-Click Demo
            </span>
          </h2>
          <p className="text-xs text-bridge-muted mt-0.5">
            Demonstrating end-to-end voice assistance for Osaka's most frequent transit challenges.
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
              className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                isActive
                  ? 'bg-bridge-card border-bridge-cyan/60 shadow-[0_0_20px_rgba(103,232,249,0.15)] scale-[1.01]'
                  : 'bg-bridge-card/75 border-bridge-border hover:border-bridge-borderLight hover:bg-bridge-cardHover hover:shadow-luxury'
              }`}
            >
              {/* Card Header & Content */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-bridge-surface flex items-center justify-center border border-bridge-border group-hover:border-bridge-borderLight transition-colors">
                    {getIcon(scenario.icon)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    scenario.category === 'accessibility'
                      ? 'bg-bridge-cyan/15 text-bridge-cyan border border-bridge-cyan/30'
                      : scenario.category === 'transit'
                      ? 'bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}>
                    {scenario.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-bridge-text group-hover:text-bridge-cyan transition-colors mb-1">
                  {scenario.title}
                </h3>
                <p className="text-xs text-bridge-muted mb-3 font-medium">
                  {scenario.subtitle}
                </p>

                <div className="p-3 rounded-xl bg-bridge-surface/90 border border-bridge-border/60 text-xs text-bridge-text/90 italic mb-4 leading-relaxed">
                  "{scenario.user_query}"
                </div>
              </div>

              {/* Bottom Action Indicator */}
              <div className="pt-3 border-t border-bridge-border/50 flex items-center justify-between text-xs font-semibold text-bridge-cyan group-hover:translate-x-0.5 transition-transform">
                <span>Run Demonstration</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
