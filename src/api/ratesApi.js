import { handleResponse, handleError } from "./apiUtils";
import { getExchangeRateURL } from "../config";

export function fetchRates() {
  const url = getExchangeRateURL();
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}
