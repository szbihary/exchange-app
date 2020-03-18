import React from "react";
import { shallow } from "enzyme";
import PocketSelector from "./PocketSelector";
import { getCurrencies } from "../../config";

const defaultProps = () => ({
  pockets: getCurrencies().map(currency => ({
    ...currency,
    balance: 1000
  })),
  selectedCurrency: "EUR",
  onPocketChange: jest.fn(pokcetId => null)
});

describe("PocketSelector", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = defaultProps();
    wrapper = shallow(<PocketSelector {...props} />);
  });

  describe("FormControl Component", () => {
    let controlWrapper;
    beforeEach(() => {
      controlWrapper = wrapper.find("FormControl");
    });
    it("exists", () => {
      expect(controlWrapper).toHaveLength(1);
    });
    it("has all child options with proper values and titles", () => {
      const optionsWrapper = controlWrapper.find("option");
      expect(optionsWrapper).toHaveLength(props.pockets.length);
      props.pockets.forEach((pocket, index) => {
        expect(optionsWrapper.at(index).props().children).toEqual(pocket.id);
        expect(optionsWrapper.at(index).props().value).toEqual(pocket.id);
        expect(optionsWrapper.at(index).props().title).toEqual(
          pocket.displayName
        );
      });
    });
    it("has the correct option selected", () => {
      expect(controlWrapper.props().value).toEqual(props.selectedCurrency);
    });
  });
  describe("Balance indicator", () => {
    let controlWrapper;
    beforeEach(() => {
      controlWrapper = wrapper.find(".text-muted");
    });
    it("exists", () => {
      expect(controlWrapper).toHaveLength(1);
    });
    it("shows the balance of the selected pocket", () => {
      const selectedPocket = props.pockets.find(
        pocket => pocket.id === props.selectedCurrency
      );
      const expectedBalance = `Balance: ${selectedPocket.symbol}${selectedPocket.balance}`;
      expect(controlWrapper.text()).toEqual(expectedBalance);
    });
  });
  describe("callback", () => {
    describe("onPocketChange", () => {
      it("is called when a currency pocket is selected", () => {
        const control = wrapper.find("FormControl").at(0);
        expect(props.onPocketChange).toHaveBeenCalledTimes(0);
        control.simulate("change", { target: { value: "GBP" } });
        expect(props.onPocketChange).toHaveBeenCalledTimes(1);
        expect(props.onPocketChange).toHaveBeenCalledWith("GBP");
      });
    });
  });
});
