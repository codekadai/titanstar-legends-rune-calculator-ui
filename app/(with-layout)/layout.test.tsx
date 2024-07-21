import React from "react";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";
import WithLayout from "./layout";

it("renders correctly", () => {
  const rootLayout = render(
    <WithLayout>
      <Home />
    </WithLayout>
  );
  expect(rootLayout).toMatchSnapshot();
});
