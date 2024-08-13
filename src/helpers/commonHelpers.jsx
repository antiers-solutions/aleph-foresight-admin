import moment from "moment";
import { handleCreateEventValidations } from "./handleCreateEventValiadtions";
import { EventDateFormat } from "../constant/constants";
import { timeStampToDate } from "./commonTimeFunctions";
import { env } from "../constant/envConstant";

const trimAddressLength = (address = "", startLen = 7, endLen = 7) => {
  if (typeof address !== "string" || !address) return "-";
  return `${address.substring(0, startLen)}...${address.substring(
    address.length - endLen,
    address.length
  )}`;
};

export default trimAddressLength;

// function to check and set errors in state
export const errorSetterFunction = (data) => {
  let newErr = {};
  for (let key in data) {
    newErr = {
      ...newErr,
      ...handleCreateEventValidations(key, data[key]),
    };
  }
  return newErr;
};

export const toPrecise = (number, precision) => {
  if (!number) return "0";
  let originalString = number?.toString();
  if (!originalString?.includes(".")) {
    return originalString;
  }
  let decimalIndex = originalString?.indexOf(".");
  let truncatedString = originalString?.substring(
    0,
    decimalIndex + (precision + 1)
  );
  if (truncatedString?.endsWith(".00")) {
    truncatedString = truncatedString?.slice(0, -(precision + 1));
  }
  return truncatedString;
};

export const CapitalizeFirstLetter = (str) => {
  if (!str) return "-";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const eventNameHandler = (coinName, price, targetDate) => {
  let eventTitle = `${coinName || "-"} to be priced at ${
    price || 0
  } USDT or more as on${" "}${moment
    .unix(targetDate)
    .format(EventDateFormat)} ?`;
  return eventTitle;
};

export const convertLeadingZeros = (value) => {
  if (value === "") return "";
  if (value.includes(".")) {
    let [integerPart, decimalPart] = value.split(".");
    integerPart = String(Number(integerPart));
    return integerPart === "0"
      ? `0.${decimalPart}`
      : `${integerPart}.${decimalPart}`;
  } else {
    return String(Number(value));
  }
};

export const checkEventEditable = (date) => {
  return (
    moment().diff(moment(timeStampToDate(date)), env.editInterval) <
    env.editTime
  );
};

export const getCurrencyIconUrl = (cryptoList, symbol) => {
  const selectedCrypto = cryptoList?.find(
    (crypto) => crypto?.symbol === symbol
  );
  return selectedCrypto;
};
