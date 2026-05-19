"use client";

import { Instagram, Linkedin } from "lucide-react";
import type { FooterLink, SiteContent } from "@/lib/types";
import { getContentValue } from "@/lib/types";

interface FooterProps {
  footerLinks: FooterLink[];
  contents: SiteContent[];
}

export default function Footer({ footerLinks, contents }: FooterProps) {
  const siteName = getContentValue(contents, "site_name") || "CJP NET";
  const copyright =
    getContentValue(contents, "footer_copyright") ||
    "© 2025 CJP Tecnologia da Internet Ltda. Todos os direitos reservados.";
  const cnpj = getContentValue(contents, "footer_cnpj") || "CNPJ: 11.172.002/0001-84";
  const instagramUrl =
    getContentValue(contents, "instagram_url") ||
    "https://www.instagram.com/cjpnet";
  const linkedinUrl =
    getContentValue(contents, "linkedin_url") ||
    "https://www.linkedin.com/company/cjpnet/";

  return (
    <footer className="bg-[#0a1628] w-full mt-auto">
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-10 border-b border-white/10">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="CJP NET"
                className="h-9 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className="text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {siteName}
              </span>
            </a>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Soluções digitais corporativas para operações que exigem controle,
              integração e confiabilidade.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Navegação
            </h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4
              className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Redes Sociais
            </h4>
            <div className="flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram CJP NET"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/8 hover:bg-[#5845cc] text-white/60 hover:text-white transition-all duration-200"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn CJP NET"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/8 hover:bg-[#5845cc] text-white/60 hover:text-white transition-all duration-200"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            {copyright}
          </p>
          <p className="text-xs text-white/30">{cnpj}</p>
        </div>
      </div>
    </footer>
  );
}
