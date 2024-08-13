import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./index";
import "@testing-library/jest-dom";

describe("Loader Component", () => {
  it('should render a Spin component inside a div with the class "no-events-found"', () => {
    render(<Loader />);
  });
});
