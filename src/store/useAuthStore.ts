import { create } from 'zustand';
import { AuthService, AuthUserData, LoginPayload, RegisterPayload } from '@/services/authService';

interface AuthState {
  user: AuthUserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  registerUser: (payload: RegisterPayload) => Promise<boolean>;
  loginUser: (payload: LoginPayload) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

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
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login gagal. Periksa kembali email dan kata sandi Anda.';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
