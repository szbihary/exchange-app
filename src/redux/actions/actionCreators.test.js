import * as actions from "./actionCreators";
import * as types from "./actionTypes";
import { rates, payload } from "../../tools/mockData";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { getExchangeRateURL } from "../../config";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("loadFxRatesSuccess", () => {
  it("should create an LOAD_FX_RATES_SUCCESS action", () => {
    const expectedAction = {
      type: types.LOAD_FX_RATES_SUCCESS,
      rates
    };
    const action = actions.loadFxRatesSuccess(rates);
    expect(action).toEqual(expectedAction);
  });
});

describe("loadFxRates async action", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates LOAD_FX_RATES_SUCCESS action when fetching rates has been done", () => {
    const INIT_RATES = { EUR: 1.1, USD: 1 };
    fetchMock.getOnce(getExchangeRateURL(), {
      body: { rates: INIT_RATES },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: types.LOAD_FX_RATES_SUCCESS, rates: INIT_RATES }
    ];
    const store = mockStore({ rates: {} });

    return store.dispatch(actions.loadFxRates()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("exchangeMoney", () => {
  it("should create an EXCHANGE_MONEY action", () => {
    const expectedAction = {
      type: types.EXCHANGE_MONEY,
      payload
    };
    const action = actions.exchangeMoney(payload);
    expect(action).toEqual(expectedAction);
  });
});
