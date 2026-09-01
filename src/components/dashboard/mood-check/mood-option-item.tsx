import { Text } from "@/components/ui/text";
import { MoodItem } from "@/store/useMoodStore";
import { Image, Pressable, View } from "react-native";

interface MoodOptionItemProps {
  mood: MoodItem;
  isSelected: boolean;
  onSelect: (mood: MoodItem) => void;
}

export function MoodOptionItem({
  mood,
  isSelected,
  onSelect,
}: MoodOptionItemProps) {
  return (
    <Pressable
      onPress={() => onSelect(mood)}
      className="items-center w-[18%]"
      hitSlop={4}
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
}
