import React from "react";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Rune } from "./Rune";
import { RuneProps } from "./Rune.types";
import styles from "./Rune.module.scss";
import { useHandleEvents } from "@/hooks";

const props: RuneProps = {
  index: 0,
  pathIndex: 0,
  rune: {
    name: "test-01",
    isHovered: false,
    isActive: true,
    dependencies: [],
  },
  path: [
    {
      name: "test-01",
      isHovered: false,
      isActive: true,
      dependencies: [],
    },
    {
      name: "test-02",
      isHovered: false,
      isActive: false,
      dependencies: ["test-01"],
    },
  ],
};

vi.mock("@/hooks", () => ({
  useHandleEvents: vi.fn(),
}));

const mocks = {
  handleLeftClick: vi.fn(),
  handleRightClick: vi.fn(),
  handleMouseOver: vi.fn(),
  handleMouseOut: vi.fn(),
  handleTap: vi.fn(),
};

describe("Rune tests", () => {
  beforeAll(() => {
    (useHandleEvents as Mock).mockImplementation(() => mocks);
  });

  it("renders an active class with active border styles", () => {
    render(<Rune {...props} />);

    const rune = screen.getByTestId("rune");
    expect(rune).toHaveClass(styles.active);
  });

  it("calls handleLeftClick method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mocks.handleLeftClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleRightClick method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.contextMenu(button);

    expect(mocks.handleRightClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleMouseOver method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.mouseOver(button);

    expect(mocks.handleMouseOver).toHaveBeenCalledTimes(1);
  });

  it("calls handleMouseOut method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.mouseOut(button);

    expect(mocks.handleMouseOut).toHaveBeenCalledTimes(1);
  });

  it("calls handleTap method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.touchEnd(button);

    expect(mocks.handleTap).toHaveBeenCalledTimes(1);
  });
});
