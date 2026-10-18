import React from 'react';
import { X, Volume2, Smartphone } from 'lucide-react';
import type { PhraseData } from '../types';

interface StaffFlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffCardText: string;
  phrase?: PhraseData;
  onPlayJapaneseAudio: () => void;
}

export const StaffFlashcardModal: React.FC<StaffFlashcardModalProps> = ({
  isOpen,
  onClose,
  staffCardText,
  phrase,
  onPlayJapaneseAudio
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-bridge-card border border-bridge-borderLight rounded-3xl shadow-luxury overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-bridge-card to-bridge-surface px-6 py-4 flex items-center justify-between border-b border-bridge-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bridge-violet/20 text-bridge-violet border border-bridge-violet/30 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-bridge-text tracking-wide uppercase">
                SHOW TO JAPANESE STATION STAFF
              </h3>
              <p className="text-[11px] text-bridge-muted font-medium">
                駅員・乗務員・店員様へのご案内画面
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-bridge-surface hover:bg-bridge-border text-bridge-muted hover:text-bridge-text flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Japanese Big Text Card */}
        <div className="p-6 sm:p-8 space-y-5">
          
          <div className="p-6 rounded-2xl bg-white text-slate-950 shadow-inner border border-slate-300">
            <div className="text-[11px] font-bold text-rose-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span>● 日本語メッセージ (For Station / Store Staff)</span>
            </div>
            
            <p className="text-xl sm:text-2xl md:text-3xl font-black leading-snug tracking-normal text-slate-900 whitespace-pre-line font-sans">
              {staffCardText || phrase?.japanese || 'すみません、エレベーターの場所を教えていただけますか？'}
            </p>

            {phrase?.romaji && (
              <p className="mt-4 pt-3 border-t border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 font-mono">
                Pronunciation: {phrase.romaji}
              </p>
            )}
          </div>

          {/* Tourist English Explanation */}
          <div className="p-4 rounded-xl bg-bridge-surface border border-bridge-border text-bridge-muted text-xs sm:text-sm">
            <span className="font-semibold text-bridge-cyan block mb-1">
              What this card says in English:
            </span>
            <p className="italic text-bridge-text/90">
              "{phrase?.english || 'Traveler is requesting step-free accessibility guidance from station personnel.'}"
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={onPlayJapaneseAudio}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-bridge-violet hover:bg-bridge-violetHover text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-luxury transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Play Japanese Audio Aloud</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-bridge-surface hover:bg-bridge-card text-bridge-muted hover:text-bridge-text font-medium text-xs sm:text-sm border border-bridge-border transition-all text-center"
            >
              Close Flashcard
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
