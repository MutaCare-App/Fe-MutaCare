import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface ResultFooterProps {
  buttonText?: string;
  onPress: () => void;
}

export function ResultFooter({
  buttonText = "Mulai Perjalanan Terapi",
  onPress,
}: ResultFooterProps) {
  return (
    <View className="w-full pt-2">
      <Button
        onPress={onPress}
        className="bg-primary-300 w-full h-14 rounded-xl justify-center items-center active:bg-primary-400"
      >
        <Text className="text-white font-poppins-semibold text-lg">
          {buttonText}
        </Text>
      </Button>
    </View>
  );
}
