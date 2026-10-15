import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import sanitizeHtml from "sanitize-html";

/**
 * A news article migrated from the previous site, read from
 * src/content/news/<slug>.json and sanitized again before rendering.
 */
export type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  /** The short teaser shown on the /news hub. */
  summary: string;
  /** The meta description. */
  description: string;
  /** Cover image under /media/news. */
  image: string;
  /** Media coverage and award posts link out to the full story. */
  externalUrl: string | null;
  /** Sanitized HTML: headings, paragraphs, lists, figures and links only. */
  html: string;
};

const contentDirectory = path.join(process.cwd(), "src/content/news");

function isEmptyBlock(frame: sanitizeHtml.IFrame): boolean {
  if (frame.tag === "img") return !frame.attribs.src;
  return (
    ["p", "h2", "h3", "em", "strong"].includes(frame.tag) &&
    frame.text.trim() === "" &&
    !frame.mediaChildren.length
  );
}

/**
 * The article title is the H1, so the source's H4 sections become H2 and
 * its H5 subsections become H3. The source styles quote attributions as H6.
 */
export function sanitizeNewsHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "h2",
      "h3",
      "a",
      "figure",
      "figcaption",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "rel", "target"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      p: ["class"],
    },
    allowedClasses: { p: ["attribution"] },
    allowedSchemes: ["http", "https", "mailto"],
    // Article images are copied into /media/news, never hot-linked.
    allowedSchemesByTag: { img: [] },
    allowProtocolRelative: false,
    transformTags: {
      h4: "h2",
      h5: "h3",
      h6: sanitizeHtml.simpleTransform("p", { class: "attribution" }),
      b: "strong",
      i: "em",
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
      }),
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const external: sanitizeHtml.Attributes = {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
        };
        return {
          tagName,
          attribs: /^https?:\/\//.test(href) ? external : { href },
        };
      },
    },
    exclusiveFilter: isEmptyBlock,
  })
    .replace(/(<br \/>\s*)+<\/(p|h2|h3)>/g, "</$2>")
    .replace(/<(p|h2|h3)( [^>]*)?>(\s*<br \/>)+/g, "<$1$2>");
}

function text(value: unknown, fileName: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fileName}: ${field} must be a non-empty string`);
  }
  return value.trim();
}

export function parseNewsArticle(
  value: unknown,
  fileName: string,
): NewsArticle {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${fileName}: root must be an object`);
  }
  const source = value as Record<string, unknown>;
  const slug = text(source.slug, fileName, "slug");
  if (`${slug}.json` !== fileName) {
    throw new Error(`${fileName}: slug must match the file name`);
  }
  const publishedAt = text(source.publishedAt, fileName, "publishedAt");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    throw new Error(`${fileName}: publishedAt must be YYYY-MM-DD`);
  }
  const image = text(source.image, fileName, "image");
  if (!image.startsWith("/media/news/")) {
    throw new Error(`${fileName}: image must live under /media/news/`);
  }
  const externalUrl =
    source.externalUrl === undefined
      ? null
      : text(source.externalUrl, fileName, "externalUrl");
  if (externalUrl && !externalUrl.startsWith("https://")) {
    throw new Error(`${fileName}: externalUrl must be an https URL`);
  }

  return {
    slug,
    title: text(source.title, fileName, "title"),
    category: text(source.category, fileName, "category"),
    publishedAt,
    summary: text(source.summary, fileName, "summary"),
    description: text(source.description, fileName, "description"),
    image,
    externalUrl,
    html: sanitizeNewsHtml(text(source.html, fileName, "html")),
  };
}

async function readArticle(fileName: string): Promise<NewsArticle> {
  const source = await readFile(path.join(contentDirectory, fileName), "utf8");
  return parseNewsArticle(JSON.parse(source) as unknown, fileName);
}

/** Every article, newest first. */
export async function listNewsArticles(): Promise<NewsArticle[]> {
  const fileNames = (await readdir(contentDirectory)).filter((name) =>
    name.endsWith(".json"),
  );
  const articles = await Promise.all(fileNames.map(readArticle));
  return articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getNewsArticle(
  slug: string,
): Promise<NewsArticle | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    return await readArticle(`${slug}.json`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** "June 2, 2026", matching the previous site. */
export function formatNewsDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
