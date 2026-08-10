import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingStep2() {
  return (
    <LinearGradient colors={["#C2FFC7", "#FFFFFF"]} style={{ flex: 1 }}>
      <SafeAreaView className="pt-1 p-5 flex-1">
        <View className="w-full h-full flex flex-col items-center justify-between px-2">
          <View className="flex flex-col pt-24">
            {/* IMAGE */}
            <View className="items-center justify-center ">
              <Image
                source={require("../../../assets/images/onBoarding-2.png")}
                className="w-[230px] h-auto flex "
                resizeMode="contain"
              />
            </View>
            {/* TEXT */}
            <View className=" flex flex-col items-center justify-center">
              <Text className="font-feather-bold text-4xl text-center text-primary-300">
                Perjalanan Terapimu Dimulai di Sini
              </Text>
              <Text className="font-poppins text-neutral-700 text-center text-sm mt-4 ">
                Setiap orang memiliki perjalanan yang berbeda.{" "}
                <Text className="font-feather-bold text-brand-medium">
                  Mutacare
                </Text>{" "}
                akan memahami kondisimu melalui assessment, lalu memberikan
                latihan dan simulasi yang sesuai dengan perkembanganmu.
              </Text>
            </View>
          </View>

          <Link href="/onboarding/step-3" asChild>
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
