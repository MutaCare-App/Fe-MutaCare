import Constants from 'expo-constants';

const getBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // Extract host IP address from Expo Metro packager URL dynamically
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip) {
      return `http://${ip}:5000/api/v1`;
    }
  }

  return 'http://127.0.0.1:5000/api/v1';
};

export const API_BASE_URL = getBaseUrl();

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

export type AuthErrorHandler = (errorMessage?: string) => void;
let authErrorHandler: AuthErrorHandler | null = null;

export function registerAuthErrorHandler(handler: AuthErrorHandler | null) {
  authErrorHandler = handler;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiEnvelope<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    let data: ApiEnvelope<T> | null = null;
    try {
      data = await response.json();
    } catch {
      // JSON parsing failed (e.g. HTML or empty body)
    }

    if (!response.ok || !data?.success) {
      const isAuthError =
        response.status === 401 ||
        (typeof data?.message === 'string' &&
          data.message.toLowerCase().includes('authentication token'));

      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const isAuthEndpoint =
        cleanEndpoint === '/auth/login' || cleanEndpoint === '/auth/register';

      if (isAuthError && !isAuthEndpoint && authErrorHandler) {
        authErrorHandler(data?.message || 'Sesi Anda telah berakhir. Silakan masuk kembali.');
      }

      const errorMessage = data?.message || `HTTP ${response.status} Request failed`;
      throw new Error(errorMessage);
    }

    return data as ApiEnvelope<T>;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Gagal terhubung ke server backend');
  }
}
