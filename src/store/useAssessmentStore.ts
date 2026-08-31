import { create } from 'zustand';
import {
  AssessmentService,
  AssessmentResultData,
  QuestionItemFrontend,
} from '@/services/assessmentService';
import { ASSESSMENT_QUESTIONS } from '@/data/assessment';

interface AssessmentState {
  questions: QuestionItemFrontend[];
  currentIndex: number;
  selectedAnswers: Record<number, string[]>;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  result: AssessmentResultData | null;

  fetchQuestions: (token?: string | null) => Promise<void>;
  selectOption: (questionId: number, option: string, type: 'radio' | 'checkbox', maxSelect?: number) => void;
  nextQuestion: () => boolean; // returns true if finished all questions
  prevQuestion: () => boolean; // returns true if navigated back
  submitAssessment: (token?: string | null) => Promise<AssessmentResultData | null>;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  questions: ASSESSMENT_QUESTIONS,
  currentIndex: 0,
  selectedAnswers: {},
  isLoading: false,
  isSubmitting: false,
  error: null,
  result: null,

  fetchQuestions: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedQuestions = await AssessmentService.getQuestions(token);
      set({
        questions: fetchedQuestions,
        isLoading: false,
      });
    } catch {
      // Fallback to local default questions if network error
      set({
        questions: ASSESSMENT_QUESTIONS,
        isLoading: false,
      });
    }
  },

  selectOption: (questionId, option, type, maxSelect) => {
    const currentSelections = get().selectedAnswers[questionId] || [];

    if (type === 'radio') {
      set((state) => ({
        selectedAnswers: {
          ...state.selectedAnswers,
          [questionId]: [option],
        },
      }));
    } else {
      const isAlreadySelected = currentSelections.includes(option);
      if (isAlreadySelected) {
        set((state) => ({
          selectedAnswers: {
            ...state.selectedAnswers,
            [questionId]: currentSelections.filter((item) => item !== option),
          },
        }));
      } else {
        if (maxSelect && currentSelections.length >= maxSelect) {
          return;
        }
        set((state) => ({
          selectedAnswers: {
            ...state.selectedAnswers,
            [questionId]: [...currentSelections, option],
          },
        }));
      }
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
      return false; // not finished yet
    }
    return true; // reached last question
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
      return true;
    }
    return false;
  },

  submitAssessment: async (token) => {
    const { selectedAnswers } = get();
    set({ isSubmitting: true, error: null });
    try {
      const resultData = await AssessmentService.submitAssessment(selectedAnswers, token);
      set({
        result: resultData,
        isSubmitting: false,
        error: null,
      });
      return resultData;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal mengirim hasil asesmen';
      set({ isSubmitting: false, error: message });
      return null;
    }
  },

  reset: () => {
    set({
      currentIndex: 0,
      selectedAnswers: {},
      error: null,
      result: null,
    });
  },
}));
