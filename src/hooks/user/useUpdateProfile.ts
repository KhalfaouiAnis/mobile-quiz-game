import { api } from "@/src/lib/api";
import { useForm } from "react-hook-form";
import {
  UpdateProfileInterface,
  UpdateProileSchema,
} from "@/src/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_USER_QUERY_KEY } from "@/src/constants";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInterface>({
    resolver: zodResolver(UpdateProileSchema),
    defaultValues: {
      avatarUrl: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });

  const onSubmit = async (payload: UpdateProfileInterface) => {
    try {
      await api.patch("auth/profile", payload);
      queryClient.invalidateQueries({ queryKey: [AUTH_USER_QUERY_KEY] });
      // toast.success(t("common.profile_pic_changed"), { duration: 4000 });
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}
