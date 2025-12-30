import NetInfo from "@react-native-community/netinfo";
import {
    QueryClient,
    focusManager,
    onlineManager,
} from "@tanstack/react-query";
import { AppState, Platform } from "react-native";

// 1. Configure Online Status
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// 2. Configure Focus Refetching (important for mobile UX)
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
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes before data is "old"
    },
  },
});
