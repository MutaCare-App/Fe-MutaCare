import {
  JourneyDaySheet,
  JourneySheetMode,
} from "@/components/journey/journey-day-sheet";
import {
  JourneyDayNode,
  JourneyDayStatus,
} from "@/components/journey/journey-day-node";
import { JourneyProgressHeader } from "@/components/journey/journey-progress-header";
import { JourneyWeekCompleteDialog } from "@/components/journey/journey-week-complete-dialog";
import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, ImageSourcePropType, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPLETE_IMAGE = require("../../../assets/images/journey/day-complete.png");
const CURRENT_IMAGE = require("../../../assets/images/journey/day-current.png");
const LOCKED_IMAGE = require("../../../assets/images/journey/day-locked.png");

interface JourneyDayRenderItem {
  day: number;
  image: ImageSourcePropType;
  status: JourneyDayStatus;
  style: { left: number; top: number };
}

export default function JourneyScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const {
    status,
    selectedDayData,
    isLoading,
    moodCheckRequired,
    fetchJourneyStatus,
    fetchDayMissions,
  } = useJourneyStore();

  const daySheetRef = useRef<BottomSheetModal>(null);
  const [activeSheet, setActiveSheet] = useState<{ day: number; mode: JourneySheetMode } | null>(null);
  const [weekCompleteOpen, setWeekCompleteOpen] = useState(false);
  const [moodAlertOpen, setMoodAlertOpen] = useState(false);

  useEffect(() => {
    if (token) {
      void fetchJourneyStatus(token);
    }
  }, [token]);

  useEffect(() => {
    if (activeSheet) {
      daySheetRef.current?.present();
    }
  }, [activeSheet]);

  const handleDayPress = async (dayNum: number, dayStatus: JourneyDayStatus) => {
    if (dayStatus === "locked") {
      setActiveSheet({ day: dayNum, mode: "locked" });
      return;
    }

    if (dayStatus === "complete") {
      void fetchDayMissions(dayNum, token);
      setActiveSheet({ day: dayNum, mode: "success" });
      return;
    }

    if (!status?.isMoodCheckedToday) {
      setMoodAlertOpen(true);
      return;
    }

    const result = await fetchDayMissions(dayNum, token);
    if (result) {
      setActiveSheet({ day: dayNum, mode: "tasks" });
    } else if (useJourneyStore.getState().moodCheckRequired) {
      setMoodAlertOpen(true);
    }
  };

  const closeDaySheet = () => {
    daySheetRef.current?.dismiss();
  };

  const startTraining = () => {
    closeDaySheet();
    const relMode = selectedDayData?.relaxationMode;
    const missions = selectedDayData?.missions || [];

    const relMission = missions.find((m) => m.missionType === "relaxation");
    const isRelDoneOrSkipped =
      relMode === "skipped" ||
      relMission?.isSkipped ||
      relMission?.status === "completed" ||
      relMission?.status === "skipped";

    if (!isRelDoneOrSkipped) {
      router.push("/relaxation");
      return;
    }

    const cbtMission = missions.find(
      (m) => (m.missionType === "cbt" || m.missionType === "guided_practice") && m.status !== "completed"
    );
    if (cbtMission) {
      router.push("/cbt");
      return;
    }

    const simMission = missions.find(
      (m) => (m.missionType === "simulation" || m.missionType === "vocal") && m.status !== "completed"
    );
    if (simMission) {
      router.push("/simulation");
      return;
    }

    router.push("/reflection");
  };

  const progressPercentage = status
    ? Math.round((status.completedDaysCount / status.totalDays) * 100)
    : 0;

  const daysList: JourneyDayRenderItem[] = (status?.activeWeekDays || []).map((d, idx) => {
    const isEven = idx % 2 === 0;
    const renderStatus: JourneyDayStatus =
      d.status === "completed" ? "complete" : d.status === "active" ? "current" : "locked";
    const image =
      renderStatus === "complete" ? COMPLETE_IMAGE : renderStatus === "current" ? CURRENT_IMAGE : LOCKED_IMAGE;

    return {
      day: d.dayNumber,
      image,
      status: renderStatus,
      style: {
        left: isEven ? 0 : 85,
        top: idx * 118,
      },
    };
  });

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="items-center px-3.5 pb-24 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <Text className="w-full text-center font-feather-bold text-[22px] tracking-[0.8px] text-primary-300">
            Perjalanan Terapi
          </Text>

          {status && !status.isMoodCheckedToday && (
            <View className="mt-4 w-full p-3 bg-amber-50 border border-amber-200 rounded-xl items-center flex-row justify-between">
              <View className="flex-1 pr-2">
                <Text className="font-poppins-bold text-xs text-amber-800">
                  Mood Check-in Hari Ini Belum Diisi!
                </Text>

              </View>
              <Button
                className="bg-amber-500 h-8 px-3 rounded-lg justify-center items-center"
                onPress={() => router.push("/dashboard")}
              >
                <Text className="text-white font-poppins-semibold text-xs">
                  Isi Mood
                </Text>
              </Button>
            </View>
          )}

          <View className="mt-6 w-full">
            <JourneyProgressHeader
              onPress={() => setWeekCompleteOpen(true)}
              progress={progressPercentage}
              week={status?.currentWeek || 1}
            />
          </View>

          {isLoading ? (
            <View className="mt-12 items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="font-poppins text-sm text-neutral-600 mt-2">
                Memuat Peta Perjalanan...
              </Text>
            </View>
          ) : (
            <View
              className="mt-[18px] w-[170px]"
              style={{ height: Math.max(500, daysList.length * 118) }}
            >
              {daysList.map((day) => (
                <JourneyDayNode
                  day={day.day}
                  image={day.image}
                  key={day.day}
                  onPress={() => handleDayPress(day.day, day.status)}
                  status={day.status}
                  style={day.style}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <JourneyDaySheet
        day={activeSheet?.day ?? status?.currentDay ?? 1}
        mode={activeSheet?.mode ?? "tasks"}
        onClose={closeDaySheet}
        onDismiss={() => setActiveSheet(null)}
        onStart={startTraining}
        ref={daySheetRef}
        week={status?.currentWeek || 1}
        missionsData={selectedDayData?.missions}
      />

      <JourneyWeekCompleteDialog
        onContinue={() => setWeekCompleteOpen(false)}
        onOpenChange={setWeekCompleteOpen}
        open={weekCompleteOpen}
        week={status?.currentWeek || 1}
      />

      {moodAlertOpen && (
        <View className="absolute inset-0 bg-black/40 items-center justify-center p-6 z-50">
          <View className="bg-white rounded-2xl p-6 w-full items-center">
            <Text className="font-feather-bold text-xl text-primary-300 text-center">
              Isi Mood Check Terlebih Dahulu! 🌿
            </Text>
            <Text className="font-poppins text-neutral-700 text-center text-sm mt-2 leading-5">
              Untuk memastikan latihan hari ini aman dan sesuai dengan kondisimu, silakan catat Jurnal Mood harianmu terlebih dahulu.
            </Text>
            <Button
              className="mt-6 bg-primary-300 w-full h-12 rounded-xl justify-center items-center"
              onPress={() => {
                setMoodAlertOpen(false);
                router.push("/dashboard");
              }}
            >
              <Text className="text-white font-poppins-semibold text-base">
                Isi Mood Check Sekarang
              </Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
