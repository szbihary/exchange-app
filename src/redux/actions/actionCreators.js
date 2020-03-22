import * as types from "./actionTypes";
import * as ratesApi from "../../api/ratesApi";

export function loadFxRatesSuccess(rates) {
  return { type: types.LOAD_FX_RATES_SUCCESS, rates };
}

export function exchangeMoney(payload) {
  return { type: types.EXCHANGE_MONEY, payload };
}

export function loadFxRates() {
  return function(dispatch) {
    return ratesApi
      .fetchRates()
      .then(data => {
        dispatch(loadFxRatesSuccess(data.rates));
      })
      .catch(error => {
        // throw error;
        console.error("Error:", error);
      });
  };
}
