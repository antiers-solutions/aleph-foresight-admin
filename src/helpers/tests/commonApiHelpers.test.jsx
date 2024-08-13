import UseGetApi from "../../hooks/useGetApi";
import { customToast } from "../../Common/Toast/toast";
import {
  getCrypto,
  getDataFromIpfs,
  getFee,
  handleLogout,
} from "../commonApiHelpers";
import { contractEvents } from "../../utils/contractHelpers";

jest.mock("../../hooks/useGetApi");
jest.mock("../../Common/Toast/toast", () => ({
  customToast: {
    error: jest.fn(),
  },
}));

jest.mock("../../utils/contractHelpers", () => ({
  contractEvents: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      clear: jest.fn(),
    },
    writable: true,
  });

  Object.defineProperty(window, "sessionStorage", {
    value: {
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCrypto", () => {
    it("should show error toast on API failure", async () => {
      const setCryptoList = jest.fn();
      const setDefaultCurrency = jest.fn();
      const formData = { crypto: "BTC", cryptoIconUrl: "btc.png" };

      const errorMessage = "API error";
      UseGetApi.mockRejectedValueOnce(new Error(errorMessage));

      await getCrypto(setCryptoList, setDefaultCurrency, formData);

      expect(customToast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("getDataFromIpfs", () => {
    it("should return data from IPFS URL", async () => {
      const url = "http://ipfs.io/ipfs/test";
      const expectedData = { name: "Test Coin", price: 100 };

      UseGetApi.mockResolvedValueOnce({ data: expectedData });

      const data = await getDataFromIpfs(url);

      expect(data).toEqual(expectedData);
    });

    it("should show error toast on API failure", async () => {
      const url = "http://ipfs.io/ipfs/test";
      const errorMessage = "IPFS error";

      UseGetApi.mockRejectedValueOnce(new Error(errorMessage));

      await getDataFromIpfs(url);

      expect(customToast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("handleLogout", () => {
    it("should logout user and clear storage", async () => {
      const setLoading = jest.fn();

      UseGetApi.mockResolvedValueOnce({});

      const result = await handleLogout(setLoading);

      expect(setLoading).toHaveBeenCalledWith(true);
      expect(localStorage.clear).toHaveBeenCalled();
      expect(sessionStorage.clear).toHaveBeenCalled();
      expect(result).toBe(true);
      expect(setLoading).toHaveBeenCalledWith(false);
    });

    it("should show error toast on API failure", async () => {
      const setLoading = jest.fn();
      const errorMessage = "Logout error";

      UseGetApi.mockRejectedValueOnce(new Error(errorMessage));

      const result = await handleLogout(setLoading);

      expect(setLoading).toHaveBeenCalledWith(true);
      expect(customToast.error).toHaveBeenCalledWith(errorMessage);
      expect(result).toBe(false);
      expect(setLoading).toHaveBeenCalledWith(false);
    });

    it("should handle case when setLoading is not provided", async () => {
      UseGetApi.mockResolvedValueOnce({});

      const result = await handleLogout();

      expect(localStorage.clear).toHaveBeenCalled();
      expect(sessionStorage.clear).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});

// get Fee
describe("getFee", () => {
  const mockSetIsLoading = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks to avoid state leakage between tests
  });

  test("should return the correct fee when contractEvents resolves", async () => {
    // Mocking contractEvents to resolve with a value
    const mockResponse = 5000; // Example value
    contractEvents.mockResolvedValue(mockResponse);

    const fee = await getFee(mockSetIsLoading, "exampleEvent");

    expect(contractEvents).toHaveBeenCalledWith({ eventName: "exampleEvent" });
    expect(fee).toBe(mockResponse / 100);
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  test("should handle errors from contractEvents", async () => {
    // Mocking contractEvents to reject with an error
    const mockError = new Error("Network Error");
    contractEvents.mockRejectedValue(mockError);

    const fee = await getFee(mockSetIsLoading, "exampleEvent");

    expect(contractEvents).toHaveBeenCalledWith({ eventName: "exampleEvent" });
    expect(fee).toBe(mockError);
    expect(customToast.error).toHaveBeenCalledWith(mockError.message);
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  test("should set loading state correctly", async () => {
    // Mocking contractEvents to resolve with a value
    contractEvents.mockResolvedValue(10000); // Example value

    await getFee(mockSetIsLoading, "exampleEvent");

    expect(mockSetIsLoading).toHaveBeenCalledTimes(2); // Called once at the start and once at the end
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });
});
