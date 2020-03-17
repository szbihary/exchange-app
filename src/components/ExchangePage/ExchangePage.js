import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import PocketSelector from "../PocketSelector/PocketSelector";
import { roundRate, roundAmount } from "../../utils";

class ExchangePage extends React.Component {
  state = {
    rate: 0.003,
    fromCurrency: "EUR",
    toCurrency: "USD",
    amount: 0
  };

  calculateRate = () => {
    const rate =
      this.props.rates[this.state.toCurrency] /
      this.props.rates[this.state.fromCurrency];
    return roundRate(rate);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { amount, fromCurrency, toCurrency } = this.state;
    this.props.actions.exchangeMoney({ amount, fromCurrency, toCurrency });
  };

  setAmount = (inputAmount, source) => {
    const amount =
      source === "from" ? inputAmount : inputAmount / this.calculateRate();
    this.setState({
      amount: roundAmount(amount)
    });
  };

  setCurrency = (currencyId, source) => {
    if (source === "from") {
      this.setState({
        [`${source}Currency`]: currencyId
      });
    } else {
      this.setState({
        [`${source}Currency`]: currencyId
      });
    }
  };

  isBalanceAvailable = () => {
    const balance = this.props.pockets.find(
      pocket => pocket.id === this.state.fromCurrency
    ).balance;
    return this.state.amount > 0 && balance >= this.state.amount;
  };

  render() {
    const currentRate = this.calculateRate();
    const exchangeAmount = roundAmount(this.state.amount * currentRate);
    return (
      <div>
        <h2>Exchange App</h2>
        <form onSubmit={this.handleSubmit}>
          <PocketSelector
            pockets={this.props.pockets}
            selectedCurrency={this.state.fromCurrency}
            onPocketChange={selectedPocketId =>
              this.setCurrency(selectedPocketId, "from")
            }
          />
          <CurrencyInput
            value={this.state.amount}
            onChange={value => this.setAmount(value, "from")}
          />
          <div>Rate: {currentRate}</div>
          <PocketSelector
            pockets={this.props.pockets}
            selectedCurrency={this.state.toCurrency}
            onPocketChange={selectedPocketId =>
              this.setCurrency(selectedPocketId, "to")
            }
          />
          <CurrencyInput
            value={exchangeAmount}
            onChange={value => this.setAmount(value, "to")}
          />
          <input
            type="submit"
            value="Exchange"
            disabled={!this.isBalanceAvailable()}
          />
        </form>
      </div>
    );
  }
}

ExchangePage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pockets: state.pockets,
    rates: state.rates
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);
