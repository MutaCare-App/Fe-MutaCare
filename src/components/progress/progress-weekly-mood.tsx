import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useMoodStore } from "@/store/useMoodStore";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import React, { useState } from "react";
import { ActivityIndicator, Image, ImageSourcePropType, Pressable, View } from "react-native";

iconWithClassName(CaretLeftIcon);
iconWithClassName(CaretRightIcon);

const MOOD_IMAGES: Record<string, ImageSourcePropType> = {
  veryBad: require("@/../assets/images/reflection/mood-very-bad.png"),
  bad: require("@/../assets/images/reflection/mood-bad.png"),
  neutral: require("@/../assets/images/reflection/mood-neutral.png"),
  good: require("@/../assets/images/reflection/mood-good.png"),
  veryGood: require("@/../assets/images/reflection/mood-very-good.png"),
};

export type MoodType =
  | "Sangat Buruk"
  | "Buruk"
  | "Normal"
  | "Baik"
  | "Sangat Baik";

export const MOOD_CONFIG: Record<
  MoodType,
  { label: MoodType; image: ImageSourcePropType }
> = {
  "Sangat Buruk": {
    label: "Sangat Buruk",
    image: MOOD_IMAGES.veryBad,
  },
  Buruk: {
    label: "Buruk",
    image: MOOD_IMAGES.bad,
  },
  Normal: {
    label: "Normal",
    image: MOOD_IMAGES.neutral,
  },
  Baik: {
    label: "Baik",
    image: MOOD_IMAGES.good,
  },
  "Sangat Baik": {
    label: "Sangat Baik",
    image: MOOD_IMAGES.veryGood,
  },
};

function isMoodType(val: string): val is MoodType {
  return val in MOOD_CONFIG;
}

export interface DayMood {
  day: string;
  image: ImageSourcePropType;
  isActiveDay?: boolean;
  isToday?: boolean;
}

const DEFAULT_WEEKLY_DAYS: DayMood[] = [
  { day: "Senin", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Selasa", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Rabu", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Kamis", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Jumat", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Sabtu", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Minggu", image: MOOD_IMAGES.neutral, isActiveDay: false },
];

export interface ProgressWeeklyMoodProps {
  todayMood?: MoodType | null;
  weeklyData?: DayMood[];
  currentWeek?: number;
  maxWeek?: number;
  onWeekChange?: (week: number) => void;
  dominantMood?: string | null;
  insightText?: string;
  isLoading?: boolean;
}

export function ProgressWeeklyMood({
  todayMood,
  weeklyData,
  currentWeek = 1,
  maxWeek = 4,
  onWeekChange,
  dominantMood,
  insightText,
  isLoading = false,
}: ProgressWeeklyMoodProps = {}) {
  const [internalWeek, setInternalWeek] = useState(currentWeek);
  const storeMood = useMoodStore((state) => state.selectedMood);

  const displayWeek = currentWeek ?? internalWeek;

  const handlePrevWeek = () => {
    if (isLoading || displayWeek <= 1) return;
    const nextWeek = Math.max(1, displayWeek - 1);
    setInternalWeek(nextWeek);
    onWeekChange?.(nextWeek);
  };

  const handleNextWeek = () => {
    if (isLoading || displayWeek >= maxWeek) return;
    const nextWeek = Math.min(maxWeek, displayWeek + 1);
    setInternalWeek(nextWeek);
    onWeekChange?.(nextWeek);
  };

  const activeMood: MoodType | null =
    todayMood !== undefined
      ? todayMood
      : storeMood?.label && isMoodType(storeMood.label)
      ? (storeMood.label as MoodType)
      : null;

  const currentMoodConfig = activeMood ? MOOD_CONFIG[activeMood] : null;
  const daysToRender = weeklyData && weeklyData.length > 0 ? weeklyData : DEFAULT_WEEKLY_DAYS;

  return (
    <View className="gap-3">
      {/* Riwayat Mood Mingguan Card */}
      <View className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm shadow-black/5">
        <Text className="font-poppins text-sm text-neutral-600 mb-3">
          Riwayat Mood Mingguan
        </Text>

        {/* Days Row */}
        <View className="flex-row items-end justify-between px-1">
          {daysToRender.map((item) => (
            <View
              key={item.day}
              className={`items-center justify-center ${
                item.isToday
                  ? "bg-secondary-100 rounded-xl px-1.5 py-1.5 -my-1"
                  : "px-1 py-1"
              }`}
            >
              <Image
                source={item.image}
                className={`h-8 w-8 ${item.isActiveDay ? "" : "opacity-25"}`}
                resizeMode="contain"
              />
              <Text
                className={`font-poppins text-[11px] mt-1 ${
                  item.isToday
                    ? "font-poppins-semibold text-neutral-800"
                    : "text-neutral-600"
                }`}
              >
                {item.day}
              </Text>
            </View>
          ))}
        </View>

        {/* Pagination Controls */}
        <View className="flex-row items-center justify-center mt-4 pt-1">
          <Pressable
            onPress={handlePrevWeek}
            disabled={displayWeek <= 1 || isLoading}
            className={`p-1 active:opacity-60 ${displayWeek <= 1 || isLoading ? "opacity-30" : ""}`}
            hitSlop={8}
            accessibilityLabel="Minggu Sebelumnya"
          >
            <CaretLeftIcon size={16} className="text-neutral-700" />
          </Pressable>

          <View className="flex-row items-center mx-5">
            <Text className="font-poppins text-xs text-neutral-700">
              Minggu Ke {displayWeek}
            </Text>
            {isLoading && (
              <ActivityIndicator size="small" color="#525252" className="ml-1.5" />
            )}
          </View>

          <Pressable
            onPress={handleNextWeek}
            disabled={displayWeek >= maxWeek || isLoading}
            className={`p-1 active:opacity-60 ${displayWeek >= maxWeek || isLoading ? "opacity-30" : ""}`}
            hitSlop={8}
            accessibilityLabel="Minggu Selanjutnya"
          >
            <CaretRightIcon size={16} className="text-neutral-700" />
          </Pressable>
        </View>
      </View>

      {/* Two cards side by side */}
      <View className="flex-row gap-3">
        {/* Left: Mood Hari Ini */}
        <View className="flex-1 rounded-2xl border border-neutral-200 bg-white p-3.5 items-center justify-center shadow-sm shadow-black/5">
          <Text className="font-poppins text-xs text-neutral-600 text-center mb-1.5">
            Mood Hari Ini
          </Text>
          <Image
            source={currentMoodConfig ? currentMoodConfig.image : MOOD_IMAGES.neutral}
            className={`h-12 w-12 ${currentMoodConfig ? "" : "opacity-40"}`}
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-base text-neutral-800 text-center mt-1.5">
            {currentMoodConfig ? currentMoodConfig.label : "Belum Dicatat"}
          </Text>
        </View>

        {/* Right: Insight */}
        <View className="flex-1 rounded-2xl border border-neutral-200 bg-white p-4 justify-center shadow-sm shadow-black/5">
          {dominantMood ? (
            <Text className="font-poppins-medium-italic text-sm leading-5 text-neutral-800 ">
              “Dalam Minggu Ini, Kamu Lebih Sering Merasa{" "}
              <Text className="font-poppins-bold-italic text-brand-accent">{dominantMood}</Text>”
            </Text>
          ) : (
            <Text className="font-poppins-medium-italic text-xs leading-5 text-neutral-600">
              {insightText || "“Yuk catat mood harianmu untuk melihat perkembangan perasaanmu.”"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export { MOOD_IMAGES };
export default ProgressWeeklyMood;
