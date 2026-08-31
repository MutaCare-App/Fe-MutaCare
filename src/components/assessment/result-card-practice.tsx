import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { BarbellIcon } from "phosphor-react-native/src/icons/Barbell";
import { View } from "react-native";
import { ResultBadgeIcon } from "./result-badge-icon";

iconWithClassName(BarbellIcon);

interface ResultCardPracticeProps {
  practices?: string[];
}

export function ResultCardPractice({
  practices = ["• Berbicara dengan Guru", "• Teman Baru"],
}: ResultCardPracticeProps) {
  return (
    <View className="flex-1 border border-neutral-200 rounded-2xl p-2.5 bg-white min-h-[118px] justify-between shadow-sm shadow-black/5">
      <View className="flex-row items-center gap-1.5 mb-1">
        <ResultBadgeIcon>
          <BarbellIcon
            size={14}
            weight="fill"
            className="text-secondary-300"
          />
        </ResultBadgeIcon>
        <Text className="text-[10.5px] text-neutral-600 font-poppins flex-1" numberOfLines={1}>
          Situasi Yang Dilatih
        </Text>
      </View>

      <View className="gap-1 flex-1 justify-center">
        {practices.map((item, idx) => (
          <Text
            key={idx}
            className="font-poppins text-[10px] text-neutral-700 leading-4"
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}
