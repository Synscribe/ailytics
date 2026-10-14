import { describe, expect, it } from "vitest";

import {
  markdownAliasPathname,
  sourcePathnameFromMarkdownAlias,
} from "./markdown-routing";

describe("explicit Markdown aliases", () => {
  it.each([
    ["/use-cases.md", "/use-cases"],
    ["/use-cases/example.md", "/use-cases/example"],
    ["/index.md", "/"],
    ["/.md", "/"],
    ["/use-cases", undefined],
    ["/notes.MD", undefined],
  ])("maps %s to %s", (pathname, expected) => {
    expect(sourcePathnameFromMarkdownAlias(pathname)).toBe(expected);
  });

  it.each([
    ["/use-cases", "/use-cases.md"],
    ["/use-cases/", "/use-cases.md"],
    ["/use-cases/example", "/use-cases/example.md"],
    ["/", "/index.md"],
    ["/use-cases.md", "/use-cases.md"],
    ["/guide.pdf", "/guide.pdf"],
  ])("maps the source %s to %s", (pathname, expected) => {
    expect(markdownAliasPathname(pathname)).toBe(expected);
  });
});
