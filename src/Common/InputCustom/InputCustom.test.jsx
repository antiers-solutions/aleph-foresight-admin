import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputCustom from "./InputCustom";
import VisibilityOff from "../../assets/images/VisibilityOff.svg";
import VisibilityOn from "../../assets/images/VisibilityOn.svg";

jest.mock("../../assets/images/VisibilityOff.svg", () => "test-file-stub"); //it will resolve the error symbol not defined
jest.mock("../../assets/images/VisibilityOn.svg", () => "test-file-stub");

describe("InputCustom Component", () => {
  test("renders correctly with props", () => {
    render(
      <InputCustom
        label="Password"
        placeholder="Enter your password"
        type="password"
        id="password"
        name="password"
        onChange={() => {}}
        value=""
        passwordInput
      />
    );

    // Check if label is rendered
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    // Check if placeholder is rendered
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();

    // Check if input type is password
    expect(screen.getByPlaceholderText(/Enter your password/i)).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("toggles password visibility when button is clicked", () => {
    render(
      <InputCustom
        label="Password"
        placeholder="Enter your password"
        type="password"
        id="password"
        name="password"
        onChange={() => {}}
        value=""
        passwordInput
      />
    );

    // Initially, the input type should be password
    const inputElement = screen.getByPlaceholderText(/Enter your password/i);
    expect(inputElement).toHaveAttribute("type", "password");

    // Check for the visibility icon
    const visibilityOnIcon = screen.getByAltText("VisibilityOn");
    expect(visibilityOnIcon).toBeInTheDocument();

    // Click the button to toggle visibility
    fireEvent.click(screen.getByRole("button"));

    // After clicking, the input type should be text
    expect(inputElement).toHaveAttribute("type", "text");

    // Check for the visibility icon again
    const visibilityOffIcon = screen.getByAltText("VisibilityOff");
    expect(visibilityOffIcon).toBeInTheDocument();
  });
});
