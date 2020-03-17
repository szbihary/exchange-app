const CURRENCIES = [
  { id: "USD", symbol: "$", displayName: "Dollar" },
  { id: "EUR", symbol: "€", displayName: "Euro" },
  { id: "GBP", symbol: "£", displayName: "Pound" },
  { id: "NOK", symbol: "Kr", displayName: "Krone" },
  { id: "HUF", symbol: "Ft", displayName: "Forint" }
];

export const getCurrencies = () => CURRENCIES;
export const getCurrencyIds = () => CURRENCIES.map(currency => currency.id);

export const DECIMAL_PLACES = {
  AMOUNT: 2,
  RATE: 4
};
