import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import PocketSelector from "../PocketSelector/PocketSelector";

class ExchangePage extends React.Component {
  state = {
    rate: 0.003,
    fromCurrency: "EUR",
    toCurrency: "USD",
    amount: 0
  };

  calculateRate() {
    return (
      this.props.rates[this.state.toCurrency] /
      this.props.rates[this.state.fromCurrency]
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    alert(this.state.amount * this.state.rate);
  };

  setAmount = (amount, source) => {
    const rate = this.calculateRate();
    let newAmount = source === "from" ? amount : amount / rate;
    this.setState({ amount: newAmount });
  };

  setCurrency(value, source) {
    this.setState({ [`${source}Currency`]: value });
  }

  render() {
    const currentRate = this.calculateRate();
    return (
      <div>
        <h2>Exchange app</h2>
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
          <div>{currentRate}</div>
          <PocketSelector
            pockets={this.props.pockets}
            selectedCurrency={this.state.toCurrency}
            onPocketChange={selectedPocketId =>
              this.setCurrency(selectedPocketId, "to")
            }
          />
          <CurrencyInput
            value={this.state.amount * currentRate}
            onChange={value => this.setAmount(value, "to")}
          />
          <input type="submit" value="Exchange" />
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
