import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import type { PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);

interface ReflectionShellProps extends PropsWithChildren {
  actionLabel: string;
  onAction: () => void;
  onBack?: () => void;
}

export function ReflectionShell({
  actionLabel,
  children,
  onAction,
  onBack,
}: ReflectionShellProps) {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView
        className="flex-1 pb-2"
        edges={["top", "bottom", "left", "right"]}
      >
        <View className="flex-1 px-8">
          {onBack ? (
            <View className="h-24 pt-5">
              <Pressable
                accessibilityLabel="Kembali"
                hitSlop={12}
                onPress={onBack}
                className="h-7 w-7 items-start justify-center active:opacity-60"
              >
                <CaretLeftIcon size={25} color="#404040" weight="regular" />
              </Pressable>
            </View>
          ) : null}

          <View className="flex-1">{children}</View>
        </View>

        <View className="w-full px-8">
          <Button
            onPress={onAction}
            className="h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
          >
            <Text className="font-poppins-semibold text-base tracking-[0.8px] text-white">
              {actionLabel}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
