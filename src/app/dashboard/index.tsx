import { useEffect } from "react";
import { ArticlesSection } from "@/components/dashboard/articles-section";
import { DailyPracticeCard } from "@/components/dashboard/daily-practice-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MoodCheckCard } from "@/components/dashboard/mood-check-card";
import { useAuthStore } from "@/store/useAuthStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useDailyPracticeStore } from "@/store/useDailyPracticeStore";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const { status, fetchJourneyStatus } = useJourneyStore();
  const { tasks, isFinished } = useDailyPracticeStore();

  useEffect(() => {
    if (token) {
      void fetchJourneyStatus(token);
      void fetchProfile();
    }
  }, [token, fetchJourneyStatus, fetchProfile]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const allTasksDone = isFinished || (totalCount > 0 && completedCount === totalCount);
  const currentStreak = status?.streakCount ?? user?.currentStreak ?? 0;
  const maxStreak = Math.max(user?.longestStreak ?? 0, currentStreak);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 36 }}
          className="w-full"
        >
          <DashboardHeader
            avatarUrl={user?.avatarUrl ?? undefined}
            currentStreak={currentStreak}
            maxStreak={maxStreak}
            userName={user?.nickname || user?.fullName}
            isTodayCompleted={allTasksDone}
          />
          <View className="px-5 pt-5 gap-4">
            <MoodCheckCard />
            <DailyPracticeCard />
          </View>
          <ArticlesSection />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
