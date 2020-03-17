import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../redux/actions/actionCreators";
import { getCurrencyIds } from "../../config";

// const UPDATE_INTERVAL = 10000; // 10 sec
const BASE_CURRENCY = "USD";
const currencyIds = getCurrencyIds();

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
    const currencyIdList = currencyIds.join(",");
    fetch(
      `https://api.exchangeratesapi.io/latest?base=${BASE_CURRENCY}&symbols=${currencyIdList}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(`Resposne status code: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const newFXRates = { ...data.rates, [BASE_CURRENCY]: 1 };
        this.props.actions.updateFxRates(newFXRates);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
}

FXRatePoller.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(FXRatePoller);
