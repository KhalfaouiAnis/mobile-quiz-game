import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";
import { APP_STORAGE_KEY } from "../constants";

export const mmkvStorage = createMMKV({ id: APP_STORAGE_KEY });

export function getItem<T>(key: string): T {
  const value = mmkvStorage.getString(key);
  if (value) {
    return JSON.parse(value);
  }
  return null as T;
}

export function setItem<T>(key: string, value: T) {
  mmkvStorage.set(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  mmkvStorage.remove(key);
}

export const zustandStorage: StateStorage = {
  getItem,
  setItem,
  removeItem,
};
