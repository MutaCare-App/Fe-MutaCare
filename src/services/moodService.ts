import { apiFetch } from '@/lib/api';
import { MoodItem, MOODS } from '@/store/useMoodStore';

export interface MoodCheckInResponse {
  date: string;
  mood: string;
  anxietyLevel: number;
  aiCompanionMessage: string;
  recommendedAction: string;
}

export function mapMoodItemToDTO(moodItem: MoodItem) {
  switch (moodItem.id) {
    case 1:
      return { mood: 'sad', anxietyLevel: 5 };
    case 2:
      return { mood: 'anxious', anxietyLevel: 4 };
    case 3:
      return { mood: 'neutral', anxietyLevel: 3 };
    case 4:
      return { mood: 'happy', anxietyLevel: 2 };
    case 5:
      return { mood: 'happy', anxietyLevel: 1 };
    default:
      return { mood: 'neutral', anxietyLevel: 3 };
  }
}

export function mapDTOToMoodItem(mood: string, anxietyLevel: number): MoodItem {
  if (anxietyLevel >= 5 || mood === 'sad') return MOODS[0];
  if (anxietyLevel === 4 || mood === 'anxious' || mood === 'scared') return MOODS[1];
  if (anxietyLevel === 3 || mood === 'neutral') return MOODS[2];
  if (anxietyLevel === 2) return MOODS[3];
  if (anxietyLevel <= 1 || mood === 'happy') return MOODS[4];
  return MOODS[2];
}

export class MoodService {
  public static async submitMoodCheckIn(
    moodItem: MoodItem,
    token?: string | null
  ): Promise<MoodCheckInResponse> {
    const dto = mapMoodItemToDTO(moodItem);
    const res = await apiFetch<MoodCheckInResponse>('/moods/check-in', {
      method: 'POST',
      body: JSON.stringify(dto),
    }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal menyimpan mood check-in');
    }

    return res.data;
  }
}
