import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { BrainIcon } from "phosphor-react-native/src/icons/Brain";
import { Image, View } from "react-native";
import { ResultBadgeIcon } from "./result-badge-icon";

iconWithClassName(BrainIcon);

interface ResultCardAnxietyProps {
  levelLabel?: string;
  imageSource?: any;
}

export function ResultCardAnxiety({
  levelLabel = "Sedang",
  imageSource = require("../../../assets/images/anxiety-level/moderate.png"),
}: ResultCardAnxietyProps) {
  return (
    <View className="flex-1 border border-neutral-200 rounded-2xl p-2.5 bg-white min-h-[118px] justify-between shadow-sm shadow-black/5">
      <View className="flex-row items-center gap-1.5">
        <ResultBadgeIcon>
          <BrainIcon
            size={14}
            weight="fill"
            className="text-secondary-300"
          />
        </ResultBadgeIcon>
        <Text className="text-[10.5px] text-neutral-600 font-poppins flex-1" numberOfLines={1}>
          Tingkat Kecemasan
        </Text>
      </View>

      <View className="items-center justify-center pb-1 flex-1">
        <Image
          source={imageSource}
          className="w-11 h-11"
          resizeMode="contain"
        />
        <Text className="font-poppins-bold text-neutral-800 text-xs mt-0.5">
          {levelLabel}
        </Text>
      </View>
    </View>
  );
}
