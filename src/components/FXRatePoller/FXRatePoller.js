import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";

const UPDATE_INTERVAL = 10000; //ms
const BASE_CURRENCY = "USD";

// function withFXRatePoller(WrappedComponents) {
class FXRatePoller extends React.Component {
  componentDidMount() {
    this.fetchRates();
    // this.timerId = setInterval(this.fetchRates, UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    if (this.timerId) {
      // clearInterval(this.timerId);
    }
  }

  render() {
    return <div />;
  }

  fetchRates = () => {
    const currencies = this.props.currencies
      .map(currency => currency.currencyId)
      .join(",");
    fetch(
      `https://api.exchangeratesapi.io/latest?base=${BASE_CURRENCY}&symbols=${currencies}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const newFXRates = this.calculateRates(data.rates);
        this.props.actions.updateFxRates(newFXRates);
        return data;
      })
      .catch(error => {
        console.error("Error:", error);
        // throw Error;
      });
  };

  calculateRates(rates) {
    // convert each to USD than convert to another currency!
    const newRatesToBaseCurrency = { ...rates, USD: 1 };
    // return newRatesToBaseCurrency.map((rate, _i, array) => )
    return newRatesToBaseCurrency;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(FXRatePoller);
