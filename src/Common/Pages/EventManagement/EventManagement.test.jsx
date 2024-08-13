import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import EventManagement from "./EventManagement";
import UseGetApi from "../../../hooks/useGetApi"; // Mock or adjust path as per your hook location
import { customToast } from "../../Toast/toast"; // Mock or adjust path as per your toast location
import { apiUrls } from "../../../constant/apiConstants"; // Mock or adjust path as per your API constants location
import { apiMethods, tableLimit } from "../../../constant/constants";
import { MemoryRouter } from "react-router-dom";

// Mock UseGetApi function
jest.mock("../../../hooks/useGetApi");

// Mock customToast.error function
jest.mock("../../Toast/toast", () => ({
  customToast: {
    error: jest.fn(),
  },
}));

jest.mock("../../../utils/contractHelpers", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock API URLs
jest.mock("../../../constant/apiConstants", () => ({
  apiUrls: {
    getClosedEvents: jest.fn(),
  },
}));

describe("EventManagement component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock calls after each test
  });

  it("should fetch and display events on initial render", async () => {
    // Mock API response
    const mockEventsData = {
      data: {
        ordersData: [
          { eventId: "event1" /* other event data */ },
          { eventId: "event2" /* other event data */ },
        ],
        total: 2,
      },
    };
    UseGetApi.mockResolvedValueOnce({ data: mockEventsData });
    render(
      <MemoryRouter>
        <EventManagement />
      </MemoryRouter>
    );

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(UseGetApi).toHaveBeenCalledWith(
        apiUrls.getClosedEvents(1, tableLimit, "1", "all"),
        apiMethods.GET
      );
    });

    // Assert that events are displayed
    expect(screen.getByText("All Events")).toBeInTheDocument();
    expect(screen.getByText("Tx Hash")).toBeInTheDocument(); // Adjust based on your event rendering logic
    expect(screen.getByText("Event Id")).toBeInTheDocument(); // Adjust based on your event rendering logic
  });

  it("should handle API error", async () => {
    const errorMessage = "Failed to fetch events"; // Mock API error response
    UseGetApi.mockRejectedValueOnce({ message: errorMessage });
    render(
      <MemoryRouter>
        <EventManagement />
      </MemoryRouter>
    );

    // Wait for the API call to reject
    await waitFor(() => {
      expect(UseGetApi).toHaveBeenCalledWith(
        apiUrls.getClosedEvents(1, tableLimit, "1", "all"),
        apiMethods.GET
      );
    });
    // Assert that error toast is displayed
    expect(customToast.error).toHaveBeenCalledWith(errorMessage);
  });

  it("should handle tab change", async () => {
    // Mock API response for different tab
    const mockEventsDataTab2 = {
      data: {
        ordersData: [
          { eventId: "event3" /* other event data */ },
          { eventId: "event4" /* other event data */ },
        ],
        total: 2,
      },
    };
    UseGetApi.mockResolvedValueOnce({ data: mockEventsDataTab2 });

    render(
      <MemoryRouter>
        <EventManagement />
      </MemoryRouter>
    );

    // Simulate tab change
    fireEvent.click(screen.getByText("Closed")); // Adjust based on your tab labels

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(UseGetApi).toHaveBeenCalledWith(
        apiUrls.getClosedEvents(1, tableLimit, "2", "all"),
        apiMethods.GET
      );
    });
  });
});
