import { Stack } from "expo-router";

export default function CbtLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="thought" />
      <Stack.Screen name="past-success" />
      <Stack.Screen name="outcome" />
      <Stack.Screen name="reframe" />
      <Stack.Screen name="ready" />
      <Stack.Screen name="simulation" />
    </Stack>
  );
}
