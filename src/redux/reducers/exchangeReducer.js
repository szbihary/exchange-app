import * as types from "../actions/actionTypes";
import { getCurrencies } from "../../config";
import { roundRate, roundAmount } from "../../utils";

const INIT_FX_RATES = {
  USD: 1,
  EUR: 0.9,
  GBP: 0.8,
  NOK: 10.5,
  HUF: 315
};

const INIT_BALANCES = {
  USD: 3100,
  EUR: 3140,
  GBP: 314,
  NOK: 3141,
  HUF: 31415
};

const INIT_STATE = {
  rates: INIT_FX_RATES,
  pockets: getCurrencies().map(currency => ({
    ...currency,
    balance: INIT_BALANCES[currency.id]
  }))
};

export default function exchangeReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.UPDATE_FX_RATES:
      return { ...state, rates: action.rates };

    case types.EXCHANGE_MONEY:
      const { amount, fromCurrency, toCurrency } = action.payload;
      const { rates } = state;

      const newPocketBalances = state.pockets.map(pocket => {
        if (pocket.id === fromCurrency) {
          return { ...pocket, balance: pocket.balance - roundAmount(amount) };
        } else if (pocket.id === toCurrency) {
          const rate = roundRate(rates[fromCurrency] / rates[toCurrency]);
          return {
            ...pocket,
            balance: pocket.balance + roundAmount(amount / rate)
          };
        }
        return { ...pocket };
      });
      return { ...state, pockets: newPocketBalances };
    default:
      return state;
  }
}
