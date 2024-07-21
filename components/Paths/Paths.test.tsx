import React, { FC } from "react";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import { Paths } from "./Paths";
import { AppProvider, useAppContext } from "../../context";
import { paths } from "../../labels";

vi.mock("@/context", () => ({
  useAppContext: vi.fn(),
}));

const mockPaths = [
  [
    {
      name: "building",
      isActive: false,
      isHovered: false,
      dependencies: [],
    },
    {
      name: "cooking",
      isActive: false,
      isHovered: false,
      dependencies: ["building"],
    },
    {
      name: "baking",
      isActive: false,
      isHovered: false,
      dependencies: ["building", "cooking"],
    },
    {
      name: "leading",
      isActive: false,
      isHovered: false,
      dependencies: ["building", "cooking", "baking"],
    },
  ],
  [
    {
      name: "sailing",
      isActive: false,
      isHovered: false,
      dependencies: [],
    },
    {
      name: "diving",
      isActive: false,
      isHovered: false,
      dependencies: ["sailing"],
    },
    {
      name: "forecasting",
      isActive: false,
      isHovered: false,
      dependencies: ["sailing", "diving"],
    },
    {
      name: "cloning",
      isActive: false,
      isHovered: false,
      dependencies: ["sailing", "diving", "forecasting"],
    },
  ],
];

describe("Paths tests", () => {
  it("shows a message when there are no paths", () => {
    (useAppContext as Mock).mockReturnValue({ currentPaths: [] });

    render(<Paths />);

    const noPathsMessage = screen.getByText(paths.noPaths);
    expect(noPathsMessage).toMatchSnapshot();
  });

  it("renders paths", () => {
    (useAppContext as Mock).mockReturnValue({ currentPaths: mockPaths });

    render(<Paths />);

    const pathTitle = screen.getAllByTestId("pathTitle");

    expect(pathTitle).toMatchSnapshot();
  });
});
