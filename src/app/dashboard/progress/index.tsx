import ProgressReflectionSection from "@/components/progress/progress-reflection-section";
import ProgressSectionHeader from "@/components/progress/progress-section-header";
import ProgressSummaryCard from "@/components/progress/progress-summary-card";
import ProgressWeeklyMood, { MOOD_IMAGES } from "@/components/progress/progress-weekly-mood";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useFocusEffect, useRouter } from "expo-router";
import { BarbellIcon } from "phosphor-react-native/src/icons/Barbell";
import { CalendarDotsIcon } from "phosphor-react-native/src/icons/CalendarDots";
import { ClockCounterClockwiseIcon } from "phosphor-react-native/src/icons/ClockCounterClockwise";
import { FireIcon } from "phosphor-react-native/src/icons/Fire";
import { PlantIcon } from "phosphor-react-native/src/icons/Plant";
import { SmileyIcon } from "phosphor-react-native/src/icons/Smiley";
import { SquaresFourIcon } from "phosphor-react-native/src/icons/SquaresFour";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(SquaresFourIcon);
iconWithClassName(FireIcon);
iconWithClassName(PlantIcon);
iconWithClassName(BarbellIcon);
iconWithClassName(CalendarDotsIcon);
iconWithClassName(ClockCounterClockwiseIcon);
iconWithClassName(SmileyIcon);

export default function ProgressScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const {
    summary,
    weeklyMood,
    selectedWeek,
    isLoadingSummary,
    isLoadingWeeklyMood,
    fetchProgressSummary,
    fetchWeeklyMood,
  } = useProgressStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!token) return;
      void fetchProgressSummary(token);
      void fetchWeeklyMood(undefined, token);
    }, [token, fetchProgressSummary, fetchWeeklyMood])
  );

  const handleRefresh = async () => {
    if (!token) return;
    setIsRefreshing(true);
    try {
      await Promise.allSettled([
        fetchProgressSummary(token),
        fetchWeeklyMood(selectedWeek, token),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleWeekChange = (newWeek: number) => {
    if (!token || isLoadingWeeklyMood) return;
    void fetchWeeklyMood(newWeek, token);
  };

  const streakDays = summary?.streak ?? user?.currentStreak ?? 0;
  const currentWeek = summary?.currentWeek ?? 1;
  const currentDay = summary?.currentDay ?? 1;
  const completedMissions = summary?.completedMissionsCount ?? 0;
  const activeDays = summary?.activeDaysCount ?? (streakDays > 0 ? 1 : 0);

  const lastReflectionText = summary?.latestReflection?.note
    ? `“${summary.latestReflection.note.trim()}”`
    : "“Belum ada catatan refleksi. Selesaikan latihan harianmu untuk mulai merefleksikan kemajuanmu.”";

  const totalReflections = summary?.totalReflectionsCount ?? 0;

  const summaryItems = [
    {
      label: "Streak",
      value: `${streakDays} Hari`,
      icon: <FireIcon size={20} className="text-primary-300" weight="fill" />,
    },
    {
      label: `Week ${currentWeek}`,
      value: `Hari Ke-${currentDay}`,
      icon: <PlantIcon size={20} className="text-primary-300" weight="fill" />,
    },
    {
      label: "Latihan",
      value: `${completedMissions} Latihan`,
      icon: <BarbellIcon size={20} className="text-primary-300" weight="fill" />,
    },
    {
      label: "Hari Aktif",
      value: `${activeDays} Hari`,
      icon: <CalendarDotsIcon size={20} className="text-primary-300" weight="fill" />,
    },
  ];

  const weeklyDaysData = weeklyMood?.days.map((d) => {
    let img = MOOD_IMAGES.neutral;
    if (d.label === "Sangat Buruk") img = MOOD_IMAGES.veryBad;
    else if (d.label === "Buruk") img = MOOD_IMAGES.bad;
    else if (d.label === "Normal") img = MOOD_IMAGES.neutral;
    else if (d.label === "Baik") img = MOOD_IMAGES.good;
    else if (d.label === "Sangat Baik") img = MOOD_IMAGES.veryGood;

    return {
      day: d.day,
      image: img,
      isActiveDay: d.isActiveDay,
      isToday: d.isToday,
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]}
      >
        <View className="items-center justify-center pt-3 pb-4">
          <Text className="font-feather-bold text-2xl text-primary-300">
            Kemajuan
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#007799"]}
              tintColor="#007799"
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 120,
            gap: 24,
          }}
        >
          <View className="gap-3">
            <ProgressSectionHeader
              title="Ringkasan"
              icon={<SquaresFourIcon size={20} className="text-brand-accent" weight="fill" />}
            />
            <View className="flex-row flex-wrap justify-between gap-3">
              {summaryItems.map((item, index) => (
                <ProgressSummaryCard key={index} item={item} />
              ))}
            </View>
          </View>

          <View className="gap-3">
            <ProgressSectionHeader
              title="Riwayat Refleksi"
              icon={<ClockCounterClockwiseIcon size={20} className="text-brand-accent" weight="bold" />}
            />
            <ProgressReflectionSection
              lastReflection={lastReflectionText}
              totalDays={totalReflections}
              onViewHistory={() => router.push("/dashboard/progress/history" as any)}
            />
          </View>

          <View className="gap-3">
            <ProgressSectionHeader
              title="Mood"
              icon={<SmileyIcon size={18} className="text-amber-500" weight="fill" />}
            />
            <ProgressWeeklyMood
              weeklyData={weeklyDaysData}
              currentWeek={weeklyMood?.weekNumber ?? selectedWeek}
              maxWeek={weeklyMood?.maxWeek ?? 4}
              onWeekChange={handleWeekChange}
              todayMood={(weeklyMood?.todayMood?.label as any) ?? null}
              dominantMood={weeklyMood?.dominantMood}
              insightText={weeklyMood?.insight}
              isLoading={isLoadingWeeklyMood}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
