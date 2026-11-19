import {
  getRedirectUrl,
  unstable_getResponseFromNextConfig,
} from "next/experimental/testing/server";
import { describe, expect, it } from "vitest";

import { bookingHeaderRules, bookingRedirects } from "./booking";

const nextConfig = {
  async headers() {
    return bookingHeaderRules;
  },
  async redirects() {
    return bookingRedirects;
  },
};

describe("booking page", () => {
  it("redirects old book.ailytics.ai links to /book and keeps UTM tags", async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: "https://book.ailytics.ai/?utm_source=outreach&utm_campaign=oct",
      nextConfig,
    });

    expect(response.status).toBe(308);
    expect(getRedirectUrl(response)).toBe(
      "https://www.ailytics.ai/book?utm_source=outreach&utm_campaign=oct",
    );
  });

  it("sends the /lenard short link to Lenard's booking page and keeps UTM tags", async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: "https://www.ailytics.ai/lenard?utm_source=email",
      nextConfig,
    });

    expect(response.status).toBe(307);
    expect(getRedirectUrl(response)).toBe(
      "https://www.ailytics.ai/book/lenard?utm_source=email",
    );
  });

  it("tells search engines not to index /book or personal booking pages", async () => {
    for (const url of [
      "https://www.ailytics.ai/book",
      "https://www.ailytics.ai/book.md",
      "https://www.ailytics.ai/book/theo",
      "https://www.ailytics.ai/book/theo.md",
      "https://www.ailytics.ai/book/lenard",
      "https://www.ailytics.ai/book/lenard.md",
    ]) {
      const response = await unstable_getResponseFromNextConfig({
        url,
        nextConfig,
      });
      expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    }
  });

  it("leaves the main site's homepage and headers alone", async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: "https://www.ailytics.ai/",
      nextConfig,
    });

    expect(getRedirectUrl(response)).toBeNull();
    expect(response.headers.get("x-robots-tag")).toBeNull();
  });
});
