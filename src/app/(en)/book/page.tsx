import type { Metadata } from "next";

import { BookingFrame } from "./_components/booking-frame";

// The booking calendar runs as a Google Apps Script web app. Google hides its
// "created by a Google Apps Script user" bar when the app is framed.
const BOOKING_APP_URL =
  "https://script.google.com/macros/s/AKfycbwee7by36gyDfyheu3wL-Iw3GCZzVv9Z5M7XJ330TQtIx-df_Cr0ILUOs-w_o7LIQ5y/exec";

// Shared only through outreach emails, so it stays out of search results,
// navigation and the sitemap. next.config.ts also sends X-Robots-Tag here.
export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Pick a time for a 30-minute intro call with the Ailytics team about your sites and cameras.",
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return (
    <main className="h-dvh" data-booking-page id="main-content">
      <BookingFrame src={BOOKING_APP_URL} />
    </main>
  );
}
