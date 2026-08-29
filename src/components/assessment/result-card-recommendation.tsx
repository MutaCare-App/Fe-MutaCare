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
  recommendations = ["1. Relaksasi", "2. CBT", "3. Evaluasi"],
}: ResultCardRecommendationProps) {
  return (
    <View className="flex-1 border border-neutral-200 rounded-2xl p-2.5 bg-white h-[112px] shadow-sm shadow-black/5">
      <View className="flex-row items-center gap-1.5">
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

      <View className="mt-1.5 gap-0.5">
        {recommendations.map((item, idx) => (
          <Text key={idx} className="font-poppins text-[10px] text-neutral-700 leading-3.5">
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}
