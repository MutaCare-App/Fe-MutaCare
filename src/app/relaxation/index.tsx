import { PreparationItem } from "@/components/relaxation/preparation-item";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { ActivityIndicator, Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);

const PREPARATION_STEPS = [
  "Cari Tempat Yang Tenang",
  "Duduk Dengan Nyaman",
  "Gunakan Earphone (Opsional)",
];

export default function RelaxationIntroScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const selectedDayData = useJourneyStore((state) => state.selectedDayData);
  const completeMission = useJourneyStore((state) => state.completeMission);
  const isSubmitting = useJourneyStore((state) => state.isSubmitting);

  const relMission = selectedDayData?.missions?.find((m) => m.missionType === "relaxation");
  const isOptional = selectedDayData?.relaxationMode === "optional" || relMission?.isOptional;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/dashboard/journey");
  };

  const handleSkip = async () => {
    if (relMission && token && relMission.status !== "completed") {
      await completeMission(relMission.id, {}, token);
    }
    router.push("/reflection");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 p-5" edges={["top", "bottom", "left", "right"]}>
        <View className="w-full flex-1 px-2">
          <View className="h-16 justify-center">
            <Pressable
              accessibilityLabel="Kembali"
              className="size-9 items-start justify-center active:opacity-60"
              hitSlop={12}
              onPress={handleBack}
            >
              <CaretLeftIcon className="text-neutral-700" size={26} />
            </Pressable>
          </View>

          <View className="flex-1 items-center">
            <Image
              accessibilityLabel="Karakter MutaCare sedang bermeditasi"
              resizeMode="contain"
              source={require("../../../assets/images/relaxation/relaxation-mascot.png")}
              style={{ height: 286, width: 229 }}
            />

            <Text className="mt-4 font-feather-bold text-[31px] text-primary-300">
              Relaksasi
            </Text>
            <Text className="mt-1 max-w-[300px] text-center font-poppins text-sm leading-5 text-neutral-700">
              Menenangkan Tubuh Sebelum Memulai{"\n"}Latihan Berbicara.
            </Text>

            <View className="mt-7 w-full gap-4 px-3">
              {PREPARATION_STEPS.map((step) => (
                <PreparationItem key={step} label={step} />
              ))}
            </View>
          </View>

          <View className="gap-2.5">
            <Button
              className="h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
              onPress={() => router.push("/relaxation/session")}
            >
              <Text className="font-poppins-semibold text-base tracking-[0.7px] text-white">
                Mulai Relaksasi
              </Text>
            </Button>
            {isOptional && (
              <Button
                className="h-12 w-full rounded-lg bg-emerald-50 border border-emerald-300 active:bg-emerald-100"
                disabled={isSubmitting}
                onPress={handleSkip}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#047857" />
                ) : (
                  <Text className="font-poppins-semibold text-sm tracking-[0.7px] text-emerald-700">
                    Lewati Relaksasi (Opsional)
                  </Text>
                )}
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
