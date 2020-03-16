import React from "react";

function CurrencyInput(props) {
  const validateInput = value => {
    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    props.onChange(parsedValue);
  };
  return (
    <div>
      <input
        type="text"
        pattern="[0-9]*" // add decimals
        onChange={event => validateInput(event.target.value)}
        value={props.value}
      />
    </div>
  );
}

export default CurrencyInput;
