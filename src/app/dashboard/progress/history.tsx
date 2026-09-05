import ReflectionAccordionItem, {
  ReflectionDayRecord,
} from "@/components/progress/reflection-accordion-item";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useReflectionStore } from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(CaretLeftIcon);

export default function ReflectionHistoryScreen() {
  const router = useRouter();
  const reflectionNote = useReflectionStore((state) => state.note);

  // Day 5 is open by default as shown in the design mockup
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({
    5: true,
  });

  const toggleDay = (day: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const day5Note = reflectionNote?.trim()
    ? `“${reflectionNote.trim()}”`
    : "“Aku Berhasil Menjawab Guru Hari Ini”";

  const reflectionHistory: ReflectionDayRecord[] = [
    { dayNumber: 1, label: "Hari Ke 1", note: "“Hari ini aku mulai belajar teknik pernapasan dan merasa lebih tenang.”" },
    { dayNumber: 2, label: "Hari Ke 2", note: "“Aku mencoba tersenyum kepada teman sebangku saat jam istirahat.”" },
    { dayNumber: 3, label: "Hari Ke 3", note: "“Berhasil mengucapkan salam kepada satpam sekolah di pagi hari.”" },
    { dayNumber: 4, label: "Hari Ke 4", note: "“Mampu berbisik pelan ke teman saat berdiskusi kelompok.”" },
    { dayNumber: 5, label: "Hari Ke 5", note: day5Note },
    { dayNumber: 6, label: "Hari Ke 6", note: "“Menulis pertanyaan di kertas dan memberikannya ke guru.”" },
    { dayNumber: 7, label: "Hari Ke 7", note: "“Melakukan refleksi mingguan dan merasa bangga pada diri sendiri.”" },
  ];

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 120,
            paddingTop: 8,
          }}
        >
          {/* Section: Minggu Ke 1 */}
          <Text className="font-poppins-bold text-lg text-primary-300 mb-2">
            Minggu Ke 1
          </Text>

          {/* Accordion List */}
          <View>
            {reflectionHistory.map((item) => (
              <ReflectionAccordionItem
                key={item.dayNumber}
                item={item}
                isOpen={Boolean(openDays[item.dayNumber])}
                onToggle={() => toggleDay(item.dayNumber)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
