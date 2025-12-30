import useAuthStore from "@/core/store/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, isReady, _hasHydrated, hasLaunched } = useAuthStore();

  if (!isReady || !_hasHydrated) return null;

  return <Redirect href={"/(main)/(profile)"} />

  // if (!hasLaunched) {
  //   return <Redirect href="/(welcome)" />;
  // }

  // if (!user) {
  //   return <Redirect href="/(auth)" />;
  // }

  // return <Redirect href="/(main)" />;
}