import * as actions from "./actionCreators";
import * as types from "./actionTypes";
import { rates, payload } from "../../tools/mockData";

describe("updateFxRates", () => {
  it("should create an UPDATE_FX_RATES action", () => {
    const expectedAction = {
      type: types.UPDATE_FX_RATES,
      rates
    };
    const action = actions.updateFxRates(rates);
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
