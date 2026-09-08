import { MoodService } from "@/services/moodService";
import { useAuthStore } from "@/store/useAuthStore";
import { useDailyPracticeStore } from "@/store/useDailyPracticeStore";
import { useJourneyStore } from "@/store/useJourneyStore";
import { MoodItem, useMoodStore } from "@/store/useMoodStore";
import { MoodCheckResult } from "./mood-check/mood-check-result";
import { MoodCheckSelection } from "./mood-check/mood-check-selection";

export function MoodCheckCard({
  onSelectMood,
}: {
  onSelectMood?: (mood: MoodItem) => void;
}) {
  const { selectedMood, setMood } = useMoodStore();
  const token = useAuthStore((state) => state.token);
  const { status, fetchJourneyStatus } = useJourneyStore();
  const { tasks, isFinished } = useDailyPracticeStore();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const allTasksDone = isFinished || (totalCount > 0 && completedCount === totalCount);

  const handleSelectMood = async (mood: MoodItem) => {
    if (allTasksDone) return;
    setMood(mood);
    onSelectMood?.(mood);

    if (token) {
      try {
        await MoodService.submitMoodCheckIn(mood, token);
        await fetchJourneyStatus(token);
      } catch (err) {
        console.warn("Gagal mengirim mood check-in ke server:", err);
      }
    }
  };

  const isMoodChecked = Boolean(selectedMood || status?.isMoodCheckedToday);

  // State 2: Hasil Mood (jika sudah memilih mood hari ini)
  if (isMoodChecked && selectedMood) {
    return (
      <MoodCheckResult
        selectedMood={selectedMood}
        onSelectMood={handleSelectMood}
        isEditable={!allTasksDone}
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
