/**
 * Outreach emails link to this host. It serves the /book page at its root,
 * and every response on it tells search engines not to index it.
 */
export const BOOKING_HOST = "book.ailytics.ai";

const onBookingHost = [{ type: "host" as const, value: BOOKING_HOST }];

export const bookingRewrites = [
  { source: "/", has: onBookingHost, destination: "/book" },
];

export const bookingHeaderRules = [
  {
    source: "/:path*",
    has: onBookingHost,
    headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
  },
];
