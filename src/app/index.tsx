import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import SplashScreen from "./splash";

export default function Index() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function checkRoute() {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (
          initialUrl &&
          (initialUrl.includes("access_token=") ||
            initialUrl.includes("code=") ||
            initialUrl.includes("callback"))
        ) {
          const success = await useAuthStore.getState().handleOAuthCallbackUrl(initialUrl);
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
      } catch {}

      timer = setTimeout(() => {
        if (!isMounted) return;
        const state = useAuthStore.getState();
        if (state.token && state.isAuthenticated) {
          if (state.user?.hasCompletedAssessment) {
            router.replace("/dashboard");
          } else {
            router.replace("/assessment");
          }
        } else {
          router.replace("/onboarding");
        }
      }, 1500);
    }

    void checkRoute();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [token, isAuthenticated, router]);

  return <SplashScreen />;
}
