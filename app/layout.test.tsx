import React from "react";
import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "./layout";
import Page from "./(with-layout)/page";

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
