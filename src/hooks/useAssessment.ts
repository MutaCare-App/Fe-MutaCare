import { ASSESSMENT_QUESTIONS, QuestionItem } from "@/data/assessment";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useAssessment() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});

  const currentQ: QuestionItem = ASSESSMENT_QUESTIONS[currentIndex];
  const currentSelections: string[] = selectedAnswers[currentQ.id] || [];

  // Wajib diisi (Required): minimal 1 pilihan terpilih
  const isCurrentAnswered = currentSelections.length > 0;

  // Hitung persentase nilai progress (33.3%, 66.6%, 100%)
  const progressValue = (currentQ.stageStep / currentQ.stageTotalSteps) * 100;

  const handleSelectOption = (option: string) => {
    if (currentQ.type === "radio") {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: [option],
      }));
    } else {
      const isSelected = currentSelections.includes(option);
      if (isSelected) {
        setSelectedAnswers((prev) => ({
          ...prev,
          [currentQ.id]: currentSelections.filter((item) => item !== option),
        }));
      } else {
        if (currentQ.maxSelect && currentSelections.length >= currentQ.maxSelect) {
          return;
        }
        setSelectedAnswers((prev) => ({
          ...prev,
          [currentQ.id]: [...currentSelections, option],
        }));
      }
    }
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return; // Wajib diisi

    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Selesai asesmen -> arahkan ke halaman hasil
      router.replace("/assessment/result");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  return {
    currentIndex,
    totalQuestions: ASSESSMENT_QUESTIONS.length,
    currentQ,
    currentSelections,
    selectedAnswers,
    progressValue,
    isCurrentAnswered,
    handleSelectOption,
    handleNext,
    handleBack,
  };
}

