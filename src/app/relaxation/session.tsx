import { RelaxationCompleteModal } from "@/components/relaxation/relaxation-complete-modal";
import { SoundSelect } from "@/components/relaxation/sound-select";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { PauseIcon } from "phosphor-react-native/src/icons/Pause";
import { PlayIcon } from "phosphor-react-native/src/icons/Play";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

[CaretLeftIcon, PauseIcon, PlayIcon].forEach(iconWithClassName);

const INITIAL_SECONDS = 180;

const SOUND_FILES: Record<string, any> = {
  Hujan: require("../../../assets/audio/rain.mp3"),
  Ombak: require("../../../assets/audio/waves.mp3"),
  "Suara Hutan": require("../../../assets/audio/forest.mp3"),
};

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
  const token = useAuthStore((state) => state.token);
  const selectedDayData = useJourneyStore((state) => state.selectedDayData);
  const completeMission = useJourneyStore((state) => state.completeMission);

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sound, setSound] = useState("Hujan");

  const player = useAudioPlayer(SOUND_FILES[sound]);

  useEffect(() => {
    try {
      void setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
      });
    } catch (e) {
      console.warn("Audio mode setting failed:", e);
    }
  }, []);

  useEffect(() => {
    if (player) {
      player.loop = true;
    }
  }, [player]);

  useEffect(() => {
    const audioSource = SOUND_FILES[sound];
    if (audioSource && player) {
      try {
        player.replace(audioSource);
        player.loop = true;
        if (isRunning) {
          player.play();
        }
      } catch (e) {
        console.warn("Failed to change sound track:", e);
      }
    }
  }, [sound]);

  useEffect(() => {
    if (!player) return;
    try {
      if (isRunning) {
        player.play();
      } else {
        player.pause();
      }
    } catch (e) {
      console.warn("Failed to toggle audio play/pause:", e);
    }
  }, [isRunning, player]);

  const handleBack = () => {
    try {
      player?.pause();
    } catch (e) {
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/relaxation");
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

      try {
        player?.pause();
      } catch (e) {
      }

      if (token && selectedDayData) {
        const relMission = selectedDayData.missions.find(
          (m) => m.missionType === "relaxation" && m.status !== "completed"
        );
        if (relMission) {
          void completeMission(relMission.id, {}, token);
        }
      }
    }
  }, [secondsRemaining, isRunning, token, selectedDayData, completeMission, player]);

  const relMission = selectedDayData?.missions?.find((m) => m.missionType === "relaxation");
  const isOptional = selectedDayData?.relaxationMode === "optional" || relMission?.isOptional;

  const getNextStageRoute = () => {
    const missions = selectedDayData?.missions || [];
    const cbtMission = missions.find(
      (m) => (m.missionType === "cbt" || m.missionType === "guided_practice") && m.status !== "completed"
    );
    if (cbtMission) return "/cbt";

    const simMission = missions.find(
      (m) => (m.missionType === "simulation" || m.missionType === "vocal") && m.status !== "completed"
    );
    if (simMission) return "/simulation";

    const refMission = missions.find(
      (m) => m.missionType === "reflection" && m.status !== "completed"
    );
    if (refMission) return "/reflection";

    return "/dashboard/journey";
  };

  const handleSkip = async () => {
    try {
      player?.pause();
    } catch (e) {
    }

    if (relMission && token && relMission.status !== "completed") {
      await completeMission(relMission.id, {}, token);
    }

    router.replace(getNextStageRoute() as any);
  };

  return (
    <View className="flex-1 bg-primary-300">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 p-5" edges={["top", "bottom", "left", "right"]}>
        <View className="w-full flex-1 items-center px-2">
          <View className="h-12 w-full flex-row items-center justify-between">
            <Pressable
              accessibilityLabel="Kembali"
              className="size-9 items-start justify-center active:opacity-60"
              hitSlop={12}
              onPress={handleBack}
            >
              <CaretLeftIcon className="text-white" size={26} />
            </Pressable>
            {isOptional && (
              <Pressable
                accessibilityLabel="Lewati Relaksasi"
                className="rounded-full border border-white/40 bg-white/20 px-3 py-1.5 active:opacity-70"
                onPress={handleSkip}
              >
                <Text className="font-poppins-semibold text-xs text-white">Lewati Tahap Ini</Text>
              </Pressable>
            )}
          </View>

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
        onContinue={() => router.replace(getNextStageRoute() as any)}
        visible={isComplete}
      />
    </View>
  );
}
