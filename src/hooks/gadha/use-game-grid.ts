import { GameBoard } from "@/src/types/game.gadha.types";
import { useMemo } from "react";

const GRID_SIZE = 6;

export default function useGameGrid(grid: GameBoard["grid"]) {
  return useMemo(() => {
    const rows = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      const rowItems = grid.filter((item) => item.grid_col === i);

      rows.push({
        subcategoryName: rowItems[0]?.subcategory?.name,
        subcategoryImage: rowItems[0]?.subcategory?.image_url,
        questions: rowItems,
      });
    }

    return rows;
  }, [grid]);
}
