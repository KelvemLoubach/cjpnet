"use client";

import { motion } from "framer-motion";

export function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTag({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1.5 rounded-full bg-surface-container-low mb-6 shadow-sm">
      <span className="w-2 h-2 rounded-full bg-cjp-primary pulse-dot" />
      <span className="text-xs text-on-surface-variant tracking-widest uppercase font-medium">
        {text}
      </span>
    </div>
  );
}

export function SectionTagDark({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-on-primary/20 px-3 py-1.5 rounded-full bg-on-primary/10 mb-6">
      <span className="w-2 h-2 rounded-full bg-inverse-primary pulse-dot" />
      <span className="text-xs text-inverse-primary tracking-widest uppercase font-medium">
        {text}
      </span>
    </div>
  );
}

export function PageHero({ tag, title, description }: { tag: string; title: string; description?: string }) {
  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest via-surface to-primary-fixed/10 gradient-animate" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <SectionTag text={tag} />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h1
            className="text-4xl md:text-5xl lg:text-[48px] font-bold text-cjp-primary leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {title}
          </h1>
        </AnimatedSection>
        {description && (
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {description}
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
