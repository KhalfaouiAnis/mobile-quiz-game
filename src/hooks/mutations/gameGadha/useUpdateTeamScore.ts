import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import { GameBoard } from "@/src/types/game.gadha.types";

export function useUpdateTeamScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      session_id: number;
      teamId: number;
      score: number;
    }) => {
      const { data } = await api.patch<any>("gadha/sessions/session-team-score", {
        teamId: payload.teamId,
        score: payload.score,
      });
      return data.data;
    },

    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["gadha", "board", data.session_id],
      });

      const previousDrafts =
        queryClient.getQueryData<GameBoard>([
          "gadha",
          "board",
          data.session_id,
        ]) || [];
      return { previousDrafts };
    },
    onError: (err) => console.log(err),
  });
}
