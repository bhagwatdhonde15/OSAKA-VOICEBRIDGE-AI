import React from 'react';
import { Volume2, Accessibility, Eye, MapPin, BookOpen } from 'lucide-react';
import type { HealthStatus } from '../types';

interface NavbarProps {
  health: HealthStatus | null;
  seniorMode: boolean;
  onToggleSeniorMode: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  wheelchairMode: boolean;
  onToggleWheelchairMode: () => void;
  onOpenStationGuide: () => void;
  onOpenPhrases: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  health,
  seniorMode,
  onToggleSeniorMode,
  highContrast,
  onToggleHighContrast,
  wheelchairMode,
  onToggleWheelchairMode,
  onOpenStationGuide,
  onOpenPhrases
}) => {
  const isElevenLabsLive = health?.voice_engine?.elevenlabs_configured;

  return (
    <header className="sticky top-0 z-40 bg-osaka-bg/90 backdrop-blur-md border-b border-osaka-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-osaka-red via-red-600 to-amber-500 shadow-neon-red">
            <span className="text-white font-black text-2xl tracking-tighter">大</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-osaka-bg" title="Voice Bridge Online" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                OSAKA <span className="text-osaka-red">VOICEBRIDGE</span> AI
              </h1>
              <span className="hidden md:inline-flex text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Impact Osaka 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <span>大阪ボイスブリッジ</span>
              <span className="text-slate-600">•</span>
              <span>Multilingual Voice & Accessibility Assistant</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Accessibility Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Nav Buttons */}
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <button
              onClick={onOpenStationGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-osaka-surface border border-osaka-border text-xs font-semibold text-slate-300 hover:text-white hover:border-osaka-cyan/50 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-osaka-cyan" />
              <span>Station Directory</span>
            </button>
            <button
              onClick={onOpenPhrases}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-osaka-surface border border-osaka-border text-xs font-semibold text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Phrase Cards</span>
            </button>
          </div>

          {/* Voice Engine Status Badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isElevenLabsLive
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-950/40 text-amber-300 border-amber-500/40'
            }`}
            title={
              isElevenLabsLive
                ? 'ElevenLabs Neural Voice Synthesis active'
                : 'Demo/Fallback Mode: Web Speech API active. Add ELEVENLABS_API_KEY in .env for neural voice.'
            }
          >
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[11px]">
              {isElevenLabsLive ? 'ElevenLabs AI' : 'Web Speech Mode'}
            </span>
          </div>

          {/* Accessibility: Wheelchair Step-Free Priority */}
          <button
            onClick={onToggleWheelchairMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              wheelchairMode
                ? 'bg-osaka-green/20 text-emerald-300 border-osaka-green shadow-[0_0_12px_rgba(0,153,68,0.3)]'
                : 'bg-osaka-surface text-slate-400 border-osaka-border hover:text-slate-200'
            }`}
            title="Toggle Step-free & Elevator Priority Route"
            aria-label="Toggle Wheelchair Mode"
          >
            <Accessibility className="w-4 h-4" />
            <span className="hidden sm:inline">Step-Free</span>
          </button>

          {/* Accessibility: Senior Font Scale (+30%) */}
          <button
            onClick={onToggleSeniorMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              seniorMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-neon-gold'
                : 'bg-osaka-surface text-slate-400 border-osaka-border hover:text-slate-200'
            }`}
            title="Senior Accessible Mode: Larger fonts and clearer buttons"
            aria-label="Toggle Senior Font Mode"
          >
            <span className="font-bold text-sm">A+</span>
            <span className="hidden sm:inline">Senior Text</span>
          </button>

          {/* Accessibility: High Contrast */}
          <button
            onClick={onToggleHighContrast}
            className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
              highContrast
                ? 'bg-white text-black border-white'
                : 'bg-osaka-surface text-slate-400 border-osaka-border hover:text-slate-200'
            }`}
            title="Toggle High Contrast Mode (WCAG AAA)"
            aria-label="Toggle High Contrast"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
