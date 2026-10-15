import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
  });

  // Every demo/contact CTA links to /contact, so one listener names them all.
  document.addEventListener(
    "click",
    (event) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href="/contact"]')
          : null;
      if (!link || window.location.pathname === "/contact") return;

      posthog.capture("cta_clicked", {
        destination: "/contact",
        label: link.textContent?.trim().slice(0, 80),
        location: link.closest("header")
          ? "header"
          : link.closest("footer")
            ? "footer"
            : "page",
      });
    },
    { capture: true },
  );
}
