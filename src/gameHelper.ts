import { STAGE } from "./components/Stage/Stage";
import { PlayerType } from "./hooks/usePlayer";
import { STAGE_HEIGHT, STAGE_WIDTH, TETRIS_ALL } from "./setup";

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));

export const randomTetris = () => {
  const allTetris = ["I", "J", "L", "O", "S", "T", "Z"] as (keyof typeof TETRIS_ALL)[];
  const randomTetris = allTetris[Math.floor(Math.random() * allTetris.length)];
  return TETRIS_ALL[randomTetris];
};

// collision detection
export const isColliding = (
  player: PlayerType,
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  // checking collision and returning true or false
  for (let y = 0; y < player.tetrisShape.length; y += 1) {
    for (let x = 0; x < player.tetrisShape[y].length; x += 1) {
      // 1. check if we are on an tetris cell
      if (player.tetrisShape[y][x] !== 0) {
        // 2. check if our move is inside the game areas height (y)
        // that we're not moving through the bottom of the grid
        if (
          // 2. check if our move is inside the game areas height (y)
          // that we're not moving through the bottom of the grid
          !stage[y + player.pos.y + moveY] ||
          // 3. check the move is inside the game area width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. check that the cell we are moving to is clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
  // if everything  above is false, the move is possible
  return false;
};
