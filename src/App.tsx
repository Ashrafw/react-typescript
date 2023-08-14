import { useRef, useState } from "react";
// components
import Display from "./components/Display/Display";
import StartButton from "./components/StartButton/StartButton";
import Stage from "./components/Stage/Stage";
// styles
import { StyledTetris, StyledTetrisWrapper } from "./App.style";
// hooks
import { usePlayer } from "./hooks/usePlayer";
import { useInterval } from "./hooks/useIntervals";
import { useStage } from "./hooks/useStage";

// functions
import { createStage, isColliding } from "./gameHelper";
import { useGameStatus } from "./hooks/useGameStatus";

function App() {
  const [count, setCount] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [dropTime, setDropTime] = useState<null | number>(null);

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);
  const gameArea = useRef<HTMLDivElement>(null);

  const moveTetris = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
    if (!gameOver) {
      if (keyCode === 37) {
        // mover left  <=
        moveTetris(-1);
      } else if (keyCode === 39) {
        // mover right  =>
        moveTetris(1);
      } else if (keyCode === 40) {
        // mover down
        if (repeat) return;
        setDropTime(30);
      } else if (keyCode === 38) {
        // up : rotate
        playerRotate(stage);
      }
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    // change dropTime speed when the user release the down button
    if (keyCode === 40) {
      setDropTime(1000 / level + 200);
    }
  };

  const handleStartGame = (): void => {
    // focus window/div on the game area so the use arrow movements can be reflected

    if (gameArea.current) gameArea.current.focus();
    // reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  };

  const drop = () => {
    if (!gameOver) {
      // increase level when player clears 5 rows
      if (rows > level * 5) {
        setLevel((prev) => prev + 1);
        setDropTime(1000 / level + 200);
      }
    }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // if gameover
      if (player.pos.y < 1) {
        console.log("game over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  useInterval(() => {
    drop();
  }, dropTime);
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
      ref={gameArea}
    >
      <StyledTetris>
        <h1 style={{ margin: "10px" }}>Tetris</h1>
        <div className="display">
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton callback={handleStartGame} />
            </>
          ) : (
            <>
              <Display text={`Score: ${score} `} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </>
          )}
        </div>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default App;
