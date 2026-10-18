import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Play, Square, Send, Globe, Sparkles } from 'lucide-react';

interface VoiceHeroProps {
  isListening: boolean;
  isPlayingAudio: boolean;
  transcript: string;
  spokenResponseText: string;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onPlaySpokenResponse: () => void;
  onStopAudio: () => void;
  onSubmitTextQuery: (text: string) => void;
  audioSpeed: number;
  onChangeAudioSpeed: (speed: number) => void;
  voiceProviderName: string;
}

const LANGUAGES = [
  { code: 'en-US', label: 'English', flag: '🇺🇸', name: 'English' },
  { code: 'ja-JP', label: '日本語', flag: '🇯🇵', name: 'Japanese' },
  { code: 'hi-IN', label: 'हिन्दी', flag: '🇮🇳', name: 'Hindi' },
  { code: 'es-ES', label: 'Español', flag: '🇪🇸', name: 'Spanish' }
];

export const VoiceHero: React.FC<VoiceHeroProps> = ({
  isListening,
  isPlayingAudio,
  transcript,
  spokenResponseText,
  selectedLanguage,
  onLanguageChange,
  onStartListening,
  onStopListening,
  onPlaySpokenResponse,
  onStopAudio,
  onSubmitTextQuery,
  audioSpeed,
  onChangeAudioSpeed,
  voiceProviderName
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmitTextQuery(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-osaka-card via-osaka-surface to-osaka-bg border border-osaka-border shadow-2xl p-6 sm:p-8 md:p-10">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 rounded-full bg-osaka-red/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-osaka-cyan/10 blur-3xl pointer-events-none" />

      {/* Tagline & Impact Banner */}
      <div className="text-center pb-6 border-b border-osaka-border/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-osaka-red/15 border border-osaka-red/30 text-osaka-red text-xs font-black uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Impact Osaka Hackathon 2026</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          “One city. Every language. <span className="text-osaka-red">No one left behind.</span>”
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl mx-auto">
          Voice-first multilingual AI city assistant breaking language & physical mobility barriers across Osaka transit.
        </p>
      </div>

      {/* Language Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-osaka-border/60">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Globe className="w-4 h-4 text-osaka-cyan" />
          <span>Select Your Language:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-gradient-to-r from-osaka-red to-red-600 text-white shadow-neon-red scale-105'
                  : 'bg-osaka-surface text-slate-400 border border-osaka-border hover:text-white hover:border-slate-500'
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Voice Action Center */}
      <div className="py-8 flex flex-col items-center justify-center text-center">
        
        {/* Animated Big Mic Button */}
        <div className="relative mb-6">
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-osaka-cyan/30 animate-ping scale-125" />
              <div className="absolute inset-0 rounded-full bg-osaka-red/20 animate-pulse scale-150" />
            </>
          )}

          <button
            onClick={isListening ? onStopListening : onStartListening}
            className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none focus:ring-4 ${
              isListening
                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-neon-cyan scale-110 focus:ring-cyan-400/50'
                : 'bg-gradient-to-br from-osaka-red via-red-600 to-amber-600 text-white shadow-neon-red hover:scale-105 focus:ring-red-500/50'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start speaking'}
          >
            {isListening ? (
              <>
                <MicOff className="w-10 h-10 mb-1 animate-bounce" />
                <span className="text-[11px] font-black tracking-wider uppercase">Listening</span>
              </>
            ) : (
              <>
                <Mic className="w-11 h-11 mb-1" />
                <span className="text-[11px] font-black tracking-wider uppercase">Tap to Speak</span>
              </>
            )}
          </button>
        </div>

        {/* Live Audio Visualizer Bars if playing */}
        {isPlayingAudio && (
          <div className="flex items-center gap-1.5 h-10 mb-4 px-4 py-2 rounded-full bg-osaka-card border border-osaka-border shadow-inner">
            <span className="text-xs font-semibold text-emerald-400 mr-2 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 animate-pulse" />
              Voice Playing
            </span>
            <div className="w-1.5 bg-osaka-cyan rounded-full animate-wave-1" />
            <div className="w-1.5 bg-osaka-red rounded-full animate-wave-2" />
            <div className="w-1.5 bg-amber-400 rounded-full animate-wave-3" />
            <div className="w-1.5 bg-osaka-green rounded-full animate-wave-4" />
            <div className="w-1.5 bg-purple-400 rounded-full animate-wave-5" />
          </div>
        )}

        {/* Subtitle / Instructions */}
        <p className="text-sm sm:text-base font-medium text-slate-300 max-w-xl mb-4">
          {isListening
            ? 'Listening... Speak in English, 日本語, हिन्दी, or Español.'
            : 'Press the microphone and speak your destination, question, or need.'}
        </p>

        {/* Live Transcript Bubble */}
        {(transcript || isListening) && (
          <div className="w-full max-w-2xl bg-osaka-surface/90 border border-osaka-cyan/40 rounded-2xl p-4 mb-6 shadow-neon-cyan/20 animate-fade-in text-left">
            <div className="flex items-center justify-between text-xs text-osaka-cyan font-bold uppercase tracking-wider mb-1">
              <span>Voice Transcript</span>
              {isListening && <span className="animate-pulse">● Live Recognition</span>}
            </div>
            <p className="text-base sm:text-lg text-white font-medium italic">
              "{transcript || 'Listening for your voice...'}"
            </p>
          </div>
        )}

        {/* Spoken Response Player Bar */}
        {spokenResponseText && (
          <div className="w-full max-w-2xl bg-osaka-surface/80 border border-osaka-border rounded-2xl p-4 mb-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <button
                onClick={isPlayingAudio ? onStopAudio : onPlaySpokenResponse}
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center hover:scale-105 transition-all shadow-md"
                title={isPlayingAudio ? 'Pause Spoken Audio' : 'Play Spoken Audio'}
              >
                {isPlayingAudio ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    Spoken Response
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {voiceProviderName}
                  </span>
                </div>
                <p className="text-sm text-slate-200 line-clamp-2">
                  {spokenResponseText}
                </p>
              </div>
            </div>

            {/* Senior Speed Control */}
            <div className="flex items-center gap-2 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-osaka-border w-full sm:w-auto justify-end">
              <span className="text-[11px] text-slate-400 font-semibold">Speed:</span>
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => onChangeAudioSpeed(speed)}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                    audioSpeed === speed
                      ? 'bg-amber-500 text-black shadow-neon-gold'
                      : 'bg-osaka-card text-slate-400 hover:text-white border border-osaka-border'
                  }`}
                  title={speed === 0.8 ? 'Slow speed recommended for seniors & non-native listeners' : `Speed ${speed}x`}
                >
                  {speed === 0.8 ? '0.8x (Senior)' : `${speed}x`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input Fallback Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Or type here: e.g., 'How do I reach Osaka Station with no stairs?'"
              className="w-full px-4 py-3.5 rounded-xl bg-osaka-surface border border-osaka-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-osaka-cyan focus:ring-1 focus:ring-osaka-cyan text-sm sm:text-base font-normal shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-osaka-red to-red-600 text-white font-bold text-sm flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-neon-red flex-shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
