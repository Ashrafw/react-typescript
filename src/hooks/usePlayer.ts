import React from "react";
import { STAGE_WIDTH } from "../setup";
import { isColliding, randomTetris } from "../gameHelper";
import { STAGE } from "../components/Stage/Stage";

export type PlayerType = {
  pos: {
    x: number;
    y: number;
  };
  tetrisShape: (string | number)[][];
  collided: boolean;
};
type PlayerUpdateProp = {
  x: number;
  y: number;
  collided: boolean;
};

// the hook
export const usePlayer = () => {
  const [player, setPlayer] = React.useState({} as PlayerType);
  const rotate = (matrix: PlayerType["tetrisShape"]) => {
    const mtrx = matrix.map((_, index) => matrix.map((column) => column[index]));
    return mtrx.map((row) => row.reverse());
  };
  const playerRotate = (stage: STAGE): void => {
    const clonePlayer = JSON.parse(JSON.stringify(player));
    clonePlayer.tetrisShape = rotate(clonePlayer.tetrisShape);
    // ensure that the rotated tetris shape cannot rotate into the walls
    const positionX = clonePlayer.pos.x;
    let offset = 1;
    while (isColliding(clonePlayer, stage, { x: 0, y: 0 })) {
      clonePlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonePlayer.tetrisShape[0].length) {
        clonePlayer.pos.x = positionX;
        return;
      }
    }

    setPlayer(clonePlayer);
  };

  const updatePlayerPos = ({ x, y, collided }: PlayerUpdateProp): void => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided: collided,
    }));
  };

  const resetPlayer = React.useCallback((): void => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrisShape: randomTetris().shape,
      collided: false,
    });
  }, []);

  return { player, updatePlayerPos, resetPlayer, playerRotate };
};
