interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    avatar_url: string | null;
    role: string;
  };
}

function handleSuccess(
  data: AuthResponse,
  // setAuth: ReturnType<typeof useAuthStore.getState>["setAuth"],
) {
  // setAuth(data.accessToken, data.refreshToken, {
  //   id: data.user.id,
  //   username: data.user.username,
  //   email: data.user.email,
  //   avatarUrl: data.user.avatar_url,
  //   role: data.user.role,
  // });
}

export function useGoogleAuth() {
  // const setAuth = useAuthStore((s) => s.setAuth);
  // return useMutation({
  //   mutationFn: async () => {
  //     const idToken = await signInWithGoogle();
  //     const res = await api.post<AuthResponse>("/auth/google", { idToken });
  //     return res.data;
  //   },
  //   onSuccess: (data) => handleSuccess(data, setAuth),
  // });
}

export function useFacebookAuth() {
  // const setAuth = useAuthStore((s) => s.setAuth);
  // return useMutation({
  //   mutationFn: async () => {
  //     const accessToken = await signInWithFacebook();
  //     const res = await api.post<AuthResponse>("/auth/facebook", {
  //       accessToken,
  //     });
  //     return res.data;
  //   },
  //   onSuccess: (data) => handleSuccess(data, setAuth),
  // });
}

export function useAppleAuth() {
  // const setAuth = useAuthStore((s) => s.setAuth);
  // return useMutation({
  //   mutationFn: async () => {
  //     const { identityToken, givenName, familyName } = await signInWithApple();
  //     const res = await api.post<AuthResponse>("/auth/apple", {
  //       identityToken,
  //       givenName,
  //       familyName,
  //     });
  //     return res.data;
  //   },
  //   onSuccess: (data) => handleSuccess(data, setAuth),
  // });
}
