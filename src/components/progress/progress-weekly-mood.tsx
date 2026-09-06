import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useMoodStore } from "@/store/useMoodStore";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import React, { useState } from "react";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";

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

interface DayMood {
  day: string;
  image: ImageSourcePropType;
  isActiveDay?: boolean;
  isToday?: boolean;
}

const WEEKLY_DAYS: DayMood[] = [
  { day: "Senin", image: MOOD_IMAGES.veryBad, isActiveDay: true },
  { day: "Selasa", image: MOOD_IMAGES.bad, isActiveDay: true },
  { day: "Rabu", image: MOOD_IMAGES.neutral, isActiveDay: true },
  { day: "Kamis", image: MOOD_IMAGES.good, isActiveDay: true },
  { day: "Jumat", image: MOOD_IMAGES.veryGood, isActiveDay: true, isToday: true },
  { day: "Sabtu", image: MOOD_IMAGES.neutral, isActiveDay: false },
  { day: "Minggu", image: MOOD_IMAGES.neutral, isActiveDay: false },
];

export interface ProgressWeeklyMoodProps {
  todayMood?: MoodType;
}

export function ProgressWeeklyMood({ todayMood }: ProgressWeeklyMoodProps = {}) {
  const [week, setWeek] = useState(2);
  const storeMood = useMoodStore((state) => state.selectedMood);

  const activeMood: MoodType =
    todayMood ??
    (storeMood?.label && isMoodType(storeMood.label)
      ? (storeMood.label as MoodType)
      : "Sangat Baik");

  const currentMoodConfig = MOOD_CONFIG[activeMood] ?? MOOD_CONFIG["Sangat Baik"];

  return (
    <View className="gap-3">
      {/* Riwayat Mood Mingguan Card */}
      <View className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm shadow-black/5">
        <Text className="font-poppins text-sm text-neutral-600 mb-3">
          Riwayat Mood Mingguan
        </Text>

        {/* Days Row */}
        <View className="flex-row items-end justify-between px-1">
          {WEEKLY_DAYS.map((item) => (
            <View
              key={item.day}
              className={`items-center justify-center ${
                item.isToday
                  ? "bg-secondary-100 rounded-xl px-1.5 py-1.5 -my-1"
                  : "px-1 py-1"
              }`}
            >
              <Image
                source={item.isToday ? currentMoodConfig.image : item.image}
                className={`h-8 w-8 ${item.isActiveDay ? "" : "opacity-30"}`}
                resizeMode="contain"
              />
              <Text
                className={`font-poppins text-[11px] mt-1 ${
                  item.isToday
                    ? "font-poppins text-neutral-800"
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
            onPress={() => setWeek((w) => Math.max(1, w - 1))}
            className="p-1 active:opacity-60"
            hitSlop={8}
            accessibilityLabel="Minggu Sebelumnya"
          >
            <CaretLeftIcon size={16} className="text-neutral-700" />
          </Pressable>

          <Text className="font-poppins text-xs text-neutral-700 mx-5">
            Minggu Ke {week}
          </Text>

          <Pressable
            onPress={() => setWeek((w) => w + 1)}
            className="p-1 active:opacity-60"
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
            source={currentMoodConfig.image}
            className="h-12 w-12"
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-base text-neutral-800 text-center mt-1.5">
            {currentMoodConfig.label}
          </Text>
        </View>

        {/* Right: Insight */}
        <View className="flex-1 rounded-2xl border border-neutral-200 bg-white p-4 justify-center shadow-sm shadow-black/5">
          <Text className="font-poppins-medium-italic text-sm leading-5 text-neutral-800 ">
            “Dalam Minggu Ini, Kamu Lebih Sering Merasa{" "}
            <Text className="font-poppins-bold-italic text-brand-accent">Baik</Text>”
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ProgressWeeklyMood;
