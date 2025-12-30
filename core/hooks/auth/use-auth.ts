import {
  attemptLogin,
  createAccount,
  verifyOTP,
} from "@/core/services/authentication/standard";
import { authStore } from "@/core/store/auth.store";
import {
  LoginInterface,
  LoginSchema,
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
} from "@/core/constants";

export function useSignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useFormHook(LoginSchema, { defaultValues: { phone: "", password: "" } });

  const onSubmit = async ({ phone, password }: LoginInterface) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await attemptLogin(phone, password);
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
      password: "",
      fullname: "",
      phone: "",
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

export function useResetPassword() {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormHook(ResetPasswordSchema, {
    defaultValues: { phone: "", password: "", confirmPassword: "" },
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
