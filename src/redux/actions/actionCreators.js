import * as types from "./actionTypes";

export function updateFxRates(rates) {
  return { type: types.UPDATE_FX_RATES, rates };
}

export function exchangeMoney() {
  return { type: types.EXCHANGE_MONEY };
}
