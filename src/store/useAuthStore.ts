import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { AuthService, AuthUserData, LoginPayload, RegisterPayload } from '@/services/authService';
import { ChangePasswordPayload, UpdateUserProfilePayload, UserService } from '@/services/userService';

WebBrowser.maybeCompleteAuthSession();

function parseAuthParams(url: string): { code?: string; accessToken?: string; refreshToken?: string } {
  let code: string | undefined;
  let accessToken: string | undefined;
  let refreshToken: string | undefined;

  const queryIdx = url.indexOf('?');
  if (queryIdx !== -1) {
    const queryString = url.slice(queryIdx + 1).split('#')[0];
    const params = new URLSearchParams(queryString);
    if (params.get('code')) code = params.get('code')!;
    if (params.get('access_token')) accessToken = params.get('access_token')!;
    if (params.get('refresh_token')) refreshToken = params.get('refresh_token')!;
  }

  const hashIdx = url.indexOf('#');
  if (hashIdx !== -1) {
    const hashString = url.slice(hashIdx + 1);
    const params = new URLSearchParams(hashString);
    if (!code && params.get('code')) code = params.get('code')!;
    if (!accessToken && params.get('access_token')) accessToken = params.get('access_token')!;
    if (!refreshToken && params.get('refresh_token')) refreshToken = params.get('refresh_token')!;
  }

  return { code, accessToken, refreshToken };
}

interface AuthState {
  user: AuthUserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isProfileLoading: boolean;
  isProfileUpdating: boolean;
  profileError: string | null;
  isPasswordChanging: boolean;
  passwordError: string | null;
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  registerUser: (payload: RegisterPayload) => Promise<boolean>;
  loginUser: (payload: LoginPayload) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  fetchProfile: () => Promise<boolean>;
  updateProfile: (payload: UpdateUserProfilePayload) => Promise<boolean>;
  changePassword: (payload: ChangePasswordPayload) => Promise<boolean>;
  logout: (customError?: string) => void;
  clearError: () => void;
  clearProfileError: () => void;
  clearPasswordError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      isProfileLoading: false,
      isProfileUpdating: false,
      profileError: null,
      isPasswordChanging: false,
      passwordError: null,
      hasHydrated: false,

      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

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

      loginWithGoogle: async (): Promise<boolean> => {
        set({ isLoading: true, error: null });
        try {
          const redirectUri = 'femutacare://auth/callback';
          const { url: authUrl } = await AuthService.getGoogleOAuthUrl(redirectUri);

          const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

          if (result.type !== 'success' || !result.url) {
            set({ isLoading: false });
            return false;
          }

          const { code, accessToken, refreshToken } = parseAuthParams(result.url);

          if (!code && !accessToken) {
            throw new Error('Tidak menerima token atau kode otentikasi dari Google');
          }

          const data = await AuthService.handleGoogleOAuthCallback({
            code,
            accessToken,
            refreshToken,
          });

          set({
            user: data.user,
            token: data.session?.accessToken || accessToken || null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            profileError: null,
          });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Autentikasi Google gagal. Silakan coba lagi.';
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
              ? { ...state.user, ...profile, email: profile.email || state.user.email || '' }
              : { ...profile, email: profile.email || '' },
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
              ? { ...state.user, ...payload, ...updatedProfile, email: updatedProfile.email || state.user.email || '' }
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

      changePassword: async (payload: ChangePasswordPayload): Promise<boolean> => {
        const token = get().token;
        if (!token) {
          set({ passwordError: 'Sesi login tidak ditemukan.' });
          return false;
        }

        set({ isPasswordChanging: true, passwordError: null });
        try {
          await UserService.changePassword(payload, token);
          set({ isPasswordChanging: false, passwordError: null });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Gagal memperbarui kata sandi.';
          set({ isPasswordChanging: false, passwordError: message });
          return false;
        }
      },

      logout: (customError?: string) => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: customError || null,
          isProfileLoading: false,
          isProfileUpdating: false,
          profileError: null,
          isPasswordChanging: false,
          passwordError: null,
        });
      },

      clearError: () => set({ error: null }),
      clearProfileError: () => set({ profileError: null }),
      clearPasswordError: () => set({ passwordError: null }),
    }),
    {
      name: 'mutacare-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.getState().setHasHydrated(true);
      },
    }
  )
);
