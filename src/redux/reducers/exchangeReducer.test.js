import exchangeReducer from "./exchangeReducer";
import * as actions from "../actions/actionCreators";
import { rates, payload } from "../../tools/mockData";
import { getCurrencies } from "../../config";

const INIT_RATES = { EUR: 1.1, USD: 1 };

describe("ExchangeReducer", () => {
  it("should update FX rates when LOAD_FX_RATES_SUCCESS action is passed", () => {
    const initialState = INIT_RATES;
    const newRates = rates;
    const action = actions.loadFxRatesSuccess(newRates);

    const newState = exchangeReducer(initialState, action);

    expect(Object.keys(rates).length).toEqual(
      Object.keys(newState.rates).length
    );
    Object.keys(rates).forEach(currencyId => {
      expect(newState.rates[currencyId]).toEqual(newRates[currencyId]);
    });
  });

  it("should refresh only the modified pocket balances when we pass EXCHANGE_MONEY", () => {
    const initialBalance = 1000;
    const initialState = {
      rates: INIT_RATES,
      pockets: getCurrencies().map(currency => ({
        ...currency,
        balance: initialBalance
      }))
    };
    const action = actions.exchangeMoney(payload);

    const newState = exchangeReducer(initialState, action);

    const expectedFromPocketBalance = initialBalance - payload.amount;
    const exchangeRate =
      INIT_RATES[payload.fromCurrency] / INIT_RATES[payload.toCurrency];
    const expectedToPocketBalance =
      initialBalance + payload.amount / exchangeRate;

    const fromPocketBalance = newState.pockets.find(
      pocket => pocket.id === payload.fromCurrency
    ).balance;

    const toPocketBalance = newState.pockets.find(
      pocket => pocket.id === payload.toCurrency
    ).balance;
    const otherPocketBalances = newState.pockets
      .filter(
        pocket =>
          ![payload.toCurrency, payload.fromCurrency].includes(pocket.id)
      )
      .map(pocket => pocket.balance);

    // modified pocket balances changed as expected
    expect(fromPocketBalance).toEqual(expectedFromPocketBalance);
    expect(toPocketBalance).toEqual(expectedToPocketBalance);

    // other pocket balances and rates are not changed
    otherPocketBalances.forEach(balance => {
      expect(balance).toEqual(initialBalance);
    });
    Object.keys(newState.rates).forEach(currencyId => {
      expect(newState.rates[currencyId]).toEqual(INIT_RATES[currencyId]);
    });
  });
});
