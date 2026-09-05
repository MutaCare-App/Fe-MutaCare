import LockedArtwork from "@/assets/images/journey/day-locked-detail.svg";
import SuccessArtwork from "@/assets/images/journey/day-success.svg";
import { BottomSheetModal, BottomSheetView } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { DailyMissionFrontendItem } from "@/services/journeyService";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { forwardRef, useMemo } from "react";
import { View } from "react-native";

iconWithClassName(CheckIcon);

export type JourneySheetMode = "tasks" | "success" | "locked";

interface JourneyDaySheetProps {
  day: number;
  mode: JourneySheetMode;
  onClose: () => void;
  onDismiss: () => void;
  onStart: () => void;
  week: number;
  missionsData?: DailyMissionFrontendItem[];
}

const DEFAULT_TASKS = [
  {
    title: "Relaksasi Pernapasan 4-6",
    duration: "3 Menit",
    description: "Latihan pernapasan untuk membuat tubuh lebih rileks sebelum memulai terapi",
  },
  {
    title: "Restrukturisasi Kognitif CBT",
    duration: "10 Menit",
    description:
      "Mengenali pikiran negatif yang muncul saat harus berbicara dan mengubahnya menjadi pikiran positif.",
  },
  {
    title: "Jurnal Refleksi & SUDs",
    duration: "2 Menit",
    description: "Evaluasi tingkat kecemasan sebelum & sesudah latihan serta apresiasi diri.",
  },
];

function StepMarker({ complete, number }: { complete: boolean; number: number }) {
  return (
    <View className="size-5 items-center justify-center rounded-lg bg-secondary-200">
      {complete ? (
        <CheckIcon className="text-secondary-400" size={14} weight="bold" />
      ) : (
        <Text className="font-poppins text-xs text-neutral-800">{number}</Text>
      )}
    </View>
  );
}

function TaskList({ tasks }: { tasks: Array<{ title: string; duration: string; description: string; status?: string; isOptional?: boolean; isSkipped?: boolean }> }) {
  return (
    <View className="mt-6 w-full">
      {tasks.map((task, index) => {
        const isComplete = task.status === "completed";
        const isSkipped = task.isSkipped || task.status === "skipped";
        const isOptional = task.isOptional;

        return (
          <View className={`min-h-[77px] flex-row gap-2.5 ${isSkipped ? "opacity-40" : ""}`} key={`${task.title}-${index}`}>
            <View className="w-5 items-center">
              <StepMarker complete={isComplete} number={index + 1} />
              {index < tasks.length - 1 ? (
                <View className="mt-1 min-h-12 w-px flex-1 bg-neutral-500" />
              ) : null}
            </View>
            <View className="min-w-0 flex-1 pb-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-1.5 flex-1 pr-2">
                  <Text className={`font-poppins-bold text-sm tracking-[0.8px] ${isSkipped ? "line-through text-neutral-500" : "text-neutral-800"}`}>
                    {task.title}
                  </Text>
                  {isSkipped && (
                    <View className="bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-300">
                      <Text className="font-poppins-medium text-[10px] text-neutral-500">Di-skip</Text>
                    </View>
                  )}
                  {isOptional && !isSkipped && (
                    <View className="bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Text className="font-poppins-medium text-[10px] text-emerald-700">Opsional</Text>
                    </View>
                  )}
                </View>
                <Text className="font-poppins-medium text-xs tracking-[0.8px] text-brand-accent">
                  {task.duration}
                </Text>
              </View>
              <Text className="mt-1 font-poppins text-xs leading-[15px] tracking-[0.4px] text-neutral-800">
                {task.description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function CompletedSteps({ tasks }: { tasks: Array<{ title: string }> }) {
  return (
    <View className="mt-4 w-full">
      {tasks.map((task, index) => (
        <View className="h-10 flex-row gap-2.5" key={`${task.title}-${index}`}>
          <View className="w-5 items-center">
            <StepMarker complete number={index + 1} />
            {index < tasks.length - 1 ? (
              <View className="mt-1 min-h-6 w-px flex-1 bg-neutral-500" />
            ) : null}
          </View>
          <Text className="font-poppins-bold text-sm tracking-[0.8px] text-neutral-800">
            {task.title}
          </Text>
        </View>
      ))}
    </View>
  );
}

export const JourneyDaySheet = forwardRef<BottomSheetModal, JourneyDaySheetProps>(
  ({ day, mode, onClose, onDismiss, onStart, week, missionsData }, ref) => {
    const snapPoints = useMemo(() => {
      if (mode === "success") return ["65%"];
      if (mode === "locked") return ["46%"];
      return ["56%"];
    }, [mode]);

    const formattedTasks = useMemo(() => {
      if (missionsData && missionsData.length > 0) {
        return missionsData.map((m) => ({
          title: m.title,
          duration: m.durationText,
          description: m.description,
          status: m.status,
          isOptional: m.isOptional,
          isSkipped: m.isSkipped,
        }));
      }
      return DEFAULT_TASKS;
    }, [missionsData]);

    return (
      <BottomSheetModal
        backgroundStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: "#737373", height: 4, width: 145 }}
        onDismiss={onDismiss}
        ref={ref}
        snapPoints={snapPoints}
      >
        <BottomSheetView
          style={{
            flex: 1,
            paddingBottom: 30,
            paddingHorizontal: 18,
            paddingTop: 12,
          }}
        >
          <Text className="text-center font-poppins-bold text-base tracking-[0.8px] text-neutral-800">
            Minggu Ke {week} Hari Ke {day}
          </Text>

          {mode === "tasks" ? (
            <>
              <TaskList tasks={formattedTasks} />
              <Button
                className="mt-auto h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
                onPress={onStart}
              >
                <Text className="font-poppins-semibold text-base tracking-[0.8px] text-white">
                  Mulai Latihan
                </Text>
              </Button>
            </>
          ) : null}

          {mode === "success" ? (
            <>
              <View className="mt-6 items-center">
                <SuccessArtwork height={110} width={135} />
                <Text className="mt-2 font-poppins-bold text-base tracking-[0.8px] text-neutral-800">
                  Hebat !
                </Text>
                <Text className="font-poppins text-xs tracking-[0.4px] text-neutral-800">
                  Kamu telah menyelesaikan latihan hari ini.
                </Text>
              </View>
              <CompletedSteps tasks={formattedTasks} />
              <Button
                className="mt-auto h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
                onPress={onClose}
              >
                <Text className="font-poppins-semibold text-base tracking-[0.8px] text-white">
                  Kembali
                </Text>
              </Button>
            </>
          ) : null}

          {mode === "locked" ? (
            <>
              <View className="mt-8 items-center">
                <LockedArtwork height={122} width={80} />
                <Text className="mt-3 font-poppins-bold text-base tracking-[0.8px] text-neutral-800">
                  Tahap Masih Terkunci
                </Text>
                <Text className="mt-1 max-w-[334px] text-center font-poppins text-xs leading-[15px] tracking-[0.4px] text-neutral-800">
                  Selesaikan latihan sebelumnya untuk membuka tahap ini.
                </Text>
              </View>
              <Button
                className="mt-auto h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
                onPress={onClose}
              >
                <Text className="font-poppins-semibold text-base tracking-[0.8px] text-white">
                  Kembali
                </Text>
              </Button>
            </>
          ) : null}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

JourneyDaySheet.displayName = "JourneyDaySheet";
