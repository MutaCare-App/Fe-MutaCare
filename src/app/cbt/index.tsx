import { CbtShell } from "@/components/cbt/cbt-shell";
import { ReflectionCheckRow } from "@/components/reflection/reflection-check-row";
import { Text } from "@/components/ui/text";
import ThinkingIllustration from "@/assets/images/cbt/thinking-illustration.svg";
import { useRouter } from "expo-router";
import { View } from "react-native";

const CBT_TARGETS = [
  "Menyapa Guru",
  "Menjawab Satu Pertanyaan",
  "Berlatih Berbicara Dengan AI",
];

export default function CbtIntroScreen() {
  const router = useRouter();

  return (
    <CbtShell
      actionLabel="Mulai CBT"
      onAction={() => router.push("/cbt/thought")}
    >
      <View className="items-center pt-1">
        <ThinkingIllustration width={185.366} height={286} />

        <View className="mt-7 w-full items-center">
          <Text className="font-feather-bold text-3xl tracking-[0.8px] text-primary-300">
            Ubah Cara Berpikir
          </Text>
          <Text className="mt-1 w-full text-center font-poppins text-xs leading-[18px] tracking-[0.8px] text-neutral-700">
            Mari Ubah Pikiran Yang Membuatmu Takut Berbicara Menjadi Pikiran
            Yang Lebih Membantu Sebelum Memulai Latihan.
          </Text>
        </View>

        <View className="mt-9 w-full gap-3 px-3">
          <Text className="font-poppins-semibold text-sm tracking-[0.8px] text-neutral-700">
            Target Hari Ini :
          </Text>
          {CBT_TARGETS.map((target) => (
            <ReflectionCheckRow key={target} label={target} />
          ))}
        </View>
      </View>
    </CbtShell>
  );
}
