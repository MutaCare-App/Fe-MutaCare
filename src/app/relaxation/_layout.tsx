import { Stack } from "expo-router";

export default function RelaxationLayout() {
  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="session" />
    </Stack>
  );
}
