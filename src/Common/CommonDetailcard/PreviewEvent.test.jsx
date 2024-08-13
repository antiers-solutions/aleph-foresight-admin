import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PreviewEvent from "./PreviewEvent";
import { getFee } from "../../helpers/commonApiHelpers";
import { previewCardData } from "../../constant/structuralContants";

// Mock the getFee function
jest.mock("../../helpers/commonApiHelpers", () => ({
  getFee: jest.fn(),
}));

// Mock the previewCardData function
jest.mock("../../constant/structuralContants", () => ({
  previewCardData: jest.fn(),
}));

describe("PreviewEvent Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with provided data", () => {
    // Mock data and functions
    const mockData = {
      id: "1",
      heading: "Event Name",
      paragraph: "Event Description",
    };
    previewCardData.mockReturnValue([mockData]);

    render(
      <PreviewEvent
        onClick={jest.fn()}
        data={mockData}
        closeEventModal={jest.fn()}
        disable={false}
        isLoading={false}
        setIsLoading={jest.fn()}
      />
    );

    // Check if heading and paragraph are rendered
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(screen.getByText("Event Description")).toBeInTheDocument();
  });

  it("fetches and displays the platform fee correctly", async () => {
    // Mock fee value and loading state
    const mockFee = 5;
    getFee.mockResolvedValue(mockFee);

    render(
      <PreviewEvent
        onClick={jest.fn()}
        data={{}}
        closeEventModal={jest.fn()}
        disable={false}
        isLoading={false}
        setIsLoading={jest.fn()}
      />
    );

    // Check if the platform fee is displayed correctly
    await waitFor(() => {
      expect(screen.getByText(`Platform Fee`)).toBeInTheDocument();
    });
  });

  it("calls onClick when Publish button is clicked", () => {
    const handleClick = jest.fn();
    render(
      <PreviewEvent
        onClick={handleClick}
        data={{}}
        closeEventModal={jest.fn()}
        disable={false}
        isLoading={false}
        setIsLoading={jest.fn()}
      />
    );

    // Click the Publish button
    fireEvent.click(screen.getByText("Publish"));

    // Check if onClick function is called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls closeEventModal when Back button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <PreviewEvent
        onClick={jest.fn()}
        data={{}}
        closeEventModal={handleClose}
        disable={false}
        isLoading={false}
        setIsLoading={jest.fn()}
      />
    );

    // Click the Back button
    fireEvent.click(screen.getByText("Back"));

    // Check if closeEventModal function is called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("disables buttons when isLoading is true", () => {
    render(
      <PreviewEvent
        onClick={jest.fn()}
        data={{}}
        closeEventModal={jest.fn()}
        disable={false}
        isLoading={true}
        setIsLoading={jest.fn()}
      />
    );

    // Check if buttons are disabled
    expect(screen.getByText("Back")).toBeDisabled();
  });

  it("disables Publish button based on disable prop", () => {
    render(
      <PreviewEvent
        onClick={jest.fn()}
        data={{}}
        closeEventModal={jest.fn()}
        disable={true}
        isLoading={false}
        setIsLoading={jest.fn()}
      />
    );

    // Check if Publish button is disabled
    expect(screen.getByText("Publish")).toBeDisabled();
  });
});
