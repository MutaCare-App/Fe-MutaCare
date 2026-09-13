import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useSimulationStore } from '@/store/useSimulationStore';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
import { MicrophoneIcon } from 'phosphor-react-native/src/icons/Microphone';
import { StarIcon } from 'phosphor-react-native/src/icons/Star';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CaretLeftIcon);
iconWithClassName(MicrophoneIcon);
iconWithClassName(StarIcon);

export default function SimulationIndexScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const {
    scenarios,
    fetchScenarios,
    startSimulationSession,
    isLoading,
    error,
  } = useSimulationStore();

  useEffect(() => {
    void fetchScenarios(undefined, token);
  }, [token]);

  const handleStart = async (scenarioId: string) => {
    const res = await startSimulationSession(scenarioId, token);
    if (res) {
      router.push('/simulation/session');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          className="flex-1 px-5 pt-3"
          contentContainerClassName="pb-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="h-12 justify-center">
            <Pressable
              accessibilityLabel="Kembali"
              className="size-9 items-start justify-center active:opacity-60"
              hitSlop={12}
              onPress={() => router.back()}
            >
              <CaretLeftIcon className="text-neutral-700" size={26} />
            </Pressable>
          </View>

          <View className="mt-2 items-center">
            <View className="size-16 items-center justify-center rounded-full bg-primary-100/60 mb-3">
              <MicrophoneIcon className="text-primary-300" size={34} weight="duotone" />
            </View>
            <Text className="text-center font-feather-bold text-2xl text-primary-300 tracking-[0.6px]">
              Simulasi Roleplay AI 🎙️
            </Text>
            <Text className="mt-1 text-center font-poppins text-xs text-neutral-600 leading-5">
              Latihan bicara bertahap dalam skenario dunia nyata dengan kecerdasan buatan empatik.
            </Text>
          </View>

          {error && (
            <View className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <Text className="font-poppins-medium text-xs text-red-600 text-center">{error}</Text>
            </View>
          )}

          {isLoading && scenarios.length === 0 ? (
            <View className="mt-12 items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="mt-2 font-poppins text-xs text-neutral-500">
                Memuat Katalog Skenario...
              </Text>
            </View>
          ) : (
            <View className="mt-6 gap-4">
              <Text className="font-poppins-bold text-sm text-neutral-800">
                Pilih Skenario Latihan Bicara:
              </Text>

              {scenarios.map((item) => (
                <View
                  key={item.id}
                  className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50"
                >
                  <View className="flex-row items-center justify-between mb-1.5">
                    <Text className="font-poppins-bold text-base text-neutral-900">
                      {item.title}
                    </Text>
                    <View className="flex-row items-center gap-1 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      <StarIcon className="text-amber-600" size={12} weight="fill" />
                      <Text className="font-poppins-semibold text-[10px] text-amber-900">
                        Level {item.difficultyLevel}
                      </Text>
                    </View>
                  </View>

                  <Text className="font-poppins-medium text-xs text-primary-300 mb-1">
                    Peran AI: {item.personaRole}
                  </Text>
                  <Text className="font-poppins text-xs text-neutral-600 leading-5 mb-4">
                    {item.description}
                  </Text>

                  <Button
                    className="h-10 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center"
                    onPress={() => handleStart(item.id)}
                  >
                    <Text className="font-poppins-semibold text-xs text-white tracking-[0.6px]">
                      Mulai Latihan ini ➔
                    </Text>
                  </Button>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
