import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { AppState, Platform } from "react-native";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

focusManager.setEventListener((setFocused) => {
  const subscription = AppState.addEventListener("change", (status) => {
    if (Platform.OS !== "web") {
      setFocused(status === "active");
    }
  });
  return () => subscription.remove();
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});
