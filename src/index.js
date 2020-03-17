import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import ExchangePage from "./components/ExchangePage/ExchangePage";
import FXRatePoller from "./components/FXRatePoller/FXRatePoller";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ExchangePage />
    <FXRatePoller />
  </Provider>,
  document.getElementById("app")
);
