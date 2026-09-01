import { useDailyPracticeStore } from "@/store/useDailyPracticeStore";
import { useMoodStore } from "@/store/useMoodStore";
import { useRouter } from "expo-router";
import { DailyPracticeEmpty } from "./daily-practice/daily-practice-empty";
import { DailyPracticeFinish } from "./daily-practice/daily-practice-finish";
import { DailyPracticeInProgress } from "./daily-practice/daily-practice-in-progress";

export function DailyPracticeCard() {
  const router = useRouter();
  const { selectedMood } = useMoodStore();
  const { tasks, week, day, isFinished } = useDailyPracticeStore();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const allTasksDone = isFinished || (totalCount > 0 && completedCount === totalCount);

  // State 1: Empty State (Sebelum isi mood)
  if (!selectedMood) {
    return <DailyPracticeEmpty />;
  }

  // State 2: Finish State (Semua misi selesai)
  if (allTasksDone) {
    return (
      <DailyPracticeFinish
        onViewProgress={() => router.push("/dashboard/progress")}
      />
    );
  }

  // State 3: In-Progress Task State (Setelah isi mood & belum selesai)
  return (
    <DailyPracticeInProgress
      week={week}
      day={day}
      tasks={tasks}
      onContinue={() => router.push("/dashboard/journey")}
    />
  );
}
