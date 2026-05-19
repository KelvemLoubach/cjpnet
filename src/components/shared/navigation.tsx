"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
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


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(10,22,40,0.08)] border-b border-[#0a1628]/8"
          : "bg-white border-b border-transparent"
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
                  className={`relative text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-[#5845cc]"
                      : "text-[#5c5f6e] hover:text-[#0a1628] hover:bg-[#0a1628]/4"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#5845cc] rounded-full"
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
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex"
        >
          <Button className="bg-[#5845cc] hover:bg-[#4a38b5] text-white h-10 px-5 font-medium text-sm rounded-lg shadow-sm transition-all duration-200 hover:shadow-md gap-2">
            <MessageCircle className="h-4 w-4" />
            {specialistCta}
          </Button>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-[#0a1628] p-2 -mr-2"
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
            className="lg:hidden bg-white border-t border-[#0a1628]/8 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
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
                      className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "text-[#5845cc] bg-[#5845cc]/8 border-l-2 border-[#5845cc]"
                          : "text-[#5c5f6e] hover:text-[#0a1628] hover:bg-[#0a1628]/4"
                      }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                })}
              <div className="pt-3 mt-2 border-t border-[#0a1628]/8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button className="bg-[#5845cc] hover:bg-[#4a38b5] text-white w-full h-11 font-medium text-sm rounded-lg shadow-sm gap-2">
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
