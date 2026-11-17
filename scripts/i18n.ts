/**
 * Tracks which translations are current with their English source.
 *
 *   pnpm i18n                      List every translation and whether it is current
 *   pnpm i18n --check              Fail if a translation is stale or a page is unlisted
 *   pnpm i18n --stamp <id>         Record the current English source as translated
 *     [--locale ja-jp]             Limit the stamp to one locale
 *     [--reviewed]                 Mark it reviewed by a native speaker
 *
 * The manifest is src/config/translations.json. See docs/localisation/README.md.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { format } from "prettier";

type Entry = {
  id: string;
  locale: string;
  path?: string;
  source: string[];
  target: string[];
  sourceHash: string;
  status: "machine" | "reviewed";
  updated: string;
};

type Manifest = { entries: Entry[] };

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "src/config/translations.json");
/** URL prefix of each translated locale, matching src/lib/i18n.ts. */
const PREFIXES: Record<string, string> = { "ja-jp": "ja-jp" };

export function hashSources(root: string, files: string[]): string {
  const hash = createHash("sha256");
  for (const file of files) {
    const text = readFileSync(path.join(root, file), "utf8").replace(
      /\r\n/g,
      "\n",
    );
    hash.update(`${file}\n${text}\n`);
  }
  return hash.digest("hex").slice(0, 16);
}

/** Pathnames with a page.tsx under a locale folder, such as "/" or "/contact". */
export function localePagePaths(root: string, prefix: string): string[] {
  const base = path.join(root, "src/app", prefix);
  if (!existsSync(base)) return [];
  const found: string[] = [];
  const walk = (dir: string, segments: string[]) => {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      if (item.isDirectory()) {
        if (item.name.startsWith("_")) continue;
        // Route groups do not appear in the URL.
        const segment = /^\(.*\)$/.test(item.name) ? [] : [item.name];
        walk(path.join(dir, item.name), [...segments, ...segment]);
      } else if (item.name === "page.tsx") {
        found.push(`/${segments.join("/")}`);
      }
    }
  };
  walk(base, []);
  return found;
}

/** Whether a page route such as "/use-cases/[slug]" serves `pathname`. */
export function matchesPage(page: string, pathname: string): boolean {
  const pattern = page
    .split("/")
    .map((segment) =>
      /^\[.+\]$/.test(segment)
        ? "[^/]+"
        : segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    )
    .join("/");
  return new RegExp(`^${pattern}$`).test(pathname);
}

export function findProblems(root: string, manifest: Manifest): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();

  for (const entry of manifest.entries) {
    const key = `${entry.id} (${entry.locale})`;
    if (ids.has(key)) problems.push(`${key}: listed twice`);
    ids.add(key);

    if (!(entry.locale in PREFIXES)) {
      problems.push(`${key}: unknown locale`);
      continue;
    }
    const missing = [...entry.source, ...entry.target].filter(
      (file) => !existsSync(path.join(root, file)),
    );
    if (missing.length > 0) {
      problems.push(`${key}: missing ${missing.join(", ")}`);
      continue;
    }
    if (hashSources(root, entry.source) !== entry.sourceHash) {
      problems.push(
        `${key}: English source changed since translation. Update ${entry.target.join(", ")}, then run pnpm i18n --stamp ${entry.id}`,
      );
    }
  }

  for (const [locale, prefix] of Object.entries(PREFIXES)) {
    const listed = new Set(
      manifest.entries
        .filter((entry) => entry.locale === locale && entry.path)
        .flatMap((entry) => (entry.path ? [entry.path] : [])),
    );
    const pages = localePagePaths(root, prefix);
    for (const page of pages) {
      if (![...listed].some((listedPath) => matchesPage(page, listedPath))) {
        problems.push(
          `${locale} ${page}: a page exists under src/app/${prefix} but no entry in src/config/translations.json lists it, so it gets no hreflang or sitemap entry`,
        );
      }
    }
    for (const listedPath of listed) {
      if (!pages.some((page) => matchesPage(page, listedPath))) {
        problems.push(
          `${locale} ${listedPath}: listed as translated but no page under src/app/${prefix} serves it`,
        );
      }
    }
  }

  return problems;
}

async function main() {
  const args = process.argv.slice(2);
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8")) as Manifest;

  const stampIndex = args.indexOf("--stamp");
  if (stampIndex !== -1) {
    const id = args[stampIndex + 1];
    const localeIndex = args.indexOf("--locale");
    const locale = localeIndex === -1 ? undefined : args[localeIndex + 1];
    const matches = manifest.entries.filter(
      (entry) => entry.id === id && (!locale || entry.locale === locale),
    );
    if (!id || matches.length === 0) {
      console.error(`No translation entry with id "${id ?? ""}".`);
      process.exit(1);
    }
    const today = new Date().toISOString().slice(0, 10);
    for (const entry of matches) {
      entry.sourceHash = hashSources(ROOT, entry.source);
      entry.status = args.includes("--reviewed") ? "reviewed" : "machine";
      entry.updated = today;
      console.log(`Stamped ${entry.id} (${entry.locale}) as ${entry.status}.`);
    }
    writeFileSync(
      MANIFEST,
      await format(JSON.stringify(manifest), { filepath: MANIFEST }),
    );
    return;
  }

  const problems = findProblems(ROOT, manifest);

  if (args.includes("--check")) {
    if (problems.length > 0) {
      console.error("Translations need attention:");
      for (const problem of problems) console.error(`- ${problem}`);
      process.exit(1);
    }
    console.log(`Translations are current (${manifest.entries.length}).`);
    return;
  }

  for (const entry of manifest.entries) {
    const stale =
      entry.source.every((file) => existsSync(path.join(ROOT, file))) &&
      hashSources(ROOT, entry.source) !== entry.sourceHash;
    console.log(
      [
        entry.locale.padEnd(6),
        entry.id.padEnd(16),
        (entry.path ?? "(shared)").padEnd(32),
        entry.status.padEnd(9),
        stale ? "STALE" : "current",
        entry.updated,
      ].join("  "),
    );
  }
  if (problems.length > 0) {
    console.log("");
    for (const problem of problems) console.log(`- ${problem}`);
  }
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) void main();
