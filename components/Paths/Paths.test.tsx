import React, { FC } from "react";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import { Paths } from "./Paths";
import { AppProvider, useAppContext } from "../../context";
import { paths } from "../../labels";
import { mockPaths } from "@/__mocks__";

vi.mock("@/context", () => ({
  useAppContext: vi.fn(),
}));

describe("Paths tests", () => {
  it("shows a message when there are no paths", () => {
    (useAppContext as Mock).mockReturnValue({ currentPaths: [] });

    render(<Paths />);

    const noPathsMessage = screen.getByText(paths.noPaths);
    expect(noPathsMessage).toMatchSnapshot();
  });

  it("renders paths", () => {
    (useAppContext as Mock).mockReturnValue({
      currentPaths: mockPaths,
      focusIndex: { index: 0, pathIndex: 0 },
      hoverIndex: { index: 0, pathIndex: 0 },
    });

    render(<Paths />);

    const pathTitle = screen.getAllByTestId("pathTitle");

    expect(pathTitle).toMatchSnapshot();
  });
});
