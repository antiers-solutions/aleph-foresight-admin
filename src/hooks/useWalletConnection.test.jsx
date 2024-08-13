import { renderHook, act } from "@testing-library/react-hooks";
import useWalletConnection from "./useWalletConnection";
import { useNavigate } from "react-router-dom";
import { customToast } from "../Common/Toast/toast";
import { useIsLoggedIn } from "../context/loggedInContext";
import { env } from "../constant/envConstant";
import UseGetApi from "./useGetApi";

// Mock dependencies

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Common/Toast/toast", () => ({
  customToast: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("./useGetApi", () => jest.fn());

jest.mock("../context/loggedInContext", () => ({
  useIsLoggedIn: jest.fn(() => ({
    setLoggedInValue: jest.fn(),
  })),
}));

jest.mock("../utils/walletHelpers", () => ({
  setLoggedIn: jest.fn(),
}));

describe("useWalletConnection", () => {
  const mockNavigate = jest.fn();
  const mockSetLoggedInValue = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useIsLoggedIn.mockReturnValue({ setLoggedInValue: mockSetLoggedInValue });
    window.ethereum = {
      request: jest.fn(),
      selectedAddress: "0x1bacaEcC83Ed515B77A8d39f24e46e05c8bBC920",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially has isDisabled as false", () => {
    const { result } = renderHook(() => useWalletConnection());
    expect(result.current.isDisabled).toBe(false);
  });

  it("shows info toast if chainId is not available", async () => {
    window.ethereum.request.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useWalletConnection());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(customToast.info).toHaveBeenCalledWith(
      "Cannot retrieve any account. Please refresh the browser"
    );
  });

  it("switches to the correct network if chainId does not match", async () => {
    window.ethereum.request
      .mockResolvedValueOnce("0x1")
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useWalletConnection());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: env.chainId }],
    });
  });

  it("adds the network if it is not recognized", async () => {
    const switchError = { code: 4902 };
    window.ethereum.request
      .mockResolvedValueOnce("0x1")
      .mockRejectedValueOnce(switchError)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useWalletConnection());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: env.chainId,
          chainName: env.chainName,
          rpcUrls: [env.metamaskRpcUrl],
          blockExplorerUrls: [env.navigationUrl],
          nativeCurrency: {
            name: env.currencyName,
            symbol: env.currencyName,
            decimals: 18,
          },
        },
      ],
    });
  });

  it("displays an error toast if network switching fails", async () => {
    const errorMessage = "Switching network failed";
    window.ethereum.request.mockRejectedValueOnce({ message: errorMessage });
    const { result } = renderHook(() => useWalletConnection());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(customToast.error).toHaveBeenCalledWith(errorMessage);
  });

  it("displays an error toast if adding network fails", async () => {
    const addErrorMessage = "Adding network failed";
    window.ethereum.request
      .mockResolvedValueOnce("0x1")
      .mockRejectedValueOnce({ code: 4902 })
      .mockRejectedValueOnce({ message: addErrorMessage });
    const { result } = renderHook(() => useWalletConnection());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(customToast.error).toHaveBeenCalledWith(
      `Error adding ${env.chainName} network: , ${addErrorMessage}`
    );
  });
});
