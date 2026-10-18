import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-bridge-border bg-bridge-surface/60 text-bridge-muted backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Startup Impact & Scalability Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-bridge-card/90 border border-bridge-border shadow-luxury">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-bridge-border">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30 uppercase tracking-widest block w-fit mb-2">
                Scalability Roadmap • 2026 and Beyond
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-bridge-text">
                The Osaka Blueprint for Global Urban Accessibility
              </h3>
              <p className="text-xs sm:text-sm text-bridge-muted mt-1 max-w-2xl">
                How a voice-first accessibility assistant tested in Osaka scales to solve transit barriers worldwide.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-2.5 rounded-2xl bg-bridge-surface border border-bridge-border text-center">
                <span className="text-lg font-black text-bridge-cyan block">28M+</span>
                <span className="text-[10px] text-bridge-muted uppercase">Kansai Tourists/Yr</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-bridge-surface border border-bridge-border text-center">
                <span className="text-lg font-black text-bridge-violet block">133</span>
                <span className="text-[10px] text-bridge-muted uppercase">Metro Stations</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-bridge-surface border border-bridge-border text-center">
                <span className="text-lg font-black text-bridge-emerald block">100%</span>
                <span className="text-[10px] text-bridge-muted uppercase">Step-Free Data</span>
              </div>
            </div>
          </div>

          {/* 3-Stage Rollout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-bridge-surface/80 border border-bridge-border">
              <span className="text-[10px] font-bold text-bridge-cyan block mb-1">PHASE 1: OSAKA 2026</span>
              <h4 className="text-sm font-bold text-bridge-text mb-1">Metro, KIX & Dotonbori Hubs</h4>
              <p className="text-xs text-bridge-muted leading-relaxed">
                Core deployment across Kansai International Airport, high-density Osaka Metro transfers, and Dotonbori culinary zones.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-bridge-surface/80 border border-bridge-border">
              <span className="text-[10px] font-bold text-bridge-violet block mb-1">PHASE 2: JAPAN NATIONAL RAIL</span>
              <h4 className="text-sm font-bold text-bridge-text mb-1">JR West & Shinkansen Network</h4>
              <p className="text-xs text-bridge-muted leading-relaxed">
                Extending modular routing to Shinkansen bullet trains, Kyoto heritage bus lines, and the Greater Tokyo rail complex.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-bridge-surface/80 border border-bridge-border">
              <span className="text-[10px] font-bold text-bridge-osakaGold block mb-1">PHASE 3: GLOBAL CITIES</span>
              <h4 className="text-sm font-bold text-bridge-text mb-1">Universal Multi-Operator Standard</h4>
              <p className="text-xs text-bridge-muted leading-relaxed">
                Adapting the VoiceBridge architecture for international transit networks in Paris, London, and Seoul.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-bridge-violet flex items-center justify-center text-white font-black text-sm shadow-sm">
                大
              </div>
              <span className="text-sm font-bold tracking-tight text-bridge-text">
                OSAKA VOICEBRIDGE AI
              </span>
            </div>
            <p className="text-xs text-bridge-muted leading-relaxed max-w-lg">
              Engineered for the <strong>Impact Osaka Hackathon 2026</strong>. Eliminating language barriers and physical accessibility obstacles experienced by international tourists and aging visitors navigating Osaka, Japan.
            </p>
            <div className="flex items-center gap-2 text-xs text-bridge-cyan font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>WCAG AAA & Universal Step-Free Design</span>
            </div>
          </div>

          {/* Column 2: Tech Architecture */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bridge-text">
              Technology Stack
            </h4>
            <ul className="text-xs space-y-1.5 text-bridge-muted">
              <li>• ElevenLabs Neural Voice API</li>
              <li>• Web Speech Recognition Engine</li>
              <li>• Python FastAPI Decision Engine</li>
              <li>• React 19 + TypeScript + Tailwind</li>
              <li>• OpenStreetMap Leaflet Geo-layer</li>
            </ul>
          </div>

          {/* Column 3: Data Integrity Pledge */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bridge-text">
              Data Integrity Pledge
            </h4>
            <p className="text-xs text-bridge-muted leading-relaxed">
              We never fabricate live train delays or fake accessibility certification. Station elevator numbers match verified municipal records.
            </p>
            <span className="inline-block text-[10px] text-bridge-osakaGold font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Verified Hackathon Dataset v1.0
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-bridge-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-bridge-subtle gap-3">
          <p className="flex items-center gap-1">
            <span>Crafted for Impact Osaka Hackathon 2026</span>
          </p>
          <p className="font-mono text-[11px]">
            “One city. Every language. No one left behind.”
          </p>
        </div>

      </div>
    </footer>
  );
};
