import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { SmileyIcon } from "phosphor-react-native/src/icons/Smiley";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";

iconWithClassName(SmileyIcon);

interface MoodItem {
  id: number;
  label: string;
  image: any;
}

const MOODS: MoodItem[] = [
  {
    id: 1,
    label: "Sangat Buruk",
    image: require("../../../assets/images/anxiety-level/very-high.png"),
  },
  {
    id: 2,
    label: "Buruk",
    image: require("../../../assets/images/anxiety-level/high.png"),
  },
  {
    id: 3,
    label: "Normal",
    image: require("../../../assets/images/anxiety-level/moderate.png"),
  },
  {
    id: 4,
    label: "Baik",
    image: require("../../../assets/images/anxiety-level/low.png"),
  },
  {
    id: 5,
    label: "Sangat Baik",
    image: require("../../../assets/images/anxiety-level/very-low.png"),
  },
];

export function MoodCheckCard({
  onSelectMood,
}: {
  onSelectMood?: (mood: MoodItem) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlePress = (mood: MoodItem) => {
    setSelectedId(mood.id);
    onSelectMood?.(mood);
  };

  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header Card */}
      <View className="flex-row items-center gap-2">
        <View className="w-6 h-6 rounded-full bg-amber-100 items-center justify-center">
          <SmileyIcon size={16} weight="fill" className="text-amber-500" />
        </View>
        <Text className="font-poppins-semibold text-neutral-800 text-sm">
          Mood Check
        </Text>
      </View>

      <Text className="font-poppins text-neutral-700 text-xs mt-1.5">
        Bagaimana Perasaanmu Hari Ini?
      </Text>

      {/* 5 Opsi Mood */}
      <View className="flex-row justify-between items-start mt-3">
        {MOODS.map((mood) => {
          const isSelected = selectedId === mood.id;
          return (
            <Pressable
              key={mood.id}
              onPress={() => handlePress(mood)}
              className="items-center w-[18%]"
            >
              <View
                className={`p-1 rounded-2xl ${
                  isSelected ? "bg-primary-100/40 border border-primary-300" : ""
                }`}
              >
                <Image
                  source={mood.image}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
              <Text
                className={`text-[9.5px] text-center mt-1 leading-3 ${
                  isSelected
                    ? "font-poppins-semibold text-primary-300"
                    : "font-poppins text-neutral-600"
                }`}
              >
                {mood.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
