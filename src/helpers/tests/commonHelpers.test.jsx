import {
  CapitalizeFirstLetter,
  convertLeadingZeros,
  errorSetterFunction,
  eventNameHandler,
  getCurrencyIconUrl,
  toPrecise,
} from "../commonHelpers";
import trimAddressLength from "../commonHelpers";
import { handleCreateEventValidations } from "../handleCreateEventValiadtions";
import moment from "moment";

jest.mock("../handleCreateEventValiadtions");

jest.mock("moment", () => {
  const moment = jest.requireActual("moment");
  return {
    ...moment,
    unix: jest.fn((timestamp) => ({
      format: jest.fn(() => `formattedDate(${timestamp})`),
    })),
  };
});

describe("trimAddressLength", () => {
  it("should return trimmed address with default lengths", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    const expected = "0x12345...2345678";
    expect(trimAddressLength(address)).toBe(expected);
  });

  it("should return trimmed address with custom lengths", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    const expected = "0x12345678...cdef12345678";
    expect(trimAddressLength(address, 10, 12)).toBe(expected);
  });

  it('should return "-" if address is empty', () => {
    expect(trimAddressLength("")).toBe("-");
    expect(trimAddressLength(null)).toBe("-");
  });
});

describe("errorSetterFunction", () => {
  it("should set errors correctly", () => {
    const data = { field1: "value1", field2: "value2" };
    const mockErrors = { field1: "error1", field2: "error2" };

    handleCreateEventValidations.mockImplementation((key, value) => ({
      [key]: mockErrors[key],
    }));

    const result = errorSetterFunction(data);
    expect(result).toEqual(mockErrors);
  });

  it("should handle empty data correctly", () => {
    const data = {};
    const result = errorSetterFunction(data);
    expect(result).toEqual({});
  });
});

describe("toPrecise", () => {
  it("should return number with specified precision", () => {
    const number = 123.456789;
    const precision = 2;
    const expected = "123.45";
    expect(toPrecise(number, precision)).toBe(expected);
  });

  it("should return integer part if precision is 0", () => {
    const number = 123.456789;
    const precision = 0;
    const expected = "123.";
    expect(toPrecise(number, precision)).toBe(expected);
  });

  it('should return "0" if number is falsy', () => {
    expect(toPrecise(null, 2)).toBe("0");
    expect(toPrecise(undefined, 2)).toBe("0");
    expect(toPrecise(0, 2)).toBe("0");
  });

  it('should handle trailing ".00" correctly', () => {
    const number = 123.0;
    const precision = 2;
    const expected = "123";
    expect(toPrecise(number, precision)).toBe(expected);
  });
});

// Capitalize function

describe("CapitalizeFirstLetter function", () => {
  it("should capitalize the first letter of a string", () => {
    const result = CapitalizeFirstLetter("hello");
    expect(result).toBe("Hello");
  });

  it("should handle empty string", () => {
    const result = CapitalizeFirstLetter("");
    expect(result).toBe("-");
  });

  it("should handle undefined input", () => {
    const result = CapitalizeFirstLetter(undefined);
    expect(result).toBe("-");
  });

  it("should handle null input", () => {
    const result = CapitalizeFirstLetter(null);
    expect(result).toBe("-");
  });

  it("should handle strings with only one letter", () => {
    const result = CapitalizeFirstLetter("a");
    expect(result).toBe("A");
  });
});

// Event name handler function

const mockCoinName = "Bitcoin";
const mockPrice = 50000;
const mockTargetDate = 1627027200; // Mock timestamp in Unix format

describe("eventNameHandler function", () => {
  it("should generate event title with valid inputs", () => {
    const result = eventNameHandler(mockCoinName, mockPrice, mockTargetDate);
    const expected = `${mockCoinName} to be priced at ${mockPrice} USDT or more as on formattedDate(${mockTargetDate}) ?`;
    expect(result).toBe(expected);
  });

  it("should handle missing coinName", () => {
    const result = eventNameHandler(undefined, mockPrice, mockTargetDate);
    const expected = `- to be priced at ${mockPrice} USDT or more as on formattedDate(${mockTargetDate}) ?`;
    expect(result).toBe(expected);
  });

  it("should handle missing price", () => {
    const result = eventNameHandler(mockCoinName, undefined, mockTargetDate);
    const expected = `${mockCoinName} to be priced at 0 USDT or more as on formattedDate(${mockTargetDate}) ?`;
    expect(result).toBe(expected);
  });

  it("should handle missing targetDate", () => {
    const result = eventNameHandler(mockCoinName, mockPrice, undefined);
    const expected = `${mockCoinName} to be priced at ${mockPrice} USDT or more as on formattedDate(${undefined}) ?`;
    expect(result).toBe(expected);
  });

  it("should handle all missing inputs", () => {
    const result = eventNameHandler(undefined, undefined, undefined);
    const expected = `- to be priced at 0 USDT or more as on formattedDate(${undefined}) ?`;
    expect(result).toBe(expected);
  });
});

// Convert Leading Zeros

describe("convertLeadingZeros", () => {
  test("should return an empty string for an empty input", () => {
    expect(convertLeadingZeros("")).toBe("");
  });

  test("should remove leading zeros from integer part", () => {
    expect(convertLeadingZeros("000123")).toBe("123");
    expect(convertLeadingZeros("000000")).toBe("0");
    expect(convertLeadingZeros("000001")).toBe("1");
  });

  test("should remove leading zeros from decimal part but retain the decimal point", () => {
    expect(convertLeadingZeros("000123.000456")).toBe("123.000456");
    expect(convertLeadingZeros("000000.000000")).toBe("0.000000");
    expect(convertLeadingZeros("000001.000002")).toBe("1.000002");
  });

  test("should handle values with no leading zeros", () => {
    expect(convertLeadingZeros("123")).toBe("123");
    expect(convertLeadingZeros("123.456")).toBe("123.456");
  });
});

// get crypto icon url

describe("getCurrencyIconUrl", () => {
  test("should return the cryptocurrency object when the symbol is found", () => {
    const cryptoList = [
      { symbol: "BTC", iconUrl: "https://example.com/btc.png" },
      { symbol: "ETH", iconUrl: "https://example.com/eth.png" },
    ];
    const symbol = "ETH";
    const result = getCurrencyIconUrl(cryptoList, symbol);

    expect(result).toEqual({
      symbol: "ETH",
      iconUrl: "https://example.com/eth.png",
    });
  });

  test("should return undefined when the symbol is not found", () => {
    const cryptoList = [
      { symbol: "BTC", iconUrl: "https://example.com/btc.png" },
      { symbol: "ETH", iconUrl: "https://example.com/eth.png" },
    ];
    const symbol = "LTC";
    const result = getCurrencyIconUrl(cryptoList, symbol);

    expect(result).toBeUndefined();
  });
});
