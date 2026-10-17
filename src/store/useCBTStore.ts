import { create } from 'zustand';
import {
  CBTService,
  CBTAnalysisResult,
  RationalThoughtOption,
  CompleteCBTResult,
  CBTSimulationInstruction,
} from '@/services/cbtService';

export interface CBTSimulationMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  naturalFeedback?: string;
}

interface CBTState {
  situationDescription: string;
  automaticThought: string;
  initialAnxietyLevel: number;
  finalAnxietyLevel: number;
  analysisResult: CBTAnalysisResult | null;
  selectedOption: RationalThoughtOption | null;
  completionResult: CompleteCBTResult | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;

  // Simulation Behavioral Experiment state
  simulationId: string | null;
  personaRole: string;
  purpose: string;
  instructions: CBTSimulationInstruction[];
  simulationMessages: CBTSimulationMessage[];
  allInstructionsCompleted: boolean;
  isStartingSimulation: boolean;
  isSendingTurn: boolean;

  setSituation: (text: string) => void;
  setThought: (text: string) => void;
  setInitialAnxiety: (level: number) => void;
  setFinalAnxiety: (level: number) => void;
  setSelectedOption: (option: RationalThoughtOption) => void;
  analyzeThought: (token?: string | null) => Promise<CBTAnalysisResult | null>;
  startSimulation: (token?: string | null) => Promise<boolean>;
  sendTurn: (
    input: string | { audioUri?: string; text?: string },
    token?: string | null
  ) => Promise<boolean>;
  completeSession: (token?: string | null) => Promise<CompleteCBTResult | null>;
  updateMessageAudioUrl: (id: string, audioUrl: string) => void;
  reset: () => void;
}

export const useCBTStore = create<CBTState>((set, get) => ({
  situationDescription: '',
  automaticThought: '',
  initialAnxietyLevel: 5,
  finalAnxietyLevel: 2,
  analysisResult: null,
  selectedOption: null,
  completionResult: null,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // Simulation state
  simulationId: null,
  personaRole: 'Lawan Bicara yang Sabar',
  purpose: '',
  instructions: [],
  simulationMessages: [],
  allInstructionsCompleted: false,
  isStartingSimulation: false,
  isSendingTurn: false,

  setSituation: (text) => set({ situationDescription: text }),
  setThought: (text) => set({ automaticThought: text }),
  setInitialAnxiety: (level) => set({ initialAnxietyLevel: level }),
  setFinalAnxiety: (level) => set({ finalAnxietyLevel: level }),
  setSelectedOption: (option) => set({ selectedOption: option }),

  analyzeThought: async (token) => {
    const { automaticThought, situationDescription, initialAnxietyLevel } = get();
    if (!automaticThought || automaticThought.trim().length === 0) {
      set({ error: 'Harap isi pikiran negatif kamu' });
      return null;
    }

    set({ isLoading: true, error: null });
    try {
      const result = await CBTService.analyzeThought(
        {
          automaticThought,
          situationDescription,
          initialAnxietyLevel,
        },
        token
      );
      set({
        analysisResult: result,
        selectedOption: result.rationalOptions[0] || null,
        isLoading: false,
      });
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menganalisis pikiran CBT';
      set({ isLoading: false, error: msg });
      return null;
    }
  },

  startSimulation: async (token) => {
    const { situationDescription, automaticThought, selectedOption } = get();
    if (!selectedOption) return false;

    set({ isStartingSimulation: true, error: null, simulationMessages: [] });
    try {
      const sim = await CBTService.startSimulation(
        {
          situationDescription,
          automaticThought,
          chosenReframingText: selectedOption.reframingText,
        },
        token
      );

      const initialMessage: CBTSimulationMessage = {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        text: sim.initialGreeting,
        audioUrl: sim.initialAudioUrl,
      };

      set({
        simulationId: sim.simulationId,
        personaRole: sim.personaRole,
        purpose: sim.purpose,
        instructions: sim.instructions,
        simulationMessages: [initialMessage],
        allInstructionsCompleted: false,
        isStartingSimulation: false,
      });

      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memulai simulasi latihan';
      set({ isStartingSimulation: false, error: msg });
      return false;
    }
  },

  sendTurn: async (input, token) => {
    const {
      simulationId,
      personaRole,
      purpose,
      instructions,
      simulationMessages,
    } = get();

    if (!simulationId) return false;

    set({ isSendingTurn: true, error: null });
    try {
      const historyText = simulationMessages
        .map((m) => `${m.sender.toUpperCase()}: ${m.text}`)
        .join('\n');

      const result = await CBTService.sendSimulationTurn(
        simulationId,
        input,
        personaRole,
        purpose,
        instructions,
        historyText,
        token
      );

      const userMsg: CBTSimulationMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: result.userTurn.transcription,
        audioUrl: result.userTurn.audioUrl,
      };

      const aiMsg: CBTSimulationMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: result.aiTurn.text,
        audioUrl: result.aiTurn.audioUrl,
        naturalFeedback: result.aiTurn.naturalFeedback,
      };

      set({
        simulationMessages: [...simulationMessages, userMsg, aiMsg],
        instructions: result.instructions,
        allInstructionsCompleted: result.allCompleted,
        isSendingTurn: false,
      });

      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirim respon suara';
      set({ isSendingTurn: false, error: msg });
      return false;
    }
  },

  completeSession: async (token) => {
    const {
      situationDescription,
      automaticThought,
      selectedOption,
      initialAnxietyLevel,
      finalAnxietyLevel,
    } = get();

    const reframingText = selectedOption?.reframingText || 'Saya mampu menghadapi situasi ini dengan tenang dan bertahap.';

    set({ isSubmitting: true, error: null });
    try {
      const result = await CBTService.completeSession(
        {
          situationDescription: situationDescription || 'Latihan CBT Harian',
          automaticThought: automaticThought || 'Pikiran otomatis',
          chosenReframingText: reframingText,
          initialAnxietyLevel: initialAnxietyLevel || 5,
          finalAnxietyLevel: finalAnxietyLevel || 2,
        },
        token
      );
      set({ completionResult: result, isSubmitting: false });
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan sesi CBT';
      set({ isSubmitting: false, error: msg });
      return null;
    }
  },

  updateMessageAudioUrl: (id: string, audioUrl: string) =>
    set((state) => ({
      simulationMessages: state.simulationMessages.map((m) =>
        m.id === id ? { ...m, audioUrl } : m
      ),
    })),

  reset: () =>
    set({
      situationDescription: '',
      automaticThought: '',
      initialAnxietyLevel: 5,
      finalAnxietyLevel: 2,
      analysisResult: null,
      selectedOption: null,
      completionResult: null,
      isLoading: false,
      isSubmitting: false,
      error: null,
      simulationId: null,
      personaRole: 'Lawan Bicara yang Sabar',
      purpose: '',
      instructions: [],
      simulationMessages: [],
      allInstructionsCompleted: false,
      isStartingSimulation: false,
      isSendingTurn: false,
    }),
}));
