import { ClassValue, clsx } from "clsx";
import { StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function boxShadow(
  offsetX: number = 0,
  offsetY: number = 4,
  blurRadius: number = 4,
  spreadDistance: number = 0,
  color: string = "rgba(000 000 000 / 0.25)"
) {
  return StyleSheet.create({
    button: {
      boxShadow: [
        {
          offsetX,
          offsetY,
          blurRadius,
          spreadDistance,
          color,
        },
      ],
    },
  });
}
