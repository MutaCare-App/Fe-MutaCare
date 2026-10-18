import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

WebBrowser.maybeCompleteAuthSession();

export default function NotFoundScreen() {
  const router = useRouter();
  const currentUrl = Linking.useURL();
  const { handleOAuthCallbackUrl, isAuthenticated, user } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkDeepLinkAuth() {
      try {
        const initialUrl = await Linking.getInitialURL();
        const effectiveUrl = currentUrl || initialUrl || "";

        // Check if the unmatched URL actually contains OAuth callback tokens or params
        if (
          effectiveUrl.includes("access_token=") ||
          effectiveUrl.includes("code=") ||
          effectiveUrl.includes("callback")
        ) {
          const success = await handleOAuthCallbackUrl(effectiveUrl);
          if (success && isMounted) {
            const currentUser = useAuthStore.getState().user;
            if (currentUser?.hasCompletedAssessment) {
              router.replace("/dashboard");
            } else {
              router.replace("/assessment");
            }
            return;
          }
        }
      } catch {
        // Fall through to not found display
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    if (isAuthenticated && user) {
      if (user.hasCompletedAssessment) {
        router.replace("/dashboard");
      } else {
        router.replace("/assessment");
      }
    } else {
      void checkDeepLinkAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [currentUrl, isAuthenticated, user]);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }} className="items-center justify-center px-8">
        <ActivityIndicator size="large" color="#40513B" />
        <Text className="text-primary-400 font-poppins-semibold text-base text-center mt-4">
          Menghubungkan akun Anda...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }} className="items-center justify-center px-8">
      <Text className="text-neutral-800 font-poppins-bold text-xl text-center mb-2">
        Halaman Tidak Ditemukan
      </Text>
      <Text className="text-neutral-500 font-poppins text-sm text-center mb-6">
        Rute yang Anda tuju tidak tersedia.
      </Text>
      <Button
        onPress={() => router.replace(isAuthenticated ? "/dashboard" : "/auth/login")}
        className="bg-primary-300 w-full h-12 rounded-lg justify-center items-center"
      >
        <Text className="text-white font-poppins-semibold text-sm">
          {isAuthenticated ? "Kembali ke Beranda" : "Kembali ke Halaman Masuk"}
        </Text>
      </Button>
    </View>
  );
}
