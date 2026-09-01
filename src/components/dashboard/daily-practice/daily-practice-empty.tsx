import { Text } from "@/components/ui/text";
import { Image, View } from "react-native";
import { DailyPracticeCardHeader } from "./daily-practice-card-header";

export function DailyPracticeEmpty() {
  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header */}
      <DailyPracticeCardHeader />

      {/* Ilustrasi & Pesan Empty State */}
      <View className="items-center justify-center pt-2 pb-1">
        <Image
          source={require("../../../../assets/images/empty-state-task.png")}
          className="w-40 h-40"
          resizeMode="contain"
        />

        <Text className="font-poppins-bold text-neutral-800 text-base text-center mt-1">
          Belum Ada Latihan Hari Ini
        </Text>

        <Text className="font-poppins text-neutral-600 text-xs text-center mt-1 leading-4 px-3">
          Yuk, Isi Mood Check Terlebih Dahulu Agar Kami Bisa Menyiapkan Latihan
          Yang Paling Cocok Untukmu
        </Text>
      </View>
    </View>
  );
}
