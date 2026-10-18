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
    <div className="rounded-3xl bg-gradient-to-r from-osaka-card via-slate-900 to-osaka-surface border border-osaka-cyan/40 shadow-neon-cyan/20 p-5 sm:p-6 mb-8">
      
      {/* Panel Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-osaka-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-osaka-cyan/20 text-osaka-cyan border border-osaka-cyan/40 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-wide uppercase flex items-center gap-2">
              <span>AI Decision & Confidence Matrix</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Active Reasoning Core
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Modular assistant classification for intent, language, safety action, and uncertainty.
            </p>
          </div>
        </div>

        {/* Demo Mode / Live Status Indicator */}
        <div className="flex items-center gap-2">
          {demoMode && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5" title="Operating with verified local hackathon data to avoid hallucination">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              Verified Local Dataset
            </span>
          )}
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {voiceProviderName}
          </span>
        </div>
      </div>

      {/* Decision Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        
        {/* Metric 1: Detected Intent & Confidence */}
        <div className="p-3.5 rounded-2xl bg-osaka-surface/90 border border-osaka-border">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-osaka-red" />
              Detected Intent
            </span>
            <span className="font-mono font-bold text-emerald-400 text-[11px]">
              {decision.intent_confidence}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
            {decision.intent.replace(/_/g, ' ')}
          </p>
        </div>

        {/* Metric 2: Language & Confidence */}
        <div className="p-3.5 rounded-2xl bg-osaka-surface/90 border border-osaka-border">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-osaka-cyan" />
              Language Identified
            </span>
            <span className="font-mono font-bold text-emerald-400 text-[11px]">
              {decision.language_confidence}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white">
            {decision.language_detected}
          </p>
        </div>

        {/* Metric 3: Proposed Next Action */}
        <div className="sm:col-span-2 lg:col-span-2 p-3.5 rounded-2xl bg-osaka-surface/90 border border-osaka-border">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Proposed Action Plan
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Deterministic Safety Rule
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
            {decision.proposed_action}
          </p>
        </div>

      </div>

      {/* Uncertainty & Advisory Footnote */}
      <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200/90">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">Uncertainty Advisory & Verification Check: </span>
          <span>{decision.uncertainty_factor}</span>
        </div>
      </div>

    </div>
  );
};
