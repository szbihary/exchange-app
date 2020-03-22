import * as actions from "./actionCreators";
import * as types from "./actionTypes";
import { rates, payload } from "../../tools/mockData";

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
