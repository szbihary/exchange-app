import { handleResponse, handleError } from "./apiUtils";
import {
  EXCHANGE_API_BASE_URL,
  BASE_CURRENCY,
  getCurrencyIds
} from "../config";

export function fetchRates(currencyIds = getCurrencyIds()) {
  const currencyIdList = currencyIds.join(",");
  return fetch(
    `${EXCHANGE_API_BASE_URL}/latest?base=${BASE_CURRENCY}&symbols=${currencyIdList}`
  )
    .then(handleResponse)
    .catch(handleError);
}
