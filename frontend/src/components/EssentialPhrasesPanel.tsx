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
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-bridge-card border border-bridge-border rounded-3xl shadow-luxury flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-bridge-border bg-bridge-surface/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-bridge-text">
                Essential Osaka Travel & Accessibility Phrases
              </h2>
              <p className="text-xs text-bridge-muted">
                Bilingual cards with furigana, romaji pronunciation, and staff flashcard mode.
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

        {/* Phrases List Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phrases.map((phrase) => (
              <div
                key={phrase.id}
                className="rounded-2xl bg-bridge-surface/90 border border-bridge-border p-5 hover:border-bridge-borderLight transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      phrase.category === 'emergency'
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        : phrase.category === 'food_dietary'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : phrase.category === 'accessibility'
                        ? 'bg-bridge-cyan/15 text-bridge-cyan border border-bridge-cyan/30'
                        : 'bg-bridge-violet/15 text-bridge-violet border border-bridge-violet/30'
                    }`}>
                      {phrase.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-bridge-text">
                      {phrase.title}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-bridge-text mb-1">
                    {phrase.japanese}
                  </p>
                  <p className="text-xs font-mono font-medium text-bridge-osakaGold mb-2">
                    {phrase.romaji}
                  </p>
                  <p className="text-xs text-bridge-muted italic mb-3">
                    "{phrase.english}"
                  </p>
                  <p className="text-[11px] text-bridge-subtle mb-4 bg-bridge-card p-2 rounded-lg border border-bridge-border/50">
                    💡 {phrase.context}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-bridge-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => onPlayPhraseAudio(phrase)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bridge-card hover:bg-bridge-cardHover text-xs font-medium text-bridge-text border border-bridge-border transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-bridge-cyan" />
                    <span>Play Audio</span>
                  </button>

                  <button
                    onClick={() => onSelectPhraseForStaffCard(phrase)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bridge-violet hover:bg-bridge-violetHover text-white text-xs font-semibold shadow-sm transition-colors"
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
        <div className="px-6 py-3 border-t border-bridge-border bg-bridge-surface/50 text-xs text-bridge-muted flex items-center justify-between">
          <span>Tap "Show Flashcard" to display oversized Japanese text to drivers and staff.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-bridge-surface hover:bg-bridge-cardHover text-xs font-semibold text-bridge-text border border-bridge-border transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
