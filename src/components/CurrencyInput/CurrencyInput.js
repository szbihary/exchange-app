import React from "react";
import { Form, FormControl } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { roundAmount } from "../../utils";
import styles from "./CurrencyInput.module.css";
import PropTypes from "prop-types";

class CurrencyInput extends React.Component {
  state = {
    isFocused: false
  };

  handleChange = floatValue => {
    if (this.state.isFocused) {
      this.props.onChange(Math.abs(floatValue));
    }
  };

  render() {
    return (
      <Form.Group className={styles.group}>
        <NumberFormat
          className={styles.input}
          prefix={
            this.props.value === 0
              ? ""
              : this.props.source === "from"
              ? "-"
              : "+"
          }
          value={roundAmount(this.props.value)}
          onValueChange={value => this.handleChange(value.floatValue)}
          decimalScale={2}
          thousandSeparator={true}
          customInput={FormControl}
          allowNegative={false}
          onFocus={() =>
            this.setState({
              isFocused: true
            })
          }
          onBlur={() =>
            this.setState({
              isFocused: false
            })
          }
        />
      </Form.Group>
    );
  }
}

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  source: PropTypes.oneOf(["to", "from"])
};

export default CurrencyInput;
