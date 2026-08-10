import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="font-feather-bold text-2xl text-primary-300">
          ini 
        </Text>
      </View>
    </SafeAreaView>
  );
}