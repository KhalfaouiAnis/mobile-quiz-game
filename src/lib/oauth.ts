import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import * as AppleAuthentication from "expo-apple-authentication";

// Call once at app startup (e.g. in root _layout.tsx)
export function configureOAuth() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    offlineAccess: false,
  });
}

// ─── Google
export async function signInWithGoogle(): Promise<string> {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { data } = await GoogleSignin.signIn();

  if (!data?.idToken)
    throw new Error("Google Sign-In did not return an ID token");
  return data.idToken;
}

// ─── Facebook
export async function signInWithFacebook(): Promise<string> {
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) throw new Error("CANCELLED");

  const data = await AccessToken.getCurrentAccessToken();
  if (!data?.accessToken)
    throw new Error("Facebook did not return an access token");

  return data.accessToken;
}

// ─── Apple
export interface AppleCredential {
  identityToken: string;
  givenName: string | null;
  familyName: string | null;
}

export async function signInWithApple(): Promise<AppleCredential> {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) {
    throw new Error("Apple Sign-In did not return an identity token");
  }

  return {
    identityToken: credential.identityToken,
    givenName: credential.fullName?.givenName ?? null,
    familyName: credential.fullName?.familyName ?? null,
  };
}
