import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import PocketSelector from "../PocketSelector/PocketSelector";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
import { roundRate, roundAmount } from "../../utils";
import { Container, Card, Row, Button } from "react-bootstrap";
import { GraphUp,ArrowDownUp, ArrowRepeat } from "react-bootstrap-icons";
import styles from "./ExchangePage.module.css";
import { DEFAULT_FROM_CURRENCY, DEFAULT_TO_CURRENCY } from "../../config";

export class ExchangePage extends React.Component {
  state = {
    fromCurrency: DEFAULT_FROM_CURRENCY,
    toCurrency: DEFAULT_TO_CURRENCY,
    amount: 0,
    confirmationText: null
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
    this.setState({
      confirmationText: this.getConfirmationText()
    });
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

  getRateText = () =>
    `  ${this.getSymbolById(this.state.fromCurrency)}1 = ${this.getSymbolById(
      this.state.toCurrency
    )}${roundRate(this.calculateRate())}`;

  render() {
    const isExchangeDisabled =
      !this.isBalanceAvailable() ||
      this.state.fromCurrency === this.state.toCurrency;

    return (
      <Container className={styles.page}>
        <Card className={styles.card}>
          <Card.Header className={styles.header}>
            <ArrowRepeat color="black" size={28} />
            <span className={styles.headerText}>Exchange App</span>
          </Card.Header>
          <Card.Body className={styles.body}>
            {this.renderPocketForm({
              source: "from",
              amount: this.state.amount
            })}
            <Row className={styles.rate}>
              <div className={styles.swap}>
                <div
                  className="badge badge-light"
                  title="Swap pockets"
                  onClick={this.swapPockets}
                >
                  <ArrowDownUp color="#0069d9" size={16} />
                </div>
              </div>
              <div className="badge badge-light">
                <GraphUp color="#0069d9" size={16} />
                <span id="currentRate" className={styles.rateText}>
                  {this.getRateText()}
                </span>
              </div>
            </Row>
            {this.renderPocketForm({
              source: "to",
              amount: this.state.amount * this.calculateRate()
            })}
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
        <div className={styles.toastContainer}>
          {!!this.state.confirmationText && this.renderSuccessDialog()}
        </div>
      </Container>
    );
  }

  renderPocketForm({ source, amount }) {
    return (
      <Row className="row-cols-2">
        <PocketSelector
          pockets={this.props.pockets}
          selectedCurrency={
            source === "from" ? this.state.fromCurrency : this.state.toCurrency
          }
          onPocketChange={selectedPocketId =>
            this.setCurrency(selectedPocketId, source)
          }
        />
        <CurrencyInput
          value={amount}
          source={source}
          onChange={value => this.setAmount(value, source)}
        />
      </Row>
    );
  }

  renderSuccessDialog() {
    return (
      <SuccessDialog
        show={!!this.state.confirmationText}
        handleClose={() => {
          this.setState({
            confirmationText: null,
            amount: 0
          });
        }}
        message={this.state.confirmationText}
      />
    );
  }

  getConfirmationText = () => {
    const toAmount = roundAmount(this.state.amount * this.calculateRate());
    const fromSymbol = this.props.pockets.find(
      pocket => pocket.id === this.state.fromCurrency
    ).symbol;
    const toSymbol = this.props.pockets.find(
      pocket => pocket.id === this.state.toCurrency
    ).symbol;

    return `You exchanged ${fromSymbol}${roundAmount(
      this.state.amount
    )} to ${toSymbol}${toAmount} successfully.`;
  };
}

ExchangePage.propTypes = {
  actions: PropTypes.object.isRequired,
  pockets: PropTypes.arrayOf(PropTypes.object),
  rates: PropTypes.objectOf(PropTypes.number)
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
