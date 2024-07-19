import { describe, it, expect, Mock } from "vitest";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { useHandleEvents } from "./";

describe("useHandleEvents tests", () => {
  let mockEvent: any = {};

  beforeAll(() => {
    mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
  });

  it("handle handleLeftClick method", () => {
    const { result } = renderHook(() => useHandleEvents());

    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("handle handleRightClick method", () => {
    const { result } = renderHook(() => useHandleEvents());

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleRightClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("handle handleMouseOver method", () => {
    const { result } = renderHook(() => useHandleEvents());

    expect(result.current.currentPaths[0][0].isHovered).toBe(false);
    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isHovered).toBe(true);
  });

  it("handle handleMouseOut method", () => {
    const { result } = renderHook(() => useHandleEvents());

    expect(result.current.currentPaths[0][0].isHovered).toBe(true);
    act(() => result.current.handleMouseOut(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isHovered).toBe(false);
  });

  it("handle handleTap method", () => {
    const { result } = renderHook(() => useHandleEvents());

    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("handle handleTap method", () => {
    const { result } = renderHook(() => useHandleEvents());

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("handle desktop blocking flag", () => {
    const { result } = renderHook(() => useHandleEvents());

    act(() => result.current.handleTap(0, 0));
    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    act(() => result.current.handleMouseOut(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("handle canActivate method", () => {
    const { result } = renderHook(() => useHandleEvents());

    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][1].isActive).toBe(false);
    expect(result.current.currentPaths[0][1].dependencies.length).toBe(1);
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleLeftClick(1, 0, mockEvent));
    expect(result.current.currentPaths[0][1].isActive).toBe(true);
  });
});
