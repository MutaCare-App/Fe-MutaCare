import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { View } from "react-native";

iconWithClassName(CheckIcon);

interface PreparationItemProps {
  label: string;
}

export function PreparationItem({ label }: PreparationItemProps) {
  return (
    <View className="flex-row items-center gap-4">
      <View
        className="items-center justify-center rounded-full bg-secondary-200"
        style={{ height: 28, width: 28 }}
      >
        <CheckIcon className="text-primary-400" size={19} weight="bold" />
      </View>
      <Text className="flex-1 font-poppins text-[15px] text-neutral-700">
        {label}
      </Text>
    </View>
  );
}
