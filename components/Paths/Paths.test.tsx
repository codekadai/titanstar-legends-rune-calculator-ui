import React from "react";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { Paths } from "./Paths";
import { useAppContext } from "../../context";
import { paths } from "../../labels";

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
});
