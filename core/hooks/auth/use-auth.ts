import {
  attemptLogin,
  createAccount,
  requestPasswordReset,
  verifyOTP,
} from "@/core/services/authentication/standard";
import { authStore } from "@/core/store/auth.store";
import {
  LoginInterface,
  LoginSchema,
  RequestResetPasswordInterface,
  RequestResetPasswordSchema,
  ResetPasswordInterface,
  ResetPasswordSchema,
  SignupInterface,
  SignupSchema,
} from "@/core/types/schema/auth";
import { useRouter } from "expo-router";
import { useFormHook } from "../use-form-hook";
import { mmkvStorage } from "@/core/store/storage";
import {
  ACC_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  RESET_PASSWORD_TOKEN,
} from "@/core/constants";

export function useSignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useFormHook(LoginSchema, {
    defaultValues: { email: undefined, username: undefined, password: "" },
  });

  const onSubmit = async ({ email, username, password }: LoginInterface) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await attemptLogin(password, email, username);
      mmkvStorage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
      mmkvStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      authStore.setState({ user });
      router.replace("/(main)");
    } catch (error) {
      console.log({ error });
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting, control };
}

export function useSignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(SignupSchema, {
    defaultValues: {
      email: undefined,
      username: undefined,
      password: "",
    },
  });

  const onSubmit = async (data: SignupInterface) => {
    try {
      await createAccount(data);
      // await requestOTP(data.phone);
      // router.navigate(`/otp_verification?phone=${data.phone}`);
      router.replace("/signin");
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}

export function useRequestPasswordReset() {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormHook(RequestResetPasswordSchema, {
    defaultValues: { email: undefined },
  });

  const onSubmit = async (payload: RequestResetPasswordInterface) => {
    try {
      const { data } = await requestPasswordReset(payload.email);
      if (data.otp_sent && data.token) {
        mmkvStorage.set(RESET_PASSWORD_TOKEN, data.token);
      }
    } catch (error) {}
    router.replace("/otp_verification_success");
  };

  return { control, errors, isSubmitting, handleSubmit, onSubmit };
}

export function useResetPassword() {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormHook(ResetPasswordSchema, {
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: ResetPasswordInterface) => {
    router.replace("/otp_verification_success");
  };

  return { control, errors, isSubmitting, handleSubmit, onSubmit };
}

export function useOTP() {
  const router = useRouter();
  const verifyOtp = async (email: string, code: string) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await verifyOTP(email, code);
      mmkvStorage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
      mmkvStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);

      authStore.setState({ user });
      router.replace("/otp_verification_success");
    } catch (error) {
      console.log({ error });
    }
  };

  return { verifyOtp };
}
