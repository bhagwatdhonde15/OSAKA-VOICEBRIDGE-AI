import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { VoiceHero } from './components/VoiceHero';
import { AIDecisionPanel } from './components/AIDecisionPanel';
import { DemoScenarios } from './components/DemoScenarios';
import { TransitRouteCard } from './components/TransitRouteCard';
import { InteractiveOsakaMap } from './components/InteractiveOsakaMap';
import { StaffFlashcardModal } from './components/StaffFlashcardModal';
import { EssentialPhrasesPanel } from './components/EssentialPhrasesPanel';
import { StationGuideModal } from './components/StationGuideModal';
import { Footer } from './components/Footer';

import type {
  HealthStatus,
  DemoScenario,
  StationData,
  PhraseData,
  QueryResponse
} from './types';

import {
  fetchHealth,
  fetchScenarios,
  fetchStations,
  fetchPhrases,
  queryAssistant,
  synthesizeSpeech
} from './services/api';

import { speechService } from './services/speech';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  // Service Data State
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [scenarios, setScenarios] = useState<DemoScenario[]>([]);
  const [stations, setStations] = useState<Record<string, StationData>>({});
  const [phrases, setPhrases] = useState<PhraseData[]>([]);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scenario_find_osaka_station');

  // Query & Response State
  const [queryResult, setQueryResult] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Voice Interaction State
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [spokenResponseText, setSpokenResponseText] = useState<string>('');
  const [spokenAudioBase64, setSpokenAudioBase64] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [voiceProviderName, setVoiceProviderName] = useState<string>('Initializing Voice...');

  // Accessibility Toggles
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [wheelchairMode, setWheelchairMode] = useState<boolean>(false);

  // Modals State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [selectedStaffPhrase, setSelectedStaffPhrase] = useState<PhraseData | undefined>(undefined);
  const [isPhrasesPanelOpen, setIsPhrasesPanelOpen] = useState<boolean>(false);
  const [isStationGuideOpen, setIsStationGuideOpen] = useState<boolean>(false);

  // Apply typography classes on body when toggled
  useEffect(() => {
    if (seniorMode) {
      document.body.classList.add('font-large');
    } else {
      document.body.classList.remove('font-large');
    }
  }, [seniorMode]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Load initial backend state
  const loadInitialData = useCallback(async () => {
    try {
      setErrorNotice(null);
      const [h, sc, st, ph] = await Promise.all([
        fetchHealth(),
        fetchScenarios(),
        fetchStations(),
        fetchPhrases()
      ]);
      setHealth(h);
      setScenarios(sc.scenarios);
      setStations(st.stations);
      setPhrases(ph.phrases);

      setVoiceProviderName(
        h.voice_engine.elevenlabs_configured
          ? 'ElevenLabs Neural Speech'
          : 'Web Speech Engine (High-Clarity Local TTS)'
      );

      // Auto-load Scenario 1: Finding Osaka Station
      if (sc.scenarios.length > 0) {
        handleRunScenario(sc.scenarios[0]);
      }
    } catch (err: any) {
      console.error('Failed to load initial data:', err);
      setErrorNotice(
        'Could not reach the Osaka VoiceBridge backend on http://127.0.0.1:8000. Please ensure the Python server is running.'
      );
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Execute a query to the backend
  const executeQuery = async (queryText: string, lang = selectedLanguage) => {
    setIsLoading(true);
    setErrorNotice(null);
    speechService.stopAudio();
    setIsPlayingAudio(false);

    try {
      const response = await queryAssistant(
        queryText,
        lang,
        wheelchairMode,
        seniorMode
      );
      setQueryResult(response);
      setSpokenResponseText(response.spoken_response);

      // Request speech synthesis
      try {
        const synth = await synthesizeSpeech(
          response.spoken_response,
          health?.voice_engine.voice_id,
          audioSpeed
        );

        if (synth.audio_base64) {
          setSpokenAudioBase64(synth.audio_base64);
          setVoiceProviderName(synth.provider);
          speechService.playAudio(
            synth.audio_base64,
            response.spoken_response,
            audioSpeed,
            () => setIsPlayingAudio(true),
            () => setIsPlayingAudio(false)
          );
        } else {
          setSpokenAudioBase64(null);
          setVoiceProviderName(synth.provider);
          speechService.playAudio(
            null,
            response.spoken_response,
            audioSpeed,
            () => setIsPlayingAudio(true),
            () => setIsPlayingAudio(false)
          );
        }
      } catch (voiceErr) {
        console.warn('Speech synthesis API call failed, falling back to browser speech:', voiceErr);
        speechService.playAudio(
          null,
          response.spoken_response,
          audioSpeed,
          () => setIsPlayingAudio(true),
          () => setIsPlayingAudio(false)
        );
      }

    } catch (err: any) {
      console.error('Error executing query:', err);
      setErrorNotice(err.message || 'Error communicating with assistant.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run a preset demo scenario
  const handleRunScenario = (scenario: DemoScenario) => {
    setActiveScenarioId(scenario.id);
    setTranscript(scenario.user_query);
    if (scenario.category === 'accessibility') {
      setWheelchairMode(true);
    }
    executeQuery(scenario.user_query, selectedLanguage);
  };

  // Microphone recording handlers
  const handleStartListening = () => {
    speechService.stopAudio();
    setIsPlayingAudio(false);
    setTranscript('');
    setIsListening(true);
    setErrorNotice(null);

    const started = speechService.startListening(
      selectedLanguage,
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim()) {
          setIsListening(false);
          executeQuery(text.trim(), selectedLanguage);
        }
      },
      (err) => {
        setIsListening(false);
        console.warn('Speech recognition warning/error:', err);
        if (err !== 'no-speech') {
          setErrorNotice(
            typeof err === 'string'
              ? `Microphone note: ${err}`
              : 'Microphone recognition ended. You can also type your query directly.'
          );
        }
      },
      () => {
        setIsListening(false);
      }
    );

    if (!started) {
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
    if (transcript.trim()) {
      executeQuery(transcript.trim(), selectedLanguage);
    }
  };

  // Audio playback controls
  const handlePlaySpokenResponse = () => {
    if (!spokenResponseText) return;
    speechService.playAudio(
      spokenAudioBase64,
      spokenResponseText,
      audioSpeed,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const handleStopAudio = () => {
    speechService.stopAudio();
    setIsPlayingAudio(false);
  };

  const handleChangeAudioSpeed = (speed: number) => {
    setAudioSpeed(speed);
    if (isPlayingAudio) {
      handlePlaySpokenResponse();
    }
  };

  const handlePlayPhraseAudio = (phrase: PhraseData) => {
    speechService.playAudio(
      null,
      phrase.japanese,
      audioSpeed,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <div className="min-h-screen bg-bridge-bg text-bridge-text flex flex-col font-sans selection:bg-bridge-violet selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        health={health}
        seniorMode={seniorMode}
        onToggleSeniorMode={() => setSeniorMode(!seniorMode)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        wheelchairMode={wheelchairMode}
        onToggleWheelchairMode={() => setWheelchairMode(!wheelchairMode)}
        onOpenStationGuide={() => setIsStationGuideOpen(true)}
        onOpenPhrases={() => setIsPhrasesPanelOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Error Notification Banner if backend offline */}
        {errorNotice && (
          <div className="p-4 rounded-2xl bg-bridge-card border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-luxury">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorNotice}</span>
            </div>
            <button
              onClick={loadInitialData}
              className="px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Voice-First Hero & Speech Input */}
        <VoiceHero
          isListening={isListening}
          isPlayingAudio={isPlayingAudio}
          transcript={transcript}
          spokenResponseText={spokenResponseText}
          selectedLanguage={selectedLanguage}
          onLanguageChange={(lang) => {
            setSelectedLanguage(lang);
            if (queryResult) {
              executeQuery(queryResult.query, lang);
            }
          }}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
          onPlaySpokenResponse={handlePlaySpokenResponse}
          onStopAudio={handleStopAudio}
          onSubmitTextQuery={(text) => {
            setTranscript(text);
            executeQuery(text, selectedLanguage);
          }}
          audioSpeed={audioSpeed}
          onChangeAudioSpeed={handleChangeAudioSpeed}
          voiceProviderName={voiceProviderName}
        />

        {/* 3 Core Hackathon Demo Scenarios Bar */}
        <DemoScenarios
          scenarios={scenarios}
          activeScenarioId={activeScenarioId}
          onSelectScenario={handleRunScenario}
        />

        {/* Dedicated AI Decision Observability Panel */}
        {queryResult?.ai_decision && (
          <AIDecisionPanel
            decision={queryResult.ai_decision}
            demoMode={queryResult.meta.demo_mode}
            voiceProviderName={voiceProviderName}
          />
        )}

        {/* Results Section */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-9 h-9 text-bridge-violet animate-spin" />
            <p className="text-sm sm:text-base font-bold text-bridge-text">
              Consulting Osaka Metro Barrier-Free Database...
            </p>
            <p className="text-xs text-bridge-muted">
              Matching elevator exits, minimal walking transfers, and native spoken guidance.
            </p>
          </div>
        ) : queryResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Transit Step Guidance Card */}
            <div className="lg:col-span-7 space-y-6">
              <TransitRouteCard
                data={queryResult}
                onOpenStaffCard={() => {
                  setSelectedStaffPhrase(queryResult.action_phrase);
                  setIsStaffModalOpen(true);
                }}
                onPlayAudio={handlePlaySpokenResponse}
                isPlayingAudio={isPlayingAudio}
              />
            </div>

            {/* Right Column: Interactive Osaka Map */}
            <div className="lg:col-span-5 space-y-6">
              <InteractiveOsakaMap
                mapData={queryResult.map_data}
                allStations={stations}
                onSelectStation={(stId) => {
                  const target = stations[stId];
                  if (target) {
                    setTranscript(`How do I reach ${target.name_en}?`);
                    executeQuery(`How do I reach ${target.name_en}?`);
                  }
                }}
              />
            </div>

          </div>
        ) : null}

      </main>

      {/* Footer */}
      <Footer />

      {/* Staff Fullscreen Flashcard Modal */}
      <StaffFlashcardModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        staffCardText={queryResult?.staff_card || ''}
        phrase={selectedStaffPhrase || queryResult?.action_phrase}
        onPlayJapaneseAudio={() => {
          if (queryResult?.action_phrase) {
            handlePlayPhraseAudio(queryResult.action_phrase);
          } else {
            speechService.playAudio(
              null,
              queryResult?.destination.name_ja || 'すみません、エレベーターはどこですか？',
              audioSpeed,
              () => setIsPlayingAudio(true),
              () => setIsPlayingAudio(false)
            );
          }
        }}
      />

      {/* Essential Travel Phrases Modal */}
      <EssentialPhrasesPanel
        isOpen={isPhrasesPanelOpen}
        onClose={() => setIsPhrasesPanelOpen(false)}
        phrases={phrases}
        onSelectPhraseForStaffCard={(phrase) => {
          setSelectedStaffPhrase(phrase);
          setIsStaffModalOpen(true);
        }}
        onPlayPhraseAudio={handlePlayPhraseAudio}
      />

      {/* Station Elevator Directory Modal */}
      <StationGuideModal
        isOpen={isStationGuideOpen}
        onClose={() => setIsStationGuideOpen(false)}
        stations={stations}
        onSelectStationForRouting={(stationName) => {
          const q = `How do I reach ${stationName} with step-free access?`;
          setTranscript(q);
          executeQuery(q);
        }}
      />

    </div>
  );
}

export default App;
