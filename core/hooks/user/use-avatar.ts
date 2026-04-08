import { generateId } from "@/core/utils";
import * as ImagePicker from "expo-image-picker";
import { getFileSize, Image } from "react-native-compressor";
import { useUploadMedia } from "../use-upload-media";
import { useProfileMutations } from "@/core/services/user/user.mutations";

export const useAvatar = (userId?: number) => {
  const {
    useUpdateProfile: { mutate, isPending },
  } = useProfileMutations();
  const { upload, loading } = useUploadMedia();

  const addAvatar = async (fromCamera: boolean) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        mediaTypes: ["images"],
        quality: 0.8,
      };

      const result = await (fromCamera
        ? ImagePicker.launchCameraAsync(options)
        : ImagePicker.launchImageLibraryAsync(options));

      if (result.canceled || !result.assets) return;

      const { uri: originalUri } = result.assets[0];

      const compressedUri = await Image.compress(originalUri, {
        output: "jpg",
      });

      const compressedSize = await getFileSize(compressedUri);

      const image: any = {
        uri: compressedUri,
        size: Number(compressedSize),
        type: result.assets[0].mimeType,
        id: result.assets[0].assetId || generateId(),
        name: userId+""  || generateId(),
      };

      const data = await upload(image);
      mutate({ avatar_url: data.original_url });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addAvatar,
    loading: loading || isPending,
  };
};
