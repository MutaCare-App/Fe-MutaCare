import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { cn } from "@/lib/utils";
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
  className,
  editable = true,
  label,
  onToggleVisibility,
  showValue,
  ...props
}: ProfileFieldProps) {
  return (
    <View className="gap-1.5 w-full">
      <Text className="font-poppins-semibold text-base text-neutral-700">
        {label}
      </Text>
      <View className="relative justify-center">
        <Input
          className={cn(
            "h-14 border-secondary-300 bg-white px-4 text-base font-poppins sm:h-14",
            onToggleVisibility && "pr-14",
            !editable && "bg-neutral-100 text-neutral-500",
            className,
          )}
          editable={editable}
          placeholderTextColor="#A3A3A3"
          {...props}
        />
        {onToggleVisibility ? (
          <Pressable
            accessibilityLabel={
              showValue ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            className="absolute right-3.5 top-0 bottom-0 justify-center items-center z-10 p-1"
            hitSlop={8}
            onPress={onToggleVisibility}
          >
            {showValue ? (
              <EyeSlashIcon className="text-neutral-700" size={24} />
            ) : (
              <EyeIcon className="text-neutral-300" size={24} />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
