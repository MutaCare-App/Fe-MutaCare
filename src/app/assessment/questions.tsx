import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native/src/icons/CaretLeft";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Daftarkan icon ke NativeWind
iconWithClassName(CaretLeftIcon);
iconWithClassName(CheckIcon);

interface QuestionItem {
  id: number;
  stage: number;
  stageLabel: string;
  stageStep: number;
  stageTotalSteps: number;
  title: string;
  subtitle?: string;
  type: "checkbox" | "radio";
  maxSelect?: number;
  options: string[];
  buttonText: string;
}

const ASSESSMENT_QUESTIONS: QuestionItem[] = [
  // --- TAHAP 1 ---
  {
    id: 1,
    stage: 1,
    stageLabel: "Tahap 1 Dari 3",
    stageStep: 1,
    stageTotalSteps: 3,
    title: "Dalam Situasi Apa Kamu Paling Sulit Berbicara?",
    subtitle: "(Pilih Semua Yang Sesuai)",
    type: "checkbox",
    options: [
      "Dengan Guru",
      "Dengan Teman Baru",
      "Dengan Orang Yang Belum Dikenal",
      "Di Depan Kelas",
      "Di Tempat Umum",
      "Situasi Lainnya",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 2,
    stage: 1,
    stageLabel: "Tahap 1 Dari 3",
    stageStep: 2,
    stageTotalSteps: 3,
    title: "Dengan Siapa Kamu Merasa Paling Nyaman Berbicara?",
    type: "radio",
    options: [
      "Orang Tua",
      "Saudara",
      "Teman Dekat",
      "Guru",
      "Orang Lain",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 3,
    stage: 1,
    stageLabel: "Tahap 1 Dari 3",
    stageStep: 3,
    stageTotalSteps: 3,
    title: "Seberapa Sering Kamu Mengalami Kesulitan Berbicara?",
    type: "radio",
    options: [
      "Tidak Pernah",
      "Jarang",
      "Kadang-Kadang",
      "Sering",
      "Selalu",
    ],
    buttonText: "Lanjut Tahap Berikutnya",
  },

  // --- TAHAP 2 ---
  {
    id: 4,
    stage: 2,
    stageLabel: "Tahap 2 Dari 3",
    stageStep: 1,
    stageTotalSteps: 3,
    title: "Seberapa Cemas Kamu Ketika Harus Berbicara?",
    type: "radio",
    options: [
      "Sangat Tidak Cemas",
      "Tidak Cemas",
      "Cukup Cemas",
      "Cemas",
      "Sangat Cemas",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 5,
    stage: 2,
    stageLabel: "Tahap 2 Dari 3",
    stageStep: 2,
    stageTotalSteps: 3,
    title: "Apa Yang Biasanya Kamu Rasakan Ketika Ingin Berbicara?",
    subtitle: "(Pilih Semua Yang Sesuai)",
    type: "checkbox",
    options: [
      "Jantung Berdebar",
      "Berkeringat",
      "Tangan Gemetar",
      "Sulit Mengeluarkan Suara",
      "Takut Melakukan Kesalahan",
      "Ingin Menghindari Situasi Tersebut",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 6,
    stage: 2,
    stageLabel: "Tahap 2 Dari 3",
    stageStep: 3,
    stageTotalSteps: 3,
    title: "Apa Yang Biasanya Kamu Lakukan Saat Merasa Cemas?",
    type: "radio",
    options: [
      "Tetap Mencoba Berbicara",
      "Berbicara Pelan",
      "Mengangguk Atau Menggeleng",
      "Diam",
      "Pergi Dari Situasi Tersebut",
    ],
    buttonText: "Lanjut Tahap Berikutnya",
  },

  // --- TAHAP 3 ---
  {
    id: 7,
    stage: 3,
    stageLabel: "Tahap 3 Dari 3",
    stageStep: 1,
    stageTotalSteps: 3,
    title: "Apa Tujuan Yang Ingin Kamu Capai?",
    subtitle: "(Pilih Maksimal 3)",
    type: "checkbox",
    maxSelect: 3,
    options: [
      "Berani Menyapa Orang Lain",
      "Berani Berbicara Dengan Teman",
      "Berani Menjawab Guru",
      "Berani Berbicara Di Depan Kelas",
      "Lebih Percaya Diri Saat Berbicara",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 8,
    stage: 3,
    stageLabel: "Tahap 3 Dari 3",
    stageStep: 2,
    stageTotalSteps: 3,
    title: "Berapa Lama Kamu Ingin Berlatih Setiap Hari?",
    type: "radio",
    options: [
      "5 Menit",
      "10 Menit",
      "15 Menit",
      "20 Menit",
      "30 Menit",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 9,
    stage: 3,
    stageLabel: "Tahap 3 Dari 3",
    stageStep: 3,
    stageTotalSteps: 3,
    title: "Kapan Kamu Ingin Menerima Pengingat Latihan?",
    type: "radio",
    options: [
      "Pagi",
      "Siang",
      "Sore",
      "Malam",
    ],
    buttonText: "Simpan Asesmen",
  },
];

export default function AssessmentQuestions() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const currentSelections = selectedAnswers[currentQ.id] || [];

  const handleSelectOption = (option: string) => {
    if (currentQ.type === "radio") {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: [option],
      }));
    } else {
      // Checkbox
      const isSelected = currentSelections.includes(option);
      if (isSelected) {
        setSelectedAnswers((prev) => ({
          ...prev,
          [currentQ.id]: currentSelections.filter((item) => item !== option),
        }));
      } else {
        if (currentQ.maxSelect && currentSelections.length >= currentQ.maxSelect) {
          return; // Max reached
        }
        setSelectedAnswers((prev) => ({
          ...prev,
          [currentQ.id]: [...currentSelections, option],
        }));
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Selesai asesmen -> kembali ke home / index
      router.replace("/");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  // Hitung persentase progress bar (33.3%, 66.6%, 100%)
  const progressPercent =
    currentQ.stageStep === 1 ? "33.3%" : currentQ.stageStep === 2 ? "66.6%" : "100%";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
        className="px-8 flex justify-between pb-6"
      >
        {/* Header: Back Button, Stage Title & Progress Bar */}
        <View className="w-full pt-2">
          <View className="relative flex-row items-center justify-center w-full">
            <Pressable
              onPress={handleBack}
              className="absolute left-0 p-1 active:opacity-60"
              hitSlop={8}
            >
              <CaretLeftIcon size={24} className="text-neutral-800" />
            </Pressable>

            <Text className="font-poppins-semibold text-brand-accent text-base text-center">
              {currentQ.stageLabel}
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="w-64 h-1.5 bg-neutral-200 rounded-full mx-auto mt-2 overflow-hidden">
            <View
              className="h-full bg-brand-accent rounded-full transition-all duration-300"
              style={{ width: progressPercent }}
            />
          </View>
        </View>

        {/* Content Question & Options */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="w-full my-4"
        >
          <View className="pt-4">
            <Text className="font-feather-bold text-2xl text-primary-300">
              {currentQ.title}
            </Text>
            {currentQ.subtitle && (
              <Text className="font-poppins italic text-neutral-500 text-sm mt-1">
                {currentQ.subtitle}
              </Text>
            )}
          </View>

          {/* Options List */}
          <View className="pt-6 gap-3">
            {currentQ.options.map((option, index) => {
              const isSelected = currentSelections.includes(option);

              return (
                <Pressable
                  key={index}
                  onPress={() => handleSelectOption(option)}
                  className={cn(
                    "flex-row items-center border rounded-2xl px-4 py-4 active:bg-neutral-50",
                    isSelected
                      ? "border-primary-300 bg-primary-100/20"
                      : "border-neutral-200 bg-white"
                  )}
                >
                  {/* Checkbox / Radio Indicator */}
                  {currentQ.type === "checkbox" ? (
                    <View
                      className={cn(
                        "w-5 h-5 rounded border items-center justify-center mr-3.5",
                        isSelected
                          ? "bg-primary-300 border-primary-300"
                          : "border-neutral-300 bg-white"
                      )}
                    >
                      {isSelected && (
                        <CheckIcon size={14} color="#fff" weight="bold" />
                      )}
                    </View>
                  ) : (
                    <View
                      className={cn(
                        "w-5 h-5 rounded-full border items-center justify-center mr-3.5",
                        isSelected
                          ? "border-primary-300"
                          : "border-neutral-300"
                      )}
                    >
                      {isSelected && (
                        <View className="w-2.5 h-2.5 rounded-full bg-primary-300" />
                      )}
                    </View>
                  )}

                  <Text
                    className={cn(
                      "font-poppins text-base flex-1",
                      isSelected ? "text-primary-400 font-poppins-medium" : "text-neutral-700"
                    )}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View className="w-full pt-2">
          <Button
            onPress={handleNext}
            className="bg-primary-300 w-full h-14 rounded-xl justify-center items-center active:bg-primary-400"
          >
            <Text className="text-white font-poppins-semibold text-lg">
              {currentQ.buttonText}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
