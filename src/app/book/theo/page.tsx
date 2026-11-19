import type { Metadata } from "next";

// Theo's Google Calendar appointment schedule. `gv=true` is Google's embed
// view, which drops the calendar chrome so the booking form fills the frame.
const THEO_SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ38zvlDdJeVtJ4DAt3CLjUpqaPvgwtLC_DExAJy4xi-yHJ5nYdcYQt8IBQklMMDF2nXcGsxcygu?gv=true";

// Shared only through email, so it stays out of search results, navigation
// and the sitemap. next.config.ts also sends X-Robots-Tag for /book/*.
export const metadata: Metadata = {
  title: "Book a call with Theo",
  description:
    "Pick a time for a call with Theo from Ailytics to talk through your sites, cameras and safety goals.",
  robots: { index: false, follow: false },
};

export default function BookTheoPage() {
  return (
    <main className="h-dvh" data-booking-page id="main-content">
      <iframe
        className="block size-full border-0"
        src={THEO_SCHEDULE_URL}
        title="Book a call with Theo from Ailytics"
      />
    </main>
  );
}
