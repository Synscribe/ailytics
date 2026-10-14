import { describe, expect, it } from "vitest";

import {
  APPLICATION_LIMITS,
  safeResumeFileName,
  validateApplicationFields,
  validateResume,
} from "./careers";

describe("application validation", () => {
  it("accepts a complete application and normalises the profile URL", () => {
    const result = validateApplicationFields({
      name: " Ada Lovelace ",
      email: "Ada@Example.com",
      linkedin: "linkedin.com/in/ada",
    });

    expect(result.fieldErrors).toEqual({});
    expect(result.data).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      linkedin: "https://linkedin.com/in/ada",
    });
  });

  it("treats the profile URL as optional", () => {
    const result = validateApplicationFields({
      name: "Ada",
      email: "ada@example.com",
      linkedin: "",
    });

    expect(result.data?.linkedin).toBe("");
  });

  it("reports each invalid field", () => {
    const result = validateApplicationFields({
      name: "A",
      email: "not-an-email",
      linkedin: "ftp://example.com",
    });

    expect(result.data).toBeNull();
    expect(Object.keys(result.fieldErrors).sort()).toEqual([
      "email",
      "linkedin",
      "name",
    ]);
  });
});

describe("resume validation", () => {
  it("accepts PDF and Word documents up to the limit", () => {
    expect(
      validateResume({ name: "cv.pdf", size: 1024, type: "application/pdf" }),
    ).toBeNull();
    expect(
      validateResume({
        name: "cv.DOCX",
        size: APPLICATION_LIMITS.resumeBytes,
        type: "application/octet-stream",
      }),
    ).toBeNull();
  });

  it("rejects missing, oversized and unexpected files", () => {
    expect(validateResume(null)).toBe("Attach your resume.");
    expect(
      validateResume({
        name: "cv.pdf",
        size: APPLICATION_LIMITS.resumeBytes + 1,
        type: "application/pdf",
      }),
    ).toBe("Upload failed. Max size for files is 10 MB.");
    expect(
      validateResume({ name: "cv.exe", size: 10, type: "application/pdf" }),
    ).toBe("Upload a PDF or Word document.");
    expect(
      validateResume({ name: "cv.pdf", size: 10, type: "text/html" }),
    ).toBe("Upload a PDF or Word document.");
  });

  it("makes an attachment file name safe", () => {
    expect(safeResumeFileName("Ada Lovelace / CV (2026).pdf")).toBe(
      "Ada-Lovelace-CV-2026.pdf",
    );
    expect(safeResumeFileName("...docx")).toBe("resume.docx");
  });
});
