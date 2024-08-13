import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import ButtonCustom from "./ButtonCustom";

// Mock the ButtonLoader component
jest.mock("../Loader.jsx/ButtonLoader", () => () => <div>Loading...</div>);

describe("ButtonCustom Component", () => {
  afterEach(cleanup); // Clean up the DOM after each test

  it("renders with default props", () => {
    render(<ButtonCustom label="Click Me" />);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("buttonCustom");
  });

  it("renders with custom class names", () => {
    render(<ButtonCustom label="Click Me" className="customClass" />);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("buttonCustom customClass");
  });

  it("renders with button states (isDisabled)", () => {
    render(<ButtonCustom label="Click Me" isDisabled={true} />);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("disable");
    expect(button).toBeDisabled();
  });

  it("renders with button states (btnBorder)", () => {
    render(<ButtonCustom label="Click Me" btnBorder={true} />);
    const buttonWithBorder = screen.getByText("Click Me");
    expect(buttonWithBorder).toHaveClass("btnBorder");
  });

  it("renders with button states (walletBtn)", () => {
    render(<ButtonCustom label="Click Me" walletBtn={true} />);
    const walletButton = screen.getByText("Click Me");
    expect(walletButton).toHaveClass("walletBtn");
  });

  it("renders with button states (transbtn)", () => {
    render(<ButtonCustom label="Click Me" transbtn={true} />);
    const transButton = screen.getByText("Click Me");
    expect(transButton).toHaveClass("transbtn");
  });

  it("renders with loading state", () => {
    render(<ButtonCustom isLoading={true} />);
    const loader = screen.getByText("Loading...");
    expect(loader).toBeInTheDocument();
  });

  it("handles click event", () => {
    const handleClick = jest.fn();
    render(<ButtonCustom label="Click Me" onClick={handleClick} />);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders children elements", () => {
    render(
      <ButtonCustom>
        <span>Child Element</span>
      </ButtonCustom>
    );
    const childElement = screen.getByText("Child Element");
    expect(childElement).toBeInTheDocument();
  });
});
