import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { isVisualId, type VisualId } from "./visuals";

type ContentItem = {
  title: string;
  description: string;
};

export type PageFeature = {
  /** Also the feature's visual: the same id always renders the same visual. */
  id: VisualId;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export type PageFaqItem = {
  question: string;
  answer: string;
};

export type PageContent = {
  /** `seoTitle` overrides the metadata title when the H1 needs different wording. */
  hero: ContentItem & { seoTitle?: string };
  problems: ContentItem & { items: ContentItem[] };
  solution: ContentItem;
  features: ContentItem & { items: PageFeature[] };
  faq: PageFaqItem[];
  cta: ContentItem & { buttonText: string };
};

export type PageContentKind = "industries" | "uses";

export type FeatureCategory = {
  name: string;
  items: PageFeature[];
};

const contentDirectory = path.join(process.cwd(), "src/content/pages");

function fail(fileName: string, field: string, expectation: string): never {
  throw new Error(`${fileName}: ${field} must be ${expectation}`);
}

function record(
  value: unknown,
  fileName: string,
  field: string,
): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(fileName, field, "an object");
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, fileName: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(fileName, field, "a non-empty string");
  }
  if (/[–—]/.test(value)) {
    fail(fileName, field, "free of en and em dashes");
  }
  return value.trim();
}

function list(value: unknown, fileName: string, field: string): unknown[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(fileName, field, "a non-empty array");
  }
  return value;
}

function contentItem(
  value: unknown,
  fileName: string,
  field: string,
): ContentItem {
  const item = record(value, fileName, field);
  return {
    title: text(item.title, fileName, `${field}.title`),
    description: text(item.description, fileName, `${field}.description`),
  };
}

function feature(value: unknown, fileName: string, field: string): PageFeature {
  const item = record(value, fileName, field);
  const id = text(item.id, fileName, `${field}.id`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    fail(fileName, `${field}.id`, "a lowercase, hyphenated identifier");
  }
  if (!isVisualId(id)) {
    fail(
      fileName,
      `${field}.id`,
      `a registered visual ID in src/lib/visuals.ts (got "${id}"); add the ID and its source in src/components/visuals/project-visual.tsx first`,
    );
  }
  return {
    id,
    eyebrow: text(item.eyebrow, fileName, `${field}.eyebrow`),
    title: text(item.title, fileName, `${field}.title`),
    description: text(item.description, fileName, `${field}.description`),
    highlights: list(item.highlights, fileName, `${field}.highlights`).map(
      (highlight, index) =>
        text(highlight, fileName, `${field}.highlights[${index}]`),
    ),
  };
}

export function parsePageContent(
  value: unknown,
  fileName: string,
): PageContent {
  const root = record(value, fileName, "root");
  const problems = record(root.problems, fileName, "problems");
  const features = record(root.features, fileName, "features");
  const cta = record(root.cta, fileName, "cta");

  const featureItems = list(features.items, fileName, "features.items").map(
    (item, index) => feature(item, fileName, `features.items[${index}]`),
  );
  const ids = featureItems.map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    fail(fileName, "features.items", "an array with unique ids");
  }

  const hero = record(root.hero, fileName, "hero");

  return {
    hero: {
      ...contentItem(hero, fileName, "hero"),
      ...(hero.seoTitle !== undefined
        ? { seoTitle: text(hero.seoTitle, fileName, "hero.seoTitle") }
        : {}),
    },
    problems: {
      ...contentItem(problems, fileName, "problems"),
      items: list(problems.items, fileName, "problems.items").map(
        (item, index) =>
          contentItem(item, fileName, `problems.items[${index}]`),
      ),
    },
    solution: contentItem(root.solution, fileName, "solution"),
    features: {
      ...contentItem(features, fileName, "features"),
      items: featureItems,
    },
    faq: list(root.faq, fileName, "faq").map((item, index) => {
      const faqItem = record(item, fileName, `faq[${index}]`);
      return {
        question: text(faqItem.question, fileName, `faq[${index}].question`),
        answer: text(faqItem.answer, fileName, `faq[${index}].answer`),
      };
    }),
    cta: {
      ...contentItem(cta, fileName, "cta"),
      buttonText: text(cta.buttonText, fileName, "cta.buttonText"),
    },
  };
}

export async function getPageContent(
  kind: PageContentKind,
  slug: string,
): Promise<PageContent> {
  const fileName = `${kind}/${slug}.json`;
  const source = await readFile(path.join(contentDirectory, fileName), "utf8");

  let value: unknown;
  try {
    value = JSON.parse(source) as unknown;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${fileName}: invalid JSON (${detail})`);
  }
  return parsePageContent(value, fileName);
}

/** Lists the slugs of every JSON page of one kind, sorted alphabetically. */
export async function listPageContent(
  kind: PageContentKind,
): Promise<string[]> {
  const entries = await readdir(path.join(contentDirectory, kind));
  return entries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => entry.slice(0, -".json".length))
    .sort();
}

/**
 * Fails when a JSON page has no route copy (how it works, value props, hero
 * visual and links), so a new JSON file cannot ship half a page.
 */
export function assertRouteCopy(
  kind: PageContentKind,
  slugs: readonly string[],
  routeCopy: Readonly<Record<string, unknown>>,
): void {
  const missing = slugs.filter((slug) => !Object.hasOwn(routeCopy, slug));
  if (missing.length > 0) {
    // The "uses" content folder serves the /use-cases route.
    const routeDirectory = kind === "uses" ? "use-cases" : kind;
    throw new Error(
      `Missing route copy for ${missing
        .map((slug) => `src/content/pages/${kind}/${slug}.json`)
        .join(", ")}. Add ${missing
        .map((slug) => `"${slug}"`)
        .join(", ")} to src/app/${routeDirectory}/[slug]/_content.ts.`,
    );
  }
}

/** Groups features by their eyebrow, keeping the order each category first appears. */
export function groupFeaturesByCategory(
  features: readonly PageFeature[],
): FeatureCategory[] {
  const groups = new Map<string, PageFeature[]>();
  for (const item of features) {
    const group = groups.get(item.eyebrow) ?? [];
    group.push(item);
    groups.set(item.eyebrow, group);
  }
  return [...groups].map(([name, items]) => ({ name, items }));
}

const markdownLink = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export type InlineSegment =
  | { kind: "text"; value: string }
  | { kind: "link"; value: string; href: string };

/** Splits copy with Markdown links into text and link segments for rendering. */
export function parseInlineLinks(value: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let cursor = 0;
  for (const match of value.matchAll(markdownLink)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ kind: "text", value: value.slice(cursor, index) });
    }
    segments.push({ kind: "link", value: match[1], href: match[2] });
    cursor = index + match[0].length;
  }
  if (cursor < value.length) {
    segments.push({ kind: "text", value: value.slice(cursor) });
  }
  return segments;
}

/** Plain-text version of copy with Markdown links, for structured data. */
export function stripInlineLinks(value: string): string {
  return value.replace(markdownLink, "$1");
}
