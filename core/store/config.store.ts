import { CONFIGURATION_STORAGE_KEY } from "@/core/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface ConfigState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },
      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: CONFIGURATION_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

export default useConfigStore;
