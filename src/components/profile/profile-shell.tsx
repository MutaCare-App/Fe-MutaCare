import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);

interface ProfileShellProps extends PropsWithChildren {
  title: string;
  showBack?: boolean;
}

export function ProfileShell({ children, showBack, title }: ProfileShellProps) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 p-5" edges={["top", "left", "right"]}>
        <View className="w-full flex-1 px-2">
          <View className="h-12 flex-row items-center justify-center">
            {showBack ? (
              <Pressable
                accessibilityLabel="Kembali"
                className="absolute left-0 size-10 items-start justify-center"
                hitSlop={8}
                onPress={() => router.back()}
              >
                <CaretLeftIcon className="text-neutral-700" size={24} />
              </Pressable>
            ) : null}
            <Text className="font-feather-bold text-[24px] text-primary-300">
              {title}
            </Text>
          </View>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}
