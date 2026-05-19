"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/navigation";
import Footer from "@/components/shared/footer";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { useSiteData } from "@/hooks/use-site-data";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { contents, services, segments, cases, navLinks, footerLinks, loading, refetch } = useSiteData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6f8]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-[#5845cc] border-t-transparent rounded-full"
          />
          <p
            className="text-sm text-[#5c5f6e] font-medium"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8] text-[#1a1c23] antialiased">
      <Navigation navLinks={navLinks} contents={contents} />
      <main className="flex-grow pt-[72px]">{children}</main>
      <Footer footerLinks={footerLinks} contents={contents} />
      <WhatsAppButton />
    </div>
  );
}
