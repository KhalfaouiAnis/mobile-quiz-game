import { SessionBoard } from "@/src/types/game.gadha.types";
import { useMemo } from "react";

export default function useGameGrid(
  columnHeaders: SessionBoard["columnHeaders"],
  questions: SessionBoard["questions"],
) {
  return useMemo(() => {
    const rows = [];

    for (let i = 0; i < columnHeaders.length; i++) {
      const rowItems = questions.filter((item) => item.grid_col === i);

      rows.push({
        subcategoryName: columnHeaders[i]?.subcategoryName,
        subcategoryImage: columnHeaders[i]?.imageUrl,
        questions: rowItems,
      });
    }

    return rows;
  }, [questions]);
}