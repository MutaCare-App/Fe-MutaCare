import ProgressReflectionSection from "@/components/progress/progress-reflection-section";
import ProgressSectionHeader from "@/components/progress/progress-section-header";
import ProgressSummaryCard from "@/components/progress/progress-summary-card";
import ProgressWeeklyMood from "@/components/progress/progress-weekly-mood";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useReflectionStore } from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { BarbellIcon } from "phosphor-react-native/src/icons/Barbell";
import { CalendarDotsIcon } from "phosphor-react-native/src/icons/CalendarDots";
import { ClockCounterClockwiseIcon } from "phosphor-react-native/src/icons/ClockCounterClockwise";
import { FlameIcon } from "phosphor-react-native/src/icons/Flame";
import { PlantIcon } from "phosphor-react-native/src/icons/Plant";
import { SmileyIcon } from "phosphor-react-native/src/icons/Smiley";
import { SquaresFourIcon } from "phosphor-react-native/src/icons/SquaresFour";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(SquaresFourIcon);
iconWithClassName(FlameIcon);
iconWithClassName(PlantIcon);
iconWithClassName(BarbellIcon);
iconWithClassName(CalendarDotsIcon);
iconWithClassName(ClockCounterClockwiseIcon);
iconWithClassName(SmileyIcon);

export default function ProgressScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const reflectionNote = useReflectionStore((state) => state.note);

  const streakDays = user?.currentStreak || 5;
  const lastReflectionText = reflectionNote?.trim()
    ? `“${reflectionNote.trim()}”`
    : "“Hari Ini Aku Berhasil Menjawab Pertanyaan Guru”";

  const summaryItems = [
    {
      label: "Streak",
      value: `${streakDays} Hari`,
      icon: <FlameIcon size={20} className="text-primary-300" weight="fill" />,
    },
    {
      label: "Week 1",
      value: "Hari Ke-5",
      icon: <PlantIcon size={20} className="text-primary-300" weight="fill" />,
    },
    {
      label: "Latihan",
      value: "5 Latihan",
      icon: <BarbellIcon size={20} className="text-primary-300" weight="bold" />,
    },
    {
      label: "Hari Aktif",
      value: "5 Hari",
      icon: <CalendarDotsIcon size={20} className="text-primary-300" weight="bold" />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]}
      >
        {/* Header Title */}
        <View className="items-center justify-center pt-3 pb-4">
          <Text className="font-feather-bold text-2xl text-primary-300">
            Kemajuan
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 120,
            gap: 24,
          }}
        >
          {/* Section 1: Ringkasan */}
          <View className="gap-3">
            <ProgressSectionHeader
              title="Ringkasan"
              icon={<SquaresFourIcon size={18} className="text-amber-500" weight="fill" />}
            />
            <View className="flex-row flex-wrap justify-between gap-3">
              {summaryItems.map((item, index) => (
                <ProgressSummaryCard key={index} item={item} />
              ))}
            </View>
          </View>

          {/* Section 2: Riwayat Refleksi */}
          <View className="gap-3">
            <ProgressSectionHeader
              title="Riwayat Refleksi"
              icon={<ClockCounterClockwiseIcon size={18} className="text-amber-500" weight="bold" />}
            />
            <ProgressReflectionSection
              lastReflection={lastReflectionText}
              totalDays={28}
              onViewHistory={() => router.push("/dashboard/progress/history" as any)}
            />
          </View>

          {/* Section 3: Mood */}
          <View className="gap-3">
            <ProgressSectionHeader
              title="Mood"
              icon={<SmileyIcon size={18} className="text-amber-500" weight="fill" />}
            />
            <ProgressWeeklyMood />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
