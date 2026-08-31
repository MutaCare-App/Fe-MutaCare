import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import type { PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);

interface CbtShellProps extends PropsWithChildren {
  actionLabel: string;
  disabled?: boolean;
  onAction: () => void;
  onBack?: () => void;
  progress?: number;
}

export function CbtShell({
  actionLabel,
  children,
  disabled,
  onAction,
  onBack,
  progress,
}: CbtShellProps) {
  const hasHeader = onBack && progress !== undefined;

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="p-5" style={{ flex: 1 }}>
        <View className="w-full flex-1 px-2">
          {hasHeader ? (
            <View className="mb-12">
              <Pressable
                accessibilityLabel="Kembali"
                className="h-8 w-8 items-start justify-center active:opacity-60"
                hitSlop={12}
                onPress={onBack}
              >
                <CaretLeftIcon size={25} color="#404040" />
              </Pressable>

              <View className="mt-5 flex-row items-center gap-2">
                <Progress
                  value={progress}
                  className="h-1.5 flex-1 bg-neutral-300"
                  indicatorClassName="bg-brand-accent"
                />
                <Text className="w-9 whitespace-nowrap font-poppins-bold text-base tracking-[0.8px] text-primary-300">
                  {progress}%
                </Text>
              </View>
            </View>
          ) : null}

          <View className="flex-1">{children}</View>

          <Button
            disabled={disabled}
            onPress={onAction}
            className="h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400 disabled:opacity-50"
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
