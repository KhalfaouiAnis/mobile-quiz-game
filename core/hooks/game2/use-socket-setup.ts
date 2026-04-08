import { socketService } from "@/core/services/game2/socket-manager";
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useSocketSetup = () => {
  useEffect(() => {
    socketService.connect();
    console.log("socket called...");

    // 2. Handle App Backgrounding (Optional but recommended)
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        socketService.connect();
      } else if (nextAppState === "background") {
        // specific logic: Do you want to disconnect?
        // For a real-time game, you might keep it open for short periods
        // or disconnect to save battery and rely on "reconnect" logic.
        socketService.disconnect();
      }
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);

    // 3. Cleanup on unmount
    return () => {
      sub.remove();
      socketService.disconnect();
    };
  }, []);
};
