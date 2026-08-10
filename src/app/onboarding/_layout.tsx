import PaginationDots from "@/components/onboarding/paginations-dots";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";

// Mapping path ke step index
const STEP_MAP: Record<string, number> = {
  "/onboarding": 0,
  "/onboarding/step-2": 1,
  "/onboarding/step-3": 2,
};

export default function OnboardingLayout() {
  const pathname = usePathname();
  const currentStep = STEP_MAP[pathname] ?? 0;

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      />

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <PaginationDots totalSteps={3} currentStep={currentStep} />
      </View>
    </View>
  );
}
