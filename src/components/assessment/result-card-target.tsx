import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { TargetIcon } from "phosphor-react-native/src/icons/Target";
import { View } from "react-native";
import { ResultBadgeIcon } from "./result-badge-icon";

iconWithClassName(TargetIcon);

interface ResultCardTargetProps {
  target?: string;
}

export function ResultCardTarget({
  target = "Lebih Percaya Diri Saat Berbicara",
}: ResultCardTargetProps) {
  return (
    <View className="flex-1 border border-neutral-200 rounded-2xl p-2.5 bg-white h-[112px] shadow-sm shadow-black/5">
      <View className="flex-row items-center gap-1.5">
        <ResultBadgeIcon>
          <TargetIcon
            size={14}
            weight="fill"
            className="text-secondary-300"
          />
        </ResultBadgeIcon>
        <Text className="text-[10.5px] text-neutral-600 font-poppins flex-1" numberOfLines={1}>
          Target Utama
        </Text>
      </View>

      <View className="mt-2 justify-center items-center flex-1">
        <Text className="font-poppins-bold text-neutral-700 text-center text-sm leading-4">
          {target}
        </Text>
      </View>
    </View>
  );
}
