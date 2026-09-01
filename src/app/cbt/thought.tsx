import { CbtChoiceScreen } from "@/components/cbt/cbt-choice-screen";
import { useCbtStore } from "@/store/useCbtStore";
import { useRouter } from "expo-router";

const OPTIONS = [
  "Aku Takut Salah Bicara",
  "Guru Akan Marah",
  "Semua Orang Melihatku",
  "Aku Gugup Tapi Ingin Mencoba",
];

export default function CbtThoughtScreen() {
  const router = useRouter();
  const thought = useCbtStore((state) => state.thought);
  const setThought = useCbtStore((state) => state.setThought);

  return (
    <CbtChoiceScreen
      onBack={() => router.back()}
      onNext={() => {
        if (thought) router.push("/cbt/past-success");
      }}
      onSelect={setThought}
      options={OPTIONS}
      progress={20}
      title="Apa Yang Pertama Kali Terlintas Di Pikiranmu?"
      value={thought}
    />
  );
}
