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
  const [selectedStationKey, setSelectedStationKey] = useState<string>('umeda');

  if (!isOpen) return null;

  const stationList = Object.values(stations);
  const currentStation = stations[selectedStationKey] || stationList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-bridge-card border border-bridge-border rounded-3xl shadow-luxury flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-bridge-border bg-bridge-surface/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bridge-cyan/15 text-bridge-cyan border border-bridge-cyan/30 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-bridge-text">
                Osaka Metro Station Accessibility Directory
              </h2>
              <p className="text-xs text-bridge-muted">
                Verified elevator exits, step-free boarding cars, and senior quiet rest lounges.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-bridge-surface hover:bg-bridge-cardHover text-bridge-muted hover:text-bridge-text flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Station Selector Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-bridge-border p-4 overflow-y-auto space-y-2 bg-bridge-surface/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-bridge-muted px-2 block mb-2">
              Select Station
            </span>
            {stationList.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStationKey(st.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedStationKey === st.id
                    ? 'bg-bridge-violet text-white shadow-luxury'
                    : 'text-bridge-muted hover:bg-bridge-surface hover:text-bridge-text'
                }`}
              >
                <div>
                  <div className="text-xs">{st.name_en}</div>
                  <div className={`text-[10px] ${selectedStationKey === st.id ? 'text-violet-200' : 'text-bridge-subtle'}`}>
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
                  <span className="text-[10px] font-bold text-bridge-cyan uppercase tracking-wider">
                    {currentStation.district}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-bridge-text flex items-baseline gap-3">
                  <span>{currentStation.name_en}</span>
                  <span className="text-base text-bridge-osakaRed">{currentStation.name_ja}</span>
                </h3>
                <p className="text-xs text-bridge-muted font-mono">
                  {currentStation.romaji}
                </p>
              </div>

              {/* Transit Lines Available */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bridge-muted block mb-2">
                  Connected Transit Lines:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStation.lines.map((line, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-bridge-surface border border-bridge-border text-bridge-text"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accessible Exits */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bridge-muted block mb-2 flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-bridge-cyan" />
                  <span>Verified Step-Free & Elevator Exits:</span>
                </span>
                <div className="space-y-3">
                  {currentStation.accessible_exits.map((exit, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-bridge-surface border border-bridge-border"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-bridge-cyan">
                          {exit.exit}
                        </span>
                        <span className="text-[10px] text-bridge-muted">
                          Best for: {exit.best_for}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {exit.features.map((feat, fidx) => (
                          <span
                            key={fidx}
                            className="text-[11px] px-2 py-0.5 rounded bg-bridge-card text-bridge-text border border-bridge-border"
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
                <div className="p-3.5 rounded-xl bg-bridge-surface border border-bridge-border">
                  <span className="text-xs font-bold text-bridge-cyan block mb-1">
                    🚆 Boarding Tip (Wheelchair / Stroller)
                  </span>
                  <p className="text-xs text-bridge-muted leading-relaxed">
                    {currentStation.boarding_tips}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-bridge-surface border border-bridge-border">
                  <span className="text-xs font-bold text-bridge-osakaGold block mb-1">
                    ☕ Senior Quiet Rest Zone
                  </span>
                  <p className="text-xs text-bridge-muted leading-relaxed">
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-bridge-violet hover:bg-bridge-violetHover text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-luxury transition-all"
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
