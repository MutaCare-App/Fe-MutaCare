import { ReflectionCheckRow } from "@/components/reflection/reflection-check-row";
import { ReflectionShell } from "@/components/reflection/reflection-shell";
import { Text } from "@/components/ui/text";
import { useReflectionStore } from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

const reflectionComplete = require("../../../assets/images/reflection/reflection-complete.png");

export default function ReflectionCompleteScreen() {
  const router = useRouter();
  const reset = useReflectionStore((state) => state.reset);

  const handleReturnToJourney = () => {
    reset();
    router.replace("/dashboard/journey");
  };

  return (
    <ReflectionShell
      actionLabel="Kembali Ke Journey"
      onAction={handleReturnToJourney}
    >
      <View className="items-center pt-12">
        <Image
          source={reflectionComplete}
          resizeMode="contain"
          style={{ width: "100%", maxWidth: 291, aspectRatio: 291 / 245 }}
        />

        <View className="mt-8 w-full items-center">
          <Text className="font-feather-bold text-3xl tracking-[0.8px] text-primary-300">
            Hebat!
          </Text>
          <Text className="mt-1 w-full text-center font-poppins text-xs tracking-[0.8px] text-neutral-700">
            Kamu Telah Menyelesaikan Latihan Hari Ini.
          </Text>
        </View>

        <View className="mt-7 w-full">
          <Text className="mb-3 font-poppins-semibold text-sm tracking-[0.8px] text-neutral-700">
            Yang Kamu Selesaikan
          </Text>
          <View className="gap-3">
            <ReflectionCheckRow label="Relaksasi" />
            <ReflectionCheckRow label="CBT" />
            <ReflectionCheckRow label="Refleksi" />
          </View>
        </View>
      </View>
    </ReflectionShell>
  );
}
