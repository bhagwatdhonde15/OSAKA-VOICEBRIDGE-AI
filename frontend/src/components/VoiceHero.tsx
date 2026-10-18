import React, { useState } from 'react';
import { Volume2, Play, Square, Send, Globe, Sparkles } from 'lucide-react';
import { VoiceOrb } from './VoiceOrb';

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
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
  { code: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  { code: 'hi-IN', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es-ES', label: 'Español', flag: '🇪🇸' }
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-bridge-card/90 via-bridge-card/60 to-bridge-surface/90 border border-bridge-border shadow-luxury backdrop-blur-xl p-6 sm:p-10">
      
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-24 w-96 h-96 rounded-full bg-bridge-violet/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -mb-24 w-80 h-80 rounded-full bg-bridge-cyan/5 blur-3xl pointer-events-none" />

      {/* 5-Second Rule Hero Header */}
      <div className="text-center max-w-3xl mx-auto pb-6 border-b border-bridge-border/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bridge-violet/10 border border-bridge-violet/25 text-bridge-violet text-[11px] font-bold tracking-widest uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-bridge-cyan" />
          <span>Impact Osaka Hackathon 2026 • AI Urban Mobility</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-black text-bridge-text tracking-tight font-sans">
          “One city. Every language. <span className="bg-gradient-to-r from-bridge-violet via-purple-400 to-bridge-cyan bg-clip-text text-transparent">No one left behind.</span>”
        </h2>

        <p className="text-xs sm:text-sm text-bridge-muted mt-2 leading-relaxed max-w-2xl mx-auto">
          Solving Osaka's transit labyrinth and language barriers for international travelers and elderly visitors through real-time conversational voice AI.
        </p>
      </div>

      {/* Language Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-bridge-border/40">
        <div className="flex items-center gap-2 text-xs font-medium text-bridge-muted">
          <Globe className="w-3.5 h-3.5 text-bridge-cyan" />
          <span>Active Language:</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-bridge-violet text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] scale-105'
                  : 'bg-bridge-surface text-bridge-muted border border-bridge-border hover:text-bridge-text hover:border-bridge-borderLight'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Voice Orb Section */}
      <div className="py-6 flex flex-col items-center justify-center text-center">
        
        <VoiceOrb
          isListening={isListening}
          isPlayingAudio={isPlayingAudio}
          onToggleListen={isListening ? onStopListening : onStartListening}
          voiceProviderName={voiceProviderName}
        />

        {/* Live Audio Visualizer Waveform Bar if playing */}
        {isPlayingAudio && (
          <div className="flex items-center gap-1.5 h-10 px-4 py-2 my-2 rounded-full bg-bridge-surface border border-bridge-border shadow-inner animate-fade-in">
            <span className="text-xs font-medium text-bridge-cyan mr-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              Speaking Audio
            </span>
            <div className="w-1 bg-bridge-cyan rounded-full wave-bar-1" />
            <div className="w-1 bg-bridge-violet rounded-full wave-bar-2" />
            <div className="w-1 bg-purple-400 rounded-full wave-bar-3" />
            <div className="w-1 bg-bridge-cyan rounded-full wave-bar-4" />
            <div className="w-1 bg-bridge-violet rounded-full wave-bar-5" />
            <div className="w-1 bg-purple-300 rounded-full wave-bar-6" />
          </div>
        )}

        {/* Live Transcript Card */}
        {(transcript || isListening) && (
          <div className="w-full max-w-2xl bg-bridge-surface/90 border border-bridge-cyan/40 rounded-2xl p-4 my-3 text-left shadow-luxury animate-fade-in">
            <div className="flex items-center justify-between text-[11px] text-bridge-cyan font-bold uppercase tracking-wider mb-1">
              <span>Voice Transcript</span>
              {isListening && <span className="animate-pulse">● Live Input</span>}
            </div>
            <p className="text-sm sm:text-base text-bridge-text font-medium italic">
              "{transcript || 'Listening for your voice...'}"
            </p>
          </div>
        )}

        {/* Spoken Response Player Bar */}
        {spokenResponseText && (
          <div className="w-full max-w-2xl bg-bridge-surface/90 border border-bridge-border rounded-2xl p-4 my-3 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-luxury">
            <div className="flex items-start gap-3">
              <button
                onClick={isPlayingAudio ? onStopAudio : onPlaySpokenResponse}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-bridge-violet hover:bg-bridge-violetHover text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                title={isPlayingAudio ? 'Pause Spoken Audio' : 'Play Spoken Audio'}
              >
                {isPlayingAudio ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-bold text-bridge-cyan uppercase tracking-wider">
                    Assistant Voice
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-bridge-card text-bridge-muted border border-bridge-border">
                    {voiceProviderName}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-bridge-text line-clamp-2">
                  {spokenResponseText}
                </p>
              </div>
            </div>

            {/* Senior Speed Control */}
            <div className="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-bridge-border w-full sm:w-auto justify-end">
              <span className="text-[10px] text-bridge-muted font-medium">Speed:</span>
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => onChangeAudioSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    audioSpeed === speed
                      ? 'bg-bridge-cyan text-slate-950 font-bold shadow-sm'
                      : 'bg-bridge-card text-bridge-muted hover:text-bridge-text border border-bridge-border'
                  }`}
                  title={speed === 0.8 ? 'Slow pace recommended for seniors' : `Speed ${speed}x`}
                >
                  {speed === 0.8 ? '0.8x (Senior)' : `${speed}x`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input Fallback Bar */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Or type your destination or question: e.g., 'How do I reach Osaka Station with no stairs?'"
              className="w-full px-4 py-3 rounded-xl bg-bridge-surface border border-bridge-border text-bridge-text placeholder-bridge-subtle focus:outline-none focus:border-bridge-cyan/60 focus:ring-1 focus:ring-bridge-cyan/40 text-xs sm:text-sm shadow-inner transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-bridge-violet hover:bg-bridge-violetHover text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-luxury flex-shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
};
