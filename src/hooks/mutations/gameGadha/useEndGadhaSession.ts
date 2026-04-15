import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

export default function useEndGadhaSession() {
  return useMutation<unknown, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      const { data } = await api.patch<unknown>(`/gadha/sessions/${id}/end`);
      return data;
    },
  });
}
