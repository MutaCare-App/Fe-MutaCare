import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { DailyTask } from "@/store/useDailyPracticeStore";
import { View } from "react-native";
import { DailyPracticeCardHeader } from "./daily-practice-card-header";
import { DailyPracticeTaskItem } from "./daily-practice-task-item";

interface DailyPracticeInProgressProps {
  week: number;
  day: number;
  tasks: DailyTask[];
  onContinue: () => void;
}

export function DailyPracticeInProgress({
  week,
  day,
  tasks,
  onContinue,
}: DailyPracticeInProgressProps) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header */}
      <DailyPracticeCardHeader />

      <View className="pt-2">
        <Text className="font-poppins-bold text-neutral-800 text-base mt-2">
          Week {week}  -  Day {day}
        </Text>
        <Text className="font-poppins text-neutral-600 text-xs mt-0.5">
          Selesaikan Latihan Hari Ini
        </Text>

        {/* Progress Bar & Counter */}
        <View className="flex-row items-center gap-3 mt-3">
          <View className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-brand-accent rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </View>
          <Text className="font-poppins-bold text-neutral-800 text-base">
            {completedCount}/{totalCount}
          </Text>
        </View>

        {/* Task Checklist (Disabled / Read-only) */}
        <View className="gap-2.5 mt-3 mb-4">
          {tasks.map((task) => (
            <DailyPracticeTaskItem key={task.id} task={task} />
          ))}
        </View>

        {/* Button Lanjut Latihan */}
        <Button
          onPress={onContinue}
          className="bg-primary-300 w-full h-12 rounded-xl justify-center items-center"
        >
          <Text className="text-white font-poppins-semibold text-sm">
            Lanjut Latihan
          </Text>
        </Button>
      </View>
    </View>
  );
}
