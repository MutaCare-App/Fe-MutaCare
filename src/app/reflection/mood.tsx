import { ReflectionShell } from "@/components/reflection/reflection-shell";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import {
  ReflectionMood,
  useReflectionStore,
} from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";

interface MoodOption {
  id: ReflectionMood;
  label: string;
  image: number;
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "very-bad",
    label: "Sangat Tidak Baik",
    image: require("../../../assets/images/reflection/mood-very-bad.png"),
  },
  {
    id: "bad",
    label: "Tidak Baik",
    image: require("../../../assets/images/reflection/mood-bad.png"),
  },
  {
    id: "neutral",
    label: "Biasa Saja",
    image: require("../../../assets/images/reflection/mood-neutral.png"),
  },
  {
    id: "good",
    label: "Baik",
    image: require("../../../assets/images/reflection/mood-good.png"),
  },
  {
    id: "very-good",
    label: "Sangat Baik",
    image: require("../../../assets/images/reflection/mood-very-good.png"),
  },
];

export default function ReflectionMoodScreen() {
  const router = useRouter();
  const mood = useReflectionStore((state) => state.mood);
  const setMood = useReflectionStore((state) => state.setMood);

  return (
    <ReflectionShell
      actionLabel="Lanjutkan"
      onAction={() => router.push("/reflection/achievements")}
      onBack={() => router.back()}
    >
      <Text className="w-full font-feather-bold text-2xl leading-[30px] tracking-[0.8px] text-primary-300">
        Bagaimana Perasaanmu Setelah Latihan Hari Ini?
      </Text>

      <View className="mt-3 gap-3">
        {MOOD_OPTIONS.map((option) => {
          const isSelected = mood === option.id;

          return (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              onPress={() => setMood(option.id)}
              className={cn(
                "h-16 w-full flex-row items-center gap-3 rounded-full border border-neutral-300 px-3 active:bg-neutral-50",
                isSelected && "border-primary-300 bg-primary-100/30"
              )}
            >
              <View
                className={cn(
                  "size-[17px] items-center justify-center rounded-full border border-neutral-300",
                  isSelected && "border-primary-300"
                )}
              >
                {isSelected ? (
                  <View className="size-[9px] rounded-full bg-primary-300" />
                ) : null}
              </View>

              <Image
                source={option.image}
                resizeMode="contain"
                style={{ width: 48, height: 56 }}
              />

              <Text className="flex-1 font-poppins text-base tracking-[0.8px] text-neutral-700">
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ReflectionShell>
  );
}
