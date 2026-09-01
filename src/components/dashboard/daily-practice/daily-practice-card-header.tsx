import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CheckCircleIcon } from "phosphor-react-native/src/icons/CheckCircle";
import { View } from "react-native";

iconWithClassName(CheckCircleIcon);

export function DailyPracticeCardHeader() {
  return (
    <View className="flex-row items-center gap-2">
      <View className="w-8 h-8 rounded-full border-[0.5px] border-neutral-300 bg-white items-center justify-center">
        <CheckCircleIcon
          size={20}
          weight="fill"
          className="text-brand-accent"
        />
      </View>
      <Text className="font-poppins-semibold text-neutral-800 text-sm">
        Latihan Hari Ini
      </Text>
    </View>
  );
}
