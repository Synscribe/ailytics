import { readFile } from "node:fs/promises";
import path from "node:path";

import sanitizeHtml from "sanitize-html";

/**
 * A legal document migrated from the previous site, read from
 * src/content/legal/<slug>.json and sanitized again before rendering.
 */
export type LegalDocument = {
  slug: string;
  title: string;
  effectiveDate: string;
  /** Sanitized HTML: headings, paragraphs, lists, emphasis and links only. */
  html: string;
};

const contentDirectory = path.join(process.cwd(), "src/content/legal");

export function sanitizeLegalHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: { a: ["href", "rel", "target"] },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

function text(value: unknown, fileName: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fileName}: ${field} must be a non-empty string`);
  }
  return value.trim();
}

export function parseLegalDocument(
  value: unknown,
  fileName: string,
): LegalDocument {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${fileName}: root must be an object`);
  }
  const source = value as Record<string, unknown>;
  const slug = text(source.slug, fileName, "slug");
  if (`${slug}.json` !== fileName) {
    throw new Error(`${fileName}: slug must match the file name`);
  }
  return {
    slug,
    title: text(source.title, fileName, "title"),
    effectiveDate:
      typeof source.effectiveDate === "string"
        ? source.effectiveDate.trim()
        : "",
    html: sanitizeLegalHtml(text(source.html, fileName, "html")),
  };
}

export async function getLegalDocument(
  slug: "privacy-policy" | "eula",
): Promise<LegalDocument> {
  const fileName = `${slug}.json`;
  const source = await readFile(path.join(contentDirectory, fileName), "utf8");
  return parseLegalDocument(JSON.parse(source) as unknown, fileName);
}
