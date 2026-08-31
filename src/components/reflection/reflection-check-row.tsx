import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { View } from "react-native";

iconWithClassName(CheckIcon);

export function ReflectionCheckRow({ label }: { label: string }) {
  return (
    <View className="flex-row items-center gap-[10px]">
      <View className="size-[27px] items-center justify-center rounded-full bg-secondary-200">
        <CheckIcon size={16} color="#40513B" weight="bold" />
      </View>
      <Text className="flex-1 font-poppins text-xs tracking-[0.8px] text-neutral-700">
        {label}
      </Text>
    </View>
  );
}
