import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { SmileyIcon } from "phosphor-react-native/src/icons/Smiley";
import { View } from "react-native";

iconWithClassName(SmileyIcon);

export function MoodCheckCardHeader() {
  return (
    <View className="flex-row items-center gap-2">
      <View className="w-8 h-8 rounded-full bg-white border-[0.5px] border-neutral-300 items-center justify-center">
        <SmileyIcon size={20} weight="fill" className="text-brand-accent" />
      </View>
      <Text className="font-poppins-semibold text-neutral-800 text-sm">
        Mood Check
      </Text>
    </View>
  );
}
