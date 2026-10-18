import React from 'react';
import { Cpu, AlertTriangle, Activity, Globe, Compass } from 'lucide-react';
import type { AIDecisionInfo } from '../types';

interface AIDecisionPanelProps {
  decision?: AIDecisionInfo;
  demoMode: boolean;
  voiceProviderName: string;
}

export const AIDecisionPanel: React.FC<AIDecisionPanelProps> = ({
  decision,
  demoMode,
  voiceProviderName
}) => {
  if (!decision) return null;

  return (
    <div className="rounded-3xl bg-bridge-card/90 border border-bridge-border shadow-luxury p-5 sm:p-6 mb-6">
      
      {/* Observability Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-bridge-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-bridge-text uppercase tracking-wider flex items-center gap-2">
              <span>AI Decision & Observability Core</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bridge-surface text-bridge-cyan border border-bridge-border">
                Active Reasoning
              </span>
            </h3>
            <p className="text-[11px] text-bridge-muted">
              Real-time classification for intent, language certainty, safety routing, and advisory flags.
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {demoMode && (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-bridge-surface text-amber-300 border border-amber-500/30 flex items-center gap-1.5" title="Operating with verified local hackathon data to avoid hallucination">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-ping" />
              Verified Local Dataset
            </span>
          )}
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-bridge-surface text-bridge-muted border border-bridge-border">
            {voiceProviderName}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        
        {/* Metric 1: Detected Intent & Confidence */}
        <div className="p-3.5 rounded-2xl bg-bridge-surface/90 border border-bridge-border">
          <div className="flex items-center justify-between text-[11px] text-bridge-muted mb-1">
            <span className="font-medium flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-bridge-violet" />
              Detected Intent
            </span>
            <span className="font-mono font-bold text-bridge-cyan text-xs">
              {decision.intent_confidence}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-bridge-text uppercase tracking-tight">
            {decision.intent.replace(/_/g, ' ')}
          </p>
        </div>

        {/* Metric 2: Language & Confidence */}
        <div className="p-3.5 rounded-2xl bg-bridge-surface/90 border border-bridge-border">
          <div className="flex items-center justify-between text-[11px] text-bridge-muted mb-1">
            <span className="font-medium flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-bridge-cyan" />
              Language Match
            </span>
            <span className="font-mono font-bold text-bridge-emerald text-xs">
              {decision.language_confidence}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-bridge-text">
            {decision.language_detected}
          </p>
        </div>

        {/* Metric 3: Proposed Next Action */}
        <div className="sm:col-span-2 lg:col-span-2 p-3.5 rounded-2xl bg-bridge-surface/90 border border-bridge-border">
          <div className="flex items-center justify-between text-[11px] text-bridge-muted mb-1">
            <span className="font-medium flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-bridge-osakaGold" />
              Action Policy Execution
            </span>
            <span className="text-[10px] text-bridge-muted font-mono">
              Deterministic Safety Rule
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-bridge-text line-clamp-1">
            {decision.proposed_action}
          </p>
        </div>

      </div>

      {/* Uncertainty & Advisory Footnote */}
      <div className="mt-3.5 p-3 rounded-xl bg-bridge-surface/60 border border-bridge-border flex items-start gap-2.5 text-xs text-bridge-muted">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-bridge-text">Uncertainty Advisory & Verification Check: </span>
          <span>{decision.uncertainty_factor}</span>
        </div>
      </div>

    </div>
  );
};
