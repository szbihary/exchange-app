import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import ExchangePage from "./components/ExchangePage/ExchangePage";
import FXRatePoller from "./components/FXRatePoller/FXRatePoller";

const store = configureStore();

const currencies = [
  { currencyId: "EUR" },
  { currencyId: "GBP" },
  { currencyId: "HUF" },
  { currencyId: "NOK" }
];

ReactDOM.render(
  <Provider store={store}>
    <ExchangePage />
    <FXRatePoller currencies={currencies} />
  </Provider>,
  document.getElementById("app")
);
