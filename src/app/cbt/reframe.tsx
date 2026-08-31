import { CbtShell } from "@/components/cbt/cbt-shell";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useCbtStore } from "@/store/useCbtStore";
import { useRouter } from "expo-router";
import { SmileyIcon } from "phosphor-react-native/src/icons/Smiley";
import { SmileySadIcon } from "phosphor-react-native/src/icons/SmileySad";
import { useState } from "react";
import { Pressable, View } from "react-native";

iconWithClassName(SmileyIcon);
iconWithClassName(SmileySadIcon);

const HELPFUL_THOUGHT = "Aku Bisa Mencoba Berbicara Meskipun Gugup";

export default function CbtReframeScreen() {
  const router = useRouter();
  const thought = useCbtStore((state) => state.thought);
  const hasViewedReframe = useCbtStore((state) => state.hasViewedReframe);
  const markReframeViewed = useCbtStore((state) => state.markReframeViewed);
  const [showHelpfulThought, setShowHelpfulThought] = useState(false);

  const handleCardPress = () => {
    setShowHelpfulThought((current) => !current);
    markReframeViewed();
  };

  return (
    <CbtShell
      actionLabel="Lanjut"
      disabled={!hasViewedReframe}
      onAction={() => {
        if (hasViewedReframe) router.push("/cbt/ready");
      }}
      onBack={() => router.back()}
      progress={80}
    >
      <Text className="text-center font-poppins-semibold text-xl leading-7 tracking-[0.8px] text-neutral-700">
        Mari Lihat Cara Berpikir Lain Yang Bisa Membantumu.
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ubah cara berpikir"
        className="mx-auto mt-6 h-80 w-[273px] rounded-xl border border-neutral-300 bg-neutral-100 p-6 active:opacity-80"
        onPress={handleCardPress}
      >
        <View className="flex-row items-center gap-2">
          <View className="size-8 items-center justify-center rounded-full border border-primary-300">
            {showHelpfulThought ? (
              <SmileyIcon size={21} color="#609966" />
            ) : (
              <SmileySadIcon size={21} color="#609966" />
            )}
          </View>
          <Text className="font-poppins-semibold text-base tracking-[0.8px] text-primary-300">
            {showHelpfulThought ? "Pikiran Baru" : "Pikiran Lama"}
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="text-center font-feather-bold text-2xl leading-[30px] tracking-[0.8px] text-primary-300">
            {`“${
              showHelpfulThought
                ? HELPFUL_THOUGHT
                : (thought ?? "Aku Takut Salah Bicara")
            }”`}
          </Text>
        </View>
      </Pressable>

      <Text className="mt-11 text-center font-poppins text-base leading-6 tracking-[0.8px] text-neutral-700">
        Tekan Kartu Untuk Melihat Cara Berpikir Yang Baru.
      </Text>
    </CbtShell>
  );
}
