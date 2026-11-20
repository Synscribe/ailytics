import type { Metadata } from "next";

// Lenard's Google Calendar appointment schedule. `gv=true` is Google's embed
// view, which drops the calendar chrome so the booking form fills the frame.
const LENARD_SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1fTSs2faGRsnPVNPBRrpQPE4ytpCA0b9WYaNhWeBxOT6c46jKsP356SYpKX8OWu9uBtcpTdfT1?gv=true";

// Shared only through email, so it stays out of search results, navigation
// and the sitemap. next.config.ts also sends X-Robots-Tag for /book/*.
export const metadata: Metadata = {
  title: "Book a call with Lenard",
  description:
    "Pick a time for a call with Lenard from Ailytics to talk through your sites, cameras and safety goals.",
  robots: { index: false, follow: false },
};

export default function BookLenardPage() {
  return (
    <main className="h-dvh" data-booking-page id="main-content">
      <iframe
        className="block size-full border-0"
        src={LENARD_SCHEDULE_URL}
        title="Book a call with Lenard from Ailytics"
      />
    </main>
  );
}
