import styled from "styled-components";

type Props = {
  gameOver?: boolean;
};

export const StyledDisplay = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  align-items: space-between;
  margin: 0 0 20px 0;
  padding: 10px 20px;
  border: 2px solid #ffffff;
  min-height: 20px;
  /* width: 120px; */
  font-size: 16px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  color: ${(props) => (props.gameOver ? "red" : "#ffffff")};
  background: #042c58;
  font-family: Arial, Helvetica, sans-serif;
`;
