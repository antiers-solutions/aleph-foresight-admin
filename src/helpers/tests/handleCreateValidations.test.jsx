import { handleCreateEventValidations } from "../handleCreateEventValiadtions";
import { minPriceLevel, maxPriceLevel } from "../../constant/constants";

describe("handleCreateEventValidations", () => {
  it("should validate crypto field", () => {
    const errors = handleCreateEventValidations("crypto", "");
    expect(errors.crypto).toBe("Choose Crypto");

    const errorsValid = handleCreateEventValidations("crypto", "BTC");
    expect(errorsValid.crypto).toBe("");
  });

  it("should validate price field", () => {
    const errorsEmpty = handleCreateEventValidations("price", "");
    expect(errorsEmpty.price).toBe("Enter Price");

    const errorsMin = handleCreateEventValidations("price", 0.01); // Assuming minPriceLevel is 0.1
    expect(errorsMin.price).toBe(
      `Minimum price level is ${minPriceLevel} & Maximum is ${maxPriceLevel}`
    );

    const errorsMax = handleCreateEventValidations("price", 100000934); // Assuming maxPriceLevel is 1000000
    expect(errorsMax.price).toBe(
      `Minimum price level is ${minPriceLevel} & Maximum is ${maxPriceLevel}`
    );

    const errorsValid = handleCreateEventValidations("price", 50); // Assuming within valid range
    expect(errorsValid.price).toBe("");
  });

  it("should validate targetDate field", () => {
    const errors = handleCreateEventValidations("targetDate", "");
    expect(errors.targetDate).toBe("Choose Target Time");

    const errorsValid = handleCreateEventValidations(
      "targetDate",
      "2024-12-31"
    ); // Assuming valid date
    expect(errorsValid.targetDate).toBe("");
  });

  // Add more test cases for other fields as needed

  it("should not set error for unknown fields", () => {
    const errors = handleCreateEventValidations("unknownField", "value");
    expect(errors.unknownField).toBeUndefined();
  });
});
