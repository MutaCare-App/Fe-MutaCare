import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { MoodItem, useMoodStore } from "@/store/useMoodStore";
import React, { useRef } from "react";
import { Image, Pressable, View } from "react-native";
import { MoodCheckCardHeader } from "./mood-check-card-header";
import { MoodEditSheet } from "./mood-edit-sheet";

interface MoodCheckResultProps {
  selectedMood: MoodItem;
  onSelectMood?: (mood: MoodItem) => void;
  isEditable?: boolean;
}

export function MoodCheckResult({
  selectedMood,
  onSelectMood,
  isEditable = true,
}: MoodCheckResultProps) {
  const { setMood } = useMoodStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenEdit = () => {
    if (!isEditable) return;
    bottomSheetModalRef.current?.present();
  };

  const handleSelectNewMood = (mood: MoodItem) => {
    setMood(mood);
    onSelectMood?.(mood);
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <>
      <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
        {/* Header */}
        <MoodCheckCardHeader />

        <Text className="font-poppins text-neutral-700 text-xs mt-1.5">
          Hari Ini Kamu Merasa
        </Text>

        {/* Ilustrasi Mood & Label Terpilih */}
        <View className="items-center justify-center my-3">
          <Image
            source={selectedMood.image}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <Text className="font-poppins-semibold text-neutral-800 text-lg mt-2">
            {selectedMood.label}
          </Text>
        </View>

        {/* Footer Card */}
        <View className="flex flex-col items-center">
          <Text className="font-poppins text-center text-neutral-700 text-xs">
            Terima Kasih Sudah Berbagi
          </Text>
          {isEditable ? (
            <Pressable
              onPress={handleOpenEdit}
              hitSlop={8}
              className="w-full items-end mt-4"
            >
              <Text className="font-poppins-semibold text-brand-accent text-sm">
                Edit Mood
              </Text>
            </Pressable>
          ) : (
            <View className="w-full items-center mt-3 pt-2.5 border-t border-neutral-100">
              <Text className="font-poppins text-neutral-400 text-[11px] text-center">
                Sesi hari ini selesai • Mood check-in berikutnya besok
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Bottom Sheet Modal untuk Edit Mood */}
      <MoodEditSheet
        ref={bottomSheetModalRef}
        selectedMood={selectedMood}
        onSelectMood={handleSelectNewMood}
      />
    </>
  );
}
