import { Text } from "@/components/ui/text";
import React from "react";
import { ActivityIndicator, Image, Pressable, View } from "react-native";

export interface AuthSocialButtonProps {
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function AuthSocialButton({
  title = "Atau Masuk Dengan",
  onPress,
  isLoading = false,
  disabled = false,
}: AuthSocialButtonProps) {
  return (
    <View className="flex justify-center items-center py-4 gap-2">
      <Text className="font-poppins text-neutral-700">{title}</Text>
      <Pressable
        onPress={onPress}
        disabled={disabled || isLoading}
        className="h-16 w-16 border border-primary-300 rounded-2xl items-center justify-center active:bg-neutral-100"
        style={{ opacity: disabled || isLoading ? 0.6 : 1 }}
      >
        {isLoading ? (
          <ActivityIndicator color="#40513B" size="small" />
        ) : (
          <Image
            source={require("@/../assets/logo/google-logo.png")}
            className="h-10 w-10"
            resizeMode="contain"
          />
        )}
      </Pressable>
    </View>
  );
}

export default AuthSocialButton;

