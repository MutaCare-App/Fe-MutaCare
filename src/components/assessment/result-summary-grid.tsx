import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { ResultCardAnxiety } from "./result-card-anxiety";
import { ResultCardPractice } from "./result-card-practice";
import { ResultCardRecommendation } from "./result-card-recommendation";
import { ResultCardTarget } from "./result-card-target";

interface ResultSummaryGridProps {
  anxietyLevel?: string;
  anxietyImageSource?: any;
  practices?: string[];
  target?: string;
  recommendations?: string[];
}

export function ResultSummaryGrid({
  anxietyLevel,
  anxietyImageSource,
  practices,
  target,
  recommendations,
}: ResultSummaryGridProps) {
  return (
    <View className="w-full">
      <Text className="font-poppins-bold text-lg text-primary-300 mb-2">
        Ringkasan
      </Text>

      {/* Grid 2x2 Cards with items-stretch for equal row heights */}
      <View className="gap-2.5">
        {/* Row 1 */}
        <View className="flex-row items-stretch gap-2.5">
          <ResultCardAnxiety
            levelLabel={anxietyLevel}
            imageSource={anxietyImageSource}
          />
          <ResultCardPractice practices={practices} />
        </View>

        {/* Row 2 */}
        <View className="flex-row items-stretch gap-2.5">
          <ResultCardTarget target={target} />
          <ResultCardRecommendation recommendations={recommendations} />
        </View>
      </View>
    </View>
  );
}
