const CURRENCIES = [
  { id: "USD", symbol: "$", displayName: "US Dollar" },
  { id: "EUR", symbol: "€", displayName: "Euro" },
  { id: "GBP", symbol: "£", displayName: "British Pound" },
  { id: "NOK", symbol: "Kr", displayName: "Norwegian Krone" },
  { id: "HUF", symbol: "Ft", displayName: "Hungarian Forint" }
];

export const getCurrencies = () => CURRENCIES;
export const getCurrencyIds = () => CURRENCIES.map(currency => currency.id);

export const UPDATE_INTERVAL_MS = 10000;
export const BASE_CURRENCY = "USD";

export const RATE_DECIMAL_NUMBER = 4;
export const AMOUNT_DECIMAL_NUMBER = 2;

export const DEFAULT_FROM_CURRENCY = "EUR";
export const DEFAULT_TO_CURRENCY = "USD";

export const EXCHANGE_API_BASE_URL = "https://api.exchangeratesapi.io";
