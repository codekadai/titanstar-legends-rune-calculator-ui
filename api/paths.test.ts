import { describe, it, expect, vi } from "vitest";
import { getPaths } from ".";
import { API_URL } from ".";
import { mockPaths } from "@/__mocks__";

describe("getPaths tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns data when fetch is successful", async () => {
    const mockResponse = { paths: mockPaths };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
        redirected: false,
        statusText: "OK",
        type: "basic" as ResponseType,
        url: `${API_URL}/paths`,
        clone: () => this as unknown as Response,
        body: null,
        bodyUsed: false,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        blob: () => Promise.resolve(new Blob()),
        formData: () => Promise.resolve(new FormData()),
        text: () => Promise.resolve(""),
      })
    );

    const data = await getPaths();
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/paths`);
  });

  it("returns an empty array when fetch fails", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Fetch failed")));

    const data = await getPaths();
    expect(data).toEqual([]);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/paths`);
  });
});
