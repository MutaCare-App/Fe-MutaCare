import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { MicrophoneIcon } from "phosphor-react-native/src/icons/Microphone";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);
iconWithClassName(MicrophoneIcon);

const classBackground = require("../../../assets/images/cbt/class-background.png");
const teacherIllustration = require("../../../assets/images/cbt/teacher-illustration.png");

export default function CbtSimulationScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <Image
        source={classBackground}
        resizeMode="cover"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <SafeAreaView className="bg-white" edges={["top"]}>
        <View className="h-16 flex-row items-center rounded-b-xl bg-white px-7 shadow-sm shadow-black/10">
          <Pressable
            accessibilityLabel="Kembali"
            className="h-8 w-8 items-start justify-center active:opacity-60"
            hitSlop={12}
            onPress={() => router.back()}
          >
            <CaretLeftIcon size={25} color="#404040" />
          </Pressable>
          <Text className="flex-1 pr-8 text-center font-feather-bold text-base tracking-[0.8px] text-primary-300">
            Berbicara Dengan Guru
          </Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 overflow-hidden">
        <Image
          source={teacherIllustration}
          resizeMode="contain"
          style={{
            position: "absolute",
            bottom: -22,
            left: -42,
            width: 440,
            aspectRatio: 353 / 531,
          }}
        />

        <Pressable
          accessibilityLabel={
            isListening ? "Hentikan mikrofon" : "Mulai mikrofon"
          }
          accessibilityRole="button"
          accessibilityState={{ selected: isListening }}
          className="absolute bottom-16 left-1/2 size-20 -translate-x-10 items-center justify-center rounded-full bg-white shadow-lg shadow-black/20 active:opacity-80"
          onPress={() => setIsListening((current) => !current)}
        >
          <View
            className={
              isListening
                ? "size-14 items-center justify-center rounded-full bg-primary-100"
                : "size-14 items-center justify-center rounded-full"
            }
          >
            <MicrophoneIcon size={38} color="#000000" weight="bold" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
