export function roundRate(number) {
  return Math.round((number + Number.EPSILON) * 10000) / 10000;
}

export function roundAmount(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}
