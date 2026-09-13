import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useSimulationStore } from '@/store/useSimulationStore';
import { useJourneyStore } from '@/store/useJourneyStore';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CheckCircleIcon } from 'phosphor-react-native/src/icons/CheckCircle';
import { MedalIcon } from 'phosphor-react-native/src/icons/Medal';
import { TrophyIcon } from 'phosphor-react-native/src/icons/Trophy';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CheckCircleIcon);
iconWithClassName(MedalIcon);
iconWithClassName(TrophyIcon);

export default function SimulationResultScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const selectedDayData = useJourneyStore((state) => state.selectedDayData);
  const completeMission = useJourneyStore((state) => state.completeMission);
  const { endResult, activeScenario, resetSession } = useSimulationStore();

  useEffect(() => {
    if (token && selectedDayData) {
      const simMission = selectedDayData.missions.find(
        (m) => (m.missionType === 'simulation' || m.missionType === 'guided_practice' || m.missionType === 'vocal') && m.status !== 'completed'
      );
      if (simMission) {
        void completeMission(simMission.id, {}, token);
      }
    }
  }, [token, selectedDayData, completeMission]);

  if (!endResult) {
    router.replace('/simulation');
    return null;
  }

  const handleReturnToJourney = () => {
    resetSession();
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
          {/* Trophy Header Icon */}
          <View className="size-20 items-center justify-center rounded-full bg-amber-100 mb-4">
            <TrophyIcon className="text-amber-600" size={44} weight="fill" />
          </View>

          <Text className="text-center font-feather-bold text-2xl text-primary-300 tracking-[0.6px]">
            Simulasi Selesai! 🎉
          </Text>
          <Text className="mt-1 text-center font-poppins text-xs text-neutral-600 px-4 leading-5">
            Skenario: {activeScenario?.title || 'Latihan Bicara'}
          </Text>

          {/* Confidence Score Card */}
          <View className="mt-6 w-full p-5 bg-gradient-to-br from-primary-100 to-secondary-200 bg-primary-100/40 border border-primary-200 rounded-3xl items-center">
            <Text className="font-poppins-semibold text-xs text-neutral-600 uppercase tracking-wider">
              Skor Keberanian Bicara
            </Text>
            <Text className="font-feather-bold text-5xl text-primary-300 mt-1">
              {endResult.confidenceScore}%
            </Text>
            <View className="mt-3 flex-row gap-4">
              <View className="items-center">
                <Text className="font-poppins-bold text-sm text-neutral-800">
                  {endResult.turnsCount} Sapaan
                </Text>
                <Text className="font-poppins text-[11px] text-neutral-500">Total Percakapan</Text>
              </View>
              <View className="h-full w-px bg-neutral-300" />
              <View className="items-center">
                <Text className="font-poppins-bold text-sm text-neutral-800">
                  {endResult.totalDurationSeconds} Detik
                </Text>
                <Text className="font-poppins text-[11px] text-neutral-500">Durasi Bicara</Text>
              </View>
            </View>
          </View>

          {/* Evaluation Summary Card */}
          <View className="mt-4 w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <Text className="font-poppins-bold text-xs text-neutral-800 mb-1">
              Evaluasi Kemajuan AI:
            </Text>
            <Text className="font-poppins text-xs text-neutral-700 leading-5">
              {endResult.feedbackSummary}
            </Text>
          </View>

          {/* New Badge Unlocked */}
          {endResult.newBadgeUnlocked ? (
            <View className="mt-4 w-full p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex-row items-center gap-3">
              <View className="size-12 rounded-xl bg-emerald-100 items-center justify-center">
                <MedalIcon className="text-emerald-600" size={28} weight="fill" />
              </View>
              <View className="flex-1">
                <Text className="font-poppins-bold text-xs text-emerald-900">
                  Lencana Baru Terbuka! 🏅
                </Text>
                <Text className="font-poppins-semibold text-sm text-emerald-950">
                  {endResult.newBadgeUnlocked.title}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Action Button */}
          <Button
            className="mt-8 h-12 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center"
            onPress={handleReturnToJourney}
          >
            <Text className="font-poppins-semibold text-base text-white tracking-[0.7px]">
              Kembali ke Peta Perjalanan
            </Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
