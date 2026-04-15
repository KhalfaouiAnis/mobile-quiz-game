import { api } from "@/src/lib/api";
import { Package } from "@/src/types/index.types";
import { useQuery } from "@tanstack/react-query";

export const usePackagesQuery = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await api.get<Package[]>("/packages");
      return data;
    },
    staleTime: 5 * 60 * 1_000,
  });
};

export const usePackageInfoQuery = (id: number) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data } = await api.get<Package>(`/packages/${id}`);
      return data;
    },
    staleTime: 5 * 60 * 1_000,
  });
};
