import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { useIsLoggedIn } from "../../../context/loggedInContext";
import UseGetApi from "../../../hooks/useGetApi";
import { apiUrls } from "../../../constant/apiConstants";
import { contractEvents } from "../../../utils/contractHelpers";
import { env } from "../../../constant/envConstant";
import { customToast } from "../../Toast/toast";

// Mock dependencies
jest.mock("../../../context/loggedInContext", () => ({
  useIsLoggedIn: jest.fn(),
}));

jest.mock("../../../hooks/useGetApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/contractHelpers", () => ({
  contractEvents: jest.fn(),
}));

jest.mock("../../../constant/envConstant", () => ({
  env: {
    adminCurrencyName: "AZERO", // or any other currency name you use
  },
}));

jest.mock("../../Toast/toast", () => ({
  customToast: { error: jest.fn() },
}));

describe("Dashboard component", () => {
  beforeEach(() => {
    // Mock useIsLoggedIn to return a mock address when called
    useIsLoggedIn.mockReturnValue(
      () => "0x1bacaEcC83Ed515B77A8d39f24e46e05c8bBC920"
    );

    // Mock UseGetApi to return mock data based on the URL
    UseGetApi.mockImplementation((url, method) => {
      switch (url) {
        case apiUrls.getTotalEvents:
          return Promise.resolve({
            data: {
              data: {
                totalEvents: 18,
                totalActiveEvent: 5,
              },
            },
          });
        case apiUrls.getTotalUsers:
          return Promise.resolve({
            data: {
              data: {
                totalUsers: 100,
              },
            },
          });
        case apiUrls.getTotalTransactions:
          return Promise.resolve({
            data: {
              data: {
                transactionData: 80,
              },
            },
          });
        case apiUrls.getTotalVolume:
          return Promise.resolve({
            data: {
              data: {
                totalVolume: 30,
              },
            },
          });
        case apiUrls.getTotalDisputes:
          return Promise.resolve({
            data: {
              data: {
                total: 20,
              },
            },
          });
        case apiUrls.getTotalCreators:
          return Promise.resolve({
            data: {
              data: {
                totalCreators: 15,
              },
            },
          });
        default:
          return Promise.resolve({ data: {} });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct data when user is logged in", async () => {
    await act(async () => {
      render(<Dashboard />);
      // Wait for all async actions to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Assert that the component renders with the expected data in each SidebarCard
    expect(screen.getByText("Total Events")).toBeInTheDocument();
    expect(screen.getByText("Active Events")).toBeInTheDocument();
    expect(
      screen.getByText(`Total Volume (${env.adminCurrencyName})`)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Transactions")).toBeInTheDocument();
    expect(screen.getByText("Disputes Raised")).toBeInTheDocument();
    expect(screen.getByText("Number of Users")).toBeInTheDocument();
    expect(screen.getByText("Number of Creators")).toBeInTheDocument();
    expect(screen.getByText("Amount Staked")).toBeInTheDocument();
    expect(screen.getByText("Number of Stakers")).toBeInTheDocument();
    expect(
      screen.getByText(`Revenue (${env.adminCurrencyName})`)
    ).toBeInTheDocument();

    expect(screen.queryByText("18")).toBeInTheDocument(); // Check total events value
    expect(screen.queryByText("5")).toBeInTheDocument(); // Check active events value
    expect(screen.queryByText("80")).toBeInTheDocument(); // Check total transactions value
    expect(screen.queryByText("30")).toBeInTheDocument(); // Check total volume value
    expect(screen.queryByText("20")).toBeInTheDocument(); // Check total disputes value
    expect(screen.queryByText("15")).toBeInTheDocument(); // Check total creators value
  });

  it("should handle API error", async () => {
    const errorMessage = "Failed to fetch events"; // Mock API error response
    UseGetApi.mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      render(<Dashboard />);
    });

    // Wait for the error toast to be called
    await waitFor(() => {
      expect(customToast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});
