// Speech Recognition and Audio Synthesis Controller

// SpeechRecognition type definitions for browsers
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class SpeechService {
  private recognition: any = null;
  private currentAudio: HTMLAudioElement | null = null;
  public isRecognitionSupported: boolean = false;

  constructor() {
    const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
    if (win) {
      const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
      if (SpeechRec) {
        this.isRecognitionSupported = true;
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      }
    }
  }

  public startListening(
    lang = 'en-US',
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError(new Error('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'));
      return false;
    }

    this.stopAudio();
    this.recognition.lang = lang;

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        onResult(finalTranscript, true);
      } else if (interimTranscript) {
        onResult(interimTranscript, false);
      }
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.onend = () => {
      onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      onError(e);
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore if not running
      }
    }
  }

  public stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Play audio either via ElevenLabs MP3 base64 or fallback to browser Web Speech API.
   */
  public playAudio(
    audioBase64: string | null | undefined,
    fallbackText: string,
    speed = 1.0,
    onStart?: () => void,
    onEnded?: () => void
  ): void {
    this.stopAudio();

    // 1. If base64 audio is provided by ElevenLabs API
    if (audioBase64) {
      const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      audio.playbackRate = speed;

      audio.onplay = () => {
        if (onStart) onStart();
      };
      audio.onended = () => {
        this.currentAudio = null;
        if (onEnded) onEnded();
      };
      audio.onerror = () => {
        this.fallbackBrowserSpeech(fallbackText, speed, onStart, onEnded);
      };

      audio.play().catch(() => {
        // Autoplay policy fallback
        this.fallbackBrowserSpeech(fallbackText, speed, onStart, onEnded);
      });
      return;
    }

    // 2. Fallback to Browser Web Speech API
    this.fallbackBrowserSpeech(fallbackText, speed, onStart, onEnded);
  }

  private fallbackBrowserSpeech(
    text: string,
    speed = 1.0,
    onStart?: () => void,
    onEnded?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnded) onEnded();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.7, Math.min(speed, 1.3));
    utterance.pitch = 1.0;

    // Detect if text contains Japanese
    const isJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
    const voices = window.speechSynthesis.getVoices();

    if (isJapanese) {
      utterance.lang = 'ja-JP';
      const jpVoice = voices.find(v => v.lang.includes('ja') || v.lang.includes('JP'));
      if (jpVoice) utterance.voice = jpVoice;
    } else {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };
    utterance.onend = () => {
      if (onEnded) onEnded();
    };
    utterance.onerror = () => {
      if (onEnded) onEnded();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const speechService = new SpeechService();
