import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

interface ProgressSectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

export function ProgressSectionHeader({ icon, title }: ProgressSectionHeaderProps) {
  return (
    <View className="flex-row items-center gap-2.5">
      <View className="h-8 w-8 rounded-full bg-amber-100 items-center justify-center">
        {icon}
      </View>
      <Text className="font-poppins-semibold text-base text-neutral-700">
        {title}
      </Text>
    </View>
  );
}

export default ProgressSectionHeader;
