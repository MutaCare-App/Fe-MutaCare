import { ReflectionShell } from "@/components/reflection/reflection-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useReflectionStore } from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

const ACHIEVEMENT_OPTIONS = [
  "Aku Berhasil Menyapa",
  "Aku Menjawab Pertanyaan",
  "Aku Tetap Mencoba Meskipun Gugup",
  "Aku Menyelesaikan Seluruh Latihan",
];

export default function ReflectionAchievementsScreen() {
  const router = useRouter();
  const achievements = useReflectionStore((state) => state.achievements);
  const toggleAchievement = useReflectionStore(
    (state) => state.toggleAchievement
  );

  return (
    <ReflectionShell
      actionLabel="Lanjutkan"
      onAction={() => router.push("/reflection/note")}
      onBack={() => router.back()}
    >
      <View>
        <Text className="font-feather-bold text-2xl leading-[30px] tracking-[0.8px] text-primary-300">
          Apa Yang Berhasil Kamu Lakukan Hari Ini?
        </Text>
        <Text className="mt-1 font-poppins-italic text-xs tracking-[0.8px] text-neutral-600">
          (Pilih Semua yang Sesuai)
        </Text>

        <View className="mt-4 gap-3">
          {ACHIEVEMENT_OPTIONS.map((option) => {
            const isSelected = achievements.includes(option);

            return (
              <Pressable
                key={option}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                onPress={() => toggleAchievement(option)}
                className={cn(
                  "min-h-9 w-full flex-row items-center gap-3 rounded-full border border-neutral-300 px-3 py-1.5 active:bg-neutral-50",
                  isSelected && "border-primary-300 bg-primary-100/30"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleAchievement(option)}
                  style={{ pointerEvents: "none" }}
                  className="size-[17px] rounded-none border-neutral-300 shadow-none"
                />
                
                <Text className="flex-1 font-poppins text-base leading-[22px] tracking-[0.8px] text-neutral-700">
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ReflectionShell>
  );
}
