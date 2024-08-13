import React from "react";
import { render, fireEvent, getByRole } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import EventSelect from "./EventSelect";

describe("EventSelect Component", () => {
  const mockOnChangeHandle = jest.fn();
  const mockCryptoList = [
    { id: "1", symbol: "BTC", iconUrl: "btc-icon-url" },
    { id: "2", symbol: "ETH", iconUrl: "eth-icon-url" },
  ];

  it("should render correctly with the provided props", () => {
    const { getByText, getByAltText } = render(
      <EventSelect
        onChangeHandle={mockOnChangeHandle}
        name="crypto"
        value="BTC"
        cryptoList={mockCryptoList}
        isDisable={false}
      />
    );

    expect(getByText("BTC")).toBeInTheDocument();
    expect(getByAltText("BTC")).toHaveAttribute("src", "btc-icon-url");
  });

  it("should not call onChangeHandle if disabled", () => {
    const { getByText } = render(
      <EventSelect
        onChangeHandle={mockOnChangeHandle}
        name="crypto"
        value="BTC"
        cryptoList={mockCryptoList}
        isDisable={true}
      />
    );

    fireEvent.mouseDown(getByText("BTC"));

    expect(mockOnChangeHandle).not.toHaveBeenCalled();
  });

  it("should handle dropdown visibility change", () => {
    const { getByRole } = render(
      <EventSelect
        onChangeHandle={mockOnChangeHandle}
        name="crypto"
        value="BTC"
        cryptoList={mockCryptoList}
        isDisable={false}
      />
    );

    const selectElement = getByRole("combobox");

    // Check initial state (assuming it starts as closed)
    expect(selectElement).toHaveAttribute("aria-expanded", "false");

    fireEvent.mouseDown(selectElement);

    // Check after clicking dropdown
    expect(selectElement).toHaveAttribute("aria-expanded", "true");
  });
});
