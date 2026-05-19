"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavLink, SiteContent } from "@/lib/types";
import { getContentValue } from "@/lib/types";

interface NavigationProps {
  navLinks: NavLink[];
  contents: SiteContent[];
}

export default function Navigation({ navLinks, contents }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const specialistCta =
    getContentValue(contents, "hero_cta_specialist") ||
    "Falar com um Especialista";
  const whatsappNumber =
    getContentValue(contents, "whatsapp_number") || "+5511914922773";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change - using ref to avoid setState in effect
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
          ? "bg-white/95 backdrop-blur-2xl shadow-[0_1px_3px_rgba(10,22,40,0.06)] border-b border-[#0a1628]/6"
          : "bg-white/80 backdrop-blur-lg border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-4 md:px-10 h-[72px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="CJP NET"
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-1 items-center">
          {navLinks
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-cjp-accent"
                      : "text-[#5c5f6e] hover:text-[#0a1628] hover:bg-[#0a1628]/4"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cjp-accent rounded-full"
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

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-10 px-5 font-semibold text-sm rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-cjp-accent/15 gap-2 group">
              <MessageCircle className="h-4 w-4" />
              {specialistCta}
              <svg className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-[#0a1628] p-2 -mr-2 hover:bg-[#0a1628]/4 rounded-lg transition-colors"
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
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#0a1628]/6 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {navLinks
                .sort((a, b) => a.sortOrder - b.sortOrder)
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
                          ? "text-cjp-accent bg-cjp-accent/6 border-l-2 border-cjp-accent"
                          : "text-[#5c5f6e] hover:text-[#0a1628] hover:bg-[#0a1628]/4"
                      }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                })}
              <div className="pt-4 mt-3 border-t border-[#0a1628]/6">
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
