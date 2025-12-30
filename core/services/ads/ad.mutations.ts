import { httpClient } from "@/core/api/httpClient";
import { CloudinarySignRequestInterface, MediaType } from "@/core/types";
import { MediaInterface } from "@/core/types/schema/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";
import { flag, toggleFavorite } from "./ad.service";

export type UploadFileType = {
  file: MediaInterface;
  media_type: MediaType;
  signingParams: CloudinarySignRequestInterface;
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adId: string) => toggleFavorite(adId),

    // Step 1: When mutate() is called
    onMutate: async (adId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["ads"] });

      // Snapshot the previous value
      const previousAds = queryClient.getQueryData(["ads"]);

      // Optimistically update the cache
      queryClient.setQueryData(["ads"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((ad: any) =>
              ad.id === adId ? { ...ad, is_favorited: !ad.is_favorited } : ad
            ),
          })),
        };
      });

      // Return a context object with the snapshotted value
      return { previousAds };
    },

    // Step 2: If the mutation fails, use the context we returned above
    onError: (err, adId, context) => {
      if (context?.previousAds) {
        queryClient.setQueryData(["ads"], context.previousAds);
      }
      // Show an error toast using Sonner-native
      toast.error("Could not update favorite. Please try again.");
    },

    // Step 3: Always refetch after error or success to sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};

export const useFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adId: string) => flag(adId),

    // Step 1: When mutate() is called
    onMutate: async (adId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["ads"] });

      // Snapshot the previous value
      const previousAds = queryClient.getQueryData(["ads"]);

      // Optimistically update the cache
      queryClient.setQueryData(["ads"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((ad: any) =>
              ad.id === adId ? { ...ad, is_flaged: !ad.is_flaged } : ad
            ),
          })),
        };
      });

      // Return a context object with the snapshotted value
      return { previousAds };
    },

    // Step 2: If the mutation fails, use the context we returned above
    onError: (err, adId, context) => {
      if (context?.previousAds) {
        queryClient.setQueryData(["ads"], context.previousAds);
      }
      // Show an error toast using Sonner-native
      toast.error("Could not flag the ad. Please try again.");
    },

    // Step 3: Always refetch after error or success to sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};

export const useAdMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await httpClient.post("/ads/create", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  return { ...mutation };
};
