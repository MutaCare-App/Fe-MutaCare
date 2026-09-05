import { useEffect } from "react";
import { DailyPracticeCard } from "@/components/dashboard/daily-practice-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MoodCheckCard } from "@/components/dashboard/mood-check-card";
import { useAuthStore } from "@/store/useAuthStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const fetchJourneyStatus = useJourneyStore((state) => state.fetchJourneyStatus);

  useEffect(() => {
    if (token) {
      void fetchJourneyStatus(token);
    }
  }, [token, fetchJourneyStatus]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          className="w-full"
        >
          {/* Header & Streak */}
          <DashboardHeader
            avatarUrl={user?.avatarUrl ?? undefined}
            currentStreak={user?.currentStreak}
            maxStreak={user?.longestStreak}
            userName={user?.nickname || user?.fullName}
          />

          {/* Body Content Cards */}
          <View className="px-5 pt-5 gap-4">
            {/* Mood Check */}
            <MoodCheckCard />

            {/* Latihan Hari Ini */}
            <DailyPracticeCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
