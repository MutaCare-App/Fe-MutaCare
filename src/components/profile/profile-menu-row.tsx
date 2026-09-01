import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";

iconWithClassName(CaretRightIcon);

interface ProfileMenuRowProps {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}

export function ProfileMenuRow({ icon, label, onPress }: ProfileMenuRowProps) {
  return (
    <Pressable
      className="h-10 flex-row items-center active:opacity-60"
      onPress={onPress}
    >
      <View className="w-8 items-start">{icon}</View>
      <Text className="flex-1 font-poppins text-[13px] text-neutral-700">
        {label}
      </Text>
      <CaretRightIcon className="text-neutral-700" size={20} />
    </Pressable>
  );
}
