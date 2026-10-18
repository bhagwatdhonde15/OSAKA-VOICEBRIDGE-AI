import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceOrbProps {
  isListening: boolean;
  isPlayingAudio: boolean;
  onToggleListen: () => void;
  voiceProviderName: string;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  isListening,
  isPlayingAudio,
  onToggleListen,
  voiceProviderName
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none">
      
      {/* Outer ambient glow rings */}
      <div className="relative flex items-center justify-center">
        
        {/* Ring 3 (Outer aura) */}
        <div
          className={`absolute rounded-full transition-all duration-700 pointer-events-none ${
            isListening
              ? 'w-64 h-64 sm:w-72 sm:h-72 bg-bridge-cyan/15 blur-2xl animate-ping'
              : isPlayingAudio
              ? 'w-60 h-60 sm:w-68 sm:h-68 bg-bridge-violet/20 blur-2xl animate-pulse'
              : 'w-52 h-52 sm:w-60 sm:h-60 bg-bridge-violet/10 blur-xl'
          }`}
        />

        {/* Ring 2 (Rotating decorative orbital ring) */}
        <div
          className={`absolute rounded-full border border-dashed transition-all duration-500 pointer-events-none ${
            isListening
              ? 'w-48 h-48 sm:w-56 sm:h-56 border-bridge-cyan/40 animate-spin [animation-duration:8s]'
              : isPlayingAudio
              ? 'w-44 h-44 sm:w-52 sm:h-52 border-bridge-violet/40 animate-spin [animation-duration:12s]'
              : 'w-40 h-40 sm:w-48 sm:h-48 border-slate-700/50'
          }`}
        />

        {/* Ring 1 (Inner pulse ring) */}
        <div
          className={`absolute rounded-full transition-all duration-300 pointer-events-none ${
            isListening
              ? 'w-36 h-36 sm:w-40 sm:h-40 border border-bridge-cyan/60 animate-ping [animation-duration:1.5s]'
              : isPlayingAudio
              ? 'w-36 h-36 sm:w-40 sm:h-40 border border-bridge-violet/60 animate-pulse'
              : 'w-32 h-32 sm:w-36 sm:h-36 border border-white/5'
          }`}
        />

        {/* The Main Voice Orb Button */}
        <button
          onClick={onToggleListen}
          className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-xl border focus:outline-none ${
            isListening
              ? 'bg-gradient-to-br from-cyan-400/90 via-cyan-500 to-blue-600 text-slate-950 border-bridge-cyan shadow-orb-listening scale-105'
              : isPlayingAudio
              ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 text-white border-bridge-violet shadow-orb-speaking scale-105'
              : 'bg-gradient-to-br from-bridge-card via-[#171E38] to-[#11162A] text-bridge-text border-bridge-border hover:border-bridge-violet/60 shadow-orb-idle hover:scale-105 group'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start speaking'}
          title={isListening ? 'Listening... click to stop' : 'Click to speak'}
        >
          {/* Inner core lighting effect */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />

          {isListening ? (
            <>
              <MicOff className="w-9 h-9 mb-1 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase">Listening</span>
            </>
          ) : isPlayingAudio ? (
            <>
              <Volume2 className="w-9 h-9 mb-1 animate-bounce" />
              <span className="text-[10px] font-black tracking-widest uppercase">Speaking</span>
            </>
          ) : (
            <>
              <Mic className="w-9 h-9 mb-1 text-bridge-cyan group-hover:text-white transition-colors" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-bridge-muted group-hover:text-white transition-colors">
                Tap to Speak
              </span>
            </>
          )}
        </button>

      </div>

      {/* Dynamic Status Label & Pill */}
      <div className="mt-5 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            isListening ? 'bg-bridge-cyan animate-ping' : isPlayingAudio ? 'bg-bridge-violet animate-pulse' : 'bg-bridge-emerald'
          }`} />
          <span className="text-xs font-semibold tracking-wide text-bridge-text">
            {isListening ? 'Listening to speech...' : isPlayingAudio ? 'Voice playing' : 'Voice assistant ready'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bridge-surface border border-bridge-border text-bridge-muted">
            {voiceProviderName.includes('ElevenLabs') ? 'ElevenLabs AI' : 'Web Speech Engine'}
          </span>
        </div>
      </div>

    </div>
  );
};
