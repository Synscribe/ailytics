import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { defaultOrganizationLogoPath } from "@/lib/seo";

const FOOTER_GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Partner With Us", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Use cases", href: "/use-cases" },
      { label: "Industries", href: "/industries" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Request a demo", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "EULA", href: "/eula" },
    ],
  },
] as const;

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        d="M6.5 8.3H3V21h3.5V8.3ZM4.8 3A2.1 2.1 0 1 0 4.8 7.2 2.1 2.1 0 0 0 4.8 3ZM21 13.7c0-3.8-2-5.6-4.7-5.6-2.2 0-3.2 1.2-3.7 2V8.3H9.1V21h3.5v-6.3c0-1.7.3-3.3 2.4-3.3 2 0 2.1 1.9 2.1 3.4V21H21v-7.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_2fr] md:gap-16">
        <div>
          <Link
            href="/"
            className="inline-flex"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              alt=""
              className="h-8 w-auto"
              height={32}
              src={defaultOrganizationLogoPath}
              width={120}
            />
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3"
        >
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium text-ink">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className="hover:text-ink" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {siteConfig.social.length > 0 ? (
            <ul className="flex gap-2">
              {siteConfig.social.map((profile) => (
                <li key={profile.href}>
                  <a
                    aria-label={`${siteConfig.name} on ${profile.label}`}
                    className="grid size-9 place-items-center rounded-full border border-ink/10 text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    href={profile.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
