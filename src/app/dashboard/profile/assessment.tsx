import { AssessmentCard } from "@/components/profile/assessment-card";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { BarbellIcon } from "phosphor-react-native/src/icons/Barbell";
import { BrainIcon } from "phosphor-react-native/src/icons/Brain";
import { PlantIcon } from "phosphor-react-native/src/icons/Plant";
import { TargetIcon } from "phosphor-react-native/src/icons/Target";
import { Image, View } from "react-native";

[BarbellIcon, BrainIcon, PlantIcon, TargetIcon].forEach(iconWithClassName);

const ANXIETY_IMAGES = {
  mild: require("../../../../assets/images/anxiety-level/low.png"),
  moderate: require("../../../../assets/images/anxiety-level/moderate.png"),
  severe: require("../../../../assets/images/anxiety-level/high.png"),
};

const ANXIETY_LABELS = {
  mild: "Rendah",
  moderate: "Sedang",
  severe: "Tinggi",
};

export default function ProfileAssessmentScreen() {
  const result = useAssessmentStore((state) => state.result);
  const severity = result?.mutismSeverity || "moderate";
  const practices = result?.practices?.length
    ? result.practices
    : ["Berbicara Dengan Guru", "Berbicara Dengan Teman Baru"];
  const target = result?.target || "Lebih Percaya Diri Saat Berbicara";
  const recommendations = result?.recommendations?.length
    ? result.recommendations
    : ["Relaksasi", "CBT", "Relaksasi"];

  return (
    <ProfileShell showBack title="Hasil Asesmen Awal">
      <View className="mt-5 gap-3">
        <View className="flex-row items-stretch gap-2.5">
          <AssessmentCard
            icon={<BrainIcon className="text-primary-300" size={13} weight="fill" />}
            title="Tingkat Kecemasan"
          >
            <View className="flex-1 items-center justify-center">
              <Image className="size-10" resizeMode="contain" source={ANXIETY_IMAGES[severity]} />
              <Text className="font-poppins-semibold text-[10px] text-neutral-700">
                {ANXIETY_LABELS[severity]}
              </Text>
            </View>
          </AssessmentCard>

          <AssessmentCard
            icon={<BarbellIcon className="text-primary-300" size={13} weight="fill" />}
            title="Situasi Yang Perlu Dilatih"
          >
            <View className="flex-1 justify-center gap-1">
              {practices.slice(0, 3).map((practice) => (
                <Text key={practice} className="font-poppins text-[8px] leading-3 text-neutral-700">
                  • {practice}
                </Text>
              ))}
            </View>
          </AssessmentCard>
        </View>

        <View className="flex-row items-stretch gap-2.5">
          <AssessmentCard
            icon={<TargetIcon className="text-primary-300" size={13} weight="fill" />}
            title="Target Utama"
          >
            <View className="flex-1 items-center justify-center px-1">
              <Text className="text-center font-poppins-semibold text-[10px] leading-4 text-neutral-700">
                {target}
              </Text>
            </View>
          </AssessmentCard>

          <AssessmentCard
            icon={<PlantIcon className="text-primary-300" size={13} weight="fill" />}
            title="Rekomendasi Terapi"
          >
            <View className="flex-1 justify-center">
              {recommendations.slice(0, 3).map((recommendation, index) => (
                <Text key={`${recommendation}-${index}`} className="font-poppins text-[8px] leading-3 text-neutral-700">
                  {index + 1}. {recommendation}
                </Text>
              ))}
            </View>
          </AssessmentCard>
        </View>
      </View>
    </ProfileShell>
  );
}
