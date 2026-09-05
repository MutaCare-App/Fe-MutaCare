import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { FlameIcon } from "phosphor-react-native/src/icons/Flame";
import { HandWavingIcon } from "phosphor-react-native/src/icons/HandWaving";
import React, { useRef } from "react";
import { ImageSourcePropType, Pressable, View } from "react-native";
import { StreakDetailSheet } from "./streak/streak-detail-sheet";

iconWithClassName(HandWavingIcon);
iconWithClassName(FlameIcon);

const DEFAULT_AVATAR = require("../../../assets/images/dummy-profile.png");

interface DayStreak {
  day: string;
  active: boolean;
}

const getDynamicStreakDays = (streak: number): DayStreak[] => {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  if (!streak || streak <= 0) {
    return days.map((day) => ({ day, active: false }));
  }

  const jsDay = new Date().getDay();
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

  return days.map((day, idx) => {
    const isActive = idx <= todayIndex && (todayIndex - idx) < streak;
    return { day, active: isActive };
  });
};

interface DashboardHeaderProps {
  userName?: string;
  avatarUrl?: string | ImageSourcePropType;
  currentStreak?: number;
  maxStreak?: number;
}

export function DashboardHeader({
  userName = "Pengguna",
  avatarUrl,
  currentStreak = 0,
  maxStreak = 0,
}: DashboardHeaderProps) {
  const streakSheetRef = useRef<BottomSheetModal>(null);

  const streakDays = getDynamicStreakDays(currentStreak);

  const imageSource = avatarUrl
    ? typeof avatarUrl === "string"
      ? { uri: avatarUrl }
      : avatarUrl
    : DEFAULT_AVATAR;

  const handleOpenStreakSheet = () => {
    streakSheetRef.current?.present();
  };

  return (
    <>
      <View className="bg-secondary-200 pt-4 pb-5 px-5 rounded-b-3xl">
        {/* Profil & Salam */}
        <View className="flex-row items-center gap-3">
          <Avatar alt={`${userName}'s avatar`} className="size-16 border border-transparent">
            <AvatarImage source={imageSource} />
            <AvatarFallback>
              <Text className="font-poppins-semibold text-neutral-600 text-base">
                {userName?.trim() ? userName.trim().charAt(0).toUpperCase() : "U"}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <HandWavingIcon size={20} weight="fill" className="text-brand-accent" />
              <Text className="font-poppins-medium text-neutral-700 text-base">
                Selamat Pagi,
              </Text>
            </View>
            <Text className="font-poppins-bold text-neutral-700 text-2xl leading-7">
              {userName}
            </Text>
          </View>
        </View>

        {/* Streak Harian Section */}
        <View className="mt-4">
          <View className="flex-row justify-between items-center mb-2.5">
            <Text className="font-poppins-semibold text-neutral-700 text-sm">
              Streak Harian ({currentStreak} Hari)
            </Text>
            <Pressable onPress={handleOpenStreakSheet} hitSlop={8}>
              <Text className="font-poppins text-neutral-700 text-[11px] underline">
                Lihat Streak
              </Text>
            </Pressable>
          </View>

          {/* 7 Hari Streak Pills */}
          <View className="flex-row justify-between items-center">
            {streakDays.map((item, index) => (
              <View
                key={index}
                className="w-11 h-14 bg-white/90 rounded-2xl items-center justify-center shadow-sm shadow-black/5"
              >
                <FlameIcon
                  size={20}
                  weight={item.active ? "fill" : "regular"}
                  className={item.active ? "text-orange-400" : "text-neutral-300"}
                />
                <Text className="font-poppins text-[10px] text-neutral-600 mt-1">
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Sheet Modal Detail Streak */}
      <StreakDetailSheet
        ref={streakSheetRef}
        currentStreak={currentStreak}
        maxStreak={maxStreak}
      />
    </>
  );
}
