import { create } from 'zustand';
import { AuthService, AuthUserData, LoginPayload, RegisterPayload } from '@/services/authService';
import { UpdateUserProfilePayload, UserService } from '@/services/userService';

interface AuthState {
  user: AuthUserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isProfileLoading: boolean;
  isProfileUpdating: boolean;
  profileError: string | null;

  registerUser: (payload: RegisterPayload) => Promise<boolean>;
  loginUser: (payload: LoginPayload) => Promise<boolean>;
  fetchProfile: () => Promise<boolean>;
  updateProfile: (payload: UpdateUserProfilePayload) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  clearProfileError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isProfileLoading: false,
  isProfileUpdating: false,
  profileError: null,

  registerUser: async (payload: RegisterPayload): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const data = await AuthService.register(payload);
      set({
        user: data.user,
        token: data.session?.accessToken || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        profileError: null,
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registrasi gagal. Silakan coba lagi.';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  loginUser: async (payload: LoginPayload): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const data = await AuthService.login(payload);
      set({
        user: data.user,
        token: data.session?.accessToken || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        profileError: null,
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login gagal. Periksa kembali email dan kata sandi Anda.';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  fetchProfile: async (): Promise<boolean> => {
    const token = get().token;
    if (!token) {
      set({ profileError: 'Sesi login tidak ditemukan.' });
      return false;
    }

    set({ isProfileLoading: true, profileError: null });
    try {
      const profile = await UserService.getProfile(token);
      if (get().token !== token) {
        return false;
      }
      set((state) => ({
        user: state.user
          ? { ...state.user, ...profile }
          : { ...profile, email: '' },
        isProfileLoading: false,
        profileError: null,
      }));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memuat profil.';
      set({ isProfileLoading: false, profileError: message });
      return false;
    }
  },

  updateProfile: async (payload: UpdateUserProfilePayload): Promise<boolean> => {
    const token = get().token;
    if (!token) {
      set({ profileError: 'Sesi login tidak ditemukan.' });
      return false;
    }

    set({ isProfileUpdating: true, profileError: null });
    try {
      const updatedProfile = await UserService.updateProfile(payload, token);
      if (get().token !== token) {
        return false;
      }
      set((state) => ({
        user: state.user
          ? { ...state.user, ...payload, ...(updatedProfile ?? {}) }
          : state.user,
        isProfileUpdating: false,
        profileError: null,
      }));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memperbarui profil.';
      set({ isProfileUpdating: false, profileError: message });
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
      isProfileLoading: false,
      isProfileUpdating: false,
      profileError: null,
    });
  },

  clearError: () => set({ error: null }),
  clearProfileError: () => set({ profileError: null }),
}));
