import * as types from "../actions/actionTypes";

const INIT_STATE = {
  rates: {
    USD: 1,
    EUR: 0.9,
    GBP: 0.8,
    NOK: 10,
    HUF: 305
  },
  pockets: [
    { currencyId: "EUR", currencySymbol: "€", balance: 3000 },
    { currencyId: "USD", currencySymbol: "$", balance: 3100 },
    { currencyId: "GBP", currencySymbol: "£", balance: 314 },
    { currencyId: "NOK", currencySymbol: "Kr", balance: 3141 },
    { currencyId: "HUF", currencySymbol: "Ft", balance: 31415 }
  ]
};

export default function exchangeReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.UPDATE_FX_RATES:
      return { ...state, rates: action.rates };
    case types.EXCHANGE_MONEY:
      console.log("exchange money!");
      return state; // dummy impl
    default:
      return state;
  }
}
