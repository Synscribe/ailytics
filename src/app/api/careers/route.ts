import { NextResponse } from "next/server";

import { getJob } from "@/app/careers/_jobs";
import {
  APPLICATION_LIMITS,
  safeResumeFileName,
  validateApplicationFields,
  validateResume,
} from "@/lib/careers";
import {
  deliverApplication,
  isApplicationDeliveryConfigured,
} from "@/lib/careers-delivery";
import { TURNSTILE_CAREERS_ACTION, verifyTurnstile } from "@/lib/turnstile";

import { checkContactRateLimit } from "../contact/_lib/rate-limit";

export const runtime = "nodejs";

/** The resume limit plus room for the text fields and multipart framing. */
const MAX_BODY_BYTES = APPLICATION_LIMITS.resumeBytes + 64_000;
const MIN_COMPLETION_MS = 1_200;
const MAX_COMPLETION_MS = 12 * 60 * 60 * 1000;

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function sameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function safeError(
  message: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json(
    { success: false, error: message, ...extra },
    { status },
  );
}

function field(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) {
    return safeError("This request could not be verified.", 403);
  }

  const contentLength = Number.parseInt(
    request.headers.get("content-length") ?? "0",
    10,
  );
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return safeError("Upload failed. Max size for files is 10 MB.", 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return safeError("The form could not be read.", 400);
  }

  // Honeypot: real visitors never see this field.
  if (field(form, "companyWebsite")) {
    return NextResponse.json({ success: true });
  }

  const startedAt = Number.parseInt(field(form, "startedAt"), 10);
  const elapsed = Date.now() - startedAt;
  if (
    !Number.isFinite(startedAt) ||
    elapsed < MIN_COMPLETION_MS ||
    elapsed > MAX_COMPLETION_MS
  ) {
    return safeError("Please reload the page and try again.", 400);
  }

  const validation = validateApplicationFields({
    name: field(form, "name"),
    email: field(form, "email"),
    linkedin: field(form, "linkedin"),
  });
  const resume = form.get("resume");
  const resumeFile = resume instanceof File ? resume : null;
  const resumeError = validateResume(resumeFile);
  const fieldErrors = {
    ...validation.fieldErrors,
    ...(resumeError ? { resume: resumeError } : {}),
  };
  if (!validation.data || !resumeFile || resumeError) {
    return safeError("Check the highlighted fields.", 400, { fieldErrors });
  }

  const job = await getJob(field(form, "jobSlug"));
  if (!job) {
    return safeError("This role is no longer open.", 400);
  }

  const key = clientKey(request);
  const rateLimit = checkContactRateLimit(`careers:${key}`);
  if (!rateLimit.ok) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions. Please wait and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  if (!isApplicationDeliveryConfigured()) {
    return safeError(
      "Applications are not being delivered yet. Please try again later.",
      503,
    );
  }

  const turnstile = await verifyTurnstile({
    expectedAction: TURNSTILE_CAREERS_ACTION,
    expectedHostname: new URL(request.url).hostname,
    remoteIp: key === "unknown" ? undefined : key,
    token: form.get("turnstileToken"),
  });
  if (!turnstile.ok) {
    console.warn("Careers form Turnstile verification rejected", {
      reason: turnstile.reason,
    });
    return safeError(
      "Bot verification failed. Please refresh and try again.",
      403,
    );
  }

  try {
    await deliverApplication({
      jobSlug: job.slug,
      jobTitle: job.title,
      ...validation.data,
      resume: {
        filename: safeResumeFileName(resumeFile.name),
        contentType: resumeFile.type || "application/octet-stream",
        content: Buffer.from(await resumeFile.arrayBuffer()),
      },
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "unknown";
    console.error("Application delivery failed", { code });
    return safeError(
      "Your application could not be sent. Please wait and try again.",
      502,
    );
  }

  return NextResponse.json({ success: true });
}
