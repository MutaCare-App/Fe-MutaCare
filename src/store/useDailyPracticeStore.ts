import { create } from "zustand";

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
}

interface DailyPracticeState {
  week: number;
  day: number;
  tasks: DailyTask[];
  isFinished: boolean;
  setWeekAndDay: (week: number, day: number) => void;
  toggleTask: (id: string) => void;
  setTaskCompleted: (id: string, completed: boolean) => void;
  completeAllTasks: () => void;
  resetTasks: () => void;
}

export const useDailyPracticeStore = create<DailyPracticeState>((set) => ({
  week: 1,
  day: 6,
  tasks: [
    { id: "relaksasi", title: "Relaksasi", completed: false },
    { id: "cbt", title: "CBT", completed: false },
    { id: "refleksi", title: "Refleksi", completed: false },
  ],
  isFinished: false,

  setWeekAndDay: (week, day) => set({ week, day }),

  toggleTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      const isFinished = newTasks.every((t) => t.completed);
      return { tasks: newTasks, isFinished };
    }),

  setTaskCompleted: (id, completed) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      );
      const isFinished = newTasks.every((t) => t.completed);
      return { tasks: newTasks, isFinished };
    }),

  completeAllTasks: () =>
    set((state) => ({
      tasks: state.tasks.map((t) => ({ ...t, completed: true })),
      isFinished: true,
    })),

  resetTasks: () =>
    set({
      tasks: [
        { id: "relaksasi", title: "Relaksasi", completed: false },
        { id: "cbt", title: "CBT", completed: false },
        { id: "refleksi", title: "Refleksi", completed: false },
      ],
      isFinished: false,
    }),
}));
