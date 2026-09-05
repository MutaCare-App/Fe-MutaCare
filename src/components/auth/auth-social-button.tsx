import { Text } from "@/components/ui/text";
import React from "react";
import { Image, Pressable, View } from "react-native";

export interface AuthSocialButtonProps {
  title?: string;
  onPress?: () => void;
}

export function AuthSocialButton({
  title = "Atau Masuk Dengan",
  onPress,
}: AuthSocialButtonProps) {
  return (
    <View className="flex justify-center items-center py-4 gap-2">
      <Text className="font-poppins text-neutral-700">{title}</Text>
      <Pressable
        onPress={onPress}
        className="h-16 w-16 border border-primary-300 rounded-2xl items-center justify-center active:bg-neutral-100"
      >
        <Image
          source={require("@/../assets/logo/google-logo.png")}
          className="h-10 w-10"
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

export default AuthSocialButton;
