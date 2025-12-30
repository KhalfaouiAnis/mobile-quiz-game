import { httpClient } from "@/core/api/httpClient";
import {
  AdSearchParams,
  AdStatus,
  AdvertisementInterface,
  PaginatedResponse,
} from "@/core/types";

export const fetchAds = async ({
  filters,
  sorting,
  cursor,
  direction,
  limit = 10,
}: AdSearchParams): Promise<PaginatedResponse<AdvertisementInterface>> => {
  const { data } = await httpClient.post<
    PaginatedResponse<AdvertisementInterface>
  >("/ads", {
    pagination: { cursor, limit },
    filters,
    sorting,
    direction,
  });

  return data;
};

export const fetchBatchAds = async (ids: string[]) => {
  const { data } = await httpClient.post<AdvertisementInterface[]>(
    "/ads/batch-list",
    { ids }
  );

  return data?.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
};

export const getAdById = async (id: string) => {
  const { data } = await httpClient.get<AdvertisementInterface>(`/ads/${id}`);

  return data;
};

export const fetchMyAds = async (
  { cursor }: AdSearchParams,
  status: AdStatus
): Promise<PaginatedResponse<AdvertisementInterface>> => {
  const { data } = await httpClient.post<
    PaginatedResponse<AdvertisementInterface>
  >("/ads", {
    pagination: { cursor, limit: 10 },
    filters: { is_mine: true, status },
    sorting: { field: "created_at", direction: "desc" },
  });

  return data;
};

export const fetchMyFavoritedAds = async (): Promise<
  AdvertisementInterface[]
> => {
  const { data } = await httpClient.get<AdvertisementInterface[]>(
    "/ads/me/favorite"
  );

  return data;
};

export const toggleFavorite = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/toggle-favorite`);
};

export const flag = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/flag`);
};
