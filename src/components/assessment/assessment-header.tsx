import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { Pressable, View } from "react-native";

iconWithClassName(CaretLeftIcon);

interface AssessmentHeaderProps {
  stageLabel: string;
  progressValue: number;
  onBack: () => void;
}

export function AssessmentHeader({
  stageLabel,
  progressValue,
  onBack,
}: AssessmentHeaderProps) {
  return (
    <View className="w-full pt-8">
      <View className="relative flex-row items-center justify-center w-full">
        <Pressable
          onPress={onBack}
          className="absolute left-0 p-1 active:opacity-60"
          hitSlop={8}
        >
          <CaretLeftIcon size={24} className="text-neutral-800" />
        </Pressable>

        <Text className="font-feather-bold text-brand-accent text-2xl text-center">
          {stageLabel}
        </Text>
      </View>

      {/* UI Progress Component with Percentage Text */}
      <View className="flex-row items-center justify-center gap-3 mt-2 w-full px-2">
        <Progress
          value={progressValue}
          className="flex-1 h-1.5 bg-neutral-200"
          indicatorClassName="bg-brand-accent"
        />
        <Text className="font-poppins-bold text-primary-300 text-xl">
          {Math.round(progressValue)}%
        </Text>
      </View>
    </View>
  );
}
