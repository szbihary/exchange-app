import { DECIMAL_PLACES } from "./config";

function round(number, decimals) {
  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
}

export function roundRate(number) {
  return round(number, DECIMAL_PLACES.RATE);
}

export function roundAmount(number) {
  return round(number, DECIMAL_PLACES.AMOUNT);
}
