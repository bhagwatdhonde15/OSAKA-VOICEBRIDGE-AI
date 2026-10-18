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
    <div className="rounded-3xl bg-bridge-card/90 border border-bridge-border shadow-luxury p-6 sm:p-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-bridge-border">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30 uppercase tracking-wider">
              {data.category.toUpperCase()}
            </span>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-bridge-surface text-bridge-muted border border-bridge-border">
              Language: {data.detected_language.label} ({data.detected_language.name})
            </span>
            {accessibility_analysis.step_free_required && (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-bridge-cyan/15 text-bridge-cyan border border-bridge-cyan/30 flex items-center gap-1">
                <Accessibility className="w-3.5 h-3.5" />
                Step-Free Priority
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-bridge-text flex items-baseline gap-3">
            <span>{destination.name_en}</span>
            <span className="text-base sm:text-lg font-bold text-bridge-osakaRed font-sans">
              {destination.name_ja}
            </span>
          </h2>
          <p className="text-xs text-bridge-muted font-mono mt-0.5">
            {destination.romaji}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {data.staff_card && (
            <button
              onClick={onOpenStaffCard}
              className="px-4 py-2.5 rounded-xl bg-bridge-violet hover:bg-bridge-violetHover text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-luxury transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Show to Station Staff</span>
            </button>
          )}

          <button
            onClick={onPlayAudio}
            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isPlayingAudio
                ? 'bg-bridge-cyan text-slate-950 border-bridge-cyan shadow-[0_0_15px_rgba(103,232,249,0.3)]'
                : 'bg-bridge-surface text-bridge-text border-bridge-border hover:border-bridge-borderLight'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>{isPlayingAudio ? 'Playing...' : 'Voice Guide'}</span>
          </button>
        </div>
      </div>

      {/* Accessibility Constraint Summary Banner */}
      {accessibility_analysis.has_accessibility_need && (
        <div className="my-5 p-4 rounded-2xl bg-bridge-surface/90 border border-bridge-cyan/25 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-bridge-cyan flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-bridge-text">
            <span className="font-semibold text-bridge-cyan block mb-0.5">
              Verified Accessibility Guidance Applied:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-bridge-muted">
              {accessibility_analysis.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Transit Steps Timeline */}
      <div className="my-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-bridge-muted mb-2 flex items-center gap-2">
          <Compass className="w-4 h-4 text-bridge-cyan" />
          <span>Step-by-Step Route Guidance</span>
        </h3>

        <div className="relative border-l-2 border-bridge-border ml-4 pl-6 space-y-5">
          {steps.map((step) => (
            <div key={step.step} className="relative group">
              {/* Step Circle Indicator */}
              <div
                className="absolute -left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md border-2 border-bridge-card"
                style={{ backgroundColor: step.badge_color || '#8B5CF6' }}
              >
                {step.step}
              </div>

              {/* Step Content Box */}
              <div className="rounded-2xl bg-bridge-surface/80 border border-bridge-border p-4 hover:border-bridge-borderLight transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm sm:text-base font-bold text-bridge-text">
                    {step.title}
                  </h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: step.badge_color || '#8B5CF6' }}
                  >
                    {step.transit_line}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-bridge-muted leading-relaxed mb-3">
                  {step.instruction}
                </p>

                {/* Accessible Feature Highlight */}
                {step.accessible_feature && (
                  <div className="flex items-center gap-2 text-xs font-medium text-bridge-cyan bg-bridge-card border border-bridge-cyan/20 px-3 py-1.5 rounded-xl">
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
        <div className="my-6 rounded-2xl bg-bridge-surface/90 border border-bridge-osakaGold/30 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-bridge-osakaGold uppercase tracking-wider flex items-center gap-1.5">
              <span>🇯🇵 Essential Japanese Phrase</span>
            </span>
            <span className="text-[10px] text-bridge-muted font-mono">
              Category: {action_phrase.category}
            </span>
          </div>

          <p className="text-base sm:text-xl font-bold text-bridge-text mb-1">
            {action_phrase.japanese}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-bridge-osakaGold font-mono mb-2">
            {action_phrase.romaji}
          </p>
          <p className="text-xs text-bridge-muted italic">
            "{action_phrase.english}"
          </p>

          <div className="mt-3 pt-3 border-t border-bridge-border flex items-center justify-between">
            <span className="text-[11px] text-bridge-subtle">
              {action_phrase.context}
            </span>
            <button
              onClick={onOpenStaffCard}
              className="text-xs font-bold text-bridge-osakaGold hover:underline flex items-center gap-1"
            >
              <span>View Fullscreen Flashcard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Station Tips & Quiet Zones */}
      {destination.quiet_rest_zones && (
        <div className="my-4 p-4 rounded-2xl bg-bridge-surface border border-bridge-border text-xs text-bridge-muted flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-bridge-cyan flex-shrink-0" />
            <span>
              <strong className="text-bridge-text">Senior Quiet Rest Zone:</strong> {destination.quiet_rest_zones}
            </span>
          </div>
        </div>
      )}

      {/* Data Integrity & Verification Disclaimer Pill */}
      <div className="mt-6 pt-4 border-t border-bridge-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-bridge-subtle gap-2">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>{meta.live_status_note}</span>
        </div>
        <div className="flex items-center gap-1.5 text-bridge-muted font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-bridge-emerald flex-shrink-0" />
          <span>{meta.data_source}</span>
        </div>
      </div>

    </div>
  );
};
