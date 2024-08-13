import React from "react";
import { render, screen } from "@testing-library/react";
import CommonDetailCard from "./CommonDetailCard";

describe("CommonDetailCard Component", () => {
  it("renders CommonDetailCard component with correct data", () => {
    render(<CommonDetailCard modalData={{}} />);

    // Check if component renders correctly
    const componentRoot = screen.getByTestId("common-detail-card");
    expect(componentRoot).toBeInTheDocument();

    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText("Wallet Address")).toBeInTheDocument();
  });

  it("renders CommonDetailCard component with default values when modalData is undefined", () => {
    render(<CommonDetailCard modalData={{}} />);

    // Check default values for heading and description
    const defaultDescriptionElements = screen.getAllByText("-");
    defaultDescriptionElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("will show description if it is present", () => {
    const description = "This is a test description.";
    render(<CommonDetailCard modalData={{ description }} />);

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
