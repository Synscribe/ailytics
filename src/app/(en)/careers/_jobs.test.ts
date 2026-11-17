import { describe, expect, it } from "vitest";

import {
  getJob,
  getJobs,
  groupJobsByDepartment,
  jobSummary,
  listJobSlugs,
  parseJob,
} from "./_jobs";

describe("careers content", () => {
  it("loads every role with a title, department, location and body", async () => {
    const jobs = await getJobs();
    const slugs = await listJobSlugs();

    expect(jobs.length).toBe(slugs.length);
    expect(jobs.length).toBeGreaterThan(0);
    for (const job of jobs) {
      expect(job.title).not.toBe("");
      expect(job.department).not.toBe("");
      expect(job.location).not.toBe("");
      expect(job.html).toContain("<p>");
      expect(job.html).not.toMatch(/<(script|style|img|iframe)/i);
    }
  });

  it("groups roles by department in the site's order", async () => {
    const groups = groupJobsByDepartment(await getJobs());
    const names = groups.map((group) => group.name);

    expect(names[0]).toBe("Business");
    expect(names[names.length - 1]).toBe("Technology");
    for (const group of groups) {
      const titles = group.jobs.map((job) => job.title);
      expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
    }
  });

  it("builds a short summary that names the role and location", async () => {
    const job = await getJob("backend-engineer");
    expect(job).not.toBeNull();
    const summary = jobSummary(job!);

    expect(summary.startsWith("Backend Engineer, APAC (Remote).")).toBe(true);
    expect(summary.length).toBeLessThanOrEqual(155);
    expect(summary).not.toMatch(/<[^>]+>/);
  });

  it("turns bold-only paragraphs into headings and keeps inline bold", async () => {
    const job = await getJob("backend-engineer");

    expect(job!.html).toContain("<h2>What You Will Be Doing</h2>");
    expect(job!.html).toContain(
      "comfortable <strong>leading projects</strong>",
    );
  });

  it("returns null for unknown or unsafe slugs", async () => {
    expect(await getJob("not-a-role")).toBeNull();
    expect(await getJob("../package")).toBeNull();
  });

  it("rejects a file whose slug does not match its name", () => {
    expect(() =>
      parseJob(
        {
          slug: "other",
          title: "Role",
          department: "Technology",
          location: "Singapore",
          html: "<p>Body</p>",
        },
        "role.json",
      ),
    ).toThrow("role.json: slug must match the file name");
  });

  it("strips markup the job body should never carry", () => {
    const job = parseJob(
      {
        slug: "role",
        title: "Role",
        department: "Technology",
        location: "Singapore",
        html: '<p onclick="x()">Body<script>alert(1)</script></p><ul><li><strong>Keep</strong></li></ul>',
      },
      "role.json",
    );

    expect(job.html).toBe("<p>Body</p><ul><li><strong>Keep</strong></li></ul>");
  });
});
