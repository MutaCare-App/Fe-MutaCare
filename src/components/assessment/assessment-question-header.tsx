import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface AssessmentQuestionHeaderProps {
  title: string;
  subtitle?: string;
}

export function AssessmentQuestionHeader({
  title,
  subtitle,
}: AssessmentQuestionHeaderProps) {
  return (
    <View className="pt-4">
      <Text className="font-feather-bold text-2xl text-primary-300">
        {title}
      </Text>
      {subtitle && (
        <Text className="font-poppins italic text-neutral-500 text-sm mt-1">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
