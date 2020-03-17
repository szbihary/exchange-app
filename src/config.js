const CURRENCIES = [
  { id: "USD", symbol: "$", displayName: "US Dollar" },
  { id: "EUR", symbol: "€", displayName: "Euro" },
  { id: "GBP", symbol: "£", displayName: "British Pound" },
  { id: "NOK", symbol: "Kr", displayName: "Norwegian Krone" },
  { id: "HUF", symbol: "Ft", displayName: "Hungarian Forint" }
];

export const getCurrencies = () => CURRENCIES;
export const getCurrencyIds = () => CURRENCIES.map(currency => currency.id);

export const DECIMAL_PLACES = {
  AMOUNT: 2,
  RATE: 4
};
