import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function useAssessment() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const {
    questions,
    currentIndex,
    selectedAnswers,
    isLoading,
    isSubmitting,
    error,
    fetchQuestions,
    selectOption,
    nextQuestion,
    prevQuestion,
    submitAssessment,
  } = useAssessmentStore();

  useEffect(() => {
    fetchQuestions(token);
  }, [token]);

  const currentQ = questions[currentIndex] || questions[0];
  const currentSelections: string[] = selectedAnswers[currentQ?.id] || [];
  const isCurrentAnswered = currentSelections.length > 0;

  // Calculate real progress (e.g. 8.3%, 16.6% ... 100%)
  const progressValue = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleSelectOption = (option: string) => {
    if (!currentQ) return;
    selectOption(currentQ.id, option, currentQ.type, currentQ.maxSelect);
  };

  const handleNext = async () => {
    if (!isCurrentAnswered || isSubmitting) return;

    const isLastQuestion = nextQuestion();

    if (isLastQuestion) {
      // Submit assessment answers payload to backend
      const resultData = await submitAssessment(token);
      if (resultData || !error) {
        router.replace("/assessment/result");
      }
    }
  };

  const handleBack = () => {
    const didGoBack = prevQuestion();
    if (!didGoBack) {
      router.back();
    }
  };

  return {
    currentIndex,
    totalQuestions: questions.length,
    currentQ,
    currentSelections,
    selectedAnswers,
    progressValue,
    isCurrentAnswered,
    isLoading,
    isSubmitting,
    error,
    handleSelectOption,
    handleNext,
    handleBack,
  };
}
