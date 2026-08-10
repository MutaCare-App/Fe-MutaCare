import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/logo/mutacare-logo.svg";

export default function SplashScreen() {
  return (
    <SafeAreaView className="pt-1 bg-white">
      <View className="w-full h-full flex flex-row items-center justify-center">
        <Logo width={76} height={76} />
        <View className="pl-3">
          <Text className="font-feather-bold text-5xl text-brand-medium">
            Muta<Text className="text-primary-300">Care</Text>
          </Text>
          <Text className="font-poppins text-neutral-700 text-lg">
            Small Steps big Voice
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
