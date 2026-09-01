import { Text } from "@/components/ui/text";
import { DailyTask } from "@/store/useDailyPracticeStore";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { View } from "react-native";

interface DailyPracticeTaskItemProps {
  task: DailyTask;
}

export function DailyPracticeTaskItem({ task }: DailyPracticeTaskItemProps) {
  return (
    <View className="flex-row items-center gap-3">
      {/* Checkbox (Disabled / Read-only) */}
      <View
        className={`w-5 h-5 rounded-md border items-center justify-center ${
          task.completed
            ? "bg-primary-300 border-primary-300"
            : "bg-white border-neutral-300"
        }`}
      >
        {task.completed && (
          <CheckIcon size={12} weight="bold" color="#ffffff" />
        )}
      </View>

      <Text className="font-poppins text-neutral-700 text-sm">
        {task.title}
      </Text>
    </View>
  );
}
