import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { ArrowRightIcon } from "phosphor-react-native/src/icons/ArrowRight";
import React from "react";
import { Pressable, View } from "react-native";

iconWithClassName(ArrowRightIcon);

interface ProgressReflectionSectionProps {
  lastReflection?: string;
  totalDays?: number;
  onViewHistory?: () => void;
}

export function ProgressReflectionSection({
  lastReflection = "“Hari Ini Aku Berhasil Menjawab Pertanyaan Guru”",
  totalDays = 28,
  onViewHistory,
}: ProgressReflectionSectionProps) {
  return (
    <View className="flex-row gap-3">
      {/* Left Card: Refleksi Terakhir */}
      <View className="flex-1 rounded-2xl border border-neutral-200 bg-white p-4 justify-between shadow-sm shadow-black/5">
        <Text className="font-poppins text-xs text-neutral-500">Refleksi Terakhir</Text>
        <Text className="font-poppins-semibold text-sm leading-5 text-neutral-800 italic mt-2">
          {lastReflection}
        </Text>
      </View>

      {/* Right Card: Total Refleksi */}
      <View className="flex-1 rounded-2xl border border-neutral-200 bg-white p-4 justify-between shadow-sm shadow-black/5">
        <View>
          <Text className="font-poppins text-xs text-neutral-500">Total Refleksi</Text>
          <Text className="font-poppins-bold text-2xl text-neutral-800 mt-1">
            {totalDays} Hari
          </Text>
        </View>

        <Pressable
          onPress={onViewHistory}
          className="flex-row items-center gap-1.5 mt-3 active:opacity-70"
          accessibilityRole="button"
          accessibilityLabel="Lihat Riwayat Refleksi"
        >
          <Text className="font-poppins text-xs text-neutral-600">Lihat Riwayat</Text>
          <ArrowRightIcon size={14} className="text-neutral-600" />
        </Pressable>
      </View>
    </View>
  );
}

export default ProgressReflectionSection;
