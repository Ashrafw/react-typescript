import { StyledDisplay } from "./Display.styles";

type DisplayProps = {
  gameOver?: boolean;
  text: string;
};

const Display = ({ gameOver, text }: DisplayProps) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export default Display;
