import { describe, expect, it } from "vitest";

import {
  attributionProperties,
  MAX_RECENT_PAGES,
  isAttributionExpired,
  parseUtm,
  type VisitorContext,
  updateVisitorContext,
} from "./visitor-context";

const emptyContext: VisitorContext = {
  referrerUrl: null,
  referrerDomain: null,
  firstVisitUrl: null,
  firstVisitAt: null,
  firstUtm: null,
  lastTouch: null,
  recentPages: [],
};

describe("visitor context", () => {
  it("keeps first-touch UTMs while dropping unrelated query values", () => {
    const context = updateVisitorContext(emptyContext, {
      pageUrl:
        "https://example.com/uses/startup-launches?utm_source=linkedin&utm_campaign=launch&token=secret",
      referrerUrl:
        "https://private:secret@www.linkedin.com/feed/?tracking=private",
      visitedAt: new Date("2026-08-20T10:00:00.000Z"),
    });

    expect(context.firstVisitUrl).toBe(
      "https://example.com/uses/startup-launches?utm_source=linkedin&utm_campaign=launch",
    );
    expect(context.firstUtm).toMatchObject({
      source: "linkedin",
      campaign: "launch",
    });
    expect(context.referrerUrl).toBe("https://www.linkedin.com/feed/");
    expect(context.recentPages).toEqual([
      "https://example.com/uses/startup-launches",
    ]);
  });

  it("ignores same-site referrers and bounds the recent journey", () => {
    let context = updateVisitorContext(emptyContext, {
      pageUrl: "https://example.com/one",
      referrerUrl: "https://example.com/home",
    });

    for (let page = 2; page <= 8; page += 1) {
      context = updateVisitorContext(context, {
        pageUrl: `https://example.com/${page}?private=value`,
      });
    }

    expect(context.referrerUrl).toBeNull();
    expect(context.recentPages).toHaveLength(MAX_RECENT_PAGES);
    expect(context.recentPages[0]).toBe("https://example.com/4");
    expect(context.recentPages.at(-1)).toBe("https://example.com/8");
  });

  it("credits a return visit to the latest external channel", () => {
    let context = updateVisitorContext(emptyContext, {
      pageUrl: "https://example.com/",
      referrerUrl: "https://www.google.com/",
      visitedAt: new Date("2026-08-01T10:00:00.000Z"),
    });
    context = updateVisitorContext(context, {
      pageUrl:
        "https://example.com/uses?utm_source=linkedin&utm_medium=paid_social&utm_campaign=autumn",
      referrerUrl: "https://www.linkedin.com/",
      visitedAt: new Date("2026-08-10T10:00:00.000Z"),
    });
    // A later direct return and internal navigation keep the LinkedIn touch.
    context = updateVisitorContext(context, {
      pageUrl: "https://example.com/contact",
      visitedAt: new Date("2026-08-15T10:00:00.000Z"),
    });

    expect(context.referrerDomain).toBe("www.google.com");
    expect(context.lastTouch).toMatchObject({
      referrerDomain: "www.linkedin.com",
      visitAt: "2026-08-10T10:00:00.000Z",
      utm: { source: "linkedin", campaign: "autumn" },
    });
    expect(attributionProperties(context)).toEqual({
      firstTouch: {
        first_touch_referring_domain: "www.google.com",
        first_touch_utm_source: null,
        first_touch_utm_medium: null,
        first_touch_utm_campaign: null,
      },
      lastTouch: {
        last_touch_referring_domain: "www.linkedin.com",
        last_touch_utm_source: "linkedin",
        last_touch_utm_medium: "paid_social",
        last_touch_utm_campaign: "autumn",
      },
    });
  });

  it("falls back to the first touch for histories without a latest touch", () => {
    const { lastTouch } = attributionProperties({
      ...emptyContext,
      referrerDomain: "www.google.com",
      firstVisitUrl: "https://example.com/",
      firstVisitAt: "2026-08-01T10:00:00.000Z",
    });
    expect(lastTouch.last_touch_referring_domain).toBe("www.google.com");
    expect(attributionProperties(emptyContext)).toEqual({
      firstTouch: {},
      lastTouch: {},
    });
  });

  it("returns null when no UTM value exists", () => {
    expect(parseUtm("https://example.com/?query=website")).toBeNull();
  });

  it("expires stored attribution after 90 days", () => {
    expect(
      isAttributionExpired(
        "2026-01-01T00:00:00.000Z",
        new Date("2026-04-02T00:00:01.000Z"),
      ),
    ).toBe(true);
    expect(
      isAttributionExpired(
        "2026-01-01T00:00:00.000Z",
        new Date("2026-03-01T00:00:00.000Z"),
      ),
    ).toBe(false);
  });
});
