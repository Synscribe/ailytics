import Image from "next/image";
import Link from "next/link";

import { usesDefaultSiteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";
import { defaultOrganizationLogoPath } from "@/lib/seo";

const FOOTER_GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Partner With Us", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "Projects", href: "/projects" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Use cases", href: "/use-cases" },
      { label: "Industries", href: "/industries" },
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
              width={100}
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

        <p className="text-xs text-ink-faint md:col-span-2">
          © {new Date().getFullYear()} {siteConfig.name}.
          {usesDefaultSiteUrl
            ? " Replace this identity before production."
            : ""}
        </p>
      </div>
    </footer>
  );
}
