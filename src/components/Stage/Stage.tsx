import React from "react";
import { StyledStage } from "./Stage.styles";
import { TETRIS_ALL } from "../../setup";
import Cell from "../Cell/Cell";

export type STAGECELL = [keyof typeof TETRIS_ALL, string];
export type STAGE = STAGECELL[][];

type StageProp = {
  stage: STAGE;
};

const Stage = ({ stage }: StageProp) => {
  return (
    <StyledStage>
      {stage.map((row) => row.map((cell, index) => <Cell key={index} type={cell[0]} />))}
    </StyledStage>
  );
};

export default Stage;
