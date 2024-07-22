import { describe, it, expect, Mock } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useHandleEvents } from "./";
import { getPaths, getPlayers } from "@/api";
import { FC } from "react";
import { AppProvider } from "@/context";
import { mockPaths, mockPlayers } from "@/__mocks__";

vi.mock("@/api");

describe("useHandleEvents tests", () => {
  let mockEvent: any = {};
  let wrapper: FC;

  beforeAll(() => {
    (getPaths as Mock).mockResolvedValue(mockPaths);
    (getPlayers as Mock).mockResolvedValue(mockPlayers);
    mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      key: "Enter",
      code: "Enter",
      charCode: 13,
    };
    wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );
  });

  it("checks handleLeftClick method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("checks handleRightClick method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleRightClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("checks handleMouseOver method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.hoverIndex).toStrictEqual({
      index: -1,
      pathIndex: -1,
    });
    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    expect(result.current.hoverIndex).toStrictEqual({ index: 0, pathIndex: 0 });
  });

  it("checks handleMouseOut method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    expect(result.current.hoverIndex).toStrictEqual({ index: 0, pathIndex: 0 });
    act(() => result.current.handleMouseOut(mockEvent));
    expect(result.current.hoverIndex).toStrictEqual({
      index: -1,
      pathIndex: -1,
    });
  });

  it("checks handleFocus method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.focusIndex).toStrictEqual({
      index: -1,
      pathIndex: -1,
    });
    act(() => result.current.handleFocus(0, 0, mockEvent));
    expect(result.current.focusIndex).toStrictEqual({ index: 0, pathIndex: 0 });

    act(() => result.current.handleEnter(0, 0, mockEvent));
    act(() => result.current.handleFocus(0, 0, mockEvent));
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it("checks handleTap method to activate a rune", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("checks handleTap method to deactivate a rune", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("checks handleEnter method to activate a rune", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleEnter(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("checks handleEnter method to deactivate a rune", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleEnter(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("checks handleMouseDown method to preventDefault", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    act(() => result.current.handleMouseDown(mockEvent));
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("handles desktop blocking flag", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    act(() => result.current.handleTap(0, 0));
    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    act(() => result.current.handleMouseOut(mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("checks canActivate method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][1].isActive).toBe(false);
    expect(result.current.currentPaths[0][1].dependencies.length).toBe(1);
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleLeftClick(1, 0, mockEvent));
    expect(result.current.currentPaths[0][1].isActive).toBe(true);
  });
});
