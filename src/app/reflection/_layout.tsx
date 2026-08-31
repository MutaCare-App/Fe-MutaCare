import { Stack } from "expo-router";

export default function ReflectionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="mood" />
      <Stack.Screen name="achievements" />
      <Stack.Screen name="note" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
