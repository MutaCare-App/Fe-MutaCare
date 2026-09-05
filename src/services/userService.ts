import { apiFetch } from '@/lib/api';

export interface UserProfileData {
  id: string;
  email?: string | null;
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

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
  ): Promise<UserProfileData> {
    const res = await apiFetch<UserProfileData>(
      '/users/me',
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
      },
      token,
    );

    if (!res.data) {
      throw new Error(res.message || 'Gagal memperbarui profil');
    }

    return res.data;
  }

  public static async changePassword(
    payload: ChangePasswordPayload,
    token: string,
  ): Promise<void> {
    await apiFetch<null>(
      '/users/password',
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      },
      token,
    );
  }
}
