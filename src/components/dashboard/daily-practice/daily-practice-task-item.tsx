import { Text } from "@/components/ui/text";
import { DailyTask } from "@/store/useDailyPracticeStore";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { View } from "react-native";

interface DailyPracticeTaskItemProps {
  task: DailyTask;
}

export function DailyPracticeTaskItem({ task }: DailyPracticeTaskItemProps) {
  const isSkipped = task.isSkipped;
  const isOptional = task.isOptional;

  return (
    <View className={`flex-row items-center justify-between ${isSkipped ? "opacity-45" : ""}`}>
      <View className="flex-row items-center gap-3 flex-1 pr-2">
        {/* Checkbox (Disabled / Read-only) */}
        <View
          className={`w-5 h-5 rounded-md border items-center justify-center ${
            task.completed
              ? "bg-primary-300 border-primary-300"
              : isSkipped
              ? "bg-neutral-100 border-neutral-300"
              : "bg-white border-neutral-300"
          }`}
        >
          {task.completed && (
            <CheckIcon size={12} weight="bold" color="#ffffff" />
          )}
        </View>

        <Text className={`font-poppins text-neutral-700 text-sm ${isSkipped ? "line-through text-neutral-500" : ""}`}>
          {task.title}
        </Text>
      </View>

      {isSkipped && (
        <View className="bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-300">
          <Text className="font-poppins-medium text-[10px] text-neutral-500">Di-skip</Text>
        </View>
      )}

      {isOptional && !isSkipped && (
        <View className="bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <Text className="font-poppins-medium text-[10px] text-emerald-700">Opsional</Text>
        </View>
      )}
    </View>
  );
}
