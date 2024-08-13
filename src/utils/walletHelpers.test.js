import {
  waitForReceipt,
  connectWalletHandler,
  setLoggedIn,
  isLoggedIn,
} from "./walletHelpers"; // Adjust the path as needed

// waitForReceipt
describe("waitForReceipt", () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.resetAllMocks();
  });

  it("should resolve when receipt is returned", async () => {
    // Mock window.ethereum.request to return a receipt
    const mockReceipt = { status: "0x1", transactionHash: "0x123" };
    window.ethereum = {
      request: jest.fn(() => Promise.resolve(mockReceipt)),
    };

    const transactionHash = "0x123";

    const receipt = await waitForReceipt(transactionHash);

    expect(receipt).toEqual(mockReceipt);
    expect(window.ethereum.request).toHaveBeenCalledTimes(1);
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "eth_getTransactionReceipt",
      params: [transactionHash],
    });
  });

  it("should reject when an error occurs", async () => {
    // Mock window.ethereum.request to throw an error
    const mockError = new Error("Network error");
    window.ethereum = {
      request: jest.fn(() => Promise.reject(mockError)),
    };

    const transactionHash = "0x123";

    await expect(waitForReceipt(transactionHash)).rejects.toThrow(mockError);
    expect(window.ethereum.request).toHaveBeenCalledTimes(1);
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "eth_getTransactionReceipt",
      params: [transactionHash],
    });
  });

  it("should keep retrying until receipt is returned", async () => {
    // Mock window.ethereum.request to initially return null and then return a receipt
    const mockReceipt = { status: "0x1", transactionHash: "0x123" };
    window.ethereum = {
      request: jest
        .fn()
        .mockResolvedValueOnce(null) // First call returns null
        .mockResolvedValueOnce(mockReceipt), // Second call returns the receipt
    };

    const transactionHash = "0x123";

    const receipt = await waitForReceipt(transactionHash);

    expect(receipt).toEqual(mockReceipt);
    expect(window.ethereum.request).toHaveBeenCalledTimes(2);
  });
});

//Connect Wallet Handler

describe("connectWalletHandler", () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.resetAllMocks();
  });

  it("should return the wallet address on successful connection", async () => {
    // Mock window.ethereum.request to return a valid address
    const mockAddress = ["0x1234567890abcdef1234567890abcdef12345678"];
    window.ethereum = {
      request: jest.fn(() => Promise.resolve(mockAddress)),
    };

    const address = await connectWalletHandler();

    expect(address).toBe(mockAddress[0]);
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "eth_requestAccounts",
    });
  });

  it("should handle errors gracefully", async () => {
    // Mock window.ethereum.request to throw an error
    const mockError = new Error("User rejected request");
    window.ethereum = {
      request: jest.fn(() => Promise.reject(mockError)),
    };

    // Call the function and expect it to handle the error without throwing
    const address = await connectWalletHandler();

    expect(address).toBeUndefined();
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "eth_requestAccounts",
    });
  });
});

// is Logged In handler

describe("Authentication Functions", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("should set the logged-in address in localStorage", () => {
    const mockAddress = "0x1234567890abcdef1234567890abcdef12345678";

    // Spy on localStorage.setItem
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    // Call the function
    setLoggedIn(mockAddress);

    // Verify that localStorage.setItem was called with the correct arguments
    expect(setItemSpy).toHaveBeenCalledWith("isLogged", mockAddress);

    // Restore the original implementation
    setItemSpy.mockRestore();
  });

  it("should retrieve the logged-in address from localStorage", () => {
    const mockAddress = "0x1234567890abcdef1234567890abcdef12345678";

    // Set item in localStorage
    localStorage.setItem("isLogged", mockAddress);

    // Call the function and verify the result
    const address = isLoggedIn();
    expect(address).toBe(mockAddress);
  });
});
