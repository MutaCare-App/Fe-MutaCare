import { AssessmentHeader } from "@/components/assessment/assessment-header";
import { AssessmentOptionsList } from "@/components/assessment/assessment-options-list";
import { AssessmentQuestionHeader } from "@/components/assessment/assessment-question-header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAssessment } from "@/hooks/useAssessment";
import { cn } from "@/lib/utils";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AssessmentQuestions() {
  const {
    currentQ,
    currentSelections,
    progressValue,
    isCurrentAnswered,
    handleSelectOption,
    handleNext,
    handleBack,
  } = useAssessment();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
        className="px-8 flex justify-between pb-6"
      >
        {/* Header: Back Button, Stage Title & Progress Bar */}
        <AssessmentHeader
          stageLabel={currentQ.stageLabel}
          progressValue={progressValue}
          onBack={handleBack}
        />

        {/* Content Question & Options */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="w-full my-4"
        >
          <AssessmentQuestionHeader
            title={currentQ.title}
            subtitle={currentQ.subtitle}
          />

          <AssessmentOptionsList
            options={currentQ.options}
            type={currentQ.type}
            selectedSelections={currentSelections}
            onSelectOption={handleSelectOption}
          />
        </ScrollView>

        {/* Bottom Button (Disabled jika belum diisi) */}
        <View className="w-full pt-2">
          <Button
            onPress={handleNext}
            disabled={!isCurrentAnswered}
            className={cn(
              "bg-primary-300 w-full h-14 rounded-xl justify-center items-center active:bg-primary-400",
              !isCurrentAnswered && "opacity-40"
            )}
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


