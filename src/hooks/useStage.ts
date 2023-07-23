import React from "react";
import { PlayerType } from "./usePlayer";
import { createStage } from "../gameHelper";

export type STAGECELL = [string | number, string];
export type STAGE = STAGECELL[][];

export const useStage = (player: PlayerType, resetPlayer: () => void) => {
  const [stage, setStage] = React.useState(createStage());
  const [rowsCleared, setRowsCleared] = React.useState(0);

  React.useEffect(() => {
    // in order to do something player(tetris) position is needed
    if (!player.pos) return; // requires a return

    // clear rows completed
    const sweepRows = (newStage: STAGE): STAGE => {
      return newStage.reduce((acc, row) => {
        // if we don't find a 0 it means the row is full and should be clear
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          //   create and empty row at the beginning of the new array to push the tetris down
          // instead of returning the clear row
          acc.unshift(new Array(newStage[0].length).fill([0, "clear"]) as STAGECELL[]);
          return acc;
        }
        acc.push(row);
        return acc;
      }, [] as STAGE);
      //    newStage;
    };
    // takes a previous stage and returns a new stage
    const updateStage = (prevStage: STAGE): STAGE => {
      // clear the stage
      // if the stage is "clear" but doesn't have a 0 that means its the players move and should be cleared
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)) as STAGECELL[]
      );

      //   draw the new tetromino ????????
      player.tetrisShape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? "merged" : "clear"}`];
          }
        });
      });
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };
    setStage((prev) => updateStage(prev));
  }, [player.collided, player.pos?.x, player.pos?.y, player.tetrisShape]);
  return { stage, setStage, rowsCleared };
};
