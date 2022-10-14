/* eslint-disable radix */
export const validateCode = (code) => {
  if (code.length !== 13 || code.substring(0, 3) !== '978') return false;

  const codeDigit = parseInt(code[code.length - 1]);
  let multiplier = 0;

  const codeSum = code
    .substring(0, 12)
    .split('')
    .reduce((total, num) => {
      multiplier = multiplier === 1 ? 3 : 1;
      return total + parseInt(num) * multiplier;
    }, 0);

  const validCode = 10 - (codeSum % 10);

  return codeDigit === validCode;
};
