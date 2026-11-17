export type UtmParams = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
};

/** The most recent visit that arrived from another website or a campaign link. */
export type TouchPoint = {
  referrerUrl: string | null;
  referrerDomain: string | null;
  visitUrl: string | null;
  visitAt: string;
  utm: UtmParams | null;
};

export type VisitorContext = {
  referrerUrl: string | null;
  referrerDomain: string | null;
  firstVisitUrl: string | null;
  firstVisitAt: string | null;
  firstUtm: UtmParams | null;
  lastTouch: TouchPoint | null;
  recentPages: string[];
};

export const VISITOR_CONTEXT_STORAGE_KEY = "visitor_context_v1";
export const MAX_RECENT_PAGES = 5;
export const ATTRIBUTION_RETENTION_DAYS = 90;

const ATTRIBUTION_RETENTION_MS =
  ATTRIBUTION_RETENTION_DAYS * 24 * 60 * 60 * 1000;

const EMPTY_CONTEXT: VisitorContext = {
  referrerUrl: null,
  referrerDomain: null,
  firstVisitUrl: null,
  firstVisitAt: null,
  firstUtm: null,
  lastTouch: null,
  recentPages: [],
};

const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function isAttributionExpired(
  firstVisitAt: string | null,
  now = new Date(),
): boolean {
  if (!firstVisitAt) return false;
  const timestamp = Date.parse(firstVisitAt);
  return (
    !Number.isFinite(timestamp) ||
    timestamp > now.getTime() + 5 * 60_000 ||
    now.getTime() - timestamp > ATTRIBUTION_RETENTION_MS
  );
}

function boundedCampaignValue(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, 120) : null;
}

export function parseUtm(url: string): UtmParams | null {
  try {
    const searchParams = new URL(url).searchParams;
    const values = {
      source: boundedCampaignValue(searchParams.get("utm_source")),
      medium: boundedCampaignValue(searchParams.get("utm_medium")),
      campaign: boundedCampaignValue(searchParams.get("utm_campaign")),
      term: boundedCampaignValue(searchParams.get("utm_term")),
      content: boundedCampaignValue(searchParams.get("utm_content")),
    };
    return Object.values(values).some(Boolean) ? values : null;
  } catch {
    return null;
  }
}

function safeHttpUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function cleanPageUrl(value: string, keepUtm: boolean): string | null {
  const url = safeHttpUrl(value);
  if (!url) return null;

  const clean = new URL(url.pathname, url.origin);
  if (keepUtm) {
    for (const key of utmKeys) {
      const campaignValue = boundedCampaignValue(url.searchParams.get(key));
      if (campaignValue) clean.searchParams.set(key, campaignValue);
    }
  }
  return clean.toString();
}

function cleanExternalReferrer(
  referrerUrl: string,
  siteOrigin: string,
): { url: string | null; domain: string | null } {
  const referrer = safeHttpUrl(referrerUrl);
  if (!referrer || referrer.origin === siteOrigin) {
    return { url: null, domain: null };
  }
  referrer.username = "";
  referrer.password = "";
  referrer.search = "";
  referrer.hash = "";
  return { url: referrer.toString(), domain: referrer.hostname };
}

export function updateVisitorContext(
  current: VisitorContext,
  {
    pageUrl,
    referrerUrl = "",
    visitedAt = new Date(),
  }: {
    pageUrl: string;
    referrerUrl?: string;
    visitedAt?: Date;
  },
): VisitorContext {
  const page = safeHttpUrl(pageUrl);
  if (!page) return current;

  const next: VisitorContext = {
    ...current,
    recentPages: [...current.recentPages].slice(-MAX_RECENT_PAGES),
  };

  const referrer = cleanExternalReferrer(referrerUrl, page.origin);
  const utm = parseUtm(pageUrl);

  if (!next.firstVisitUrl) {
    next.referrerUrl = referrer.url;
    next.referrerDomain = referrer.domain;
    next.firstVisitUrl = cleanPageUrl(pageUrl, true);
    next.firstVisitAt = visitedAt.toISOString();
    next.firstUtm = utm;
  }

  // Direct visits and internal navigation keep the last channel that brought
  // the visitor back, so a later direct return does not erase a campaign.
  if (referrer.domain || utm) {
    next.lastTouch = {
      referrerUrl: referrer.url,
      referrerDomain: referrer.domain,
      visitUrl: cleanPageUrl(pageUrl, true),
      visitAt: visitedAt.toISOString(),
      utm,
    };
  }

  const recentPage = cleanPageUrl(pageUrl, false);
  if (
    recentPage &&
    next.recentPages[next.recentPages.length - 1] !== recentPage
  ) {
    next.recentPages = [...next.recentPages, recentPage].slice(
      -MAX_RECENT_PAGES,
    );
  }

  return next;
}

function storedTouch(value: unknown): TouchPoint | null {
  if (!value || typeof value !== "object") return null;
  const touch = value as Record<string, unknown>;
  if (typeof touch.visitAt !== "string") return null;
  const text = (key: string) =>
    typeof touch[key] === "string" ? (touch[key] as string) : null;
  return {
    referrerUrl: text("referrerUrl"),
    referrerDomain: text("referrerDomain"),
    visitUrl: text("visitUrl"),
    visitAt: touch.visitAt,
    utm:
      touch.utm && typeof touch.utm === "object"
        ? (touch.utm as UtmParams)
        : null,
  };
}

function readContext(): VisitorContext {
  if (typeof window === "undefined") return { ...EMPTY_CONTEXT };

  try {
    const stored = window.localStorage.getItem(VISITOR_CONTEXT_STORAGE_KEY);
    if (!stored) return { ...EMPTY_CONTEXT };
    const parsed = JSON.parse(stored) as Partial<VisitorContext>;
    if (
      isAttributionExpired(
        typeof parsed.firstVisitAt === "string" ? parsed.firstVisitAt : null,
      )
    ) {
      return { ...EMPTY_CONTEXT, recentPages: [] };
    }
    return {
      referrerUrl:
        typeof parsed.referrerUrl === "string" ? parsed.referrerUrl : null,
      referrerDomain:
        typeof parsed.referrerDomain === "string"
          ? parsed.referrerDomain
          : null,
      firstVisitUrl:
        typeof parsed.firstVisitUrl === "string" ? parsed.firstVisitUrl : null,
      firstVisitAt:
        typeof parsed.firstVisitAt === "string" ? parsed.firstVisitAt : null,
      firstUtm: parsed.firstUtm ?? null,
      lastTouch: storedTouch(parsed.lastTouch),
      recentPages: Array.isArray(parsed.recentPages)
        ? parsed.recentPages
            .filter((page): page is string => typeof page === "string")
            .slice(-MAX_RECENT_PAGES)
        : [],
    };
  } catch {
    return { ...EMPTY_CONTEXT };
  }
}

// document.referrer stays the same after client-side navigation, so only the
// landing pageview of each page load may use it.
let landingRecorded = false;

export function recordPageview(pageUrl: string): void {
  if (typeof window === "undefined") return;

  const context = updateVisitorContext(readContext(), {
    pageUrl,
    referrerUrl: landingRecorded ? "" : document.referrer,
  });
  landingRecorded = true;

  try {
    window.localStorage.setItem(
      VISITOR_CONTEXT_STORAGE_KEY,
      JSON.stringify(context),
    );
  } catch {
    // Storage can be unavailable in private browsing or after consent changes.
  }
}

export function getVisitorContext(): VisitorContext {
  return readContext();
}

type ChannelProperties = Record<string, string | null>;

function channelProperties(
  prefix: "first_touch" | "last_touch",
  referrerDomain: string | null,
  utm: UtmParams | null,
): ChannelProperties {
  return {
    [`${prefix}_referring_domain`]: referrerDomain ?? "$direct",
    [`${prefix}_utm_source`]: utm?.source ?? null,
    [`${prefix}_utm_medium`]: utm?.medium ?? null,
    [`${prefix}_utm_campaign`]: utm?.campaign ?? null,
  };
}

/**
 * PostHog properties for the channel that first brought the visitor and the
 * most recent channel that brought them back. Values are referring domains
 * and campaign tags only.
 */
export function attributionProperties(
  context: VisitorContext = readContext(),
): { firstTouch: ChannelProperties; lastTouch: ChannelProperties } {
  if (!context.firstVisitUrl) return { firstTouch: {}, lastTouch: {} };
  // Histories stored before lastTouch existed fall back to the first touch.
  const latest = context.lastTouch ?? {
    referrerDomain: context.referrerDomain,
    utm: context.firstUtm,
  };
  return {
    firstTouch: channelProperties(
      "first_touch",
      context.referrerDomain,
      context.firstUtm,
    ),
    lastTouch: channelProperties(
      "last_touch",
      latest.referrerDomain,
      latest.utm,
    ),
  };
}
