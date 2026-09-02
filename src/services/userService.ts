import { apiFetch } from '@/lib/api';

export interface UserProfileData {
  id: string;
  fullName: string;
  nickname: string | null;
  avatarUrl: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  currentStreak: number;
  longestStreak: number;
  hasCompletedAssessment: boolean;
}

export interface UpdateUserProfilePayload {
  nickname?: string;
  gender?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
}

export class UserService {
  public static async getProfile(token: string): Promise<UserProfileData> {
    const res = await apiFetch<UserProfileData>('/users/me', { method: 'GET' }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal memuat profil');
    }

    return res.data;
  }

  public static async updateProfile(
    payload: UpdateUserProfilePayload,
    token: string,
  ): Promise<UserProfileData | null> {
    const res = await apiFetch<UserProfileData>(
      '/users/me',
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
      },
      token,
    );

    return res.data ?? null;
  }
}
