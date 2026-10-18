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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border-2 border-osaka-red rounded-3xl shadow-[0_0_50px_rgba(229,23,31,0.5)] overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-osaka-red to-red-700 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wide">
                SHOW TO JAPANESE STATION STAFF
              </h3>
              <p className="text-xs text-red-100 font-medium">
                駅員・乗務員・店員様へのご案内画面
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Japanese Big Text Card */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white text-slate-950 shadow-inner border-2 border-slate-300">
            <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
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
          <div className="p-4 rounded-xl bg-osaka-surface border border-osaka-border text-slate-300 text-xs sm:text-sm">
            <span className="font-bold text-osaka-cyan block mb-1">
              What this card says in English:
            </span>
            <p className="italic">
              "{phrase?.english || 'Traveler is requesting step-free accessibility guidance from station personnel.'}"
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={onPlayJapaneseAudio}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Play Japanese Audio Aloud</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-osaka-surface hover:bg-osaka-border text-slate-200 font-semibold text-sm transition-all text-center"
            >
              Close Flashcard
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
