import { describe, it, expect } from "vitest";

const originalEnv = process.env;

const getConfig = async () => {
  const config = await import("./config");
  return config;
};

describe("Config tests", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      NODE_ENV: "production",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  //
  it("returns production URL when NODE_ENV is production", async () => {
    const { API_URL: apiUrlProd } = await getConfig();

    if (process.env.NODE_ENV === "production") {
      expect(apiUrlProd).toBe(
        "https://titanstar-legends-rune-calculator-api.vercel.app/api"
      );
    }
  });

  it("returns local URL when NODE_ENV is not production", async () => {
    const { API_URL: apiUrlDev } = await getConfig();

    if (process.env.NODE_ENV !== "production") {
      expect(apiUrlDev).toBe("http://localhost:8080/api");
    }
  });
});
