import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useCBTStore } from '@/store/useCBTStore';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
import { CheckCircleIcon } from 'phosphor-react-native/src/icons/CheckCircle';
import { LightbulbIcon } from 'phosphor-react-native/src/icons/Lightbulb';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CaretLeftIcon);
iconWithClassName(CheckCircleIcon);
iconWithClassName(LightbulbIcon);

export default function CBTAnalysisScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const {
    analysisResult,
    selectedOption,
    setSelectedOption,
    startSimulation,
    isStartingSimulation,
  } = useCBTStore();

  useEffect(() => {
    if (!useCBTStore.getState().analysisResult) {
      router.replace('/cbt');
    }
  }, []);

  const handleStartSimulation = async () => {
    if (!selectedOption) return;
    const ok = await startSimulation(token);
    if (ok) {
      router.push('/cbt/simulation');
    } else {
      Alert.alert(
        'Gagal Memulai Simulasi',
        'Terjadi kendala saat menyiapkan simulasi latihan. Silakan coba lagi.'
      );
    }
  };

  if (!analysisResult) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          className="flex-1 px-5 pt-3"
          contentContainerClassName="pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
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

          <Text className="font-feather-bold text-2xl text-primary-300 tracking-[0.6px]">
            Hasil Analisis CBT 🌿
          </Text>

          {/* Distorsi Kognitif Card */}
          <View className="mt-4 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl">
            <View className="flex-row items-center gap-2 mb-2">
              <LightbulbIcon className="text-amber-600" size={20} weight="fill" />
              <Text className="font-poppins-bold text-xs text-amber-900">
                Pola Distorsi Kognitif Terdeteksi:
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-1.5 mb-2">
              {analysisResult.cognitiveDistortions.map((distortion) => (
                <View
                  key={distortion}
                  className="bg-white px-2.5 py-1 rounded-full border border-amber-300"
                >
                  <Text className="font-poppins-medium text-[11px] text-amber-800">
                    {distortion}
                  </Text>
                </View>
              ))}
            </View>
            <Text className="font-poppins text-xs text-amber-900 leading-5 mt-1">
              {analysisResult.explanationText}
            </Text>
          </View>

          {/* Rational Thought Selection */}
          <Text className="mt-6 font-poppins-bold text-sm text-neutral-800">
            Pilih Sudut Pandang Rasional Baru:
          </Text>
          <Text className="font-poppins text-xs text-neutral-500 mb-3">
            Pilih kalimat reframing yang paling menenangkan dan masuk akal untukmu saat ini.
          </Text>

          <View className="gap-3">
            {analysisResult.rationalOptions.map((option) => {
              const isSelected = selectedOption?.id === option.id;

              return (
                <Pressable
                  key={option.id}
                  onPress={() => setSelectedOption(option)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500'
                      : 'bg-neutral-50/60 border-neutral-200 active:bg-neutral-100'
                  }`}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-2">
                      <Text
                        className={`font-poppins-bold text-sm leading-5 ${
                          isSelected ? 'text-emerald-900' : 'text-neutral-800'
                        }`}
                      >
                        "{option.reframingText}"
                      </Text>
                      {option.rationale ? (
                        <Text className="mt-1.5 font-poppins text-xs text-neutral-600">
                          💡 {option.rationale}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      className={`size-6 items-center justify-center rounded-full ${
                        isSelected ? 'bg-emerald-500' : 'border border-neutral-300'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircleIcon className="text-white" size={20} weight="fill" />
                      ) : null}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Button
            className="mt-8 h-12 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center flex-row gap-2"
            disabled={!selectedOption || isStartingSimulation}
            onPress={handleStartSimulation}
          >
            {isStartingSimulation ? (
              <>
                <ActivityIndicator color="#ffffff" size="small" />
                <Text className="font-poppins-semibold text-base text-white tracking-[0.7px]">
                  Menyiapkan Simulasi...
                </Text>
              </>
            ) : (
              <Text className="font-poppins-semibold text-base text-white tracking-[0.7px]">
                Terapkan & Mulai Simulasi ➔
              </Text>
            )}
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
