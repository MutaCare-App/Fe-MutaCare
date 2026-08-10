import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingStep3() {
  return (
    <LinearGradient colors={["#C2FFC7", "#FFFFFF"]} style={{ flex: 1 }}>
      <SafeAreaView className="p-5" style={{ flex: 1 }}>
        <View className="w-full items-center px-2 pt-32" style={{ flex: 1 }}>
          {/* IMAGE + TEKS */}
          <View
            className="w-full flex flex-col items-center justify-center"
            style={{ flex: 3 }}
          >
            {/* IMAGE */}
            <View className="items-center justify-center" style={{ height: 200 }}>
              <Image
                source={require("../../../assets/images/onBoarding-3.png")}
                className="w-[220px] h-auto"
                resizeMode="contain"
              />
            </View>
            {/* TEXT */}
            <View className="mt-20 flex flex-col items-center justify-start ">
              <Text className="font-feather-bold text-4xl text-center text-primary-300">
                Mari Mulai Langkah Pertamamu
              </Text>
              <Text className="font-poppins text-neutral-700 text-center text-sm mt-4">
                Sebelum memulai terapi, silakan masuk atau buat akun agar
                progres terapimu dapat tersimpan dengan aman.
              </Text>
            </View>
          </View>

          {/* BUTTON */}
          <View className="w-full justify-end " style={{ flex: 1 }}>
            <Button
              className="bg-primary-300 w-full h-16 rounded-lg justify-center items-center"
              onPress={() => router.replace("/auth/login")}
            >
              <Text className="text-white font-poppins-semibold text-lg">
                Mulai
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}