import { create } from 'zustand';
import {
  ProgressService,
  ProgressSummaryData,
  ReflectionHistoryItem,
  WeeklyMoodData,
} from '@/services/progressService';

interface ProgressState {
  summary: ProgressSummaryData | null;
  reflections: ReflectionHistoryItem[];
  weeklyMood: WeeklyMoodData | null;
  selectedWeek: number;
  isLoadingSummary: boolean;
  isLoadingReflections: boolean;
  isLoadingWeeklyMood: boolean;
  error: string | null;

  fetchProgressSummary: (token?: string | null) => Promise<void>;
  fetchReflections: (token?: string | null) => Promise<void>;
  fetchWeeklyMood: (weekNumber?: number, token?: string | null) => Promise<void>;
  setSelectedWeek: (week: number) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  summary: null,
  reflections: [],
  weeklyMood: null,
  selectedWeek: 1,
  isLoadingSummary: false,
  isLoadingReflections: false,
  isLoadingWeeklyMood: false,
  error: null,

  fetchProgressSummary: async (token) => {
    set({ isLoadingSummary: true, error: null });
    try {
      const summary = await ProgressService.getProgressSummary(token);
      set({
        summary,
        selectedWeek: summary.currentWeek,
        isLoadingSummary: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memuat ringkasan kemajuan';
      set({ isLoadingSummary: false, error: message });
    }
  },

  fetchReflections: async (token) => {
    set({ isLoadingReflections: true, error: null });
    try {
      const reflections = await ProgressService.getReflections(token);
      set({ reflections, isLoadingReflections: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memuat riwayat refleksi';
      set({ isLoadingReflections: false, error: message });
    }
  },

  fetchWeeklyMood: async (weekNumber, token) => {
    set({ isLoadingWeeklyMood: true, error: null });
    const targetWeek = weekNumber ?? get().selectedWeek;
    try {
      const weeklyMood = await ProgressService.getWeeklyMood(targetWeek, token);
      set({
        weeklyMood,
        selectedWeek: weeklyMood.weekNumber,
        isLoadingWeeklyMood: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memuat riwayat mood mingguan';
      set({ isLoadingWeeklyMood: false, error: message });
    }
  },

  setSelectedWeek: (week: number) => {
    set({ selectedWeek: week });
  },

  reset: () => {
    set({
      summary: null,
      reflections: [],
      weeklyMood: null,
      selectedWeek: 1,
      isLoadingSummary: false,
      isLoadingReflections: false,
      isLoadingWeeklyMood: false,
      error: null,
    });
  },
}));
