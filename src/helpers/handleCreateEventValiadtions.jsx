import { maxPriceLevel, minPriceLevel } from "../constant/constants";

export const handleCreateEventValidations = (name, value) => {
  let newErr = {};
  const isValueEmpty = !value;

  const setError = (key, message) => {
    newErr[key] = message;
  };

  const handleCryptoValidation = () => {
    setError(name, isValueEmpty ? "Choose Crypto" : "");
  };

  const handlePriceValidation = () => {
    setError(
      name,
      isValueEmpty
        ? "Enter Price"
        : value < minPriceLevel || value > maxPriceLevel
        ? `Minimum price level is ${minPriceLevel} & Maximum is ${maxPriceLevel}`
        : ""
    );
  };

  const handleTargetDateValidation = () => {
    setError(name, isValueEmpty ? "Choose Target Time" : "");
  };

  switch (name) {
    case "crypto":
      handleCryptoValidation();
      break;
    case "price":
      handlePriceValidation();
      break;
    case "targetDate":
      handleTargetDateValidation();
      break;
    default:
      break;
  }

  return newErr;
};
