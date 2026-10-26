"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

// The calendar runs on Google's sandbox host, which posts this message to the
// top window after a booking succeeds.
const BOOKED_MESSAGE = "ailytics:call-booked";
const SANDBOX_ORIGIN = /^https:\/\/[a-z0-9-]+-script\.googleusercontent\.com$/;

export function isBookedMessage(event: Pick<MessageEvent, "origin" | "data">) {
  return (
    SANDBOX_ORIGIN.test(event.origin) &&
    typeof event.data === "object" &&
    event.data !== null &&
    event.data.type === BOOKED_MESSAGE
  );
}

export function BookingFrame({ src }: { src: string }) {
  useEffect(() => {
    let booked = false;
    function onMessage(event: MessageEvent) {
      if (booked || !isBookedMessage(event)) return;
      booked = true;
      posthog.capture("call_booked", { source: "book" });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      allow="clipboard-write; fullscreen"
      className="block size-full border-0"
      src={src}
      title="Book a call with Ailytics"
    />
  );
}
