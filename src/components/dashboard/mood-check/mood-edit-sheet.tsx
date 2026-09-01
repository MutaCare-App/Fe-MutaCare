import {
  BottomSheetModal,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { MOODS, MoodItem } from "@/store/useMoodStore";
import React, { forwardRef } from "react";
import { View } from "react-native";
import { MoodOptionItem } from "./mood-option-item";

interface MoodEditSheetProps {
  selectedMood: MoodItem;
  onSelectMood: (mood: MoodItem) => void;
}

export const MoodEditSheet = forwardRef<BottomSheetModal, MoodEditSheetProps>(
  ({ selectedMood, onSelectMood }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={["38%"]}
        enablePanDownToClose
      >
        <BottomSheetView className="px-6 pt-2 pb-6">
          <Text className="font-poppins-bold text-neutral-800 text-lg text-center">
            Edit Mood
          </Text>
          <Text className="font-poppins text-neutral-600 text-xs text-center mt-1">
            Bagaimana Perasaanmu Hari Ini?
          </Text>

          <View className="flex-row justify-between items-start mt-5">
            {MOODS.map((mood) => (
              <MoodOptionItem
                key={mood.id}
                mood={mood}
                isSelected={selectedMood.id === mood.id}
                onSelect={onSelectMood}
              />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
MoodEditSheet.displayName = "MoodEditSheet";
