import React, { useState } from 'react';
import { MapPin, X, Accessibility, ArrowRight, Check } from 'lucide-react';
import type { StationData } from '../types';

interface StationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: Record<string, StationData>;
  onSelectStationForRouting: (stationName: string) => void;
}

export const StationGuideModal: React.FC<StationGuideModalProps> = ({
  isOpen,
  onClose,
  stations,
  onSelectStationForRouting
}) => {
  const [selectedStationKey, setSelectedStationKey] = useState<string>('namba');

  if (!isOpen) return null;

  const stationList = Object.values(stations);
  const currentStation = stations[selectedStationKey] || stationList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-osaka-card border border-osaka-border rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-osaka-border bg-osaka-surface/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-osaka-cyan/20 text-osaka-cyan border border-osaka-cyan/30 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Osaka Metro Station Accessibility Directory
              </h2>
              <p className="text-xs text-slate-400">
                Verified elevator exits, step-free boarding cars, and senior quiet rest lounges.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-osaka-surface hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Station Selector Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-osaka-border p-4 overflow-y-auto space-y-2 bg-osaka-surface/50">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 block mb-2">
              Select Station
            </span>
            {stationList.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStationKey(st.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  selectedStationKey === st.id
                    ? 'bg-osaka-red text-white shadow-neon-red'
                    : 'text-slate-300 hover:bg-osaka-surface hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs">{st.name_en}</div>
                  <div className={`text-[10px] ${selectedStationKey === st.id ? 'text-red-200' : 'text-slate-500'}`}>
                    {st.name_ja}
                  </div>
                </div>
                {selectedStationKey === st.id && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            ))}
          </div>

          {/* Station Details Panel */}
          {currentStation && (
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-osaka-cyan uppercase tracking-wider">
                    {currentStation.district}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white flex items-baseline gap-3">
                  <span>{currentStation.name_en}</span>
                  <span className="text-base text-osaka-red">{currentStation.name_ja}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {currentStation.romaji}
                </p>
              </div>

              {/* Transit Lines Available */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Connected Transit Lines:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStation.lines.map((line, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold px-3 py-1 rounded-lg bg-osaka-surface border border-osaka-border text-slate-200"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accessible Exits */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Step-Free & Elevator Exits:</span>
                </span>
                <div className="space-y-3">
                  {currentStation.accessible_exits.map((exit, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-osaka-surface border border-emerald-500/30"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-emerald-300">
                          {exit.exit}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Best for: {exit.best_for}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {exit.features.map((feat, fidx) => (
                          <span
                            key={fidx}
                            className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-200 border border-emerald-500/20"
                          >
                            ✔ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boarding Tips & Quiet Rest Zones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-osaka-surface border border-osaka-border">
                  <span className="text-xs font-bold text-osaka-cyan block mb-1">
                    🚆 Boarding Tip (Wheelchair / Stroller)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStation.boarding_tips}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-osaka-surface border border-osaka-border">
                  <span className="text-xs font-bold text-amber-400 block mb-1">
                    ☕ Senior Quiet Rest Zone
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStation.quiet_rest_zones || 'Station benches available inside concourse.'}
                  </p>
                </div>
              </div>

              {/* Route Plan Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectStationForRouting(currentStation.name_en);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-osaka-red to-red-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-neon-red hover:brightness-110 transition-all"
                >
                  <span>Ask VoiceBridge How to Reach {currentStation.name_en}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
