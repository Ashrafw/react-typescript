import React from "react";
import { StyledStartButton } from "./StartButton.styles";

type StartButtonProp = {
  callback: () => void;
};
const StartButton = ({ callback }: StartButtonProp) => {
  return <StyledStartButton onClick={callback}>Start Game</StyledStartButton>;
};

export default StartButton;
