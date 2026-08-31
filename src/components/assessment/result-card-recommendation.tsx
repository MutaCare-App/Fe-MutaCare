import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { PlantIcon } from "phosphor-react-native/src/icons/Plant";
import { View } from "react-native";
import { ResultBadgeIcon } from "./result-badge-icon";

iconWithClassName(PlantIcon);

interface ResultCardRecommendationProps {
  recommendations?: string[];
}

export function ResultCardRecommendation({
  recommendations = ["1. Relaksasi Pernapasan", "2. Graded Exposure", "3. Restrukturisasi CBT"],
}: ResultCardRecommendationProps) {
  return (
    <View className="flex-1 border border-neutral-200 rounded-2xl p-2.5 bg-white min-h-[118px] justify-between shadow-sm shadow-black/5">
      <View className="flex-row items-center gap-1.5 mb-1">
        <ResultBadgeIcon>
          <PlantIcon
            size={14}
            weight="fill"
            className="text-secondary-300"
          />
        </ResultBadgeIcon>
        <Text className="text-[10.5px] text-neutral-600 font-poppins flex-1" numberOfLines={1}>
          Rekomendasi Terapi
        </Text>
      </View>

      <View className="gap-1 flex-1 justify-center">
        {recommendations.map((item, idx) => (
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
