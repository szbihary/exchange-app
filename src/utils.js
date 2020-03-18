import { RATE_DECIMAL_NUMBER, AMOUNT_DECIMAL_NUMBER } from "./config";

function roundByDecimals(number, decimalDigit) {
  return (
    Math.round((number + Number.EPSILON) * Math.pow(10, decimalDigit)) /
    Math.pow(10, decimalDigit)
  );
}

export function roundRate(number) {
  return roundByDecimals(number, RATE_DECIMAL_NUMBER);
}

export function roundAmount(number) {
  return roundByDecimals(number, AMOUNT_DECIMAL_NUMBER);
}
