import { httpClient } from "@/core/api/httpClient";

export const signCloudinaryUpload = async () => {
  return httpClient.get("/cloudinary/gen-signature");
};
