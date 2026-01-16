import { httpClient } from "@/core/api/httpClient";
import useAuthStore from "@/core/store/auth.store";
import { UpdateProfileInterface } from "@/core/types/schema/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const { totalProgress, setFileProgress, upload } = useUploadMedia();
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore((state) => state);

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfileInterface) => {
      const { avatar, ...profileData } = data;
      let avatarData = null;

      if (avatar && "uri" in avatar) {
        const uploadResponse = await upload([
          {
            file: { ...avatar, name: `avatar_${user?.id}` },
            media_type: "IMAGE",
            signingParams: { mediaType: "profile_pic" },
          },
        ]);
        if (uploadResponse) {
          avatarData = {
            public_id: uploadResponse[0].public_id,
            original_url: uploadResponse[0].original_url,
            media_type: "IMAGE",
          };
        }
      }

      const { data: finalResponse } = await httpClient.patch("/users", {
        ...profileData,
        avatar: avatarData,
      });

      return finalResponse;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setFileProgress({});
    },
    onError: () => setFileProgress({}),
  });

  return { ...mutation, uploadProgress: totalProgress };
};
