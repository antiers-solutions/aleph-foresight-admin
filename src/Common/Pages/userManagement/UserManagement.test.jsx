import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import UserManagement from "./UserMangement.jsx";
import UseGetApi from "../../../hooks/useGetApi"; // Mock this hook

jest.mock("../../../hooks/useGetApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/contractHelpers", () => ({
  contractEvents: jest.fn(),
}));

describe("UserManagement Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks and reset any necessary state before each test
  });

  it("Default Tab is Users", async () => {
    UseGetApi.mockResolvedValueOnce({
      data: { data: { users: [], total: 0 } },
    });
    render(<UserManagement />);
    await waitFor(() => {
      expect(screen.getByText("Users")).toBeInTheDocument();
    });
  });

  it("Get User Tab Columns", async () => {
    UseGetApi.mockResolvedValueOnce({
      data: { data: { users: [], total: 0 } },
    });
    render(<UserManagement />);
    await waitFor(() => {
      expect(screen.getByText("Users")).toBeInTheDocument();
    });
    expect(screen.getByText("User Id")).toBeInTheDocument();
    expect(screen.getByText("Date of Joining")).toBeInTheDocument();
  });

  it("Displays loading state correctly on tab change", async () => {
    UseGetApi.mockResolvedValueOnce({
      data: { data: { users: [], total: 0 } },
    });

    render(<UserManagement />);
    screen.getByRole("tab", { name: "Creators" });
    await waitFor(() => {
      expect(screen.getByText("Creators")).toBeInTheDocument();
    });
  });

  it("Get Creators Tab Columns", async () => {
    UseGetApi.mockResolvedValueOnce({
      data: { data: { users: [], total: 0 } },
    });
    render(<UserManagement />);
    await waitFor(() => {
      expect(screen.getByText("Creators")).toBeInTheDocument();
    });
    expect(screen.getByText("User Id")).toBeInTheDocument();
    expect(screen.getByText("Date of Joining")).toBeInTheDocument();
  });
});
