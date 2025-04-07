import { BigNumber } from "bignumber.js";

export const checkValidEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const randomString = (length = 32) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getErrorText = (error) => {
  console.error(error);
  // console.log(typeof error)
  if (typeof error === "object") {
    if (error.message) return error.message;
  }
  return error;
};

/** Get amount balance by decimal as divider **/
export const getAmountDivider = (
  amount,
  decimal,
  format = 4,
  isFormat = true
) => {
  let x = new BigNumber(amount);
  let y = new BigNumber(10);
  let z = y.pow(decimal);
  if (isFormat) return x.div(z).toFormat(format);
  return x.div(z).toString();
};

export const getAmountMultiply = (amount, decimal) => {
  let x = new BigNumber(amount);
  let y = new BigNumber(10);
  let z = y.pow(decimal);
  return x.multipliedBy(z);
};

export const unixToDate = (unix) => {
  if (unix === 0) return "-";
  const date = new Date(unix * 1000);
  // const date = dateOrig.toUTCString();
  const d = date.getDate();
  const M = date.getMonth() + 1;
  const Y = date.getFullYear();
  const h = date.getHours();
  const i = date.getMinutes();
  return `${d < 10 ? "0" + d : d}/${M < 10 ? "0" + M : M}/${Y} ${
    h < 10 ? "0" + h : h
  }:${i < 10 ? "0" + i : i}`;
};

export const amountFormat = (amount, digit = 4) => {
  let a = new BigNumber(amount);
  if (a.toString().indexOf(".") < 0) {
    return a.toFormat(0);
  } else {
    return a.toFormat(digit);
  }
};

export const countAPY = (APR, loop) => {
  // console.log(APR,loop)
  const result = new BigNumber(
    ((1 + APR / 100 / (loop * 52.18)) ** (loop * 52.18) - 1) * 100
  );
  return result.toFixed(2);
  // let nAPR = (new BigNumber(APR)).dividedBy(100);
  // let nLoop = new BigNumber(loop);
  // const N = nLoop.multipliedBy(52.18);
  // // console.log("> N",N.toString())
  // const APR_N = nAPR.dividedBy(N);
  // // console.log("> APR_N",APR_N.toString())
  // const ONE_APR_N = APR_N.plus(1);
  // // console.log("> ONE_APR_N",ONE_APR_N.toString())
  // const X_N = ONE_APR_N.pow(N.toFixed(0));
  // // console.log("> X_N",X_N.toString())
  // const Y_1 = X_N.toNumber().minus(1);
  // console.log("> X_N",X_N.toString())
  // console.log("> Y_1",Y_1.toString())
  // alert(Y_1.toString());
  // console.log("Y_1",Y_1.toString());
  // // return Y_1;
};

export const formatNumber = (inputNumber, number, dollar) => {
  let formetedNumber = Number(inputNumber)
    .toFixed(number)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  let splitArray = formetedNumber.split(".");
  let finalValue;
  if (splitArray.length > 1) {
    formetedNumber = splitArray[0];
  }
  if (dollar === true) {
    finalValue = "$" + formetedNumber;
  } else {
    finalValue = formetedNumber;
  }
  return finalValue;
};

export const formatNumberWithComma = (inputNumber, number, dollar) => {
  let formetedNumber = Number(inputNumber).toFixed(number);
  let splitArray = formetedNumber.split(",");
  let finalValue;
  if (splitArray.length > 1) {
    formetedNumber = splitArray[0];
  }
  if (dollar === true) {
    finalValue = "$" + formetedNumber;
  } else {
    finalValue = formetedNumber;
  }
  return finalValue;
};

export const formatPercentage = (number, decimal) => {
  let formattedValue = Number(number).toFixed(decimal);
  return formattedValue + "%";
};

export const truncate = (text, length, suffix, length2) => {
  if (text?.length > length) {
    return text.substring(0, length) + suffix + text.substring(38, length2);
  } else {
    return text;
  }
};

export const truncateTxHash = (text, length, suffix, length2) => {
  if (text?.length > length) {
    return text.substring(0, length) + suffix + text.substring(60, length2);
  } else {
    return text;
  }
};

export const truncateSimple = (text, length, suffix, length2) => {
  if (text?.length > length) {
    return text.substring(0, length) + suffix + text.substring(48, length2);
  } else {
    return text;
  }
};

export const truncateSolana = (text, length, suffix, length2) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix + text.substring(88, length2);
  } else {
    return text;
  }
};

export const truncateFirst = (text, length, suffix) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};
