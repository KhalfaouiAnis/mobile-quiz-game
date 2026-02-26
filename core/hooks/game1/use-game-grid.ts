import { GameBoard } from "@/core/types";
import { useMemo } from "react";

const GRID_SIZE = 6;

export default function useGameGrid(grid: GameBoard["grid"]) {
  return useMemo(() => {
    const rows = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const rowItems = grid.filter((item) => item.grid_row === i);

      rows.push({
        subcategoryName: rowItems[0]?.subcategory?.name,
        subcategoryImage: rowItems[0]?.subcategory?.image_url,
        questions: rowItems.sort((a, b) => a.grid_col - b.grid_col),
      });
    }

    return rows;
  }, [grid]);
}
