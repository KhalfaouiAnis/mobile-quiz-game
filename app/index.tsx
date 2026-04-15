import { HAS_LAUNCHED } from "@/src/constants";
import { useAuthStore } from "@/src/stores/auth.store";
import { mmkvStorage } from "@/src/stores/storage";
import { Redirect } from "expo-router";

export default function Index() {
  const hasLaunched = mmkvStorage.getBoolean(HAS_LAUNCHED);

  const status = useAuthStore(s => s.status);

  console.log({status});
  

  if (!hasLaunched) {
    return <Redirect href="/(welcome)" />;
  }

  if (status === "unauthenticated") {
    return <Redirect href="/(auth)/signin" />;
  }

  return <Redirect href="/(main)" />;
}