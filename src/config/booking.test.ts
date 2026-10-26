import {
  getRewrittenUrl,
  unstable_getResponseFromNextConfig,
} from "next/experimental/testing/server";
import { describe, expect, it } from "vitest";

import { bookingHeaderRules, bookingRewrites } from "./booking";

const nextConfig = {
  async headers() {
    return bookingHeaderRules;
  },
  async rewrites() {
    return { beforeFiles: bookingRewrites, afterFiles: [], fallback: [] };
  },
};

describe("booking host", () => {
  it("serves the booking page at the root of book.ailytics.ai", async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: "https://book.ailytics.ai/",
      nextConfig,
    });

    expect(getRewrittenUrl(response)).toBe("https://book.ailytics.ai/book");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  });

  it("leaves the main site's homepage and headers alone", async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: "https://www.ailytics.ai/",
      nextConfig,
    });

    expect(getRewrittenUrl(response)).toBeNull();
    expect(response.headers.get("x-robots-tag")).toBeNull();
  });
});
