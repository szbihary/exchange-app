import React from "react";
import { mount } from "enzyme";
import CurrencyInput from "./CurrencyInput";

const defaultProps = {
  value: 1,
  source: "to",
  onChange: jest.fn(pokcetId => null)
};

describe("CurrencyInput", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = defaultProps;
    wrapper = mount(<CurrencyInput {...props} />);
  });

  describe("NumberFormat Component", () => {
    let controlWrapper;
    beforeEach(() => {
      controlWrapper = wrapper.find("NumberFormat");
    });
    it("exists", () => {
      expect(controlWrapper).toHaveLength(1);
    });
    it("has the default value set", () => {
      expect(controlWrapper.at(0).props().value).toEqual(defaultProps.value);
    });
    it("has isFocused state false by default", () => {
      expect(wrapper.state().isFocused).toEqual(false);
    });
  });
});
