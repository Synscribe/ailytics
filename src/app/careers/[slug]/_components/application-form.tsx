"use client";

import { ArrowRightIcon, UploadCloudIcon } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTurnstile } from "@/app/contact/_components/turnstile";
import { Button } from "@/components/ui/button";
import {
  APPLICATION_LIMITS,
  type ApplicationFieldErrors,
  type ApplicationFields,
  RESUME_ACCEPT,
  validateApplicationFields,
  validateResume,
} from "@/lib/careers";

type ApplicationFormProps = {
  jobSlug: string;
  jobTitle: string;
  turnstileAction?: string;
  turnstileSiteKey?: string;
};

type SubmissionState = "idle" | "sending" | "success" | "error";

const initialFields: ApplicationFields = { name: "", email: "", linkedin: "" };

const fieldClassName =
  "mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-signal focus:ring-3 focus:ring-signal/15 aria-invalid:border-signal";

export function ApplicationForm({
  jobSlug,
  jobTitle,
  turnstileAction,
  turnstileSiteKey,
}: ApplicationFormProps) {
  const [fields, setFields] = useState<ApplicationFields>(initialFields);
  const [resume, setResume] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ApplicationFieldErrors>({});
  const [state, setState] = useState<SubmissionState>("idle");
  const [formError, setFormError] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const startedAt = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    enabled: turnstileEnabled,
    error: turnstileError,
    reset: resetTurnstile,
    token: turnstileToken,
    widget: turnstileWidget,
  } = useTurnstile({ action: turnstileAction, siteKey: turnstileSiteKey });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function updateField(name: keyof ApplicationFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
  }

  function updateResume(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setResume(file);
    setFieldErrors((current) => ({
      ...current,
      resume: file ? (validateResume(file) ?? undefined) : undefined,
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const validation = validateApplicationFields(fields);
    const resumeError = validateResume(resume);
    if (!validation.data || resumeError) {
      setFieldErrors({
        ...validation.fieldErrors,
        ...(resumeError ? { resume: resumeError } : {}),
      });
      setFormError("Check the highlighted fields.");
      setState("error");
      return;
    }

    setState("sending");
    setFormError("");
    setFieldErrors({});

    const body = new FormData();
    body.set("jobSlug", jobSlug);
    body.set("name", validation.data.name);
    body.set("email", validation.data.email);
    body.set("linkedin", validation.data.linkedin);
    body.set("resume", resume as File);
    body.set("companyWebsite", companyWebsite);
    body.set("startedAt", String(startedAt.current));
    if (turnstileEnabled && turnstileToken) {
      body.set("turnstileToken", turnstileToken);
    }

    try {
      const response = await fetch("/api/careers", { method: "POST", body });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        fieldErrors?: ApplicationFieldErrors;
      };
      if (!response.ok || !result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        throw new Error(result.error || "Your application could not be sent.");
      }
      resetTurnstile();
      if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
        posthog.capture("job_application_submitted", { job: jobSlug });
      }
      setFields(initialFields);
      setResume(null);
      if (fileInput.current) fileInput.current.value = "";
      setState("success");
    } catch (error) {
      resetTurnstile();
      setFormError(
        error instanceof Error
          ? error.message
          : "Your application could not be sent. Please try again.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="-m-5 bg-mint/25 p-5 sm:-m-8 sm:p-8" role="status">
        <h2 className="brand-h2 max-w-lg">
          Thank you. We&apos;ve received your application.
        </h2>
        <p className="mt-4 max-w-md leading-7 text-ink-muted">
          We&apos;ll be in touch if your profile matches the {jobTitle} role.
        </p>
        <div className="mt-8">
          <Link className="brand-btn-secondary" href="/careers">
            See all openings
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit}>
      <div className="flex flex-col gap-5">
        <Field id="name" label="Name" error={fieldErrors.name} required>
          <input
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            autoComplete="name"
            className={fieldClassName}
            id="name"
            maxLength={APPLICATION_LIMITS.name}
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            required
            type="text"
            value={fields.name}
          />
        </Field>

        <Field id="email" label="Email" error={fieldErrors.email} required>
          <input
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            autoComplete="email"
            className={fieldClassName}
            id="email"
            inputMode="email"
            maxLength={APPLICATION_LIMITS.email}
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            required
            type="email"
            value={fields.email}
          />
        </Field>

        <Field
          id="linkedin"
          label="LinkedIn Profile"
          error={fieldErrors.linkedin}
        >
          <input
            aria-invalid={Boolean(fieldErrors.linkedin)}
            aria-describedby={
              fieldErrors.linkedin ? "linkedin-error" : undefined
            }
            autoComplete="url"
            className={fieldClassName}
            id="linkedin"
            inputMode="url"
            maxLength={APPLICATION_LIMITS.linkedin}
            name="linkedin"
            onChange={(event) => updateField("linkedin", event.target.value)}
            placeholder="linkedin.com/in/your-name"
            type="url"
            value={fields.linkedin}
          />
        </Field>

        <Field id="resume" label="Resume" error={fieldErrors.resume} required>
          <label
            className={`mt-2 flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-4 py-4 text-center text-sm transition ${
              fieldErrors.resume
                ? "border-signal"
                : "border-signal/50 hover:border-signal"
            }`}
            htmlFor="resume"
          >
            <UploadCloudIcon
              className="size-5 text-signal-strong"
              aria-hidden="true"
            />
            {resume ? (
              <span className="font-medium text-ink">{resume.name}</span>
            ) : (
              <span className="font-medium text-ink">Upload File</span>
            )}
            <span className="text-xs text-ink-muted">
              PDF or Word document, up to 10 MB
            </span>
            <input
              accept={RESUME_ACCEPT}
              aria-invalid={Boolean(fieldErrors.resume)}
              aria-describedby={fieldErrors.resume ? "resume-error" : undefined}
              className="sr-only"
              id="resume"
              name="resume"
              onChange={updateResume}
              ref={fileInput}
              required
              type="file"
            />
          </label>
        </Field>
      </div>

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="company-website"
          name="companyWebsite"
          onChange={(event) => setCompanyWebsite(event.target.value)}
          tabIndex={-1}
          type="text"
          value={companyWebsite}
        />
      </div>

      {turnstileWidget}

      {turnstileError ? (
        <p className="mt-3 text-sm text-signal-strong" role="alert">
          {turnstileError}
        </p>
      ) : null}

      {formError ? (
        <p className="mt-5 text-sm font-medium text-signal-strong" role="alert">
          {formError}
        </p>
      ) : null}

      <Button
        className="mt-7 h-auto w-full rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper hover:bg-ink/90"
        disabled={state === "sending" || (turnstileEnabled && !turnstileToken)}
        type="submit"
      >
        {state === "sending" ? "Sending…" : "Apply Now!"}
      </Button>
      <p className="mt-3 text-xs leading-5 text-ink-muted">
        We use your details and resume only to consider you for this role. Read
        our{" "}
        <Link className="underline underline-offset-3" href="/privacy-policy">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  children,
  error,
  id,
  label,
  required = false,
}: {
  children: ReactNode;
  error?: string;
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink" htmlFor={id}>
        {label}
        {required ? <span className="text-signal"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-signal-strong" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
