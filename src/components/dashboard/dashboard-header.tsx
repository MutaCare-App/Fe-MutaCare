import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { FlameIcon } from "phosphor-react-native/src/icons/Flame";
import { HandWavingIcon } from "phosphor-react-native/src/icons/HandWaving";
import React, { useRef } from "react";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import { StreakDetailSheet } from "./streak/streak-detail-sheet";

iconWithClassName(HandWavingIcon);
iconWithClassName(FlameIcon);

const DEFAULT_AVATAR = require("../../../assets/images/default-profile.png");

interface DayStreak {
  day: string;
  active: boolean;
}

const getDynamicStreakDays = (streak: number, isTodayCompleted = false): DayStreak[] => {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const effectiveStreak = isTodayCompleted ? Math.max(1, streak) : streak;
  if (!effectiveStreak || effectiveStreak <= 0) {
    return days.map((day) => ({ day, active: false }));
  }

  const jsDay = new Date().getDay();
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

  return days.map((day, idx) => {
    const isActive =
      (idx <= todayIndex && (todayIndex - idx) < effectiveStreak) ||
      (isTodayCompleted && idx === todayIndex);
    return { day, active: isActive };
  });
};

interface DashboardHeaderProps {
  userName?: string;
  avatarUrl?: string | ImageSourcePropType | null;
  currentStreak?: number;
  maxStreak?: number;
  isTodayCompleted?: boolean;
}

export function DashboardHeader({
  userName = "Pengguna",
  avatarUrl,
  currentStreak = 0,
  maxStreak = 0,
  isTodayCompleted = false,
}: DashboardHeaderProps) {
  const streakSheetRef = useRef<BottomSheetModal>(null);

  const effectiveStreak = isTodayCompleted ? Math.max(1, currentStreak) : currentStreak;
  const effectiveMaxStreak = Math.max(maxStreak, effectiveStreak);
  const streakDays = getDynamicStreakDays(currentStreak, isTodayCompleted);

  const hasAvatar = Boolean(
    avatarUrl &&
      (typeof avatarUrl === "string"
        ? avatarUrl.trim().length > 0
        : typeof avatarUrl === "object" && "uri" in avatarUrl
          ? typeof avatarUrl.uri === "string" && avatarUrl.uri.trim().length > 0
          : true)
  );

  const imageSource = hasAvatar
    ? typeof avatarUrl === "string"
      ? { uri: avatarUrl.trim() }
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
          <Avatar alt={`${userName}'s avatar`} className="size-16 border-2 border-white">
            {hasAvatar ? (
              <>
                <AvatarImage source={imageSource} />
                <AvatarFallback className="border-2 border-white">
                  <Image
                    source={DEFAULT_AVATAR}
                    className="size-full "
                    resizeMode="cover"
                  />
                </AvatarFallback>
              </>
            ) : (
              <Image
                source={DEFAULT_AVATAR}
                className="size-full"
                resizeMode="cover"
              />
            )}
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
              Streak Harian ({effectiveStreak} Hari)
            </Text>
            <Pressable onPress={handleOpenStreakSheet} hitSlop={8}>
              <Text className="font-poppins text-neutral-700 text-sm">
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
        currentStreak={effectiveStreak}
        maxStreak={effectiveMaxStreak}
      />
    </>
  );
}
