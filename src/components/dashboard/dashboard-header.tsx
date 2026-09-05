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

const STREAK_DAYS: DayStreak[] = [
  { day: "Sen", active: true },
  { day: "Sel", active: true },
  { day: "Rab", active: true },
  { day: "Kam", active: true },
  { day: "Jum", active: true },
  { day: "Sab", active: false },
  { day: "Min", active: false },
];

interface DashboardHeaderProps {
  userName?: string;
  avatarUrl?: string | ImageSourcePropType;
  currentStreak?: number;
  maxStreak?: number;
}

export function DashboardHeader({
  userName = "Username",
  avatarUrl,
  currentStreak = 5,
  maxStreak = 10,
}: DashboardHeaderProps) {
  const streakSheetRef = useRef<BottomSheetModal>(null);

  const hasAvatar =
    typeof avatarUrl === "string" ? avatarUrl.trim().length > 0 : Boolean(avatarUrl);

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
                <AvatarImage
                  source={
                    typeof avatarUrl === "string"
                      ? { uri: avatarUrl.trim() }
                      : avatarUrl!
                    
                  }
                />
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
            <Text className="font-poppins-semibold text-neutral-700 text-base">
              Streak Harian
            </Text>
            <Pressable onPress={handleOpenStreakSheet} hitSlop={8}>
              <Text className="font-poppins text-neutral-700 text-sm">
                Lihat Streak
              </Text>
            </Pressable>
          </View>

          {/* 7 Hari Streak Pills */}
          <View className="flex-row justify-between items-center">
            {STREAK_DAYS.map((item, index) => (
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
