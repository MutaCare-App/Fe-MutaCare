import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { EyeIcon } from "phosphor-react-native/src/icons/Eye";
import { EyeSlashIcon } from "phosphor-react-native/src/icons/EyeSlash";
import { Pressable, TextInputProps, View } from "react-native";

iconWithClassName(EyeIcon);
iconWithClassName(EyeSlashIcon);

interface ProfileFieldProps extends TextInputProps {
  label: string;
  onToggleVisibility?: () => void;
  showValue?: boolean;
}

export function ProfileField({
  label,
  onToggleVisibility,
  showValue,
  ...props
}: ProfileFieldProps) {
  return (
    <View className="gap-1">
      <Text className="font-poppins-semibold text-xs text-neutral-700">{label}</Text>
      <View>
        <Input
          className="h-10 border-secondary-300 bg-neutral-50 px-2.5 py-0 text-[13px] sm:h-10"
          placeholderTextColor="#D4D4D4"
          {...props}
        />
        {onToggleVisibility ? (
          <Pressable
            accessibilityLabel={showValue ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            className="absolute right-1 top-0 size-10 items-center justify-center"
            hitSlop={4}
            onPress={onToggleVisibility}
          >
            {showValue ? (
              <EyeIcon className="text-neutral-300" size={20} />
            ) : (
              <EyeSlashIcon className="text-neutral-300" size={20} />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
