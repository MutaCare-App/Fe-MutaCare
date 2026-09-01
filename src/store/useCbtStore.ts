import { create } from "zustand";

interface CbtState {
  thought: string | null;
  pastSuccess: string | null;
  outcome: string | null;
  hasViewedReframe: boolean;
  setThought: (thought: string) => void;
  setPastSuccess: (pastSuccess: string) => void;
  setOutcome: (outcome: string) => void;
  markReframeViewed: () => void;
  reset: () => void;
}

export const useCbtStore = create<CbtState>((set) => ({
  thought: null,
  pastSuccess: null,
  outcome: null,
  hasViewedReframe: false,

  setThought: (thought) => set({ thought }),
  setPastSuccess: (pastSuccess) => set({ pastSuccess }),
  setOutcome: (outcome) => set({ outcome }),
  markReframeViewed: () => set({ hasViewedReframe: true }),
  reset: () =>
    set({
      thought: null,
      pastSuccess: null,
      outcome: null,
      hasViewedReframe: false,
    }),
}));
