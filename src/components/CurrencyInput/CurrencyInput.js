import React from "react";
import { Form, FormControl } from "react-bootstrap";
import NumberFormat from "react-number-format";
import styles from "./CurrencyInput.module.css";
import { roundAmount } from "../../utils";

function CurrencyInput(props) {
  const handleChange = floatValue => {
    if (props.value === floatValue) {
      return;
    }
    const newValue = floatValue === 0 && floatValue === "." ? "0." : floatValue;
    props.onChange(newValue);
  };
  return (
    <Form.Group className={styles.Group}>
      <NumberFormat
        className={styles.input}
        value={roundAmount(props.value)}
        onValueChange={value => handleChange(value.floatValue)}
        decimalScale={2}
        thousandSeparator={true}
        customInput={FormControl}
        allowNegative={false}
      />
    </Form.Group>
  );
}

export default CurrencyInput;
