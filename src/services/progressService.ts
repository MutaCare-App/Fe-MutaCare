import { apiFetch } from '@/lib/api';

export interface ProgressSummaryData {
  streak: number;
  currentWeek: number;
  currentDay: number;
  totalDays: number;
  completedMissionsCount: number;
  activeDaysCount: number;
  totalReflectionsCount: number;
  latestReflection: {
    id: string;
    dayNumber: number;
    note: string;
    createdAt: string;
  } | null;
}

export interface ReflectionHistoryItem {
  id: string;
  dayNumber: number;
  weekNumber: number;
  note: string;
  anxietyBefore: number | null;
  anxietyAfter: number | null;
  createdAt: string;
}

export interface DayMoodDto {
  day: string;
  date: string;
  mood: string | null;
  anxietyLevel: number | null;
  label: string | null;
  isActiveDay: boolean;
  isToday: boolean;
}

export interface WeeklyMoodData {
  weekNumber: number;
  maxWeek: number;
  todayMood: {
    mood: string;
    anxietyLevel: number;
    label: string;
  } | null;
  days: DayMoodDto[];
  dominantMood: string | null;
  insight: string;
}

export class ProgressService {
  public static async getProgressSummary(token?: string | null): Promise<ProgressSummaryData> {
    const res = await apiFetch<ProgressSummaryData>('/progress/summary', { method: 'GET' }, token);
    if (!res.data) {
      throw new Error(res.message || 'Gagal mengambil ringkasan kemajuan');
    }
    return res.data;
  }

  public static async getReflections(token?: string | null): Promise<ReflectionHistoryItem[]> {
    const res = await apiFetch<ReflectionHistoryItem[]>('/progress/reflections', { method: 'GET' }, token);
    if (!res.data) {
      throw new Error(res.message || 'Gagal mengambil riwayat refleksi');
    }
    return res.data;
  }

  public static async getWeeklyMood(
    weekNumber?: number,
    token?: string | null
  ): Promise<WeeklyMoodData> {
    const query = weekNumber ? `?weekNumber=${weekNumber}` : '';
    const res = await apiFetch<WeeklyMoodData>(`/progress/weekly-mood${query}`, { method: 'GET' }, token);
    if (!res.data) {
      throw new Error(res.message || 'Gagal mengambil riwayat mood mingguan');
    }
    return res.data;
  }
}
