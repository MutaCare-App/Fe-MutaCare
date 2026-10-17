import { create } from 'zustand';
import {
  JourneyService,
  JourneyStatusData,
  DayMissionsData,
  DailyMissionFrontendItem,
} from '@/services/journeyService';
import { mapDTOToMoodItem } from '@/services/moodService';
import { useAuthStore } from '@/store/useAuthStore';
import { useDailyPracticeStore } from '@/store/useDailyPracticeStore';
import { useMoodStore } from '@/store/useMoodStore';

interface JourneyState {
  status: JourneyStatusData | null;
  selectedDayData: DayMissionsData | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  moodCheckRequired: boolean;
  hasCompletedDayToday: boolean;

  fetchJourneyStatus: (token?: string | null) => Promise<void>;
  fetchDayMissions: (dayNumber: number, token?: string | null) => Promise<DayMissionsData | null>;
  completeMission: (
    missionId: string,
    payload?: { sudsBefore?: number; sudsAfter?: number; reflectionNotes?: string },
    token?: string | null
  ) => Promise<DailyMissionFrontendItem | null>;
  setHasCompletedDayToday: (val: boolean) => void;
  clearMoodCheckRequired: () => void;
  reset: () => void;
}

export const useJourneyStore = create<JourneyState>((set, get) => ({
  status: null,
  selectedDayData: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  moodCheckRequired: false,
  hasCompletedDayToday: false,

  fetchJourneyStatus: async (token) => {
    set({ isLoading: true, error: null, moodCheckRequired: false });
    try {
      const data = await JourneyService.getJourneyStatus(token);
      set({
        status: data,
        hasCompletedDayToday: data.hasCompletedDayToday ?? get().hasCompletedDayToday,
        isLoading: false,
        moodCheckRequired: !data.isMoodCheckedToday,
      });
      useDailyPracticeStore.getState().setWeekAndDay(data.currentWeek, data.currentDay);
      if (data.isMoodCheckedToday) {
        if (data.todayMood) {
          const item = mapDTOToMoodItem(data.todayMood.mood, data.todayMood.anxietyLevel);
          useMoodStore.getState().setMood(item);
        }
        void get().fetchDayMissions(data.currentDay, token);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal mengambil data perjalanan';
      set({ isLoading: false, error: message });
    }
  },

  fetchDayMissions: async (dayNumber, token) => {
    set({ isLoading: true, error: null });
    try {
      const data = await JourneyService.getDayMissions(dayNumber, token);
      set({
        selectedDayData: data,
        isLoading: false,
        error: null,
      });
      if (data && data.missions) {
        useDailyPracticeStore.getState().setTasks(
          data.missions.map((m) => ({
            id: m.id,
            title: m.title,
            completed: m.status === 'completed',
            isOptional: m.isOptional,
            isSkipped: m.isSkipped || m.status === 'skipped',
          }))
        );
      }
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal mengambil data misi harian';
      const isMoodReq = message.toLowerCase().includes('jurnal mood') || message.toLowerCase().includes('mood check');
      set({
        isLoading: false,
        error: message,
        moodCheckRequired: isMoodReq,
      });
      return null;
    }
  },

  completeMission: async (missionId, payload, token) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await JourneyService.completeMission(missionId, payload, token);
      
      const currentDayData = get().selectedDayData;
      if (currentDayData) {
        const updatedMissions = currentDayData.missions.map((m) =>
          m.id === missionId ? { ...m, status: 'completed' as const } : m
        );
        const allDone = updatedMissions.every(
          (m) => m.status === 'completed' || m.status === 'skipped'
        );
        set({
          isSubmitting: false,
          hasCompletedDayToday: allDone || get().hasCompletedDayToday,
          selectedDayData: {
            ...currentDayData,
            missions: updatedMissions,
          },
        });
        if (currentDayData.dayNumber) {
          void get().fetchDayMissions(currentDayData.dayNumber, token);
        }
      } else {
        set({ isSubmitting: false });
      }

      // Refresh journey status & auth profile after completing a mission
      void get().fetchJourneyStatus(token);
      void useAuthStore.getState().fetchProfile();
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal menyelesaikan misi';
      const isMoodReq = message.toLowerCase().includes('jurnal mood') || message.toLowerCase().includes('mood check');
      set({
        isSubmitting: false,
        error: message,
        moodCheckRequired: isMoodReq,
      });
      return null;
    }
  },

  setHasCompletedDayToday: (val: boolean) => set({ hasCompletedDayToday: val }),

  clearMoodCheckRequired: () => set({ moodCheckRequired: false }),

  reset: () => set({
    status: null,
    selectedDayData: null,
    isLoading: false,
    isSubmitting: false,
    error: null,
    moodCheckRequired: false,
    hasCompletedDayToday: false,
  }),
}));
