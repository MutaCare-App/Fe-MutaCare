import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

export interface ProgressSummaryItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ProgressSummaryCardProps {
  item: ProgressSummaryItem;
}

export function ProgressSummaryCard({ item }: ProgressSummaryCardProps) {
  return (
    <View className="flex-1 min-w-[45%] flex-row items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-sm shadow-black/5">
      <View className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-100 items-center justify-center">
        {item.icon}
      </View>
      <View className="flex-1">
        <Text className="font-poppins text-xs text-neutral-500">{item.label}</Text>
        <Text className="font-poppins-bold text-base text-neutral-800 mt-0.5">
          {item.value}
        </Text>
      </View>
    </View>
  );
}

export default ProgressSummaryCard;
