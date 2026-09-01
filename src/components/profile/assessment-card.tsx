import { Text } from "@/components/ui/text";
import { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";

interface AssessmentCardProps extends PropsWithChildren {
  icon: ReactNode;
  title: string;
}

export function AssessmentCard({ children, icon, title }: AssessmentCardProps) {
  return (
    <View className="min-h-[96px] flex-1 rounded-sm border border-neutral-200 bg-white p-2">
      <View className="flex-row items-center gap-1">
        <View className="size-5 items-center justify-center rounded-full border border-primary-200 bg-white">
          {icon}
        </View>
        <Text className="flex-1 font-poppins text-[8px] text-neutral-600" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View className="flex-1">{children}</View>
    </View>
  );
}
