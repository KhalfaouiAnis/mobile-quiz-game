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
  UpdatePasswordInterface,
  UpdatePasswordSchema,
  UpdateProfileInterface,
  UpdateProfileSchema,
} from "@/core/types/schema/user";
import {
  updatePassword,
  updateProfile,
} from "@/core/services/user/user.service";
import { toast } from "sonner-native";
import { isAxiosError } from "axios";

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
      const { data } = await attemptLogin(username, password);
      if (data.data) {
        TokenService.setAccessToken(data.data.accessToken);
        TokenService.setRefreshToken(data.data.refreshToken);
        authStore?.setState({ user: data.data.user });
        router.replace("/(main)");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
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
      email: "",
      username: "",
      password: "",
      phone: undefined,
    },
  });

  const onSubmit = async (data: SignupInterface) => {
    try {
      const {
        data: { email, otp_sent },
      } = await createAccount(data);
      if (otp_sent)
        // await requestOTP(email);
        // router.navigate(`/otp_verification?phone=${email}`);
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
      username: "",
      avatar_url: "",
    },
  });

  const onSubmit = async (payload: UpdateProfileInterface) => {
    try {
      await updateProfile(payload);
      router.replace("/(profile)");
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}

export function useUpdatePassword(data: any) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(UpdatePasswordSchema, {
    values: {
      email: data.email,
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (payload: UpdatePasswordInterface) => {
    try {
      await updatePassword(payload);
      router.replace("/(profile)");
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
