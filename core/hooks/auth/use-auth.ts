import {
  attemptLogin,
  createAccount,
  requestPasswordReset,
  resetPassword,
  verifyOTP,
  verifyPasswordResetOTP,
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
import { TokenService } from "@/core/services/token-manager";
import {
  UpdateProfileInterface,
  UpdateProfileSchema,
} from "@/core/types/schema/user";
import { updateProfile } from "@/core/services/user/user.service";

export function useSignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useFormHook(LoginSchema, {
    defaultValues: { username: undefined, password: "" },
  });

  const onSubmit = async ({ username, password }: LoginInterface) => {
    try {
      const {
        data: { data },
      } = await attemptLogin(username, password);
      TokenService.setAccessToken(data?.accessToken!);
      TokenService.setRefreshToken(data?.refreshToken!);
      authStore?.setState({ user: data?.user });
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
      const {
        data: { email, otp_sent },
      } = await createAccount(data);
      if (otp_sent)
        // await requestOTP(data.phone);
        // router.navigate(`/otp_verification?phone=${data.phone}`);
        router.replace("/(auth)/signin");
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}

export function useUpdateProfile() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(UpdateProfileSchema, {
    defaultValues: {
      email: "",
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const onSubmit = async (payload: UpdateProfileInterface) => {
    try {
      await updateProfile(payload);
      router.replace("/(profile)/");
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
      const {
        data: { data },
      } = await requestPasswordReset(payload.email);
      if (data?.otp_sent && data.token) {
        TokenService.setAccessToken(data.token);
        router.replace("/otp_verification");
      }
    } catch (error) {}
  };

  return { control, errors, isSubmitting, handleSubmit, onSubmit };
}

export function useResetPasswordOTP() {
  const router = useRouter();
  const verifyOtp = async (email: string, code: string) => {
    try {
      const {
        data: { success },
      } = await verifyPasswordResetOTP(email, code);
      if (success) {
        router.replace("/otp_verification_success");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return { verifyOtp };
}

export function useResetPassword() {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormHook(ResetPasswordSchema, {
    defaultValues: { email: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (payload: ResetPasswordInterface) => {
    try {
      const {
        data: { success },
      } = await resetPassword(payload.newPassword, payload.confirmPassword);
      if (success) {
        router.replace("/otp_verification_success");
      }
    } catch (error) {}
  };

  return { control, errors, isSubmitting, handleSubmit, onSubmit };
}

export function useOTP() {
  const router = useRouter();
  const verifyOtp = async (email: string, code: string) => {
    try {
      const {
        data: { success },
      } = await verifyOTP(email, code);
      if (success) {
        router.replace("/otp_verification_success");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return { verifyOtp };
}
