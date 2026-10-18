import React from 'react';
import {
  Compass,
  ArrowRight,
  Accessibility,
  Volume2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import type { QueryResponse } from '../types';

interface TransitRouteCardProps {
  data: QueryResponse;
  onOpenStaffCard: () => void;
  onPlayAudio: () => void;
  isPlayingAudio: boolean;
}

export const TransitRouteCard: React.FC<TransitRouteCardProps> = ({
  data,
  onOpenStaffCard,
  onPlayAudio,
  isPlayingAudio
}) => {
  const { destination, steps, accessibility_analysis, action_phrase, meta } = data;

  return (
    <div className="rounded-3xl bg-osaka-card border border-osaka-border shadow-xl p-6 sm:p-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-osaka-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-osaka-red/20 text-osaka-red border border-osaka-red/30 uppercase tracking-wider">
              {data.category.toUpperCase()}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-osaka-surface text-slate-300 border border-osaka-border">
              Detected: {data.detected_language.label} ({data.detected_language.name})
            </span>
            {accessibility_analysis.step_free_required && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Accessibility className="w-3.5 h-3.5" />
                Step-Free Priority
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-3">
            <span>{destination.name_en}</span>
            <span className="text-lg font-bold text-osaka-red font-sans">
              {destination.name_ja}
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {destination.romaji}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {data.staff_card && (
            <button
              onClick={onOpenStaffCard}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-osaka-red to-red-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-neon-red hover:brightness-110 active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Show to Station Staff</span>
            </button>
          )}

          <button
            onClick={onPlayAudio}
            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              isPlayingAudio
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-osaka-surface text-slate-200 border-osaka-border hover:border-slate-500'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>{isPlayingAudio ? 'Listening...' : 'Voice Guide'}</span>
          </button>
        </div>
      </div>

      {/* Accessibility Constraint Summary Banner */}
      {accessibility_analysis.has_accessibility_need && (
        <div className="my-5 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-200">
            <span className="font-bold text-emerald-300 block mb-0.5">
              Verified Accessibility Guidance Applied:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
              {accessibility_analysis.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Transit Steps Timeline */}
      <div className="my-6 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
          <Compass className="w-4 h-4 text-osaka-cyan" />
          <span>Step-by-Step Route Guidance</span>
        </h3>

        <div className="relative border-l-2 border-osaka-border ml-4 pl-6 space-y-6">
          {steps.map((step) => (
            <div key={step.step} className="relative group">
              {/* Step Circle Indicator */}
              <div
                className="absolute -left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md border-2 border-osaka-card"
                style={{ backgroundColor: step.badge_color || '#E5171F' }}
              >
                {step.step}
              </div>

              {/* Step Content Box */}
              <div className="rounded-2xl bg-osaka-surface/90 border border-osaka-border p-4 hover:border-slate-600 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-white">
                    {step.title}
                  </h4>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: step.badge_color || '#E5171F' }}
                  >
                    {step.transit_line}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-3">
                  {step.instruction}
                </p>

                {/* Accessible Feature Highlight */}
                {step.accessible_feature && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                    <Accessibility className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{step.accessible_feature}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Phrase Card if present */}
      {action_phrase && (
        <div className="my-6 rounded-2xl bg-gradient-to-r from-amber-950/30 to-osaka-surface border border-amber-500/30 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🇯🇵 Essential Japanese Phrase</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Category: {action_phrase.category}
            </span>
          </div>

          <p className="text-lg sm:text-xl font-bold text-white mb-1">
            {action_phrase.japanese}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-amber-300 font-mono mb-2">
            {action_phrase.romaji}
          </p>
          <p className="text-xs text-slate-300 italic">
            "{action_phrase.english}"
          </p>

          <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {action_phrase.context}
            </span>
            <button
              onClick={onOpenStaffCard}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
            >
              <span>View Fullscreen Flashcard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Station Tips & Quiet Zones */}
      {destination.quiet_rest_zones && (
        <div className="my-4 p-4 rounded-2xl bg-osaka-surface border border-osaka-border text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              <strong>Quiet Rest Zone for Seniors:</strong> {destination.quiet_rest_zones}
            </span>
          </div>
        </div>
      )}

      {/* Data Integrity & Verification Disclaimer Pill */}
      <div className="mt-6 pt-4 border-t border-osaka-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>{meta.live_status_note}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span>{meta.data_source}</span>
        </div>
      </div>

    </div>
  );
};
