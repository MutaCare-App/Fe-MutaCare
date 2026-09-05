import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export interface AuthFooterLinkProps {
  prompt: string;
  actionText: string;
  href: "/auth/login" | "/auth/register" | string;
}

export function AuthFooterLink({
  prompt,
  actionText,
  href,
}: AuthFooterLinkProps) {
  return (
    <View className="py-4">
      <Text className="font-poppins text-neutral-700 text-center">
        {prompt}{" "}
        <Link href={href as any} asChild>
          <Text className="font-poppins underline text-brand-accent">
            {actionText}
          </Text>
        </Link>
      </Text>
    </View>
  );
}

export default AuthFooterLink;
