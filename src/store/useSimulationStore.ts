import { create } from 'zustand';
import {
  SimulationService,
  ScenarioItem,
  StartSimulationResult,
  SimulationTurnResult,
  EndSimulationResult,
} from '@/services/simulationService';

export interface ChatMessage {
  id: string;
  senderType: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  supportiveFeedback?: string;
}

interface SimulationState {
  scenarios: ScenarioItem[];
  activeScenario: ScenarioItem | null;
  activeSimulationId: string | null;
  messages: ChatMessage[];
  endResult: EndSimulationResult | null;
  isLoading: boolean;
  isSendingTurn: boolean;
  isEnding: boolean;
  error: string | null;

  fetchScenarios: (category?: string, token?: string | null) => Promise<void>;
  startSimulationSession: (scenarioId: string, token?: string | null) => Promise<StartSimulationResult | null>;
  sendAudioTurn: (
    audioUri: string,
    speechDurationSeconds: number,
    token?: string | null
  ) => Promise<SimulationTurnResult | null>;
  endSimulationSession: (anxietyScoreAfter?: number, token?: string | null) => Promise<EndSimulationResult | null>;
  resetSession: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  scenarios: [],
  activeScenario: null,
  activeSimulationId: null,
  messages: [],
  endResult: null,
  isLoading: false,
  isSendingTurn: false,
  isEnding: false,
  error: null,

  fetchScenarios: async (category, token) => {
    set({ isLoading: true, error: null });
    try {
      const scenarios = await SimulationService.getScenarios(category, token);
      set({ scenarios, isLoading: false });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengambil daftar skenario';
      set({ isLoading: false, error: msg });
    }
  },

  startSimulationSession: async (scenarioId, token) => {
    set({ isLoading: true, error: null, messages: [], endResult: null });
    try {
      const result = await SimulationService.startSimulation(scenarioId, token);
      const foundScenario = get().scenarios.find((s) => s.id === scenarioId) || null;

      const initialMsg: ChatMessage = {
        id: `msg-init-${Date.now()}`,
        senderType: 'assistant',
        text: result.initialMessage.text,
        audioUrl: result.initialMessage.audioUrl,
      };

      set({
        activeSimulationId: result.simulationId,
        activeScenario: foundScenario,
        messages: [initialMsg],
        isLoading: false,
      });

      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memulai sesi simulasi';
      set({ isLoading: false, error: msg });
      return null;
    }
  },

  sendAudioTurn: async (audioUri, speechDurationSeconds, token) => {
    const { activeSimulationId, messages } = get();
    if (!activeSimulationId) {
      set({ error: 'Tidak ada sesi simulasi aktif' });
      return null;
    }

    set({ isSendingTurn: true, error: null });
    try {
      const turnData = await SimulationService.sendTurn(
        activeSimulationId,
        audioUri,
        speechDurationSeconds,
        token
      );

      const userMsg: ChatMessage = {
        id: `msg-user-${Date.now()}`,
        senderType: 'user',
        text: turnData.userTurn.transcription,
        audioUrl: turnData.userTurn.audioUrl,
      };

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        senderType: 'assistant',
        text: turnData.aiTurn.text,
        audioUrl: turnData.aiTurn.audioUrl,
        supportiveFeedback: turnData.aiTurn.supportiveFeedback,
      };

      set({
        messages: [...messages, userMsg, aiMsg],
        isSendingTurn: false,
      });

      return turnData;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memproses giliran suara';
      set({ isSendingTurn: false, error: msg });
      return null;
    }
  },

  endSimulationSession: async (anxietyScoreAfter = 3, token) => {
    const { activeSimulationId } = get();
    if (!activeSimulationId) {
      set({ error: 'Tidak ada sesi simulasi aktif' });
      return null;
    }

    set({ isEnding: true, error: null });
    try {
      const result = await SimulationService.endSimulation(activeSimulationId, anxietyScoreAfter, token);
      set({ endResult: result, isEnding: false });
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengakhiri simulasi';
      set({ isEnding: false, error: msg });
      return null;
    }
  },

  resetSession: () =>
    set({
      activeScenario: null,
      activeSimulationId: null,
      messages: [],
      endResult: null,
      isLoading: false,
      isSendingTurn: false,
      isEnding: false,
      error: null,
    }),
}));
