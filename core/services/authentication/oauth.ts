import { httpClient } from "@/core/api/httpClient";
import {
  ACC_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/core/constants";
import useAuthStore from "@/core/store/auth.store";
import { mmkvStorage } from "@/core/store/storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

export const handleGoogleLoginRequest = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();

    if (!data?.idToken) return;

    const res = await httpClient.post("/auth/google", {
      idToken: data?.idToken,
    });

    const { accessToken, refreshToken, user } = res.data;
    mmkvStorage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
    mmkvStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    useAuthStore.setState({
      user,
      authType: "GOOGLE",
    });

    return user.phone;
  } catch (error: unknown) {
    throw error;
  }
};
