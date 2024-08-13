import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonLoader from "./ButtonLoader";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

// Mock the Ant Design components
jest.mock("@ant-design/icons", () => ({
  LoadingOutlined: jest.fn(() => <div>Loading Icon</div>),
}));

jest.mock("antd", () => ({
  Spin: jest.fn(({ indicator }) => <div>Spin Component: {indicator}</div>),
  Space: jest.fn(({ children }) => <div>Space Component: {children}</div>),
}));

describe("ButtonLoader Component", () => {
  it("renders correctly", () => {
    render(<ButtonLoader />);

    // Check if the Spin component is rendered
    expect(screen.getByText(/Spin Component:/)).toBeInTheDocument();

    // Check if the LoadingOutlined icon is rendered within the Spin component
    expect(screen.getByText("Loading Icon")).toBeInTheDocument();
  });
});
