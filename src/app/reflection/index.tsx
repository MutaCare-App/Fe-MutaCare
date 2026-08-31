import { ReflectionCheckRow } from "@/components/reflection/reflection-check-row";
import { ReflectionShell } from "@/components/reflection/reflection-shell";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

const reflectionIntro = require("../../../assets/images/reflection/reflection-intro.png");

const REFLECTION_BENEFITS = [
  "Menilai Perasaanmu Setelah Latihan",
  "Melihat Pencapaian Hari Ini",
  "Menutup Sesi Terapi",
];

export default function ReflectionIntroScreen() {
  const router = useRouter();

  return (
    <ReflectionShell
      actionLabel="Mulai Refleksi"
      onAction={() => router.push("/reflection/mood")}
    >
      <View className="items-center pt-7">
        <Image
          source={reflectionIntro}
          resizeMode="contain"
          style={{ width: 212, height: 286 }}
        />

        <View className="mt-7 w-full items-center">
          <Text className="font-feather-bold text-3xl tracking-[0.8px] text-primary-300">
            Refleksi
          </Text>
          <Text className="mt-1 w-full text-center font-poppins text-xs leading-[18px] tracking-[0.8px] text-neutral-700">
            Luangkan Waktu Sejenak Untuk Melihat Perkembanganmu Hari Ini.
            Refleksi Membantu Kamu Menyadari Keberanian Dan Kemajuan Yang Telah
            Dicapai Setelah Latihan.
          </Text>
        </View>

        <View className="mt-9 w-full gap-3">
          {REFLECTION_BENEFITS.map((benefit) => (
            <ReflectionCheckRow key={benefit} label={benefit} />
          ))}
        </View>
      </View>
    </ReflectionShell>
  );
}
