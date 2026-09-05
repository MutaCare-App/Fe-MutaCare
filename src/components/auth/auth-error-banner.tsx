import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

export interface AuthErrorBannerProps {
  message?: string | null;
}

export function AuthErrorBanner({ message }: AuthErrorBannerProps) {
  if (!message) return null;

  return (
    <View className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <Text className="text-red-600 font-poppins text-sm text-center">
        {message}
      </Text>
    </View>
  );
}

export default AuthErrorBanner;
