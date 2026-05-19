"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
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
  const siteName = getContentValue(contents, "site_name") || "CJP NET";
  const specialistCta = getContentValue(contents, "hero_cta_specialist") || "Falar com um Especialista";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-outline-variant"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-4 md:px-10 h-20">
        <a
          href="/"
          className="text-2xl font-bold text-cjp-primary"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {siteName}
        </a>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = typeof window !== "undefined" && window.location.pathname === link.href;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-cjp-primary border-b-2 border-cjp-primary pb-1"
                    : "text-on-surface-variant hover:text-cjp-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <Button className="hidden md:inline-flex bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-6 font-medium text-sm rounded">
          {specialistCta}
        </Button>

        <button className="md:hidden text-cjp-primary" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-outline-variant overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-sm font-medium text-on-surface-variant hover:text-cjp-primary"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container w-full h-12 font-medium text-sm rounded">
                {specialistCta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
