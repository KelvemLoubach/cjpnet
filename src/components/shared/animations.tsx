"use client";

import { motion } from "framer-motion";

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInFromLeft({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInFromRight({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.12 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTag({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-[#0a1628]/10 px-3.5 py-1.5 rounded-full bg-white mb-6 shadow-sm">
      <span className="w-2 h-2 rounded-full bg-[#5845cc] pulse-dot" />
      <span
        className="text-xs text-[#5c5f6e] tracking-widest uppercase font-medium"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

export function SectionTagDark({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-white/20 px-3.5 py-1.5 rounded-full bg-white/10 mb-6">
      <span className="w-2 h-2 rounded-full bg-[#5845cc] pulse-dot" />
      <span
        className="text-xs text-white/80 tracking-widest uppercase font-medium"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

export function PageHero({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5f6f8] to-[#5845cc]/5 gradient-animate" />
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <SectionTag text={tag} />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h1
            className="text-4xl md:text-5xl lg:text-[48px] font-bold text-[#0a1628] leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {title}
          </h1>
        </AnimatedSection>
        {description && (
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-[#5c5f6e] leading-relaxed max-w-2xl">
              {description}
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
