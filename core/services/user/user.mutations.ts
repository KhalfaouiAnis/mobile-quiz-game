import useAuthStore from "@/core/store/auth.store";
import { UpdateProfileInterface } from "@/core/types/schema/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "./user.service";
import { User } from "@/core/types";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore((state) => state);

  const mutation = useMutation({
    mutationFn: async (payload: UpdateProfileInterface) => {
      const { data: finalResponse } = await updateProfile(payload);

      return finalResponse;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser.data as User);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {},
  });

  return { ...mutation };
};
