import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import sanitizeHtml from "sanitize-html";

/**
 * One open role, read from src/content/careers/<slug>.json. The rich text was
 * migrated from the previous site and is sanitized again before rendering.
 */
export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  /** Sanitized HTML: paragraphs, lists and inline emphasis only. */
  html: string;
};

export type JobDepartment = {
  name: string;
  jobs: Job[];
};

/** The order the careers page lists departments in. Unknown ones go last. */
const DEPARTMENT_ORDER = [
  "Business",
  "Customer Success & Operations",
  "Early Careers",
  "Human Resources",
  "Technology",
];

const contentDirectory = path.join(process.cwd(), "src/content/careers");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// The source marks section headings as paragraphs holding only bold text.
const boldOnlyParagraph = /<p>\s*<(strong|b)>([^<]+)<\/\1>\s*<\/p>/g;

function sanitizeJobHtml(html: string): string {
  const clean = sanitizeHtml(html, {
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
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
    ],
    allowedAttributes: { a: ["href", "rel", "target"] },
    allowedSchemes: ["http", "https", "mailto"],
  });
  return clean.replace(boldOnlyParagraph, "<h2>$2</h2>");
}

function text(value: unknown, fileName: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fileName}: ${field} must be a non-empty string`);
  }
  return value.trim();
}

export function parseJob(value: unknown, fileName: string): Job {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${fileName}: root must be an object`);
  }
  const source = value as Record<string, unknown>;
  const slug = text(source.slug, fileName, "slug");
  if (!slugPattern.test(slug) || `${slug}.json` !== fileName) {
    throw new Error(`${fileName}: slug must match the file name`);
  }
  return {
    slug,
    title: text(source.title, fileName, "title"),
    department: text(source.department, fileName, "department"),
    location: text(source.location, fileName, "location"),
    html: sanitizeJobHtml(text(source.html, fileName, "html")),
  };
}

export async function listJobSlugs(): Promise<string[]> {
  const entries = await readdir(contentDirectory);
  return entries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => entry.replace(/\.json$/, ""))
    .sort();
}

export async function getJob(slug: string): Promise<Job | null> {
  if (!slugPattern.test(slug)) return null;
  const fileName = `${slug}.json`;
  let source: string;
  try {
    source = await readFile(path.join(contentDirectory, fileName), "utf8");
  } catch {
    return null;
  }
  return parseJob(JSON.parse(source) as unknown, fileName);
}

export async function getJobs(): Promise<Job[]> {
  const slugs = await listJobSlugs();
  const jobs = await Promise.all(slugs.map((slug) => getJob(slug)));
  return jobs.filter((job): job is Job => job !== null);
}

/** Groups roles by department in the site's order, alphabetical within each. */
export function groupJobsByDepartment(jobs: Job[]): JobDepartment[] {
  const groups = new Map<string, Job[]>();
  for (const job of jobs) {
    const group = groups.get(job.department) ?? [];
    group.push(job);
    groups.set(job.department, group);
  }
  const rank = (name: string) => {
    const index = DEPARTMENT_ORDER.indexOf(name);
    return index === -1 ? DEPARTMENT_ORDER.length : index;
  };
  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([name, group]) => ({
      name,
      jobs: [...group].sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

/** The role's opening paragraph as plain text, for metadata. */
export function jobSummary(job: Job, maxLength = 155): string {
  const paragraphs = job.html.match(/<p>([\s\S]*?)<\/p>/g) ?? [];
  const plain = paragraphs
    .map((paragraph) =>
      sanitizeHtml(paragraph, { allowedTags: [], allowedAttributes: {} })
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((paragraph) => paragraph.length > 0);
  // The first paragraph is the shared company intro; prefer the role itself.
  const source = paragraphs.length > 1 ? plain[1] : plain[0];
  const summary = `${job.title}, ${job.location}. ${source ?? ""}`.trim();
  if (summary.length <= maxLength) return summary;
  const cut = summary.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
