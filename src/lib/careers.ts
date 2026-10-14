/**
 * Validation shared by the job application form and its API route. Keep it
 * free of Node imports so the client bundle can use it.
 */
export const APPLICATION_LIMITS = {
  name: 80,
  email: 254,
  linkedin: 300,
  resumeBytes: 10 * 1024 * 1024,
} as const;

export const RESUME_ACCEPT = ".pdf,.doc,.docx";

const RESUME_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Browsers sometimes send a generic type for local files.
  "application/octet-stream",
  "",
]);

export type ApplicationFields = {
  name: string;
  email: string;
  linkedin: string;
};

export type ApplicationFieldErrors = Partial<
  Record<keyof ApplicationFields | "resume", string>
>;

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizedLinkedin(value: string): string | null {
  if (!value) return "";
  // Only web URLs; "ftp://x" would otherwise parse as a host under https.
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value) && !/^https?:\/\//i.test(value)) {
    return null;
  }
  try {
    const url = new URL(
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    );
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function validateApplicationFields(fields: ApplicationFields): {
  data: ApplicationFields | null;
  fieldErrors: ApplicationFieldErrors;
} {
  const values: ApplicationFields = {
    name: fields.name.trim(),
    email: fields.email.trim().toLowerCase(),
    linkedin: fields.linkedin.trim(),
  };
  const fieldErrors: ApplicationFieldErrors = {};

  if (values.name.length < 2 || values.name.length > APPLICATION_LIMITS.name) {
    fieldErrors.name = `Enter a name between 2 and ${APPLICATION_LIMITS.name} characters.`;
  }
  if (
    !validEmail(values.email) ||
    values.email.length > APPLICATION_LIMITS.email
  ) {
    fieldErrors.email = "Enter a valid email address.";
  }
  const linkedin = normalizedLinkedin(values.linkedin);
  if (linkedin === null || linkedin.length > APPLICATION_LIMITS.linkedin) {
    fieldErrors.linkedin = "Enter a valid profile URL.";
  } else {
    values.linkedin = linkedin;
  }

  return {
    data: Object.keys(fieldErrors).length === 0 ? values : null,
    fieldErrors,
  };
}

/** Returns an error message for the resume, or null when it is acceptable. */
export function validateResume(
  file: {
    name: string;
    size: number;
    type: string;
  } | null,
): string | null {
  if (!file || file.size === 0) return "Attach your resume.";
  if (file.size > APPLICATION_LIMITS.resumeBytes) {
    return "Upload failed. Max size for files is 10 MB.";
  }
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_EXTENSIONS.has(extension) || !RESUME_MIME_TYPES.has(file.type)) {
    return "Upload a PDF or Word document.";
  }
  return null;
}

/** A file name safe to attach to an email. */
export function safeResumeFileName(name: string): string {
  const extension = name.slice(name.lastIndexOf(".")).toLowerCase();
  const base = name
    .slice(0, name.lastIndexOf("."))
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80);
  return `${base || "resume"}${extension}`;
}
