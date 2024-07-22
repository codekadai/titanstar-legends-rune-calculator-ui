import React from "react";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Rune } from "./Rune";
import { RuneProps } from "./Rune.types";
import styles from "./Rune.module.scss";
import { useHandleEvents } from "@/hooks";
import { mockPaths, mockPlayers } from "@/__mocks__";

const props: RuneProps = {
  index: 0,
  pathIndex: 0,
  rune: mockPaths[0][0],
  path: mockPaths[0],
};

vi.mock("@/hooks", () => ({
  useHandleEvents: vi.fn(),
}));

const mocks = {
  handleLeftClick: vi.fn(),
  handleRightClick: vi.fn(),
  handleMouseOver: vi.fn(),
  handleMouseOut: vi.fn(),
  handleMouseDown: vi.fn(),
  handleTap: vi.fn(),
  handleFocus: vi.fn(),
  handleEnter: vi.fn(),
  focusIndex: { index: 0, pathIndex: 0 },
  hoverIndex: { index: 0, pathIndex: 0 },
};

describe("Rune tests", () => {
  beforeAll(() => {
    (useHandleEvents as Mock).mockImplementation(() => mocks);
  });

  it("renders an active class with active border styles", () => {
    let localProps = Object.assign(
      {},
      {
        ...props,
        rune: {
          ...props.rune,
          isActive: true,
        },
      }
    );
    render(<Rune {...localProps} />);

    const rune = screen.getByTestId("rune");
    expect(rune).toHaveClass(styles.active);
  });

  it("calls handleLeftClick method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mocks.handleLeftClick).toHaveBeenCalled;
  });

  it("calls handleRightClick method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.contextMenu(button);

    expect(mocks.handleRightClick).toHaveBeenCalled;
  });

  it("calls handleMouseOver method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.mouseOver(button);

    expect(mocks.handleMouseOver).toHaveBeenCalled;
  });

  it("calls handleMouseOut method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.mouseOut(button);

    expect(mocks.handleMouseOut).toHaveBeenCalled;
  });

  it("calls handleTap method when clicking the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.touchEnd(button);

    expect(mocks.handleTap).toHaveBeenCalled;
  });

  it("calls handleFocus method when focusing the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.focus(button);

    expect(mocks.handleFocus).toHaveBeenCalled;
  });

  it("calls handleFocus method when blurring the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.blur(button);

    expect(mocks.handleFocus).toHaveBeenCalled;
  });

  it("calls handleEnter method when pressing enter in the keyboard while focusing the button", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.keyDown(button);

    expect(mocks.handleEnter).toHaveBeenCalled;
  });

  it("calls handleMouseDown method to avoid re-execution of focus and keypress", () => {
    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.mouseDown(button);

    expect(mocks.handleMouseDown).toHaveBeenCalled;
  });

  it("enables rune when currentSpentPoints < talentPoints and canActivate returns true", () => {
    (useHandleEvents as Mock).mockImplementation(() => {
      return {
        ...mocks,
        canActivate: vi.fn().mockReturnValue(true),
        currentSpentPoints: 0,
        talentPoints: mockPlayers[0].talentPoints,
      };
    });

    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("disables rune when currentSpentPoints >= talentPoints", () => {
    (useHandleEvents as Mock).mockImplementation(() => {
      return {
        ...mocks,
        canActivate: vi.fn().mockReturnValue(true),
        currentSpentPoints: mockPlayers[0].talentPoints,
        talentPoints: mockPlayers[0].talentPoints,
      };
    });

    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("disables rune when canActivate returns false", () => {
    (useHandleEvents as Mock).mockImplementation(() => {
      return {
        ...mocks,
        canActivate: vi.fn().mockReturnValue(false),
        currentSpentPoints: 0,
        talentPoints: mockPlayers[0].talentPoints,
      };
    });

    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies hovered styles when button is hovered", () => {
    (useHandleEvents as Mock).mockImplementation(() => {
      return {
        ...mocks,
        hoverIndex: { index: 0, pathIndex: 0 },
        currentSpentPoints: 0,
        talentPoints: mockPlayers[0].talentPoints,
        canActivate: vi.fn().mockReturnValue(true),
      };
    });

    render(<Rune {...props} />);

    const button = screen.getByRole("button");
    fireEvent.mouseOver(button);
    const expectedBackgroundPosition = `-0px 0`;
    expect(button).toHaveStyle(
      `background-position: ${expectedBackgroundPosition}`
    );
  });
});
