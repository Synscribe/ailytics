import { describe, expect, it } from "vitest";

import { isBookedMessage } from "./booking-frame";

const sandbox =
  "https://n-55ax2ga3h36tn2l74jqb77bmph6x3sqs42am42i-0lu-script.googleusercontent.com";

describe("isBookedMessage", () => {
  it("accepts the booking message from the Apps Script sandbox", () => {
    expect(
      isBookedMessage({
        origin: sandbox,
        data: { type: "ailytics:call-booked" },
      }),
    ).toBe(true);
  });

  it("ignores other origins and messages", () => {
    expect(
      isBookedMessage({
        origin: "https://evil.example",
        data: { type: "ailytics:call-booked" },
      }),
    ).toBe(false);
    expect(
      isBookedMessage({ origin: sandbox, data: "ailytics:call-booked" }),
    ).toBe(false);
    expect(isBookedMessage({ origin: sandbox, data: null })).toBe(false);
  });
});
