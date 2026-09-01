import { CbtChoiceScreen } from "@/components/cbt/cbt-choice-screen";
import { useCbtStore } from "@/store/useCbtStore";
import { useRouter } from "expo-router";

const OPTIONS = ["Pernah", "Belum"];

export default function CbtPastSuccessScreen() {
  const router = useRouter();
  const pastSuccess = useCbtStore((state) => state.pastSuccess);
  const setPastSuccess = useCbtStore((state) => state.setPastSuccess);

  return (
    <CbtChoiceScreen
      onBack={() => router.back()}
      onNext={() => {
        if (pastSuccess) router.push("/cbt/outcome");
      }}
      onSelect={setPastSuccess}
      options={OPTIONS}
      progress={40}
      title="Apakah Sebelumnya Kamu Pernah Berhasil Berbicara Meskipun Gugup?"
      value={pastSuccess}
    />
  );
}
