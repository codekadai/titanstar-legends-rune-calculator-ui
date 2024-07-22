import React from "react";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

it("renders correctly", () => {
  const home = render(<Home />);
  expect(home).toMatchSnapshot();
});
