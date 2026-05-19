"use client";

import { Separator } from "@/components/ui/separator";
import type { FooterLink, SiteContent } from "@/lib/types";
import { getContentValue } from "@/lib/types";

interface FooterProps {
  footerLinks: FooterLink[];
  contents: SiteContent[];
}

export default function Footer({ footerLinks, contents }: FooterProps) {
  const siteName = getContentValue(contents, "site_name") || "CJP NET";
  const copyright = getContentValue(contents, "footer_copyright") || "© 2024 CJP NET";

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-16 md:py-20 px-4 md:px-10 mt-auto">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col items-center gap-8">
        <a
          href="/"
          className="text-2xl font-bold text-cjp-primary"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {siteName}
        </a>

        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-on-surface-variant hover:text-cjp-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Separator className="max-w-xl" />

        <div className="text-sm text-on-surface text-center">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
