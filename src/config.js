const CURRENCIES = [
  { id: "USD", symbol: "$", displayName: "US Dollar" },
  { id: "EUR", symbol: "€", displayName: "Euro" },
  { id: "GBP", symbol: "£", displayName: "British Pound" },
  { id: "NOK", symbol: "Kr", displayName: "Norwegian Krone" },
  { id: "HUF", symbol: "Ft", displayName: "Hungarian Forint" }
];

export const getCurrencies = () => CURRENCIES;
export const getCurrencyIds = () => CURRENCIES.map(currency => currency.id);
export const getCurrencySymbols = () =>
  CURRENCIES.reduce(
    (o, currency) => Object.assign(o, { [currency.id]: currency.symbol }),
    {}
  );

export const UPDATE_INTERVAL_MS = 10000;
export const BASE_CURRENCY = "EUR";

export const RATE_DECIMAL_NUMBER = 4;
export const AMOUNT_DECIMAL_NUMBER = 2;

export const DEFAULT_FROM_CURRENCY = "EUR";
export const DEFAULT_TO_CURRENCY = "USD";

export const EXCHANGE_API_BASE_URL = "http://api.exchangeratesapi.io";
const API_ACCESS_KEY = "563b5ad7b615e2b55cd03350ec1e86ae";

export const getExchangeRateURL = (currencyIds = getCurrencyIds()) => {
  const currencyIdList = currencyIds.join(",");
  return `${EXCHANGE_API_BASE_URL}/latest?access_key=${API_ACCESS_KEY}&base=${BASE_CURRENCY}&symbols=${currencyIdList}`;
};
