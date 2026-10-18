import React from 'react';
import { BookOpen, Volume2, Smartphone, X } from 'lucide-react';
import type { PhraseData } from '../types';

interface EssentialPhrasesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  phrases: PhraseData[];
  onSelectPhraseForStaffCard: (phrase: PhraseData) => void;
  onPlayPhraseAudio: (phrase: PhraseData) => void;
}

export const EssentialPhrasesPanel: React.FC<EssentialPhrasesPanelProps> = ({
  isOpen,
  onClose,
  phrases,
  onSelectPhraseForStaffCard,
  onPlayPhraseAudio
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-osaka-card border border-osaka-border rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-osaka-border bg-osaka-surface/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Essential Osaka Travel & Accessibility Phrases
              </h2>
              <p className="text-xs text-slate-400">
                Bilingual cards with furigana, romaji pronunciation, and staff flashcard mode.
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

        {/* Phrases List Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phrases.map((phrase) => (
              <div
                key={phrase.id}
                className="rounded-2xl bg-osaka-surface border border-osaka-border p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      phrase.category === 'emergency'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : phrase.category === 'food_dietary'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : phrase.category === 'accessibility'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {phrase.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {phrase.title}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-white mb-1">
                    {phrase.japanese}
                  </p>
                  <p className="text-xs font-mono font-medium text-amber-300 mb-2">
                    {phrase.romaji}
                  </p>
                  <p className="text-xs text-slate-300 italic mb-3">
                    "{phrase.english}"
                  </p>
                  <p className="text-[11px] text-slate-400 mb-4 bg-osaka-card p-2 rounded-lg border border-osaka-border/50">
                    💡 {phrase.context}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-osaka-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => onPlayPhraseAudio(phrase)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-osaka-card hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-osaka-border transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Play Audio</span>
                  </button>

                  <button
                    onClick={() => onSelectPhraseForStaffCard(phrase)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-neon-gold transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Show Flashcard</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-osaka-border bg-osaka-surface/50 text-xs text-slate-400 flex items-center justify-between">
          <span>Tap "Show Flashcard" to display oversized Japanese text to drivers and staff.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-osaka-surface hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
