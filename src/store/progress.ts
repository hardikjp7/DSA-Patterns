import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completed: Record<string, boolean>;
  bookmarked: Record<string, boolean>;
  lastVisited: string | null;
  toggleComplete: (patternId: string) => void;
  toggleBookmark: (patternId: string) => void;
  setLastVisited: (patternId: string) => void;
  getCompletedCount: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      bookmarked: {},
      lastVisited: null,
      toggleComplete: (patternId) =>
        set((state) => ({
          completed: {
            ...state.completed,
            [patternId]: !state.completed[patternId],
          },
        })),
      toggleBookmark: (patternId) =>
        set((state) => ({
          bookmarked: {
            ...state.bookmarked,
            [patternId]: !state.bookmarked[patternId],
          },
        })),
      setLastVisited: (patternId) => set({ lastVisited: patternId }),
      getCompletedCount: () => Object.values(get().completed).filter(Boolean).length,
    }),
    { name: "dsa-progress" }
  )
);
