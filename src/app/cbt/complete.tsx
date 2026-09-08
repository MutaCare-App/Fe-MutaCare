import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useCBTStore } from '@/store/useCBTStore';
import { useJourneyStore } from '@/store/useJourneyStore';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CheckCircleIcon } from 'phosphor-react-native/src/icons/CheckCircle';
import { HeartIcon } from 'phosphor-react-native/src/icons/Heart';
import { ArrowRightIcon } from 'phosphor-react-native/src/icons/ArrowRight';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CheckCircleIcon);
iconWithClassName(HeartIcon);
iconWithClassName(ArrowRightIcon);

export default function CBTCompleteScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const selectedDayData = useJourneyStore((state) => state.selectedDayData);
  const completeMission = useJourneyStore((state) => state.completeMission);
  const {
    selectedOption,
    initialAnxietyLevel,
    finalAnxietyLevel,
    setFinalAnxiety,
    completeSession,
    completionResult,
    isSubmitting,
  } = useCBTStore();

  const [submitted, setSubmitted] = useState(false);

  const handleFinish = async () => {
    const result = await completeSession(token);
    if (result) {
      setSubmitted(true);

      // Auto complete daily CBT & simulation missions if available in current active day
      if (token && selectedDayData) {
        const missionsToComplete = selectedDayData.missions.filter(
          (m) =>
            (m.missionType === 'cbt' ||
              m.missionType === 'guided_practice' ||
              m.missionType === 'simulation' ||
              m.missionType === 'vocal') &&
            m.status !== 'completed'
        );
        for (const mission of missionsToComplete) {
          try {
            await completeMission(mission.id, {}, token);
          } catch {
            // ignore
          }
        }
      }
    }
  };

  const handleContinueToReflection = () => {
    useCBTStore.getState().reset();
    router.replace('/reflection');
  };

  const handleReturnToJourney = () => {
    useCBTStore.getState().reset();
    router.replace('/dashboard/journey');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          className="flex-1 px-5 pt-6"
          contentContainerClassName="pb-8 items-center"
          showsVerticalScrollIndicator={false}
        >
          <View className="size-20 items-center justify-center rounded-full bg-emerald-100 mb-4">
            <CheckCircleIcon className="text-emerald-600" size={48} weight="fill" />
          </View>

          <Text className="text-center font-feather-bold text-2xl text-primary-300 tracking-[0.6px]">
            Sesi CBT Selesai! 🎉
          </Text>
          <Text className="mt-1 text-center font-poppins text-xs text-neutral-600 px-4 leading-5">
            Kamu telah berhasil membingkai ulang pikiran takutmu dan mempraktikkannya secara nyata.
          </Text>

          {/* Chosen Rational Thought Card */}
          <View className="mt-6 w-full p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl">
            <Text className="font-poppins-bold text-xs text-emerald-800 mb-1">
              Pikiran Rasional Pilihanmu:
            </Text>
            <Text className="font-poppins-bold text-sm text-emerald-950 leading-5">
              "{selectedOption?.reframingText || 'Saya mampu menghadapi situasi ini dengan tenang dan bertahap.'}"
            </Text>
          </View>

          {/* Final Anxiety Assessment Slider/Buttons */}
          {!submitted ? (
            <View className="mt-6 w-full gap-3">
              <Text className="font-poppins-semibold text-xs text-neutral-800 text-center">
                Berapa Tingkat Cemasmu Sekarang? (Skala 1 - 10): {finalAnxietyLevel}
              </Text>
              <View className="flex-row justify-between gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const isSelected = finalAnxietyLevel === num;
                  return (
                    <Pressable
                      key={num}
                      onPress={() => setFinalAnxiety(num)}
                      className={`flex-1 h-9 rounded-lg items-center justify-center border ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <Text
                        className={`font-poppins-semibold text-xs ${
                          isSelected ? 'text-white' : 'text-neutral-700'
                        }`}
                      >
                        {num}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Button
                className="mt-6 h-12 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center flex-row gap-2"
                disabled={isSubmitting}
                onPress={handleFinish}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text className="font-poppins-semibold text-base text-white tracking-[0.7px]">
                      Simpan & Lanjut ke Refleksi
                    </Text>
                    <ArrowRightIcon className="text-white" size={18} weight="bold" />
                  </>
                )}
              </Button>

              <Pressable
                onPress={handleContinueToReflection}
                className="mt-2 py-2 items-center active:opacity-60"
              >
                <Text className="font-poppins text-xs text-neutral-400 underline">
                  Lewati Evaluasi & Langsung ke Refleksi ➔
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="mt-6 w-full items-center">
              <View className="w-full p-4 bg-primary-100/40 border border-primary-200 rounded-2xl items-center mb-6">
                <HeartIcon className="text-primary-300 mb-1" size={28} weight="fill" />
                <Text className="font-poppins-bold text-sm text-primary-300 text-center">
                  Penurunan Skala Cemas: {initialAnxietyLevel} ➔ {finalAnxietyLevel} (Beda -{Math.max(0, initialAnxietyLevel - finalAnxietyLevel)})
                </Text>
                <Text className="mt-2 text-center font-poppins text-xs text-neutral-700 leading-5">
                  {completionResult?.encouragementNote ||
                    'Luar biasa! Tingkat kecemasanmu berkurang setelah mempraktikkan cara pandang yang lebih rasional.'}
                </Text>
              </View>

              <Button
                className="h-12 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center flex-row gap-2"
                onPress={handleContinueToReflection}
              >
                <Text className="font-poppins-semibold text-base text-white tracking-[0.7px]">
                  Mulai Sesi Refleksi
                </Text>
                <ArrowRightIcon className="text-white" size={18} weight="bold" />
              </Button>

              <Pressable
                onPress={handleReturnToJourney}
                className="mt-3 py-2 items-center active:opacity-60"
              >
                <Text className="font-poppins text-xs text-neutral-400 underline">
                  Kembali ke Peta Perjalanan
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
