import { CbtShell } from "@/components/cbt/cbt-shell";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

const proudIllustration = require("../../../assets/images/cbt/proud-illustration.png");

export default function CbtReadyScreen() {
  const router = useRouter();

  return (
    <CbtShell
      actionLabel="Mulai Simulasi"
      onAction={() => router.push("/cbt/simulation")}
      onBack={() => router.back()}
      progress={100}
    >
      <View className="items-center">
        <Image
          source={proudIllustration}
          resizeMode="contain"
          style={{ width: 157, height: 239 }}
        />

        <Text className="mt-1 font-feather-bold text-3xl tracking-[0.8px] text-primary-300">
          Siap Simulasi!
        </Text>
        <Text className="mt-1 w-full text-center font-poppins text-xs leading-[18px] tracking-[0.8px] text-neutral-700">
          Kamu Sudah Berhasil Mengubah Pikiranmu. Sekarang Saatnya Mencoba
          Berbicara Dalam Situasi Yang Aman.
        </Text>
      </View>
    </CbtShell>
  );
}
