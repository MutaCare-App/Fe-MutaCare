import React, { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

WebBrowser.maybeCompleteAuthSession();

export default function AuthCallbackScreen() {
  const router = useRouter();
  const localParams = useLocalSearchParams();
  const currentUrl = Linking.useURL();
  const { handleOAuthCallbackUrl, isAuthenticated, user, error } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function processCallback() {
      if (hasProcessedRef.current) return;

      try {
        // If already authenticated and profile is ready, immediately redirect
        if (isAuthenticated && user) {
          if (user.hasCompletedAssessment) {
            router.replace("/dashboard");
          } else {
            router.replace("/assessment");
          }
          return;
        }

        hasProcessedRef.current = true;

        // Retrieve full URL from deep link or initial launch
        const initialUrl = await Linking.getInitialURL();
        const effectiveUrl = currentUrl || initialUrl || "";

        const code = typeof localParams.code === "string" ? localParams.code : undefined;
        const accessToken = typeof localParams.access_token === "string" ? localParams.access_token : undefined;
        const refreshToken = typeof localParams.refresh_token === "string" ? localParams.refresh_token : undefined;

        let success = false;
        if (code || accessToken) {
          success = await handleOAuthCallbackUrl({ code, accessToken, refreshToken });
        } else if (effectiveUrl && (effectiveUrl.includes("callback") || effectiveUrl.includes("access_token=") || effectiveUrl.includes("code="))) {
          success = await handleOAuthCallbackUrl(effectiveUrl);
        }

        if (!isMounted) return;

        if (success) {
          const currentUser = useAuthStore.getState().user;
          if (currentUser?.hasCompletedAssessment) {
            router.replace("/dashboard");
          } else {
            router.replace("/assessment");
          }
        } else {
          setErrorMessage(error || "Gagal memproses otentikasi Google.");
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat otentikasi Google.";
        setErrorMessage(msg);
      } finally {
        if (isMounted) setIsProcessing(false);
      }
    }

    void processCallback();

    return () => {
      isMounted = false;
    };
  }, [currentUrl, localParams, isAuthenticated, user]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }} className="items-center justify-center px-8">
      {isProcessing ? (
        <View className="items-center gap-4">
          <ActivityIndicator size="large" color="#40513B" />
          <Text className="text-primary-400 font-poppins-semibold text-base text-center">
            Menghubungkan akun Google...
          </Text>
          <Text className="text-neutral-400 font-poppins text-xs text-center">
            Mohon tunggu sebentar, Anda akan dialihkan otomatis.
          </Text>
        </View>
      ) : (
        <View className="items-center gap-4 w-full">
          <Text className="text-red-500 font-poppins-semibold text-center text-sm">
            {errorMessage || "Otentikasi tidak dapat diselesaikan."}
          </Text>
          <Button
            onPress={() => router.replace("/auth/login")}
            className="bg-primary-300 w-full h-12 rounded-lg justify-center items-center mt-2"
          >
            <Text className="text-white font-poppins-semibold text-sm">
              Kembali ke Halaman Masuk
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
}
