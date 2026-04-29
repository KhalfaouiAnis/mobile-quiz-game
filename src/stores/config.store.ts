import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CONFIGURATION_STORAGE_KEY } from "@/src/constants";
import { ThemeType } from "@/src/types/index.types";
import { zustandMMKVStorage } from "./storage";

interface ConfigState {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      theme: "system",
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },
      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: CONFIGURATION_STORAGE_KEY,
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);

export const configStore = useConfigStore;

export default useConfigStore;
