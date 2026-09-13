import { ResultFooter } from "@/components/assessment/result-footer";
import { ResultHeader } from "@/components/assessment/result-header";
import { ResultSummaryGrid } from "@/components/assessment/result-summary-grid";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AssessmentResult() {
  const router = useRouter();
  const result = useAssessmentStore((state) => state.result);

  const anxietyLevelLabel = result?.anxietyLevel || "Kecemasan Sedang";
  const practices = result?.practices && result.practices.length > 0
    ? result.practices.map((p) => `• ${p}`)
    : ["• Berbicara dengan Guru", "• Teman Baru"];
  const target = result?.target || "Lebih Percaya Diri Saat Berbicara";
  const recommendations = result?.recommendations && result.recommendations.length > 0
    ? result.recommendations.map((r, i) => `${i + 1}. ${r}`)
    : ["1. Relaksasi Pernapasan", "2. Graded Exposure", "3. Restrukturisasi CBT"];
  const subtitleText = "Terima Kasih Telah Menyelesaikan Asesmen. Kami Telah Menyiapkan Perjalanan Terapi Yang Sesuai Untukmu.";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
        className="px-6 flex-1 justify-between pb-6 pt-2"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
          <View>
            <ResultHeader
              title="Asesmen Selesai!"
              subtitle={subtitleText}
            />

            <View className="mt-4">
              <ResultSummaryGrid
                anxietyLevel={anxietyLevelLabel}
                practices={practices}
                target={target}
                recommendations={recommendations}
              />
            </View>
          </View>

          <View className="pt-6">
            <ResultFooter onPress={() => router.replace("/dashboard")} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
