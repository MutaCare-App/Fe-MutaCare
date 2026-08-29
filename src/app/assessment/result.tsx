import { ResultFooter } from "@/components/assessment/result-footer";
import { ResultHeader } from "@/components/assessment/result-header";
import { ResultSummaryGrid } from "@/components/assessment/result-summary-grid";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AssessmentResult() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
        className="px-6 flex-1 justify-between pb-6 pt-2"
      >
        {/* Ilustrasi & Judul */}
        <ResultHeader />

        {/* Section Ringkasan & 4 Cards */}
        <ResultSummaryGrid />

        {/* Tombol Aksi Bawah */}
        <ResultFooter onPress={() => router.replace("/")} />
      </SafeAreaView>
    </View>
  );
}
