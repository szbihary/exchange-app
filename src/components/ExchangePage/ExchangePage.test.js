import React from "react";
import { mount } from "enzyme";
import { ExchangePage } from "./ExchangePage";
import { rates } from "../../tools/mockData";
import {
  getCurrencies,
  getCurrencySymbols,
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY
} from "../../config";
import { roundRate } from "../../utils";

function render(args) {
  const initialBalance = 1000;
  const defaultProps = {
    rates,
    pockets: getCurrencies().map(currency => ({
      ...currency,
      balance: initialBalance
    })),
    actions: { exchangeMoney: jest.fn(payload => null) }
  };

  const props = { ...defaultProps, ...args };
  return {
    wrapper: mount(<ExchangePage {...props} />),
    props
  };
}

describe("ExchangePage Component", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    ({ wrapper, props } = render());
  });

  describe("PocketSelectors", () => {
    let controlWrapper;

    beforeEach(() => {
      controlWrapper = wrapper.find("PocketSelector");
    });

    it("exist", () => {
      expect(controlWrapper).toHaveLength(2);
    });

    it("has correct props", () => {
      expect(controlWrapper.at(0).props().selectedCurrency).toEqual(
        DEFAULT_FROM_CURRENCY
      );
      expect(controlWrapper.at(1).props().selectedCurrency).toEqual(
        DEFAULT_TO_CURRENCY
      );
    });
  });

  describe("CurrencyInputs", () => {
    let controlWrapper;

    beforeEach(() => {
      controlWrapper = wrapper.find("CurrencyInput");
    });

    it("exist", () => {
      expect(controlWrapper).toHaveLength(2);
    });

    it("has correct props", () => {
      let { value, source } = controlWrapper.at(0).props();
      expect(value).toEqual(0);
      expect(source).toEqual("from");
      ({ value, source } = controlWrapper.at(1).props());
      expect(value).toEqual(0);
      expect(source).toEqual("to");
    });
  });

  describe("Current rate badge", () => {
    it("shows correct rate", () => {
      let controlWrapper = wrapper.find("#currentRate");
      const fromSymbol = getCurrencySymbols()[DEFAULT_FROM_CURRENCY];
      const toSymbol = getCurrencySymbols()[DEFAULT_TO_CURRENCY];

      const expectedRateText = `${fromSymbol}1 = ${toSymbol}${roundRate(
        props.rates[DEFAULT_TO_CURRENCY] / props.rates[DEFAULT_FROM_CURRENCY]
      )}`;

      expect(
        controlWrapper
          .at(0)
          .text()
          .trim()
      ).toEqual(expectedRateText);
    });
  });
});
