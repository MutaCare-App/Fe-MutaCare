import { Stack, router } from "expo-router";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { registerAuthErrorHandler } from "@/lib/api";
import "../../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    let isHandlingAuthError = false;

    registerAuthErrorHandler((msg) => {
      if (isHandlingAuthError) return;
      isHandlingAuthError = true;

      useAuthStore.getState().logout(msg || "Sesi Anda telah berakhir. Silakan masuk kembali.");
      router.replace("/auth/login");

      setTimeout(() => {
        isHandlingAuthError = false;
      }, 1500);
    });
  }, []);
  const [loaded, error] = useFonts({
    "Feather Bold": require("../../assets/fonts/Feather Bold.ttf"),
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../../assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("../../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("../../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../../assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("../../assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("../../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("../../assets/fonts/Poppins-ThinItalic.ttf"),
  });

  useEffect(() => {
    if ((loaded || error) && hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, hasHydrated]);

  if ((!loaded && !error) || !hasHydrated) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <PortalHost />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
