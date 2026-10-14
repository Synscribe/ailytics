import nodemailer from "nodemailer";

import { siteConfig } from "../config/site";
import {
  isContactDeliveryConfigured,
  missingContactDeliveryVariables,
} from "./contact-delivery";

export type ApplicationSubmission = {
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  linkedin: string;
  resume: {
    filename: string;
    contentType: string;
    content: Buffer;
  };
};

function configuredValue(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

/** Applications go to CAREERS_TO_EMAIL when set, otherwise the contact inbox. */
export function applicationRecipient(): string | undefined {
  return (
    configuredValue("CAREERS_TO_EMAIL") ?? configuredValue("CONTACT_TO_EMAIL")
  );
}

export function isApplicationDeliveryConfigured(): boolean {
  return isContactDeliveryConfigured() && Boolean(applicationRecipient());
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeSubjectValue(value: string): string {
  return value.replace(/[\r\n\u0000-\u001f\u007f]+/g, " ").trim();
}

export function renderApplicationEmail(submission: ApplicationSubmission): {
  subject: string;
  text: string;
  html: string;
} {
  const rows: [string, string][] = [
    ["Role", submission.jobTitle],
    ["Role page", `${siteConfig.url}/careers/${submission.jobSlug}`],
    ["Name", submission.name],
    ["Email", submission.email],
    ["LinkedIn", submission.linkedin || "Not provided"],
    ["Resume", submission.resume.filename],
  ];
  const text = rows.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  const html = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:8px 16px 8px 0">${escapeHtml(label)}</th><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return {
    subject: `Job application — ${safeSubjectValue(submission.jobTitle)} — ${safeSubjectValue(submission.name)}`,
    text: `${siteConfig.name} received a new job application.\n\n${text}`,
    html: [
      `<h1 style="font:600 24px/1.3 sans-serif">New job application</h1>`,
      `<table style="border-collapse:collapse;font:14px/1.5 sans-serif"><tbody>${html}</tbody></table>`,
    ].join(""),
  };
}

export async function deliverApplication(
  submission: ApplicationSubmission,
): Promise<void> {
  const missing = missingContactDeliveryVariables();
  const recipient = applicationRecipient();
  if (missing.length > 0 || !recipient) {
    throw new Error(
      `Application delivery is not configured: ${[...missing, ...(recipient ? [] : ["CAREERS_TO_EMAIL"])].join(", ")}`,
    );
  }

  const port = Number.parseInt(configuredValue("MAIL_PORT") ?? "", 10);
  const transporter = nodemailer.createTransport({
    host: configuredValue("MAIL_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: configuredValue("MAIL_USER"),
      pass: configuredValue("MAIL_PASS"),
    },
  });
  const email = renderApplicationEmail(submission);

  await transporter.sendMail({
    from: configuredValue("MAIL_FROM"),
    to: recipient,
    replyTo: submission.email,
    attachments: [
      {
        filename: submission.resume.filename,
        content: submission.resume.content,
        contentType: submission.resume.contentType,
      },
    ],
    ...email,
  });
}
