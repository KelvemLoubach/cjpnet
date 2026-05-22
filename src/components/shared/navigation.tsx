"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavLink, SiteContent } from "@/lib/types";
import { getContentValue } from "@/lib/types";

interface NavigationProps {
  navLinks: NavLink[];
  contents: SiteContent[];
}

const defaultNavLinks: NavLink[] = [
  { id: "1", label: "Home", href: "/", active: false, sortOrder: 0 },
  { id: "2", label: "Soluções", href: "/solucoes", active: false, sortOrder: 1 },
  { id: "3", label: "Segmentos", href: "/segmentos", active: false, sortOrder: 2 },
  { id: "4", label: "Cases", href: "/cases", active: false, sortOrder: 3 },
  { id: "5", label: "Sobre", href: "/sobre", active: false, sortOrder: 4 },
  { id: "6", label: "Diferenciais", href: "/conteudo", active: false, sortOrder: 5 },
  { id: "7", label: "Contato", href: "/contato", active: false, sortOrder: 6 },
];

export default function Navigation({ navLinks, contents }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const rawLinks = navLinks.length > 0 ? navLinks : defaultNavLinks;
  const seen = new Set<string>();
  const links = rawLinks
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    });

  const specialistCta =
    getContentValue(contents, "hero_cta_specialist") ||
    "Falar com Especialista";
  const whatsappNumber =
    getContentValue(contents, "whatsapp_number") || "+5511914922773";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-2xl shadow-[0_1px_4px_rgba(10,22,40,0.08)] border-b border-[#0a1628]/[0.06]"
          : "bg-[#070d1a]/60 backdrop-blur-xl border-b border-white/[0.06]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-4 md:px-10 h-[72px]">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img
            src="/logo.png"
            alt="CJP"
            className="h-8 w-auto transition-all duration-500 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-0.5 items-center">
          {links
            .map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative text-[13px] font-medium px-3.5 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? isScrolled
                        ? "text-cjp-accent bg-cjp-accent/[0.06]"
                        : "text-white bg-white/[0.1]"
                      : isScrolled
                        ? "text-[#5c5f6e] hover:text-[#0a1628] hover:bg-[#0a1628]/[0.04]"
                        : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                        isScrolled
                          ? "bg-cjp-accent"
                          : "bg-cjp-accent-light"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className={`h-10 px-5 font-semibold text-[13px] rounded-xl shadow-sm transition-all duration-300 gap-2 group ${
                isScrolled
                  ? "bg-cjp-accent hover:bg-cjp-accent-light text-white hover:shadow-md hover:shadow-cjp-accent/15"
                  : "bg-white/[0.1] hover:bg-white/[0.18] text-white border border-white/[0.12] backdrop-blur-sm hover:border-white/[0.2]"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              {specialistCta}
              <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden p-2 -mr-2 rounded-lg transition-colors ${
            isScrolled
              ? "text-[#0a1628] hover:bg-[#0a1628]/[0.04]"
              : "text-white hover:bg-white/[0.1]"
          }`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`lg:hidden overflow-hidden border-t ${
              isScrolled
                ? "bg-white/98 backdrop-blur-xl border-[#0a1628]/[0.06]"
                : "bg-[#070d1a]/95 backdrop-blur-xl border-white/[0.06]"
            }`}
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {links
                .map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? isScrolled
                            ? "text-cjp-accent bg-cjp-accent/[0.06] border-l-2 border-cjp-accent"
                            : "text-cjp-accent-light bg-white/[0.08] border-l-2 border-cjp-accent-light"
                          : isScrolled
                            ? "text-[#5c5f6e] hover:text-[#0a1628] hover:bg-[#0a1628]/[0.04]"
                            : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                })}
              <div className="pt-4 mt-3 border-t border-current/[0.06]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white w-full h-12 font-semibold text-sm rounded-xl shadow-sm gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {specialistCta}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
