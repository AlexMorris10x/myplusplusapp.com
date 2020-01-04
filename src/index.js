import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import styled from "styled-components";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// const body = styled.div`
//   text-align: center;
//   justify-todo: center;
//   height: 100%;
// `;

// body {
//   margin: 0;
//   padding: 0;
//   font-family: sans-serif;
// }

if (module.hot) module.hot.accept();
