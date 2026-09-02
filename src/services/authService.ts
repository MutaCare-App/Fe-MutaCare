import { apiFetch } from '@/lib/api';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUserData {
  id: string;
  email: string;
  fullName: string;
  nickname?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  currentStreak?: number;
  longestStreak?: number;
  hasCompletedAssessment?: boolean;
}

export interface AuthSessionData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponseData {
  user: AuthUserData;
  session: AuthSessionData | null;
}

export class AuthService {
  /**
   * Registers a new user account on the backend.
   */
  public static async register(payload: RegisterPayload): Promise<AuthResponseData> {
    const res = await apiFetch<AuthResponseData>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!res.data) {
      throw new Error(res.message || 'Registrasi gagal');
    }

    return res.data;
  }

  /**
   * Authenticates user login credentials on the backend.
   */
  public static async login(payload: LoginPayload): Promise<AuthResponseData> {
    const res = await apiFetch<AuthResponseData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!res.data) {
      throw new Error(res.message || 'Login gagal');
    }

    return res.data;
  }
}
