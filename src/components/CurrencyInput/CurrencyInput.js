import React from "react";
import { Form, FormControl } from "react-bootstrap";
import styles from "./CurrencyInput.module.css";

function CurrencyInput(props) {
  const validateInput = value => {
    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    props.onChange(parsedValue);
  };
  return (
    <Form.Group className={styles.Group}>
      <FormControl
        className={styles.input}
        type="string"
        maxLength="20"
        // pattern="[0-9]*" // add decimals and validation
        onChange={event => validateInput(event.target.value)}
        value={props.value}
      />
    </Form.Group>
  );
}

export default CurrencyInput;
