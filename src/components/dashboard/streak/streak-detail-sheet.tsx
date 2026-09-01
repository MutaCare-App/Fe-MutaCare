import {
  BottomSheetModal,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { FlameIcon } from "phosphor-react-native/src/icons/Flame";
import { TrophyIcon } from "phosphor-react-native/src/icons/Trophy";
import React, { forwardRef } from "react";
import { View } from "react-native";

iconWithClassName(FlameIcon);
iconWithClassName(TrophyIcon);

interface StreakDetailSheetProps {
  currentStreak?: number;
  maxStreak?: number;
}

export const StreakDetailSheet = forwardRef<
  BottomSheetModal,
  StreakDetailSheetProps
>(({ currentStreak = 5, maxStreak = 10 }, ref) => {
  const handleClose = () => {
    if (ref && typeof ref === "object" && ref.current) {
      ref.current.dismiss();
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["40%"]}
      enablePanDownToClose
    >
      <BottomSheetView className="px-6 pt-2 pb-8">
        {/* Title */}
        <Text className="font-poppins-bold text-neutral-800 text-lg text-center mb-5">
          Streak Harian
        </Text>

        {/* 2 Cards Side-by-Side */}
        <View className="flex-row gap-3">
          {/* Streak Saat Ini Card */}
          <View className="flex-1 flex-row items-center gap-3 p-3.5 border border-neutral-300 rounded-2xl bg-white shadow-sm shadow-black/5">
            <FlameIcon size={32} weight="fill" className="text-orange-400" />
            <View className="flex-1">
              <Text className="font-poppins text-neutral-600 text-xs">
                Streak Saat Ini
              </Text>
              <Text className="font-poppins-bold text-neutral-800 text-base leading-5 mt-0.5">
                {currentStreak} Hari
              </Text>
            </View>
          </View>

          {/* Streak Terbanyak Card */}
          <View className="flex-1 flex-row items-center gap-3 p-3.5 border border-neutral-300 rounded-2xl bg-white shadow-sm shadow-black/5">
            <TrophyIcon size={32} weight="fill" className="text-yellow-500" />
            <View className="flex-1">
              <Text className="font-poppins text-neutral-600 text-xs">
                Streak Terbanyak
              </Text>
              <Text className="font-poppins-bold text-neutral-800 text-base leading-5 mt-0.5">
                {maxStreak} Hari
              </Text>
            </View>
          </View>
        </View>

        {/* Tombol Kembali */}
        <Button
          onPress={handleClose}
          className="bg-primary-300 w-full h-12 rounded-xl justify-center items-center mt-5"
        >
          <Text className="text-white font-poppins-semibold text-base">
            Kembali
          </Text>
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

StreakDetailSheet.displayName = "StreakDetailSheet";
