import React from "react";
import { Form } from "react-bootstrap";
import { roundAmount } from "../../utils";
import styles from "./PocketSelector.module.css";
import PropTypes from "prop-types";

function PocketSelector(props) {
  const selectedPocket = props.pockets.find(
    pocket => pocket.id === props.selectedCurrency
  );

  return (
    <Form.Group className={styles.group}>
      <Form.Control
        className={styles.control}
        as="select"
        value={props.selectedCurrency}
        onChange={event => props.onPocketChange(event.target.value)}
      >
        {props.pockets.map(pocket => (
          <option
            className={styles.control}
            key={pocket.id}
            value={pocket.id}
            title={pocket.displayName}
          >
            {pocket.id}
          </option>
        ))}
      </Form.Control>
      <div className="text-muted">
        {`Balance: ${selectedPocket.symbol}${roundAmount(
          selectedPocket.balance
        )}`}
      </div>
    </Form.Group>
  );
}

PocketSelector.propTypes = {
  pockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      displayName: PropTypes.string
    })
  )
};

export default PocketSelector;
