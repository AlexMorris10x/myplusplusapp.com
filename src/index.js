import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./store/reducers/rootReducer";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById("root")
);

// if (module.hot) module.hot.accept();
