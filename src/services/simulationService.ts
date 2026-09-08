import { API_BASE_URL, ApiEnvelope } from '@/lib/api';

export interface ScenarioItem {
  id: string;
  category: string;
  title: string;
  personaRole: string;
  description: string;
  difficultyLevel: number;
  initialAiGreeting: string;
}

export interface StartSimulationResult {
  simulationId: string;
  scenarioTitle: string;
  initialMessage: {
    senderType: 'assistant';
    text: string;
    audioUrl?: string;
  };
}

export interface SimulationTurnResult {
  userTurn: {
    transcription: string;
    speechDurationSeconds: number;
    audioUrl: string;
  };
  aiTurn: {
    senderType: 'assistant';
    text: string;
    audioUrl?: string;
    supportiveFeedback: string;
  };
}

export interface EndSimulationResult {
  simulationId: string;
  totalDurationSeconds: number;
  turnsCount: number;
  confidenceScore: number;
  feedbackSummary: string;
  newBadgeUnlocked?: {
    id: string;
    title: string;
    iconName: string;
  } | null;
}

export class SimulationService {
  public static async getScenarios(
    category?: string,
    token?: string | null
  ): Promise<ScenarioItem[]> {
    const url = `${API_BASE_URL}/simulations/scenarios${category ? `?category=${category}` : ''}`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    const json: ApiEnvelope<ScenarioItem[]> = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Gagal mengambil daftar skenario simulasi');
    }
    return json.data;
  }

  public static async startSimulation(
    scenarioId: string,
    token?: string | null
  ): Promise<StartSimulationResult> {
    const url = `${API_BASE_URL}/simulations/start`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ scenarioId }),
    });
    const json: ApiEnvelope<StartSimulationResult> = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Gagal memulai simulasi');
    }
    return json.data;
  }

  public static async sendTurn(
    simulationId: string,
    audioUri: string,
    speechDurationSeconds: number,
    token?: string | null
  ): Promise<SimulationTurnResult> {
    const url = `${API_BASE_URL}/simulations/${simulationId}/turn`;
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const formData = new FormData();
    const filename = audioUri.split('/').pop() || 'speech.m4a';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `audio/${match[1]}` : 'audio/m4a';

    let appended = false;
    try {
      const fileResponse = await fetch(audioUri);
      const blob = await fileResponse.blob();

      if (typeof File !== 'undefined') {
        const file = new File([blob], filename, { type });
        formData.append('audio', file);
      } else {
        formData.append('audio', blob, filename);
      }
      appended = true;
    } catch (blobErr) {
      console.warn('Failed to convert audioUri to Blob/File in simulationService:', blobErr);
    }

    if (!appended) {
      formData.append('audio', {
        uri: audioUri,
        name: filename,
        type,
      } as unknown as Blob);
    }
    formData.append('speechDurationSeconds', String(speechDurationSeconds));

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const json: ApiEnvelope<SimulationTurnResult> = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Gagal memproses percakapan audio');
    }
    return json.data;
  }

  public static async endSimulation(
    simulationId: string,
    anxietyScoreAfter = 3,
    token?: string | null
  ): Promise<EndSimulationResult> {
    const url = `${API_BASE_URL}/simulations/${simulationId}/end`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ anxietyScoreAfter }),
    });

    const json: ApiEnvelope<EndSimulationResult> = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Gagal mengakhiri simulasi');
    }
    return json.data;
  }
}
