import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import "./index.css";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background:  #242424;
    background-size: cover;
    background-position: center;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("root")
);
