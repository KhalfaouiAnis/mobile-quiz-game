import useConfigStore from "@/src/stores/config.store";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

export const useNavigationTheme = () => {
  const storeTheme = useConfigStore((state) => state.theme);
  const systemTheme = useColorScheme();

  const navigationTheme = useMemo(() => {
    const isDark =
      storeTheme === "system" ? systemTheme === "dark" : storeTheme === "dark";
    const theme = isDark ? DarkTheme : DefaultTheme;

    return {
      ...theme,
      dark: isDark,
      colors: {
        ...theme.colors,
        background: isDark ? "black" : "white",
      },
    };
  }, [storeTheme, systemTheme]);

  return navigationTheme;
};
