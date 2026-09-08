import ReflectionAccordionItem, {
  ReflectionDayRecord,
} from "@/components/progress/reflection-accordion-item";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);

export default function ReflectionHistoryScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { reflections, summary, isLoadingReflections, fetchReflections } = useProgressStore();

  const [openDays, setOpenDays] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (token) {
      void fetchReflections(token);
    }
  }, [token, fetchReflections]);

  // Default open the latest completed reflection day
  useEffect(() => {
    if (reflections && reflections.length > 0) {
      const latestDay = Math.max(...reflections.map((r) => r.dayNumber));
      setOpenDays({ [latestDay]: true });
    } else {
      setOpenDays({ 1: true });
    }
  }, [reflections]);

  const toggleDay = (day: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const totalWeeks = Math.max(1, summary?.currentWeek ?? 1);

  // Group days by week
  const weeksData = useMemo(() => {
    const weeks: Array<{ weekNumber: number; days: ReflectionDayRecord[] }> = [];

    for (let w = 1; w <= totalWeeks; w++) {
      const days: ReflectionDayRecord[] = [];
      const startDay = (w - 1) * 7 + 1;
      const endDay = w * 7;

      for (let dayNum = startDay; dayNum <= endDay; dayNum++) {
        const found = reflections.find((r) => r.dayNumber === dayNum);
        days.push({
          dayNumber: dayNum,
          label: `Hari Ke ${dayNum}`,
          note: found?.note ? `“${found.note.trim()}”` : null,
        });
      }

      weeks.push({ weekNumber: w, days });
    }

    return weeks;
  }, [totalWeeks, reflections]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]}
      >
        {/* Navigation Header */}
        <View className="relative flex-row items-center justify-center px-6 pt-3 pb-4">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-6 p-2 z-10 active:opacity-60"
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
          >
            <CaretLeftIcon size={24} className="text-neutral-700" />
          </Pressable>

          <Text className="font-feather-bold text-2xl text-primary-300">
            Riwayat Refleksi
          </Text>
        </View>

        {isLoadingReflections && reflections.length === 0 ? (
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="small" color="#007799" />
            <Text className="font-poppins text-xs text-neutral-500 mt-2">
              Memuat riwayat refleksi...
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 120,
              paddingTop: 8,
              gap: 20,
            }}
          >
            {weeksData.map((weekItem) => (
              <View key={weekItem.weekNumber}>
                {/* Section: Minggu Ke X */}
                <Text className="font-poppins-bold text-lg text-primary-300 mb-2">
                  Minggu Ke {weekItem.weekNumber}
                </Text>

                {/* Accordion List */}
                <View>
                  {weekItem.days.map((item) => (
                    <ReflectionAccordionItem
                      key={item.dayNumber}
                      item={item}
                      isOpen={Boolean(openDays[item.dayNumber])}
                      onToggle={() => toggleDay(item.dayNumber)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}
