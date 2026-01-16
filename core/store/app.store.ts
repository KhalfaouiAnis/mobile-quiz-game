import { create } from "zustand";
import * as Font from "expo-font";
import {
  BagelFatOne_Regular,
  Cairo_Bold,
  Cairo_Medium,
  Cairo_Regular,
  Cairo_SemiBold,
} from "@/assets/fonts";

interface AppState {
  fontsLoaded: boolean;
  loadFonts: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  fontsLoaded: false,
  loadFonts: async () => {
    try {
      const fontPromise = Font.loadAsync({
        BagelRegular: BagelFatOne_Regular,
        CairoRegular: Cairo_Regular,
        CairoMedium: Cairo_Medium,
        CairoSemiBold: Cairo_SemiBold,
        CairoBold: Cairo_Bold,
      });

      await fontPromise;
    } catch (e) {
      console.error("Failed to load fonts", e);
    } finally {
      set({ fontsLoaded: true });
    }
  },
}));
