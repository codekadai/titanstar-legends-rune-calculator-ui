import { describe, it, expect, Mock } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useHandleEvents } from "./";
import { getPaths, getPlayers } from "@/api";
import { FC } from "react";
import { AppProvider } from "@/context";

vi.mock("@/api");

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

const mockPlayers = [
  {
    talentPoints: 5,
  },
];

describe("useHandleEvents tests", () => {
  let mockEvent: any = {};
  let wrapper: FC;

  beforeAll(() => {
    (getPaths as Mock).mockResolvedValue(mockPaths);
    (getPlayers as Mock).mockResolvedValue(mockPlayers);
    mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
    wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );
  });

  it("handle handleLeftClick method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("handle handleRightClick method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleRightClick(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("handle handleMouseOver method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isHovered).toBe(false);
    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isHovered).toBe(true);
  });

  it("handle handleMouseOut method", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isHovered).toBe(true);
    act(() => result.current.handleMouseOut(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isHovered).toBe(false);
  });

  it("handle handleTap method to activate a rune", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(false);
    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("handle handleTap method to deactivate a rune", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths[0][0].isActive).toBe(true);
    act(() => result.current.handleTap(0, 0));
    expect(result.current.currentPaths[0][0].isActive).toBe(false);
  });

  it("handle desktop blocking flag", async () => {
    const { result } = renderHook(() => useHandleEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    act(() => result.current.handleTap(0, 0));
    act(() => result.current.handleLeftClick(0, 0, mockEvent));
    act(() => result.current.handleMouseOver(0, 0, mockEvent));
    act(() => result.current.handleMouseOut(0, 0, mockEvent));
    expect(result.current.currentPaths[0][0].isActive).toBe(true);
  });

  it("handle canActivate method", async () => {
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
