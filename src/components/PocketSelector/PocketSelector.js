import React from "react";

class PocketSelector extends React.Component {
  handlePocketChange = event => {
    const selectedPocketId = event.target.value;
    this.props.onPocketChange(selectedPocketId);
  };

  render() {
    const selectedPocket = this.props.pockets.find(
      pocket => pocket.currencyId === this.props.selectedCurrency
    );
    return (
      <div>
        <select
          value={this.props.selectedCurrency}
          onChange={this.handlePocketChange}
        >
          {this.props.pockets.map(pocket => (
            <option key={pocket.currencyId} value={pocket.currencyId}>
              {pocket.currencyId}
            </option>
          ))}
        </select>
        <div>
          {"Balance: "}
          {selectedPocket.currencySymbol}
          {selectedPocket.balance}
        </div>
      </div>
    );
  }
}

export default PocketSelector;
