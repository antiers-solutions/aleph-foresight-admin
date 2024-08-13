import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "./Login";
import useWalletConnection from "../../../hooks/useWalletConnection"; // Mock the custom hook

// Mock dependencies
jest.mock("../../../hooks/useWalletConnection", () => ({
  __esModule: true,
  default: jest.fn(), // Ensure to match the actual export name if not default
}));

jest.mock("../../../assets/Logo.svg", () => "test-file-stub");

describe("Login Component", () => {
  beforeEach(() => {
    useWalletConnection.mockReturnValue({
      isDisabled: false,
      addNetwork: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<Login />);
  });

  it("renders logo and login form", () => {
    render(<Login />);
    const loginHeading = screen.getByText("Admin Panel");
    expect(loginHeading).toBeInTheDocument();
  });

  it("calls addNetwork function when Connect Wallet button is clicked", () => {
    render(<Login />);
    const connectWalletButton = screen.getByText("Connect Wallet");
    fireEvent.click(connectWalletButton);
    expect(useWalletConnection().addNetwork).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
