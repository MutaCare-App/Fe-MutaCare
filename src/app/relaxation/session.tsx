import { RelaxationCompleteModal } from "@/components/relaxation/relaxation-complete-modal";
import { SoundSelect } from "@/components/relaxation/sound-select";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { PauseIcon } from "phosphor-react-native/src/icons/Pause";
import { PlayIcon } from "phosphor-react-native/src/icons/Play";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

[PauseIcon, PlayIcon].forEach(iconWithClassName);

const INITIAL_SECONDS = 179;

const INSTRUCTIONS = [
  "Tarik Napas Perlahan Melalui Hidung (4 Detik)",
  "Tahan Napas Sejenak (4 Detik)",
  "Hembuskan Perlahan Melalui Mulut (4 Detik)",
  "Lakukan Berulang Hingga Waktu Habis",
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}.${String(seconds).padStart(2, "0")}`;
}

export default function RelaxationSessionScreen() {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sound, setSound] = useState("Hujan");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/relaxation/index");
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      setIsComplete(true);
    }
  }, [secondsRemaining, isRunning]);

  return (
    <View className="flex-1 bg-primary-300">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 p-5" edges={["top", "bottom", "left", "right"]}>
        <View className="w-full flex-1 items-center px-2">
          <SoundSelect onValueChange={setSound} value={sound} />

          <View
            className="mt-9 items-center justify-center rounded-full border border-white/80 bg-white/10"
            style={{ aspectRatio: 1, maxWidth: 290, width: "86%" }}
          >
            <Text className="font-poppins-bold text-[64px] tracking-[1px] text-white">
              {formatTime(secondsRemaining)}
            </Text>
          </View>

          <View className="mt-7 min-h-[180px] w-full rounded-[10px] border border-white p-3">
            <Text className="font-poppins-bold text-base leading-6 text-white">
              Lakukan Hal Berikut Saat{"\n"}Relaksasi :
            </Text>
            <View className="mt-1 gap-0.5 px-1">
              {INSTRUCTIONS.map((instruction) => (
                <View className="flex-row" key={instruction}>
                  <Text className="w-4 font-poppins text-sm leading-[18px] text-white">•</Text>
                  <Text className="flex-1 font-poppins text-sm leading-[18px] text-white">
                    {instruction}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Pressable
            accessibilityLabel={isRunning ? "Jeda relaksasi" : "Mulai relaksasi"}
            className="mt-12 size-16 items-center justify-center rounded-full border-[7px] border-white active:opacity-70"
            hitSlop={10}
            onPress={() => setIsRunning((running) => !running)}
          >
            {isRunning ? (
              <PauseIcon className="text-white" size={28} weight="fill" />
            ) : (
              <PlayIcon className="ml-1 text-white" size={30} weight="fill" />
            )}
          </Pressable>
        </View>
      </SafeAreaView>

      <RelaxationCompleteModal
        onBack={handleBack}
        onContinue={() => router.replace("/dashboard/journey")}
        visible={isComplete}
      />
    </View>
  );
}
