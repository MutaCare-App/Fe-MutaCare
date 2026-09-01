import { Text } from "@/components/ui/text";
import { MOODS, MoodItem } from "@/store/useMoodStore";
import { View } from "react-native";
import { MoodCheckCardHeader } from "./mood-check-card-header";
import { MoodOptionItem } from "./mood-option-item";

interface MoodCheckSelectionProps {
  selectedMood: MoodItem | null;
  onSelectMood: (mood: MoodItem) => void;
}

export function MoodCheckSelection({
  selectedMood,
  onSelectMood,
}: MoodCheckSelectionProps) {
  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header */}
      <MoodCheckCardHeader />

      <Text className="font-poppins text-neutral-700 text-xs mt-1.5">
        Bagaimana Perasaanmu Hari Ini?
      </Text>

      {/* 5 Opsi Mood */}
      <View className="flex-row justify-between items-start mt-3">
        {MOODS.map((mood) => (
          <MoodOptionItem
            key={mood.id}
            mood={mood}
            isSelected={selectedMood?.id === mood.id}
            onSelect={onSelectMood}
          />
        ))}
      </View>
    </View>
  );
}
