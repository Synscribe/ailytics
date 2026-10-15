"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTurnstile } from "@/app/contact/_components/turnstile";
import { Button } from "@/components/ui/button";
import {
  CONTACT_LIMITS,
  type ContactFieldErrors,
  validateContactFields,
} from "@/lib/contact";
import { getVisitorContext } from "@/lib/visitor-context";

type PartnerFormProps = {
  turnstileAction?: string;
  turnstileSiteKey?: string;
};

type SubmissionState = "idle" | "sending" | "success" | "error";

type PartnerFields = {
  name: string;
  email: string;
  company: string;
  enquiry: string;
};

const initialFields: PartnerFields = {
  name: "",
  email: "",
  company: "",
  enquiry: "",
};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-signal focus:ring-3 focus:ring-signal/15 aria-invalid:border-signal";

/**
 * Partnership enquiries go through the contact pipeline. The enquiry is sent
 * as the message, prefixed so the inbox can tell it apart from demo requests.
 */
export function PartnerForm({
  turnstileAction,
  turnstileSiteKey,
}: PartnerFormProps) {
  const [fields, setFields] = useState<PartnerFields>(initialFields);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [state, setState] = useState<SubmissionState>("idle");
  const [formError, setFormError] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const startedAt = useRef(0);
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

  function updateField(name: keyof PartnerFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    const errorKey = name === "enquiry" ? "message" : name;
    setFieldErrors((current) => ({ ...current, [errorKey]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const contactFields = {
      name: fields.name,
      email: fields.email,
      company: fields.company,
      website: "",
      message: fields.enquiry,
    };
    const validation = validateContactFields(contactFields);
    const errors: ContactFieldErrors = { ...validation.fieldErrors };
    if (!fields.company.trim()) errors.company = "Enter your company name.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("Check the highlighted fields.");
      setState("error");
      return;
    }

    setState("sending");
    setFormError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          message: `Partnership enquiry\n\n${validation.data?.message ?? ""}`,
          attribution: getVisitorContext(),
          companyWebsite,
          startedAt: startedAt.current,
          ...(turnstileEnabled ? { turnstileToken } : {}),
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        fieldErrors?: ContactFieldErrors;
      };
      if (!response.ok || !result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        throw new Error(result.error || "Your message could not be sent.");
      }
      resetTurnstile();
      if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
        posthog.capture("contact_form_submitted", { source: "partnerships" });
      }
      setFields(initialFields);
      setState("success");
    } catch (error) {
      resetTurnstile();
      setFormError(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="-m-5 bg-mint/25 p-5 sm:-m-8 sm:p-8" role="status">
        <h2 className="brand-h2 max-w-lg">
          Thank you. We&apos;ve received your message.
        </h2>
        <p className="mt-4 max-w-md leading-7 text-ink-muted">
          We&apos;ll be in touch soon.
        </p>
        <div className="mt-8">
          <Button
            className="h-auto rounded-full px-5 py-3"
            onClick={() => {
              startedAt.current = Date.now();
              setState("idle");
            }}
            type="button"
            variant="outline"
          >
            Send another message
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit}>
      <div className="flex flex-col gap-5">
        <Field id="partner-name" label="Name" error={fieldErrors.name} required>
          <input
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? "partner-name-error" : undefined
            }
            autoComplete="name"
            className={fieldClassName}
            id="partner-name"
            maxLength={CONTACT_LIMITS.name}
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            required
            type="text"
            value={fields.name}
          />
        </Field>

        <Field
          id="partner-email"
          label="Email"
          error={fieldErrors.email}
          required
        >
          <input
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "partner-email-error" : undefined
            }
            autoComplete="email"
            className={fieldClassName}
            id="partner-email"
            inputMode="email"
            maxLength={CONTACT_LIMITS.email}
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            required
            type="email"
            value={fields.email}
          />
        </Field>

        <Field
          id="partner-company"
          label="Company"
          error={fieldErrors.company}
          required
        >
          <input
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={
              fieldErrors.company ? "partner-company-error" : undefined
            }
            autoComplete="organization"
            className={fieldClassName}
            id="partner-company"
            maxLength={CONTACT_LIMITS.company}
            name="company"
            onChange={(event) => updateField("company", event.target.value)}
            required
            type="text"
            value={fields.company}
          />
        </Field>

        <Field
          id="partner-enquiry"
          label="What are you looking for?"
          error={fieldErrors.message}
          required
        >
          <textarea
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? "partner-enquiry-error" : undefined
            }
            className={`${fieldClassName} min-h-32 resize-y`}
            id="partner-enquiry"
            maxLength={CONTACT_LIMITS.message}
            name="enquiry"
            onChange={(event) => updateField("enquiry", event.target.value)}
            placeholder="Partnership models, commercial structures, or how Ailytics could integrate into your projects."
            required
            value={fields.enquiry}
          />
        </Field>
      </div>

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="partner-company-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="partner-company-website"
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
        {state === "sending" ? "Sending…" : "Submit"}
      </Button>
      <p className="mt-3 max-w-md text-xs leading-5 text-ink-muted">
        We use your details to respond to this enquiry. Read our{" "}
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
