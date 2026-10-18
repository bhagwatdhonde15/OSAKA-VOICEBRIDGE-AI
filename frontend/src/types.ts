// Type definitions for Osaka VoiceBridge AI

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AccessibleExit {
  exit: string;
  features: string[];
  best_for: string;
}

export interface StationData {
  id: string;
  name_en: string;
  name_ja: string;
  romaji: string;
  lines: string[];
  coordinates: Coordinates;
  district: string;
  accessible_exits: AccessibleExit[];
  boarding_tips: string;
  quiet_rest_zones?: string;
}

export interface TransitLine {
  id: string;
  name: string;
  symbol: string;
  color: string;
  textColor: string;
  key_stops: string[];
  frequency: string;
  accessibility_rating: string;
}

export interface PhraseData {
  id: string;
  category: string;
  title: string;
  english: string;
  japanese: string;
  romaji: string;
  furigana: string;
  context: string;
  station_staff_card: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  user_query: string;
  destination: string;
  origin: string;
  category: string;
  icon: string;
}

export interface TransitStep {
  step: number;
  title: string;
  instruction: string;
  transit_line: string;
  badge_color: string;
  accessible_feature: string;
}

export interface AccessibilityAnalysis {
  has_accessibility_need: boolean;
  wheelchair: boolean;
  elderly: boolean;
  stroller: boolean;
  step_free_required: boolean;
  rest_needed: boolean;
  allergy: boolean;
  notes: string[];
}

export interface AIDecisionInfo {
  intent: string;
  intent_confidence: string;
  language_detected: string;
  language_confidence: string;
  proposed_action: string;
  uncertainty_factor: string;
  accessibility_flags: string[];
}

export interface MapData {
  origin: {
    name: string;
    coordinates: Coordinates;
    exit: string;
  };
  destination: {
    name: string;
    coordinates: Coordinates;
    exit: string;
    district?: string;
  };
  transit_waypoints: Array<{
    name: string;
    lat: number;
    lng: number;
    type: string;
  }>;
}

export interface QueryResponse {
  status: string;
  query: string;
  detected_language: {
    code: string;
    name: string;
    label: string;
  };
  category: string;
  ai_decision?: AIDecisionInfo;
  accessibility_analysis: AccessibilityAnalysis;
  destination: {
    id: string;
    name_en: string;
    name_ja: string;
    romaji: string;
    accessible_exits: AccessibleExit[];
    boarding_tips: string;
    quiet_rest_zones: string;
  };
  spoken_response: string;
  steps: TransitStep[];
  action_phrase?: PhraseData;
  staff_card: string;
  map_data: MapData;
  meta: {
    engine: string;
    tagline?: string;
    data_source: string;
    live_status_note: string;
    demo_mode: boolean;
  };
}

export interface SynthesisResponse {
  status: string;
  provider: string;
  is_live_api: boolean;
  audio_base64?: string | null;
  text: string;
  voice_id?: string;
  client_tts_recommended?: boolean;
  notice?: string;
  error_detail?: string;
}

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
  hackathon: string;
  voice_engine: {
    elevenlabs_configured: boolean;
    provider: string;
    voice_id: string;
    model_id: string;
  };
  database: {
    stations_count: number;
    transit_lines_count: number;
    phrases_count: number;
    mode: string;
  };
}
