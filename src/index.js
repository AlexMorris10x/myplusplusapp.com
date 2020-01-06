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

if (module.hot) module.hot.accept();
