import { API_BASE_URL, ApiEnvelope, apiFetch } from '@/lib/api';
import { Platform } from 'react-native';
import { File } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

export interface CBTAnalysisPayload {
  situationDescription?: string;
  automaticThought: string;
  initialAnxietyLevel?: number;
}

export interface RationalThoughtOption {
  id: string;
  reframingText: string;
  rationale: string;
}

export interface CBTAnalysisResult {
  originalThought: string;
  cognitiveDistortions: string[];
  explanationText: string;
  rationalOptions: RationalThoughtOption[];
}

export interface CBTSimulationInstruction {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface StartCBTSimulationPayload {
  situationDescription?: string;
  automaticThought: string;
  chosenReframingText: string;
}

export interface StartCBTSimulationResult {
  simulationId: string;
  personaRole: string;
  purpose: string;
  instructions: CBTSimulationInstruction[];
  initialGreeting: string;
  initialAudioUrl?: string;
}

export interface ProcessCBTSimulationTurnResult {
  userTurn: {
    transcription: string;
    audioUrl?: string;
  };
  aiTurn: {
    text: string;
    audioUrl?: string;
    naturalFeedback: string;
  };
  instructions: CBTSimulationInstruction[];
  allCompleted: boolean;
}

export interface CompleteCBTPayload {
  cbtLogId?: string;
  situationDescription?: string;
  automaticThought?: string;
  chosenReframingText: string;
  initialAnxietyLevel: number;
  finalAnxietyLevel: number;
}

export interface CompleteCBTResult {
  anxietyReduction: number;
  message: string;
  encouragementNote: string;
}

function uint8ArrayToBase64(bytes: Uint8Array): string {
  const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  const len = bytes.length;
  let i = 0;
  for (; i + 2 < len; i += 3) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];
    result +=
      b64chars[b0 >> 2] +
      b64chars[((b0 & 3) << 4) | (b1 >> 4)] +
      b64chars[((b1 & 15) << 2) | (b2 >> 6)] +
      b64chars[b2 & 63];
  }
  if (i < len) {
    const b0 = bytes[i];
    if (i + 1 < len) {
      const b1 = bytes[i + 1];
      result +=
        b64chars[b0 >> 2] +
        b64chars[((b0 & 3) << 4) | (b1 >> 4)] +
        b64chars[(b1 & 15) << 2] +
        '=';
    } else {
      result +=
        b64chars[b0 >> 2] +
        b64chars[(b0 & 3) << 4] +
        '==';
    }
  }
  return result;
}

export class CBTService {
  public static async analyzeThought(
    payload: CBTAnalysisPayload,
    token?: string | null
  ): Promise<CBTAnalysisResult> {
    const res = await apiFetch<CBTAnalysisResult>(
      '/cbt/analyze',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      token
    );
    if (!res.data) throw new Error('Gagal menganalisis pikiran CBT');
    return res.data;
  }

  public static async startSimulation(
    payload: StartCBTSimulationPayload,
    token?: string | null
  ): Promise<StartCBTSimulationResult> {
    const res = await apiFetch<StartCBTSimulationResult>(
      '/cbt/simulation/start',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      token
    );
    if (!res.data) throw new Error('Gagal memulai simulasi CBT');
    return res.data;
  }

  public static async sendSimulationTurn(
    simulationId: string,
    input: string | { audioUri?: string; text?: string },
    personaRole: string,
    purpose: string,
    currentInstructions: CBTSimulationInstruction[],
    historyText: string,
    token?: string | null
  ): Promise<ProcessCBTSimulationTurnResult> {
    const url = `${API_BASE_URL}/cbt/simulation/${simulationId}/turn`;
    const audioUri = typeof input === 'string' ? input : input.audioUri;
    const text = typeof input === 'object' ? input.text : undefined;

    let audioBase64: string | undefined = undefined;

    if (audioUri) {
      try {
        let base64Content: string | null = null;

        // 1. Try modern expo-file-system File API (native Android/iOS)
        try {
          const file = new File(audioUri);
          if (typeof file.base64 === 'function') {
            const rawB64 = await file.base64();
            if (rawB64 && rawB64.trim().length > 0) {
              base64Content = rawB64.trim();
            }
          }
          if (!base64Content && typeof file.bytes === 'function') {
            const bytes = await file.bytes();
            if (bytes && bytes.length > 0) {
              base64Content = uint8ArrayToBase64(bytes);
            }
          }
        } catch (fileErr) {
          console.warn('File API read failed, attempting FileSystem.readAsStringAsync fallback:', fileErr);
        }

        // 2. Try legacy FileSystem.readAsStringAsync (battle-tested across Expo SDKs)
        if (!base64Content) {
          try {
            const raw = await FileSystem.readAsStringAsync(audioUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            if (raw && raw.trim().length > 0) {
              base64Content = raw.trim();
            }
          } catch (fsErr) {
            console.warn('FileSystem.readAsStringAsync fallback failed:', fsErr);
          }
        }

        // 3. Fallback for Web environment where file:// does not exist
        if (!base64Content) {
          try {
            const fileResponse = await fetch(audioUri);
            const arrayBuffer = await fileResponse.arrayBuffer();
            base64Content = uint8ArrayToBase64(new Uint8Array(arrayBuffer));
          } catch (fetchErr) {
            console.warn('fetch arrayBuffer fallback failed:', fetchErr);
          }
        }

        if (base64Content && base64Content.length > 0) {
          // Clean any newlines or spaces from base64 string
          base64Content = base64Content.replace(/\s+/g, '');

          // Determine correct audio MIME type from file extension
          let mimeType = 'audio/m4a';
          const lowerUri = audioUri.toLowerCase();
          if (lowerUri.endsWith('.wav')) mimeType = 'audio/wav';
          else if (lowerUri.endsWith('.mp3')) mimeType = 'audio/mpeg';
          else if (lowerUri.endsWith('.webm')) mimeType = 'audio/webm';
          else if (lowerUri.endsWith('.ogg')) mimeType = 'audio/ogg';
          else if (lowerUri.endsWith('.flac')) mimeType = 'audio/flac';
          else if (lowerUri.endsWith('.mp4')) mimeType = 'audio/mp4';

          audioBase64 = `data:${mimeType};base64,${base64Content}`;
          console.log(`Audio successfully converted to Base64: ${base64Content.length} chars (~${Math.round(base64Content.length * 0.75)} bytes)`);
        } else {
          console.error('All methods failed to read audio file from URI:', audioUri);
        }
      } catch (err) {
        console.warn('Failed to read audio as Base64 data URI:', err);
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const body: Record<string, unknown> = {
      personaRole,
      purpose,
      currentInstructions,
      historyText,
    };

    if (audioBase64) {
      body.audioBase64 = audioBase64;
    }
    if (text) {
      body.text = text;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const json: ApiEnvelope<ProcessCBTSimulationTurnResult> = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Gagal memproses percakapan simulasi');
    }
    return json.data;
  }

  public static async completeSession(
    payload: CompleteCBTPayload,
    token?: string | null
  ): Promise<CompleteCBTResult> {
    const res = await apiFetch<CompleteCBTResult>(
      '/cbt/complete',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      token
    );
    if (!res.data) throw new Error('Gagal menyimpan hasil CBT');
    return res.data;
  }
}
