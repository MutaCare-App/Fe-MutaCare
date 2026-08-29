import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { Link } from "expo-router";
import { LockKeyIcon } from "phosphor-react-native/src/icons/LockKey";
import { SparkleIcon } from "phosphor-react-native/src/icons/Sparkle";
import { TimerIcon } from "phosphor-react-native/src/icons/Timer";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Daftarkan icon ke NativeWind
iconWithClassName(TimerIcon);
iconWithClassName(LockKeyIcon);
iconWithClassName(SparkleIcon);

export default function AssessmentIntro() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
        className="px-8 flex justify-between pb-6"
      >
        <View className="flex w-full items-center">
          {/* Header Top Bar */}
          <View className="items-center w-full pt-8">
            <Text className="font-feather-bold text-brand-accent text-2xl text-center">
              Asesment
            </Text>
            <View className="flex-row items-center justify-center gap-3 mt-2 w-full px-4">
              <Progress
                value={0}
                className="flex-1 h-1.5 bg-neutral-200"
                indicatorClassName="bg-brand-accent"
              />
              <Text className="font-poppins-bold text-primary-300 text-2xl">
                0%
              </Text>
            </View>
          </View>

          {/* Maskot Ilustrasi */}
          <View className="items-center justify-center my-8">
            <Image
              source={require("../../../assets/images/assessment.png")}
              className="w-80 h-80"
              resizeMode="contain"
            />
          </View>

          {/* Judul & Deskripsi */}
          <View className="items-center px-2">
            <Text className="font-feather-bold text-3xl text-primary-300 text-center">
              Mari Kenali Dirimu
            </Text>
            <Text className="font-poppins text-neutral-700 text-center text-sm mt-2">
              Kami Akan Mengajukan Beberapa Pertanyaan Singkat Untuk Memahami
              Kondisimu Dan Menyusun Terapi Yang Paling Sesuai.
            </Text>
          </View>

          {/* Poin Informasi */}
          <View className="flex gap-3.5 mt-6 w-full px-4">
            <View className="flex-row items-center gap-3">
              <TimerIcon size={24} className="text-primary-300" />
              <Text className="font-poppins text-neutral-700 text-sm">
                Hanya Sekitar 1–3 Menit
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <LockKeyIcon size={24} className="text-primary-300" />
              <Text className="font-poppins text-neutral-700 text-sm">
                Jawabanmu Tersimpan Dengan Aman
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <SparkleIcon size={24} className="text-primary-300" />
              <Text className="font-poppins text-neutral-700 text-sm">
                Hanya Dilakukan Saat Pertama Kali
              </Text>
            </View>
          </View>
        </View>

        {/* Tombol Mulai Asesmen */}
        <View className="w-full pt-4">
          <Link href="/assessment/questions" asChild>
            <Button className="bg-primary-300 w-full h-14 rounded-xl justify-center items-center active:bg-primary-400">
              <Text className="text-white font-poppins-semibold text-lg">
                Mulai Asesmen
              </Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}
