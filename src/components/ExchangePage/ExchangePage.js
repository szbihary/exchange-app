import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import PocketSelector from "../PocketSelector/PocketSelector";
import { roundRate } from "../../utils";
import { Container, Card, Row, Button } from "react-bootstrap";
import { GraphUp, ArrowUpDown } from "react-bootstrap-icons";
import styles from "./ExchangePage.module.css";

class ExchangePage extends React.Component {
  state = {
    rate: 1,
    fromCurrency: "EUR",
    toCurrency: "GBP",
    amount: 0
  };

  calculateRate = () => {
    return (
      this.props.rates[this.state.toCurrency] /
      this.props.rates[this.state.fromCurrency]
    );
  };

  handleButtonClick = () => {
    const { amount, fromCurrency, toCurrency } = this.state;
    this.props.actions.exchangeMoney({ amount, fromCurrency, toCurrency });
  };

  setAmount = (inputAmount, source) => {
    const amount =
      source === "from" ? inputAmount : inputAmount / this.calculateRate();
    this.setState({
      amount
    });
  };

  setCurrency = (currencyId, source) => {
    const otherSource = `${source === "from" ? "to" : "from"}Currency`;
    // if other currency is the same as the selected one, swap them
    if (this.state[otherSource] === currencyId) {
      this.swapPockets();
    } else {
      this.setState({
        [`${source}Currency`]: currencyId
      });
    }
  };

  swapPockets = () => {
    this.setState(prevState => ({
      fromCurrency: prevState.toCurrency,
      toCurrency: prevState.fromCurrency,
      amount: prevState.amount * this.calculateRate()
    }));
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
    const exchangeAmount = this.state.amount * currentRate;
    const rateText = `  ${this.getSymbolById(
      this.state.fromCurrency
    )}1 = ${this.getSymbolById(this.state.toCurrency)}${roundRate(
      currentRate
    )}`;
    const isExchangeDisabled =
      !this.isBalanceAvailable() ||
      this.state.fromCurrency === this.state.toCurrency;
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
                source={"from"}
                onChange={value => {
                  this.setAmount(value, "from");
                }}
              />
            </Row>
            <Row className={styles.rate}>
              <div className={styles.swap}>
                <div
                  className="badge badge-light"
                  title="Swap pockets"
                  onClick={this.swapPockets}
                >
                  <ArrowUpDown color="black" size={16} />
                </div>
              </div>
              <div className="badge badge-light">
                <GraphUp color="black" size={16} />
                <span className={styles.rateText}>{rateText}</span>
              </div>
            </Row>
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
                source={"to"}
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
