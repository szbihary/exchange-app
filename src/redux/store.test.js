import { createStore } from "redux";
import rootReducer from "./reducers/exchangeReducer";
import * as actions from "./actions/actionCreators";
import { INIT_FX_RATES, INIT_BALANCES } from "./reducers/initialState";
import { payload, rates } from "../tools/mockData";

// Redux integration tests

describe("Store", () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);
  });

  it("should handle updating FX rates", () => {
    const newRatesFromServer = rates;
    const action = actions.updateFxRates(rates);
    store.dispatch(action);

    const newRatesInStore = store.getState().rates;
    Object.keys(newRatesInStore).forEach(currencyId => {
      expect(newRatesInStore[currencyId]).toEqual(
        newRatesFromServer[currencyId]
      );
    });
  });

  it("should handle exchanging money", () => {
    const exchangePayload = payload;
    const action = actions.exchangeMoney(exchangePayload);
    store.dispatch(action);

    const updatedToPocket = store
      .getState()
      .pockets.find(pocket => pocket.id === payload.toCurrency);
    const updatedFromPocket = store
      .getState()
      .pockets.find(pocket => pocket.id === payload.fromCurrency);

    const exchangeRate =
      INIT_FX_RATES[payload.fromCurrency] / INIT_FX_RATES[payload.toCurrency];
    const newFromBalance = INIT_BALANCES[payload.fromCurrency] - payload.amount;
    const newToBalance =
      INIT_BALANCES[payload.toCurrency] + payload.amount / exchangeRate;

    expect(updatedFromPocket.balance).toEqual(newFromBalance);
    expect(updatedToPocket.balance).toEqual(newToBalance);
  });
});
