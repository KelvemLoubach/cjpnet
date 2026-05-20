"use client";

import { Instagram, Linkedin, MessageCircle, ArrowUp } from "lucide-react";
import type { FooterLink, SiteContent } from "@/lib/types";
import { getContentValue } from "@/lib/types";
import { motion } from "framer-motion";

interface FooterProps {
  footerLinks: FooterLink[];
  contents: SiteContent[];
}

export default function Footer({ footerLinks, contents }: FooterProps) {
  const siteName = getContentValue(contents, "site_name");
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a1628] w-full mt-auto relative">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cjp-accent/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/8">
          {/* Logo & Description */}
          <div className="md:col-span-5">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="CJP NET"
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className="text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {siteName}
              </span>
            </a>
            <p className="mt-5 text-sm text-white/40 leading-relaxed max-w-sm">
              Soluções digitais corporativas para operações que exigem controle,
              integração e confiabilidade.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram CJP NET"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-cjp-accent/20 border border-white/8 hover:border-cjp-accent/30 text-white/40 hover:text-cjp-accent-light transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn CJP NET"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-cjp-accent/20 border border-white/8 hover:border-cjp-accent/30 text-white/40 hover:text-cjp-accent-light transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/5511914922773"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp CJP NET"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/8 hover:border-[#25D366]/30 text-white/40 hover:text-[#25D366] transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4
              className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5"
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
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4
              className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Contato
            </h4>
            <a
              href="https://wa.me/5511914922773"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-cjp-accent/15 border border-white/8 hover:border-cjp-accent/25 rounded-xl px-5 py-3.5 transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/15 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  WhatsApp
                </p>
                <p className="text-xs text-white/35">
                  Fale com um especialista
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-xs text-white/30 text-center sm:text-left">
              {copyright}
            </p>
            <span className="hidden sm:inline text-white/15">|</span>
            <p className="text-xs text-white/20">{cnpj}</p>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 group"
          >
            Voltar ao topo
            <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors duration-200">
              <ArrowUp className="h-3.5 w-3.5" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
