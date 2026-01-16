import { create } from "zustand";

interface AppState {
  selectedCategoryId: number | undefined;
  setCategoryId: (id: number | undefined) => void;
}

export const useGameOneCategoryStore = create<AppState>((set) => ({
  selectedCategoryId: undefined,
  setCategoryId: (id) => {
    set({ selectedCategoryId: id });
  },
}));
