"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/navigation";
import Footer from "@/components/shared/footer";
import { useSiteData } from "@/hooks/use-site-data";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { contents, navLinks, footerLinks, loading } = useSiteData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-cjp-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-background antialiased">
      <Navigation navLinks={navLinks} contents={contents} />
      <main className="flex-grow pt-20">{children}</main>
      <Footer footerLinks={footerLinks} contents={contents} />
    </div>
  );
}
