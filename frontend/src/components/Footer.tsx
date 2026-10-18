import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-osaka-border bg-osaka-surface/50 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-osaka-red flex items-center justify-center text-white font-black text-base shadow-neon-red">
                大
              </div>
              <span className="text-base font-black tracking-tight text-white">
                OSAKA VOICEBRIDGE AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
              Built for the <strong>Impact Osaka Hackathon 2026</strong>. Solving language barriers and physical accessibility obstacles experienced by international tourists and elderly visitors navigating Osaka, Japan.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Universal Accessibility (WCAG AAA & Step-Free Priority)</span>
            </div>
          </div>

          {/* Column 2: Tech Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Technology Architecture
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>• ElevenLabs Neural Speech API</li>
              <li>• Web Speech Recognition Engine</li>
              <li>• Python FastAPI Modular Decision Core</li>
              <li>• React 19 + TypeScript + Tailwind CSS</li>
              <li>• OpenStreetMap Leaflet Geo-layer</li>
            </ul>
          </div>

          {/* Column 3: Data Integrity Pledge */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Data Integrity Pledge
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never invent live train delays or fake accessibility certification. Station elevator numbers match verified Osaka Metro municipal guidelines.
            </p>
            <span className="inline-block text-[10px] text-amber-400/90 font-mono bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
              Static Hackathon Dataset v1.0
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-osaka-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-osaka-red fill-current" />
            <span>for Impact Osaka Hackathon 2026</span>
          </p>
          <p className="font-mono text-[11px]">
            Osaka, Kansai, Japan • 大阪府大阪市
          </p>
        </div>

      </div>
    </footer>
  );
};
