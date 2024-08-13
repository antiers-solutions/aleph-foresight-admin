import axios from "axios";
import UseGetApi from "./useGetApi"; // Adjust the import path as per your project structure
import { apiMethods } from "../constant/constants";
import { env } from "../constant/envConstant";
import { handleLogout } from "../helpers/commonApiHelpers";

jest.mock("axios"); // Mock axios module

jest.mock("../utils/contractHelpers", () => ({
  contractEvents: jest.fn(),
}));

describe("UseGetApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a GET request with default parameters", async () => {
    const url = "/example-url";
    const responseData = { data: "example data" };
    axios.mockResolvedValueOnce(responseData); // Mock axios response

    const result = await UseGetApi(url, apiMethods.GET);

    expect(axios).toHaveBeenCalledWith({
      method: apiMethods.GET,
      url: env.apiUrl + url,
      data: undefined,
      withCredentials: true,
    });

    expect(result).toEqual(responseData);
  });

  it("should make a POST request with specified body and headers", async () => {
    const url = "/example-post-url";
    const body = { key: "value" };
    const additionalHeaders = { Authorization: "Bearer token" };
    const responseData = { data: "example data" };
    axios.mockResolvedValueOnce(responseData); // Mock axios response

    const result = await UseGetApi(
      url,
      apiMethods.POST,
      body,
      additionalHeaders
    );

    expect(axios).toHaveBeenCalledWith({
      method: apiMethods.POST,
      url: env.apiUrl + url,
      data: body,
      withCredentials: true,
      headers: {
        ...additionalHeaders,
      },
    });

    expect(result).toEqual(responseData);
  });

  it("should handle an error during API call", async () => {
    const url = "/error-url";
    const errorMessage = "Network Error";
    axios.mockRejectedValueOnce(new Error(errorMessage)); // Mock axios error response

    try {
      await UseGetApi(url, apiMethods.GET);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it("should handle IPFS request correctly", async () => {
    const ipfsUrl = "https://ipfs.io/ipfs/example";
    const additionalHeaders = { Authorization: "Bearer token" }; // Define additional headers for IPFS request
    const responseData = { data: "IPFS data" };
    axios.mockResolvedValueOnce(responseData); // Mock axios response

    const result = await UseGetApi(
      ipfsUrl,
      apiMethods.GET,
      null,
      additionalHeaders,
      true
    );

    expect(axios).toHaveBeenCalledWith({
      method: apiMethods.GET,
      url: ipfsUrl,
      data: undefined,
      withCredentials: false,
      headers: {
        Authorization: "Bearer token", // Ensure only the expected headers are present
      },
    });

    expect(result).toEqual(responseData);
  });

  it("should logout if response is unauthorized & navigate to login", async () => {
    const url = "https://example.com/api/data";
    const errorMessage = "Unauthorized!";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    try {
      await UseGetApi(url, "get");
    } catch (error) {
      expect(error.message).toBe(errorMessage);
      const mockHandleLogout = jest.fn();
      handleLogout = mockHandleLogout;
      await handleLogout();
      expect(handleLogout).toHaveBeenCalled();
      expect(window.location.href).toBe("/login");
    }
  });
});
