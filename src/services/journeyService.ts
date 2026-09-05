import { apiFetch } from '@/lib/api';

export interface DayStatusItem {
  dayNumber: number;
  weekNumber: number;
  status: 'completed' | 'active' | 'locked';
}

export interface JourneyStatusData {
  isMoodCheckedToday: boolean;
  todayMood?: { mood: string; anxietyLevel: number } | null;
  currentWeek: number;
  currentDay: number;
  totalDays: number;
  completedDaysCount: number;
  streakCount: number;
  mutismSeverity: 'mild' | 'moderate' | 'severe';
  activeWeekDays: DayStatusItem[];
}

export interface DailyMissionFrontendItem {
  id: string;
  dayNumber: number;
  missionType: 'relaxation' | 'guided_practice' | 'cbt' | 'vocal' | 'simulation' | 'reflection';
  title: string;
  durationText: string;
  description: string;
  status: 'completed' | 'available' | 'locked' | 'skipped';
  isOptional?: boolean;
  isSkipped?: boolean;
  sudsBefore?: number | null;
  sudsAfter?: number | null;
  reflectionNotes?: string | null;
}

export interface DayMissionsData {
  dayNumber: number;
  weekNumber: number;
  title: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  userAnxietyLevel?: number | null;
  relaxationMode?: 'mandatory' | 'optional' | 'skipped';
  missions: DailyMissionFrontendItem[];
}

export class JourneyService {
  /**
   * Fetches user's journey status, progress %, and mood check flag.
   */
  public static async getJourneyStatus(token?: string | null): Promise<JourneyStatusData> {
    const res = await apiFetch<JourneyStatusData>('/journey/status', {
      method: 'GET',
    }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal mengambil data perjalanan');
    }

    return res.data;
  }

  /**
   * Fetches 3 daily missions for a specific day.
   * Throws Error if mood check-in is required for today's active day.
   */
  public static async getDayMissions(dayNumber: number, token?: string | null): Promise<DayMissionsData> {
    const res = await apiFetch<DayMissionsData>(`/journey/days/${dayNumber}`, {
      method: 'GET',
    }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal mengambil data misi harian');
    }

    return res.data;
  }

  /**
   * Completes a daily mission and updates progress.
   */
  public static async completeMission(
    missionId: string,
    payload?: { sudsBefore?: number; sudsAfter?: number; reflectionNotes?: string },
    token?: string | null
  ): Promise<DailyMissionFrontendItem> {
    const res = await apiFetch<DailyMissionFrontendItem>(`/journey/missions/${missionId}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload || {}),
    }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal menyelesaikan misi harian');
    }

    return res.data;
  }
}
