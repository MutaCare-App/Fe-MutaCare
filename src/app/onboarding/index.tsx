import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingIndex() {
  return (
    <LinearGradient
      colors={["#C2FFC7", "#FFFFFF"]}
      style={{ flex: 1 }}
      className=""
    >
      <SafeAreaView className="pt-1 p-5">
        <View className="w-full h-full flex flex-col items-center justify-between px-2">
          <View className="flex flex-col pt-28">
            {/* IMAGE */}
            <View className="items-center justify-center ">
              <Image
                source={require("../../../assets/images/onBoarding-1.png")}
                className="w-[220px] h-auto flex "
                resizeMode="contain"
              />
            </View>
            {/* TEXT */}
            <View className="mt-20 flex flex-col items-center justify-center">
              <Text className="font-feather-bold text-4xl text-center text-primary-300">
                Selamat Datang di{" "}
                <Text className="text-brand-medium text-4xl">Mutacare</Text>
              </Text>
              <Text className="font-poppins text-neutral-700 text-center text-sm mt-4 ">
                Temani perjalananmu memahami dan mengelola Selective Mutism
                melalui panduan, latihan, dan dukungan yang dirancang secara
                bertahap.
              </Text>
            </View>
          </View>

          <Link href="/onboarding/step-2" asChild>
            <Button className="bg-primary-300 w-full h-16  rounded-lg justify-center items-center">
              <Text className="text-white font-poppins-semibold text-lg ">
                Lanjut
              </Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
