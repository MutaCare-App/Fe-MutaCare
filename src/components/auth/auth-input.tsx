import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { EyeIcon } from "phosphor-react-native/src/icons/Eye";
import { EyeSlashIcon } from "phosphor-react-native/src/icons/EyeSlash";
import React from "react";
import { Pressable, View } from "react-native";

iconWithClassName(EyeIcon);
iconWithClassName(EyeSlashIcon);

export interface AuthInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function AuthInput({
  label,
  icon,
  isPassword,
  showPassword,
  onTogglePassword,
  className,
  placeholderTextColor = "#9CA3AF",
  ...inputProps
}: AuthInputProps) {
  return (
    <View className="w-full">
      <Label className="font-poppins-semibold text-base text-neutral-800">{label}</Label>
      <View className="relative justify-center mt-1">
        {icon ? (
          <View className="absolute left-3.5 z-10">{icon}</View>
        ) : null}
        <Input
          className={`pl-14 ${isPassword ? "pr-14" : ""} ${className || ""}`}
          secureTextEntry={isPassword ? !showPassword : inputProps.secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          {...inputProps}
        />
        {isPassword && onTogglePassword ? (
          <Pressable
            onPress={onTogglePassword}
            className="absolute right-3.5 z-10 p-1"
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {showPassword ? (
              <EyeSlashIcon size={28} className="text-neutral-700" />
            ) : (
              <EyeIcon size={28} className="text-neutral-300" />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export default AuthInput;
