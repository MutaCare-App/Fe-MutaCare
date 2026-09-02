import {
  JourneyDaySheet,
  JourneySheetMode,
} from "@/components/journey/journey-day-sheet";
import {
  JourneyDayNode,
  JourneyDayStatus,
} from "@/components/journey/journey-day-node";
import { JourneyProgressHeader } from "@/components/journey/journey-progress-header";
import { JourneyWeekCompleteDialog } from "@/components/journey/journey-week-complete-dialog";
import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPLETE_IMAGE = require("../../../assets/images/journey/day-complete.png");
const CURRENT_IMAGE = require("../../../assets/images/journey/day-current.png");
const LOCKED_IMAGE = require("../../../assets/images/journey/day-locked.png");

interface JourneyDay {
  day: number;
  image: ImageSourcePropType;
  status: JourneyDayStatus;
  style: { left: number; top: number };
}

const DAYS: JourneyDay[] = [
  { day: 1, image: COMPLETE_IMAGE, status: "complete", style: { left: 0, top: 0 } },
  { day: 2, image: COMPLETE_IMAGE, status: "complete", style: { left: 85, top: 119 } },
  { day: 3, image: COMPLETE_IMAGE, status: "complete", style: { left: 0, top: 238 } },
  { day: 4, image: CURRENT_IMAGE, status: "current", style: { left: 85, top: 349 } },
  { day: 5, image: LOCKED_IMAGE, status: "locked", style: { left: 0, top: 468 } },
];

interface ActiveDaySheet {
  day: number;
  mode: JourneySheetMode;
}

export default function JourneyScreen() {
  const router = useRouter();
  const daySheetRef = useRef<BottomSheetModal>(null);
  const [activeSheet, setActiveSheet] = useState<ActiveDaySheet | null>(null);
  const [weekCompleteOpen, setWeekCompleteOpen] = useState(false);

  useEffect(() => {
    if (activeSheet) {
      daySheetRef.current?.present();
    }
  }, [activeSheet]);

  const handleDayPress = (day: JourneyDay) => {
    const mode: JourneySheetMode =
      day.status === "complete"
        ? "success"
        : day.status === "locked"
          ? "locked"
          : "tasks";
    setActiveSheet({ day: day.day, mode });
  };

  const closeDaySheet = () => {
    daySheetRef.current?.dismiss();
  };

  const startTraining = () => {
    closeDaySheet();
    router.push("/relaxation");
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView
        className="flex-1"
        edges={["top", "left", "right"]}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="items-center px-3.5 pb-2 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <Text className="w-full text-center font-feather-bold text-[22px] tracking-[0.8px] text-primary-300">
            Perjalanan Terapi
          </Text>

          <View className="mt-7 w-full">
            <JourneyProgressHeader
              onPress={() => setWeekCompleteOpen(true)}
              progress={86}
              week={1}
            />
          </View>

          <View className="mt-[18px] h-[581px] w-[170px]">
            {DAYS.map((day) => (
              <JourneyDayNode
                day={day.day}
                image={day.image}
                key={day.day}
                onPress={() => handleDayPress(day)}
                status={day.status}
                style={day.style}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <JourneyDaySheet
        day={activeSheet?.day ?? 1}
        mode={activeSheet?.mode ?? "tasks"}
        onClose={closeDaySheet}
        onDismiss={() => setActiveSheet(null)}
        onStart={startTraining}
        ref={daySheetRef}
        week={1}
      />

      <JourneyWeekCompleteDialog
        onContinue={() => setWeekCompleteOpen(false)}
        onOpenChange={setWeekCompleteOpen}
        open={weekCompleteOpen}
        week={1}
      />
    </View>
  );
}
