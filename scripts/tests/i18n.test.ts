import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  findProblems,
  hashSources,
  localePagePaths,
  matchesPage,
} from "../i18n";

function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-"));
  for (const [file, text] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), text);
  }
  return root;
}

describe("translation manifest checks", () => {
  it("ignores line-ending differences when hashing", () => {
    const unix = fixture({ "en.ts": "a\nb\n" });
    const windows = fixture({ "en.ts": "a\r\nb\r\n" });
    expect(hashSources(unix, ["en.ts"])).toBe(hashSources(windows, ["en.ts"]));
  });

  it("finds locale pages outside private folders and route groups", () => {
    const root = fixture({
      "src/app/ja-jp/page.tsx": "",
      "src/app/ja-jp/contact/page.tsx": "",
      "src/app/ja-jp/(group)/projects/page.tsx": "",
      "src/app/ja-jp/_parts/page.tsx": "",
    });
    expect(localePagePaths(root, "ja-jp").sort()).toEqual([
      "/",
      "/contact",
      "/projects",
    ]);
  });

  it("reports a stale translation and an unlisted page", () => {
    const root = fixture({
      "en.ts": "new English",
      "ja.ts": "",
      "src/app/ja-jp/page.tsx": "",
      "src/app/ja-jp/contact/page.tsx": "",
    });
    const problems = findProblems(root, {
      entries: [
        {
          id: "home",
          locale: "ja-jp",
          path: "/",
          source: ["en.ts"],
          target: ["ja.ts"],
          sourceHash: "outdated",
          status: "machine",
          updated: "2026-11-03",
        },
      ],
    });
    expect(problems).toHaveLength(2);
    expect(problems[0]).toContain("English source changed");
    expect(problems[1]).toContain("/contact");
  });

  it("matches dynamic page routes to listed paths", () => {
    expect(matchesPage("/use-cases/[slug]", "/use-cases/ppe-detection")).toBe(
      true,
    );
    expect(matchesPage("/use-cases/[slug]", "/use-cases")).toBe(false);
    expect(matchesPage("/", "/")).toBe(true);
  });
});
