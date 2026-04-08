import { signCloudinaryUpload } from "@/core/services/cloud/cloudinary";
import axios from "axios";
import { useState } from "react";
import { Platform } from "react-native";

export const useUploadMedia = () => {
  const [loading, setLoading] = useState(false);

  const upload = async (file: any) => {
    setLoading(true);

    try {
      const { data: response } = await signCloudinaryUpload();

      const formData = new FormData();

      formData.append("file", {
        uri:
          Platform.OS === "android"
            ? file.uri
            : file.uri?.replace("file://", ""),
        type: file.type,
        name: file.name,
      } as any);

      formData.append("api_key", response.apiKey);
      formData.append("signature", response.signature);
      formData.append("timestamp", response.params.timestamp);
      formData.append("upload_preset", response.params.upload_preset);

      if (response.params.upload_preset === "kahoot_images") {
        formData.append("overwrite", true as any);
        formData.append("invalidate", true as any);
      }

      const { data } = await axios.post(response.uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      return {
        ...file,
        public_id: data.public_id,
        original_url: data.secure_url,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { upload, loading, setLoading };
};
