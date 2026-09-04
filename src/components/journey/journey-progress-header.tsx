import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { Pressable, View } from "react-native";

interface JourneyProgressHeaderProps {
  onPress: () => void;
  progress: number;
  week: number;
}

export function JourneyProgressHeader({
  onPress,
  progress,
  week,
}: JourneyProgressHeaderProps) {
  return (
    <View className="w-full">
      <Text className="font-poppins-bold text-base tracking-[0.8px] text-primary-300">
        Minggu ke {week}
      </Text>
      <Pressable
        accessibilityLabel={`Progres minggu ke ${week}, ${progress} persen`}
        accessibilityRole="button"
        className="mt-1 flex-row items-center gap-3 active:opacity-70"
        onPress={onPress}
      >
        <Progress
          className="h-1.5 flex-1 bg-neutral-300"
          indicatorClassName="bg-brand-accent"
          value={progress}
        />
        <Text
          className="w-[50px] font-poppins-bold text-xl tracking-[0.8px] text-primary-300"
          numberOfLines={1}
        >
          {progress} %
        </Text>
      </Pressable>
    </View>
  );
}
