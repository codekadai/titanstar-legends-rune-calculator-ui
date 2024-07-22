import React from "react";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Path } from "./Path";
import { PathProps } from "./Path.types";
import { useHandleEvents } from "@/hooks";
import { mockPaths } from "@/__mocks__";

const props: PathProps = {
  pathIndex: 0,
  path: mockPaths[0],
};

vi.mock("@/hooks", () => ({
  useHandleEvents: vi.fn(),
}));

const mocks = {
  handleFocus: vi.fn(),
  hoverIndex: { index: 0, pathIndex: 0 },
  focusIndex: { index: 0, pathIndex: 0 },
};

describe("Path tests", () => {
  beforeAll(() => {
    (useHandleEvents as Mock).mockImplementation(() => mocks);
  });

  it("calls handleFocus method when focusing the path", () => {
    render(<Path {...props} />);

    const button = screen.getByTestId("pathTitle");
    fireEvent.focus(button);

    expect(mocks.handleFocus).toHaveBeenCalledTimes(1);
  });

  it("calls handleFocus method when blurring the path", () => {
    render(<Path {...props} />);

    const button = screen.getByTestId("pathTitle");
    fireEvent.blur(button);

    expect(mocks.handleFocus).toHaveBeenCalledTimes(1);
  });
});
