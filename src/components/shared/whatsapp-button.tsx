"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-show tooltip after 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setIsTooltipOpen(true);
      setTimeout(() => setIsTooltipOpen(false), 6000);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 p-4 max-w-[260px] relative"
          >
            <button
              onClick={() => setIsTooltipOpen(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Fechar"
            >
              <X className="h-3.5 w-3.5 text-gray-500" />
            </button>
            <p
              className="text-sm font-semibold text-[#0a1628] mb-1"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Precisa de ajuda?
            </p>
            <p className="text-xs text-[#5c5f6e] leading-relaxed">
              Fale com um especialista da CJP NET pelo WhatsApp.
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/5511914922773"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsTooltipOpen(true)}
        className="relative group"
        aria-label="Falar pelo WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-[#25D366]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Button */}
        <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow duration-300">
          <MessageCircle className="h-6 w-6 text-white fill-white" />
        </div>
      </motion.a>
    </div>
  );
}
