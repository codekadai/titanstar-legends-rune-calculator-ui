import { describe, it, expect, beforeAll, vi, Mock } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { AppProvider, useAppContext } from "@/context";
import { getPaths, getPlayers } from "@/api";
import { FC } from "react";

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

describe("AppContext tests", () => {
  let wrapper: FC;

  beforeAll(() => {
    wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );
  });

  it("sets state correctly with mocked data", async () => {
    (getPaths as Mock).mockResolvedValue(mockPaths);
    (getPlayers as Mock).mockResolvedValue(mockPlayers);
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.currentPaths.length).toBeGreaterThan(0);
    });

    expect(result.current.currentPaths).toEqual(mockPaths);
    expect(result.current.talentPoints).toEqual(mockPlayers[0].talentPoints);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles errors correctly", async () => {
    (getPaths as Mock).mockRejectedValue(new Error("Failed to fetch paths"));
    (getPlayers as Mock).mockRejectedValue(
      new Error("Failed to fetch players")
    );
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.currentPaths).toEqual([]);
    expect(result.current.talentPoints).toBe(0);
  });

  it("updates currentSpentPoints correctly", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setCurrentSpentPoints(10);
    });

    expect(result.current.currentSpentPoints).toBe(10);
  });

  it("updates currentPaths correctly", async () => {
    (getPaths as Mock).mockResolvedValue(mockPaths);
    (getPlayers as Mock).mockResolvedValue(mockPlayers);
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await act(async () => {
      result.current.setCurrentPaths(mockPaths);
    });

    expect(result.current.currentPaths).toEqual(mockPaths);
  });

  it("updates talentPoints correctly", async () => {
    (getPaths as Mock).mockResolvedValue(mockPaths);
    (getPlayers as Mock).mockResolvedValue(mockPlayers);
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await act(() => {
      result.current.setTalentPoints(20);
    });

    expect(result.current.talentPoints).toBe(5);
  });

  it("updates isLoading correctly", async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
