import { Stack } from 'expo-router';

export default function CBTLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="analysis" />
      <Stack.Screen name="simulation" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
