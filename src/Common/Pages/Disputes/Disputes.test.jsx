import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Disputes from "./Disputes";
import UseGetApi from "../../../hooks/useGetApi";

// Mocking UseGetApi
jest.mock("../../../hooks/useGetApi");

// Mocking getDataFromIpfs
jest.mock("../../../helpers/commonApiHelpers");

jest.mock("../../../utils/contractHelpers", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Disputes Component", () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  it("renders Disputes component correctly", async () => {
    render(<Disputes />);

    // Wait for API calls and data fetching to finish
    await waitFor(() => {
      expect(UseGetApi).toHaveBeenCalledTimes(1);
    });

    // Check if DisputeTable and CustomModal are rendered
    expect(screen.getByText("Event Id")).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
  });
});
