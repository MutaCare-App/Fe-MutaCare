import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { FireIcon } from "phosphor-react-native/src/icons/Fire";
import { HandWavingIcon } from "phosphor-react-native/src/icons/HandWaving";
import { Image, Pressable, View } from "react-native";

iconWithClassName(HandWavingIcon);
iconWithClassName(FireIcon);

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

export function DashboardHeader({
  userName = "Lee Chaeryeong",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
}: {
  userName?: string;
  avatarUrl?: string;
}) {
  return (
    <View className="bg-[#9DCCA4] pt-4 pb-5 px-5 rounded-b-[32px]">
      {/* Profil & Salam */}
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: avatarUrl }}
          className="w-13 h-13 rounded-full border-2 border-white"
        />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <HandWavingIcon size={18} weight="fill" className="text-amber-400" />
            <Text className="font-poppins-medium text-neutral-800 text-sm">
              Selamat Pagi,
            </Text>
          </View>
          <Text className="font-poppins-bold text-neutral-800 text-xl leading-6">
            {userName}
          </Text>
        </View>
      </View>

      {/* Streak Harian Section */}
      <View className="mt-4">
        <View className="flex-row justify-between items-center mb-2.5">
          <Text className="font-poppins-semibold text-neutral-800 text-xs">
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
