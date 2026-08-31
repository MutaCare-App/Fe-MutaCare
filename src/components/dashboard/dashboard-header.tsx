import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { FireIcon } from "phosphor-react-native/src/icons/Fire";
import { HandWavingIcon } from "phosphor-react-native/src/icons/HandWaving";
import { ImageSourcePropType, Pressable, View } from "react-native";

iconWithClassName(HandWavingIcon);
iconWithClassName(FireIcon);

const DEFAULT_AVATAR = require("../../../assets/images/dummy-profile.png");

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
}

export function DashboardHeader({
  userName = "Lee Chaeryeong",
  avatarUrl,
}: DashboardHeaderProps) {
  const imageSource = avatarUrl
    ? typeof avatarUrl === "string"
      ? { uri: avatarUrl }
      : avatarUrl
    : DEFAULT_AVATAR;

  return (
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
            <HandWavingIcon size={20} weight="fill" className="text-brand-accent"/>
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
            Streak Harian
          </Text>
          <Pressable hitSlop={8}>
            <Text className="font-poppins text-neutral-700 text-[11px]">
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
              <FireIcon
                size={20}
                weight={item.active ? "fill" : "regular"}
                className={item.active ? "text-orange-500" : "text-neutral-300"}
              />
              <Text className="font-poppins text-[10px] text-neutral-600 mt-1">
                {item.day}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
