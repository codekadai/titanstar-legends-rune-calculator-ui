import React from "react";
import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "../app/layout";
import Page from "../app/page";

vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

it("renders correctly", () => {
  const rootLayout = render(
    <RootLayout>
      <Page />
    </RootLayout>
  );
  expect(rootLayout).toMatchSnapshot();
});
