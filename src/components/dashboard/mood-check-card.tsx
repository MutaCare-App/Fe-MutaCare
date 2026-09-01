import { MoodItem, useMoodStore } from "@/store/useMoodStore";
import { MoodCheckResult } from "./mood-check/mood-check-result";
import { MoodCheckSelection } from "./mood-check/mood-check-selection";

export function MoodCheckCard({
  onSelectMood,
}: {
  onSelectMood?: (mood: MoodItem) => void;
}) {
  const { selectedMood, setMood } = useMoodStore();

  const handleSelectMood = (mood: MoodItem) => {
    setMood(mood);
    onSelectMood?.(mood);
  };

  // State 2: Hasil Mood (jika sudah memilih mood hari ini)
  if (selectedMood) {
    return (
      <MoodCheckResult
        selectedMood={selectedMood}
        onSelectMood={handleSelectMood}
      />
    );
  }

  // State 1: Pemilihan Mood Awal (5 opsi)
  return (
    <MoodCheckSelection
      selectedMood={selectedMood}
      onSelectMood={handleSelectMood}
    />
  );
}
