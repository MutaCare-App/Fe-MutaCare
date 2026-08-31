import { create } from "zustand";

export type ReflectionMood =
  | "very-bad"
  | "bad"
  | "neutral"
  | "good"
  | "very-good";

interface ReflectionState {
  mood: ReflectionMood | null;
  achievements: string[];
  note: string;
  setMood: (mood: ReflectionMood) => void;
  toggleAchievement: (achievement: string) => void;
  setNote: (note: string) => void;
  reset: () => void;
}

export const useReflectionStore = create<ReflectionState>((set) => ({
  mood: null,
  achievements: [],
  note: "",

  setMood: (mood) => set({ mood }),

  toggleAchievement: (achievement) =>
    set((state) => ({
      achievements: state.achievements.includes(achievement)
        ? state.achievements.filter((item) => item !== achievement)
        : [...state.achievements, achievement],
    })),

  setNote: (note) => set({ note }),

  reset: () => set({ mood: null, achievements: [], note: "" }),
}));
