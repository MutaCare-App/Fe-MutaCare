import { create } from "zustand";
import { ImageSourcePropType } from "react-native";

export interface MoodItem {
  id: number;
  label: string;
  image: ImageSourcePropType;
}

export const MOODS: MoodItem[] = [
  {
    id: 1,
    label: "Sangat Buruk",
    image: require("../../assets/images/anxiety-level/very-high.png"),
  },
  {
    id: 2,
    label: "Buruk",
    image: require("../../assets/images/anxiety-level/high.png"),
  },
  {
    id: 3,
    label: "Normal",
    image: require("../../assets/images/anxiety-level/moderate.png"),
  },
  {
    id: 4,
    label: "Baik",
    image: require("../../assets/images/anxiety-level/low.png"),
  },
  {
    id: 5,
    label: "Sangat Baik",
    image: require("../../assets/images/anxiety-level/very-low.png"),
  },
];

interface MoodState {
  selectedMood: MoodItem | null;
  isEditing: boolean;
  setMood: (mood: MoodItem) => void;
  setIsEditing: (isEditing: boolean) => void;
  resetMood: () => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  selectedMood: null,
  isEditing: false,
  setMood: (mood: MoodItem) => set({ selectedMood: mood, isEditing: false }),
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  resetMood: () => set({ selectedMood: null, isEditing: false }),
}));
