import { CbtChoiceScreen } from "@/components/cbt/cbt-choice-screen";
import { useCbtStore } from "@/store/useCbtStore";
import { useRouter } from "expo-router";

const OPTIONS = [
  "Guru Akan Marah.",
  "Guru Mungkin Tetap Mendengarkan",
  "Aku Tidak Tahu",
];

export default function CbtOutcomeScreen() {
  const router = useRouter();
  const outcome = useCbtStore((state) => state.outcome);
  const setOutcome = useCbtStore((state) => state.setOutcome);

  return (
    <CbtChoiceScreen
      onBack={() => router.back()}
      onNext={() => {
        if (outcome) router.push("/cbt/reframe");
      }}
      onSelect={setOutcome}
      options={OPTIONS}
      progress={60}
      title="Menurutmu, Apa Yang Kemungkinan Akan Terjadi?"
      value={outcome}
    />
  );
}
