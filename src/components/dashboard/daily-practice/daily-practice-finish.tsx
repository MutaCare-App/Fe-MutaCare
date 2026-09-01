import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Image, View } from "react-native";
import { DailyPracticeCardHeader } from "./daily-practice-card-header";

interface DailyPracticeFinishProps {
  onViewProgress: () => void;
}

export function DailyPracticeFinish({
  onViewProgress,
}: DailyPracticeFinishProps) {
  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header */}
      <DailyPracticeCardHeader />

      {/* Ilustrasi Selesai & Teks */}
      <View className="items-center justify-center pt-2 pb-1">
        <Image
          source={require("../../../../assets/images/finish-state-task.png")}
          className="w-44 h-44"
          resizeMode="contain"
        />

        <Text className="font-poppins-bold text-neutral-800 text-base text-center mt-2">
          Latihan Hari Ini Selesai
        </Text>

        <Text className="font-poppins text-neutral-600 text-xs text-center mt-1 leading-4 px-2">
          Kamu Sudah Menyelesaikan Seluruh Latihan Hari Ini. Terima Kasih Dan
          Sampai Jumpa Besok!
        </Text>

        <Button
          onPress={onViewProgress}
          className="bg-primary-300 w-full h-12 rounded-xl justify-center items-center mt-4"
        >
          <Text className="text-white font-poppins-semibold text-sm">
            Lihat Perkembanganmu
          </Text>
        </Button>
      </View>
    </View>
  );
}
