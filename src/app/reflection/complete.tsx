import { ReflectionCheckRow } from "@/components/reflection/reflection-check-row";
import { ReflectionShell } from "@/components/reflection/reflection-shell";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useReflectionStore } from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Image, View } from "react-native";

const reflectionComplete = require("../../../assets/images/reflection/reflection-complete.png");

export default function ReflectionCompleteScreen() {
  const router = useRouter();
  const reset = useReflectionStore((state) => state.reset);
  const token = useAuthStore((state) => state.token);
  const selectedDayData = useJourneyStore((state) => state.selectedDayData);
  const journeyStatus = useJourneyStore((state) => state.status);
  const completeMission = useJourneyStore((state) => state.completeMission);
  const fetchDayMissions = useJourneyStore((state) => state.fetchDayMissions);
  const note = useReflectionStore((state) => state.note);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!token || hasCompletedRef.current) return;

    const runComplete = async () => {
      let dayData = selectedDayData;
      if (!dayData) {
        const currentDay = journeyStatus?.currentDay ?? 1;
        dayData = await fetchDayMissions(currentDay, token);
      }
      if (!dayData?.missions) return;

      const refMission = dayData.missions.find(
        (m) => m.missionType === "reflection" && m.status !== "completed"
      );
      if (refMission && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        await completeMission(refMission.id, { reflectionNotes: note }, token);
        useJourneyStore.getState().setHasCompletedDayToday(true);
      }
    };

    void runComplete();
  }, [token, selectedDayData, journeyStatus, completeMission, fetchDayMissions, note]);

  const handleReturnToJourney = () => {
    reset();
    router.replace("/dashboard/journey");
  };

  return (
    <ReflectionShell
      actionLabel="Kembali Ke Journey"
      onAction={handleReturnToJourney}
    >
      <View className="items-center pt-12">
        <Image
          source={reflectionComplete}
          resizeMode="contain"
          style={{ width: "100%", maxWidth: 291, aspectRatio: 291 / 245 }}
        />

        <View className="mt-8 w-full items-center">
          <Text className="font-feather-bold text-3xl tracking-[0.8px] text-primary-300">
            Hebat!
          </Text>
          <Text className="mt-1 w-full text-center font-poppins text-xs tracking-[0.8px] text-neutral-700">
            Kamu Telah Menyelesaikan Latihan Hari Ini.
          </Text>
        </View>

        <View className="mt-3 w-full rounded-xl bg-emerald-50 border border-emerald-200/60 p-2.5">
          <Text className="text-center font-poppins text-[11px] leading-4 text-emerald-800">
            🌿 <Text className="font-poppins-semibold">Tips Hari Ini:</Text> Istirahatlah sejenak. Berikan waktu bagi pikiranmu untuk mengendapkan latihan sebelum melanjutkan ke hari berikutnya.
          </Text>
        </View>

        <View className="mt-7 w-full">
          <Text className="mb-3 font-poppins-semibold text-sm tracking-[0.8px] text-neutral-700">
            Yang Kamu Selesaikan
          </Text>
          <View className="gap-3">
            <ReflectionCheckRow label="Relaksasi" />
            <ReflectionCheckRow label="CBT" />
            <ReflectionCheckRow label="Refleksi" />
          </View>
        </View>
      </View>
    </ReflectionShell>
  );
}
