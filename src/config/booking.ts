/**
 * The booking calendar lives at /book. Earlier outreach emails linked to
 * book.ailytics.ai, so that host redirects there with its query string (and
 * any UTM tags) intact. Search engines are told not to index either URL.
 */
export const BOOKING_PATH = "/book";
export const BOOKING_URL = `https://www.ailytics.ai${BOOKING_PATH}`;
export const LEGACY_BOOKING_HOST = "book.ailytics.ai";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

export const bookingRedirects = [
  {
    source: "/:path*",
    has: [{ type: "host" as const, value: LEGACY_BOOKING_HOST }],
    destination: BOOKING_URL,
    permanent: true,
  },
];

export const bookingHeaderRules = [BOOKING_PATH, `${BOOKING_PATH}.md`].map(
  (source) => ({ source, headers: noindex }),
);
