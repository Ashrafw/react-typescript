import React from "react";
import { TETRIS_ALL } from "../../setup";
import { StyledCell } from "./Cell.styles";

type CellProps = {
  type: keyof typeof TETRIS_ALL;
};

const Cell = ({ type }: CellProps) => <StyledCell type={type} color={TETRIS_ALL[type].color}></StyledCell>;

export default React.memo(Cell);
