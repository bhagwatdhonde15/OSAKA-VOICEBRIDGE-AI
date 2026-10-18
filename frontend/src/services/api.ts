// API service connecting frontend to FastAPI backend

import type {
  QueryResponse,
  SynthesisResponse,
  HealthStatus,
  DemoScenario,
  StationData,
  TransitLine,
  PhraseData
} from '../types';

const API_BASE = 'http://127.0.0.1:8000/api';

export async function fetchHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

export async function fetchScenarios(): Promise<{ scenarios: DemoScenario[]; sample_prompts: string[] }> {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error(`Failed to load scenarios: ${res.statusText}`);
  return res.json();
}

export async function fetchStations(): Promise<{ stations: Record<string, StationData> }> {
  const res = await fetch(`${API_BASE}/stations`);
  if (!res.ok) throw new Error(`Failed to load stations: ${res.statusText}`);
  return res.json();
}

export async function fetchLines(): Promise<{ lines: TransitLine[] }> {
  const res = await fetch(`${API_BASE}/lines`);
  if (!res.ok) throw new Error(`Failed to load transit lines: ${res.statusText}`);
  return res.json();
}

export async function fetchPhrases(): Promise<{ phrases: PhraseData[] }> {
  const res = await fetch(`${API_BASE}/phrases`);
  if (!res.ok) throw new Error(`Failed to load phrases: ${res.statusText}`);
  return res.json();
}

export async function queryAssistant(
  query: string,
  preferredLanguage?: string,
  wheelchairPriority = false,
  seniorAssistance = false
): Promise<QueryResponse> {
  const res = await fetch(`${API_BASE}/assistant/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      preferred_language: preferredLanguage,
      wheelchair_priority: wheelchairPriority,
      senior_assistance: seniorAssistance
    })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Query failed: ${res.statusText}`);
  }
  return res.json();
}

export async function synthesizeSpeech(
  text: string,
  voiceId?: string,
  speed = 1.0
): Promise<SynthesisResponse> {
  const res = await fetch(`${API_BASE}/voice/synthesize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      voice_id: voiceId,
      speed
    })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Speech synthesis failed: ${res.statusText}`);
  }
  return res.json();
}
