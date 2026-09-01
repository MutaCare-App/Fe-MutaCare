import { ResultSummaryGrid } from "@/components/assessment/result-summary-grid";
import { ProfileShell } from "@/components/profile/profile-shell";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import React from "react";
import { View } from "react-native";

const ANXIETY_IMAGES: Record<string, any> = {
  rendah: require("../../../../assets/images/anxiety-level/low.png"),
  sedang: require("../../../../assets/images/anxiety-level/moderate.png"),
  tinggi: require("../../../../assets/images/anxiety-level/high.png"),
  mild: require("../../../../assets/images/anxiety-level/low.png"),
  moderate: require("../../../../assets/images/anxiety-level/moderate.png"),
  severe: require("../../../../assets/images/anxiety-level/high.png"),
};

export default function ProfileAssessmentScreen() {
  const result = useAssessmentStore((state) => state.result);

  const anxietyLevelLabel = result?.anxietyLevel || "Kecemasan Sedang";
  const rawSeverity = String(result?.mutismSeverity || "moderate").toLowerCase();
  const anxietyImageSource =
    ANXIETY_IMAGES[rawSeverity] ||
    require("../../../../assets/images/anxiety-level/moderate.png");

  const practices =
    result?.practices && result.practices.length > 0
      ? result.practices.map((p) => (p.startsWith("•") ? p : `• ${p}`))
      : ["• Berbicara dengan Guru", "• Teman Baru"];

  const target = result?.target || "Lebih Percaya Diri Saat Berbicara";

  const recommendations =
    result?.recommendations && result.recommendations.length > 0
      ? result.recommendations.map((r, i) =>
          /^\d+\./.test(r) ? r : `${i + 1}. ${r}`
        )
      : [
          "1. Relaksasi Pernapasan",
          "2. Graded Exposure",
          "3. Restrukturisasi CBT",
        ];

  return (
    <ProfileShell showBack title="Hasil Asesmen Awal">
      <View className="mt-5">
        <ResultSummaryGrid
          anxietyLevel={anxietyLevelLabel}
          anxietyImageSource={anxietyImageSource}
          practices={practices}
          target={target}
          recommendations={recommendations}
        />
      </View>
    </ProfileShell>
  );
}
