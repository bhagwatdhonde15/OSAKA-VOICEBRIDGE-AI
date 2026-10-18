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
    <header className="sticky top-0 z-40 bg-bridge-bg/85 backdrop-blur-xl border-b border-bridge-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-bridge-card to-bridge-surface border border-bridge-border shadow-luxury">
            <span className="text-bridge-text font-black text-xl tracking-tighter">大</span>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-bridge-cyan border-2 border-bridge-bg shadow-[0_0_8px_#67E8F9]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-bridge-text flex items-center gap-1.5 font-sans">
                <span>OSAKA</span>
                <span className="text-bridge-violet font-extrabold">VOICEBRIDGE</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-bridge-cyan/15 text-bridge-cyan border border-bridge-cyan/30 tracking-wider">
                  AI
                </span>
              </h1>
              <span className="hidden lg:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-bridge-surface text-bridge-muted border border-bridge-border">
                Impact Osaka 2026
              </span>
            </div>
            <p className="text-[11px] text-bridge-muted flex items-center gap-2 font-medium">
              <span>大阪ボイスブリッジ</span>
              <span className="text-bridge-border">•</span>
              <span className="hidden sm:inline">Next-Gen Multilingual Accessibility</span>
            </p>
          </div>
        </div>

        {/* Toolbar & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Direct Nav Buttons */}
          <div className="hidden md:flex items-center gap-1.5 mr-1">
            <button
              onClick={onOpenStationGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bridge-card hover:bg-bridge-cardHover border border-bridge-border text-xs font-medium text-bridge-text hover:border-bridge-cyan/40 transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-bridge-cyan" />
              <span>Stations</span>
            </button>
            <button
              onClick={onOpenPhrases}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bridge-card hover:bg-bridge-cardHover border border-bridge-border text-xs font-medium text-bridge-text hover:border-bridge-violet/40 transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-bridge-violet" />
              <span>Phrases</span>
            </button>
          </div>

          {/* ElevenLabs Status Pill */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
              isElevenLabsLive
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'bg-bridge-surface text-bridge-muted border-bridge-border'
            }`}
            title={
              isElevenLabsLive
                ? 'ElevenLabs Neural Speech Engine connected'
                : 'Web Speech Engine active. Set ELEVENLABS_API_KEY in .env for neural voice.'
            }
          >
            <Volume2 className="w-3.5 h-3.5 text-bridge-cyan" />
            <span>{isElevenLabsLive ? 'ElevenLabs AI' : 'Web Speech Mode'}</span>
          </div>

          {/* Accessibility: Step-Free Priority */}
          <button
            onClick={onToggleWheelchairMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              wheelchairMode
                ? 'bg-bridge-cyan/15 text-bridge-cyan border-bridge-cyan shadow-[0_0_12px_rgba(103,232,249,0.25)]'
                : 'bg-bridge-card text-bridge-muted border-bridge-border hover:text-bridge-text hover:border-bridge-borderLight'
            }`}
            title="Toggle Step-free & Elevator Priority Routing"
            aria-label="Toggle Wheelchair Mode"
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Step-Free</span>
          </button>

          {/* Accessibility: Senior Font Scale (+30%) */}
          <button
            onClick={onToggleSeniorMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              seniorMode
                ? 'bg-bridge-violet/20 text-bridge-violet border-bridge-violet shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                : 'bg-bridge-card text-bridge-muted border-bridge-border hover:text-bridge-text hover:border-bridge-borderLight'
            }`}
            title="Senior Accessible Mode: Larger fonts and higher readability"
            aria-label="Toggle Senior Font Mode"
          >
            <span className="font-bold text-xs">A+</span>
            <span className="hidden sm:inline">Senior</span>
          </button>

          {/* Accessibility: High Contrast */}
          <button
            onClick={onToggleHighContrast}
            className={`p-2 rounded-lg text-xs font-medium border transition-all ${
              highContrast
                ? 'bg-white text-black border-white'
                : 'bg-bridge-card text-bridge-muted border-bridge-border hover:text-bridge-text hover:border-bridge-borderLight'
            }`}
            title="Toggle High Contrast Mode (WCAG AAA)"
            aria-label="Toggle High Contrast"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
};
