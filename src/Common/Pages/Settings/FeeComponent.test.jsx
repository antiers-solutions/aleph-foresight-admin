import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FeeForm from "./FeeComponent";
import { contractEvents } from "../../../utils/contractHelpers";
import { customToast } from "../../Toast/toast";

jest.mock("../../../utils/contractHelpers.jsx", () => ({
  contractEvents: jest.fn(),
}));

jest.mock("../../Toast/toast", () => ({
  customToast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Fee componet Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders component correctly", () => {
    render(
      <FeeForm
        label="Fee Form"
        eventName="updateFee"
        closeModal={() => {}}
        feeValue=""
        isLoading={false}
        setIsLoading={() => {}}
        regex={/^(\d{1,2}(\.\d{0,2})?)?$/}
      />
    );

    expect(screen.getByText("Fee Form")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("%")).toBeInTheDocument();
  });

  it("updates fee state on input change", () => {
    render(
      <FeeForm
        label="Fee Form"
        eventName="updateFee"
        closeModal={() => {}}
        feeValue=""
        isLoading={false}
        setIsLoading={() => {}}
        regex={/^(\d{1,2}(\.\d{0,2})?)?$/}
      />
    );

    const input = screen.getByPlaceholderText("%");
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");
  });

  it("disables button when input is empty and enables when there is input", () => {
    render(
      <FeeForm
        label="Fee Form"
        eventName="updateFee"
        closeModal={() => {}}
        feeValue=""
        isLoading={false}
        setIsLoading={() => {}}
        regex={/^(\d{1,2}(\.\d{0,2})?)?$/}
      />
    );

    const input = screen.getByPlaceholderText("%");
    const button = screen.getByText("Save");

    fireEvent.change(input, { target: { value: "5" } });
    expect(button).not.toBeDisabled();

    fireEvent.change(input, { target: { value: "" } });
    expect(button).toBeDisabled();
  });

  it("disables input field when isLoading is true", () => {
    render(
      <FeeForm
        label="Fee Form"
        eventName="updateFee"
        closeModal={() => {}}
        feeValue=""
        isLoading={true}
        setIsLoading={() => {}}
        regex={/^(\d{1,2}(\.\d{0,2})?)?$/}
      />
    );

    const input = screen.getByPlaceholderText("%");
    expect(input).toBeDisabled();
  });

  it("handles onClick event and displays success toast on success", async () => {
    const mockEventData = [{ id: 1, message: "Transaction successful" }];
    contractEvents.mockResolvedValue(mockEventData);
    const setIsLoading = jest.fn();
    const closeModal = jest.fn();

    render(
      <FeeForm
        label="Fee Form"
        eventName="updateFee"
        closeModal={closeModal}
        feeValue=""
        isLoading={false}
        setIsLoading={setIsLoading}
        regex={/^(\d{1,2}(\.\d{0,2})?)?$/}
      />
    );

    const input = screen.getByPlaceholderText("%");
    const saveButton = screen.getByText("Save");
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(saveButton);

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(contractEvents).toHaveBeenCalledWith({
        eventName: "updateFee",
        fees: 1000,
      });
      expect(closeModal).toHaveBeenCalled();
      expect(customToast.success).toHaveBeenCalledWith(
        "Transaction successful"
      );
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("handles onClick event and displays error toast on failure", async () => {
    const errorMessage = "Network error";
    contractEvents.mockRejectedValue(new Error(errorMessage));

    const setIsLoading = jest.fn();
    const closeModal = jest.fn();

    render(
      <FeeForm
        label="Fee Form"
        eventName="updateFee"
        closeModal={closeModal}
        feeValue=""
        isLoading={false}
        setIsLoading={setIsLoading}
        regex={/^(\d{1,2}(\.\d{0,2})?)?$/}
      />
    );

    const input = screen.getByPlaceholderText("%");
    const saveButton = screen.getByText("Save");
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(saveButton);

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(contractEvents).toHaveBeenCalledWith({
        eventName: "updateFee",
        fees: 1000,
      });
      expect(customToast.error).toHaveBeenCalledWith(errorMessage);
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });
});
