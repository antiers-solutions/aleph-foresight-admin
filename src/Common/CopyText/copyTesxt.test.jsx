import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyText from "./index";
import { Tooltip } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Tooltip: jest.fn(({ children, title, onClick, className }) => (
    <div className={className} onClick={onClick}>
      {title}
      {children}
    </div>
  )),
}));

jest.mock("@ant-design/icons", () => ({
  CheckOutlined: jest.fn(() => <div data-testid="check-icon" />),
  CopyOutlined: jest.fn(() => <div data-testid="copy-icon" />),
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("CopyText", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render CopyText component with initial tooltip and icon", () => {
    render(<CopyText text="sample text" />);

    expect(screen.getByText("Copy Address")).toBeInTheDocument();
    expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
  });

  it("should change tooltip and icon on click, then revert back after 1 second", async () => {
    render(<CopyText text="sample text" />);

    fireEvent.click(screen.getByText("Copy Address"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("sample text");
    expect(screen.getByText("Copied")).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("Copy Address")).toBeInTheDocument();
        expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
      },
      { timeout: 1100 }
    );
  });
});
