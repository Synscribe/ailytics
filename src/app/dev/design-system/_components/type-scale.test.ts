import fs from "node:fs";

import { describe, expect, it } from "vitest";

import { TYPE_TOKENS } from "./type-tokens";

const css = fs.readFileSync("src/app/globals.css", "utf8");
const tailwindDefaults = new Set([
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  ...Array.from({ length: 8 }, (_, i) => `${i + 2}xl`),
]);

describe("type scale tokens", () => {
  it("declares each token exactly once in globals.css", () => {
    for (const token of TYPE_TOKENS) {
      const matches = css.match(new RegExp(`--text-${token.name}:`, "g"));
      expect(matches?.length, token.name).toBe(1);
    }
  });

  it("never overrides a Tailwind default size", () => {
    for (const token of TYPE_TOKENS) {
      expect(tailwindDefaults.has(token.name), token.name).toBe(false);
    }
  });
});
