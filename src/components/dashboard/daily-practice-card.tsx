import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CheckCircleIcon } from "phosphor-react-native/src/icons/CheckCircle";
import { Image, View } from "react-native";

iconWithClassName(CheckCircleIcon);

export function DailyPracticeCard() {
  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header Card */}
      <View className="flex-row items-center gap-2">
        <View className="w-6 h-6 rounded-full bg-amber-100 items-center justify-center">
          <CheckCircleIcon size={16} weight="fill" className="text-amber-500" />
        </View>
        <Text className="font-poppins-semibold text-neutral-800 text-sm">
          Latihan Hari Ini
        </Text>
      </View>

      {/* Ilustrasi & Pesan Empty State */}
      <View className="items-center justify-center pt-2 pb-1">
        <Image
          source={require("../../../assets/images/empty-state-task.png")}
          className="w-40 h-40"
          resizeMode="contain"
        />

        <Text className="font-poppins-bold text-neutral-800 text-sm text-center mt-1">
          Belum Ada Latihan Hari Ini
        </Text>

        <Text className="font-poppins text-neutral-600 text-[11px] text-center mt-1 leading-4 px-3">
          Yuk, Isi Mood Check Terlebih Dahulu Agar Kami Bisa Menyiapkan Latihan
          Yang Paling Cocok Untukmu
        </Text>
      </View>
    </View>
  );
}
