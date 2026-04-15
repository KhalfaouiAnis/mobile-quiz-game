import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { useMemo } from "react";

export const useNavigationTheme = () => {
  const { colorScheme } = useColorScheme();

  const navigationTheme = useMemo(() => {
    const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: colorScheme === "dark" ? "black" : "white",
      },
    };
  }, [colorScheme]);

  return navigationTheme;
};
