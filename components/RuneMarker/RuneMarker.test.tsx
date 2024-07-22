import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RuneMarker } from "./RuneMarker";
import { RuneMarkerProps } from ".";
import styles from "./RuneMarker.module.scss";

describe("RuneMarker tests", () => {
  it("renders an active class with active border styles", () => {
    const props: RuneMarkerProps = {
      rune: {
        name: "test",
        isActive: true,
        dependencies: [],
      },
    };
    render(<RuneMarker {...props} />);

    const pathMarker = screen.getByTestId("runeMarker");
    expect(pathMarker).toHaveClass(styles.activePathMarker);
  });
});
