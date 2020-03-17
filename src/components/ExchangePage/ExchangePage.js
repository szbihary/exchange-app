import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import PocketSelector from "../PocketSelector/PocketSelector";
import { roundRate, roundAmount } from "../../utils";
import { Container, Card, Row, Button } from "react-bootstrap";
import styles from "./ExchangePage.module.css";

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

  handleButtonClick = () => {
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

  getSymbolById = id =>
    this.props.pockets.find(pocket => pocket.id === id).symbol;

  render() {
    const currentRate = this.calculateRate();
    const exchangeAmount = roundAmount(this.state.amount * currentRate);
    const rateText = `${this.getSymbolById(
      this.state.fromCurrency
    )}1 = ${this.getSymbolById(this.state.toCurrency)}${currentRate}`;
    const isExchangeDisabled = !this.isBalanceAvailable();
    return (
      <Container className={styles.page}>
        <Card className={styles.card}>
          <Card.Header className={styles.header}>Exchange App</Card.Header>
          <Card.Body className={styles.body}>
            <Row className="row-cols-2">
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
            </Row>
            <div className={styles.currentRate}>
              <span className="badge badge-secondary">{rateText}</span>
            </div>
            <Row className="row-cols-2">
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
            </Row>
            <Row className={styles.footer}>
              <Button
                className={isExchangeDisabled ? styles.disabled : ""}
                onClick={this.handleButtonClick}
                disabled={isExchangeDisabled}
              >
                Exchange
              </Button>
            </Row>
          </Card.Body>
        </Card>
      </Container>
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
