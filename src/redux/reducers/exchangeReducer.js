import * as types from "../actions/actionTypes";
import { getCurrencies } from "../../config";

const INIT_FX_RATES = {
  USD: 1,
  EUR: 0.9,
  GBP: 0.8,
  NOK: 10.5,
  HUF: 315
};

const INIT_BALANCES = {
  USD: 1000,
  EUR: 333,
  GBP: 999,
  NOK: 4567,
  HUF: 314159
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
          return { ...pocket, balance: pocket.balance - amount };
        } else if (pocket.id === toCurrency) {
          const rate = rates[fromCurrency] / rates[toCurrency];
          return {
            ...pocket,
            balance: pocket.balance + amount / rate
          };
        }
        return { ...pocket };
      });
      return { ...state, pockets: newPocketBalances };
    default:
      return state;
  }
}
