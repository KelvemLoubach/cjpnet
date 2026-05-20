"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Cloud, GitMerge, ShieldCheck, Blocks, ArrowRight,
  MessageCircle, BarChart3, Users, Zap, Shield,
  Database, Server, Settings, Headphones, Search,
  Cpu, Lock, Globe, ChevronRight,
  TrendingUp, Activity, Code2, ArrowDownRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
import ImageGallery from "@/components/shared/image-gallery";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  SectionTag,
} from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue } from "@/lib/types";
import type { Service, SiteContent } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  cloud: <Cloud className="h-6 w-6" />,
  "git-merge": <GitMerge className="h-6 w-6" />,
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  blocks: <Blocks className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  globe: <Globe className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  lock: <Lock className="h-6 w-6" />,
  "bar-chart": <BarChart3 className="h-6 w-6" />,
  cpu: <Cpu className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  settings: <Settings className="h-6 w-6" />,
  headphones: <Headphones className="h-6 w-6" />,
  search: <Search className="h-6 w-6" />,
};

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Floating Dashboard Card ─── */
function DashboardCard({
  label,
  value,
  icon,
  className = "",
  delay = 0,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card rounded-2xl p-5 shadow-2xl shadow-black/10 group hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-500 card-shine-hover ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-cjp-accent/20 flex items-center justify-center text-cjp-accent-light group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-white/40 text-[11px] font-semibold uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div
        className="text-white text-2xl font-bold tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {value}
      </div>
    </motion.div>
  );
}

/* ─── Animated Background Orbs ─── */
function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 25}%`,
            width: `${300 + i * 80}px`,
            height: `${300 + i * 80}px`,
            background: i % 2 === 0
              ? "radial-gradient(circle, rgba(88, 69, 204, 0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(123, 106, 255, 0.05) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, 20 * (i % 2 === 0 ? -1 : 1), 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}

/* ─── 1. Hero Section ─── */
function HeroSection({
  contents,
}: {
  contents: ReturnType<typeof getContentValue>[] | any;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const heroTag =
    getContentValue(contents, "hero_tag") ||
    "Soluções Digitais Corporativas";
  const heroTitle =
    getContentValue(contents, "hero_title") ||
    "Soluções Digitais para Operações que Exigem Controle, Integração e Confiabilidade";
  const heroDesc =
    getContentValue(contents, "hero_description") ||
    "Desenvolvemos plataformas digitais sob medida para empresas que precisam centralizar informações, automatizar processos, integrar sistemas e estruturar operações com segurança, estabilidade e visão gerencial.";

  return (
    <section ref={ref} className="relative overflow-hidden -mt-[72px]">
      {/* Aurora animated background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 aurora-bg"
      />

      {/* Mesh gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 50%, rgba(88, 69, 204, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(22, 39, 68, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(88, 69, 204, 0.1) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orbs */}
      <BackgroundOrbs />

      {/* Data flow lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[35%] left-0 right-0 h-px data-flow-line"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[65%] left-0 right-0 h-px data-flow-line"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ scale }} className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-36 md:pt-52 pb-28 md:pb-44 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col gap-7"
          >
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 border border-white/[0.1] px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cjp-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cjp-accent-light" />
                </span>
                <span
                  className="text-[11px] text-white/70 tracking-[0.15em] uppercase font-semibold"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {heroTag}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1
                className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.06] tracking-[-0.025em]"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                <span className="text-gradient">
                  {heroTitle}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
                {heroDesc}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://wa.me/5511914922773"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-[52px] px-8 font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cjp-accent/30 group glow-pulse">
                    <MessageCircle className="mr-2.5 h-[18px] w-[18px]" />
                    Falar com um Especialista
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Button>
                </a>
                <a href="/cases">
                  <Button
                    variant="outline"
                    className="border-white/[0.12] text-white hover:bg-white/[0.08] hover:border-white/[0.2] hover:text-white h-[52px] px-8 font-semibold text-sm rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm group"
                  >
                    Ver Cases de Aplicação
                    <ChevronRight className="ml-1.5 h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </Button>
                </a>
              </div>
            </AnimatedSection>

            {/* Trust badges */}
            <AnimatedSection delay={0.45}>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                {[
                  { icon: <Shield className="h-3.5 w-3.5" />, text: "99.9% Uptime" },
                  { icon: <Lock className="h-3.5 w-3.5" />, text: "Infraestrutura Própria" },
                  { icon: <Activity className="h-3.5 w-3.5" />, text: "Operação 24/7" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/35">
                    <div className="text-cjp-accent-light/60">{badge.icon}</div>
                    <span className="text-[11px] font-medium tracking-wide uppercase">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </motion.div>

          {/* Dashboard cards column */}
          <AnimatedSection
            delay={0.3}
            className="lg:col-span-5 hidden lg:block"
          >
            <motion.div style={{ y: cardsY }} className="relative">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <DashboardCard
                    label="Uptime"
                    value="99.9%"
                    icon={<Shield className="h-4 w-4" />}
                    delay={0.5}
                  />
                  <DashboardCard
                    label="Operações"
                    value="Ativas 24/7"
                    icon={<Activity className="h-4 w-4" />}
                    delay={0.65}
                  />
                </div>

                <DashboardCard
                  label="Usuários Corporativos"
                  value="Centenas"
                  icon={<Users className="h-4 w-4" />}
                  className="mb-4"
                  delay={0.8}
                />

                <div className="grid grid-cols-2 gap-4">
                  <DashboardCard
                    label="Integrações"
                    value="ERP / BI"
                    icon={<Database className="h-4 w-4" />}
                    delay={0.95}
                  />
                  <DashboardCard
                    label="Segurança"
                    value="Ativa 24/7"
                    icon={<Lock className="h-4 w-4" />}
                    delay={1.1}
                  />
                </div>

                {/* Decorative glows */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-cjp-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cjp-accent/[0.04] rounded-full blur-3xl pointer-events-none" />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── 2. Quem Somos Section ─── */
function QuemSomosSection({
  contents,
}: {
  contents: ReturnType<typeof getContentValue>[] | any;
}) {
  const summary =
    getContentValue(contents, "quem_somos_summary") ||
    "A CJP NET atua no desenvolvimento e operação de soluções digitais corporativas voltadas à organização, integração e gestão de processos empresariais.";

  const stats = [
    { value: 16, suffix: "+", label: "Anos de Experiência", icon: <TrendingUp className="h-5 w-5" />, description: "Atuação no mercado" },
    { value: 100, suffix: "%", label: "Desenvolvimento Próprio", icon: <Code2 className="h-5 w-5" />, description: "Código proprietário" },
    { value: 99, suffix: ".9%", label: "Uptime Garantido", icon: <Shield className="h-5 w-5" />, description: "Disponibilidade" },
    { value: 24, suffix: "/7", label: "Operação Contínua", icon: <Activity className="h-5 w-5" />, description: "Monitoramento ativo" },
  ];

  return (
    <section className="py-24 md:py-36 bg-surface-container-lowest relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#0a1628 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Accent line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-cjp-accent/30 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <SectionTag text="Quem Somos" />

          <h2
            className="text-3xl md:text-[44px] font-bold text-cjp-primary tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Tecnologia que estrutura{" "}
            <span className="text-gradient-dark">operações</span>
          </h2>

          <p
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {summary}
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4 }}
              className="relative group bg-white rounded-2xl p-6 md:p-8 border border-outline-variant/40 hover:border-cjp-accent/20 hover:shadow-xl hover:shadow-cjp-accent/[0.04] transition-all duration-500 text-center card-shine-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cjp-accent/[0.08] to-cjp-accent/[0.02] flex items-center justify-center text-cjp-accent mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 border border-cjp-accent/[0.08]">
                {stat.icon}
              </div>
              <div
                className="text-3xl md:text-4xl font-bold text-cjp-primary mb-1"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-semibold text-on-surface-variant mb-0.5">
                {stat.label}
              </p>
              <p className="text-xs text-on-surface-variant/60">
                {stat.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-cjp-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Services Section (Bento Grid) ─── */
function ServicesSection({ services }: { services: Service[] }) {
  const displayServices = services.length > 0 ? services.slice(0, 4) : [
    { id: "1", title: "Plataformas SaaS Corporativas", description: "Soluções web multiusuário desenvolvidas para operações que exigem acesso contínuo, centralização de informações e evolução constante.", icon: "cloud", highlight: false, featured: true, sortOrder: 0, ctaText: null, checkItems: "[]" },
    { id: "2", title: "Integração e Estruturação de Dados", description: "Integração entre sistemas corporativos, consolidação de informações operacionais e estruturação de indicadores estratégicos.", icon: "git-merge", highlight: false, featured: false, sortOrder: 1, ctaText: null, checkItems: "[]" },
    { id: "3", title: "Governança e Controle Operacional", description: "Automação de processos, rastreabilidade operacional, padronização de rotinas e maior previsibilidade na gestão.", icon: "shield-check", highlight: false, featured: false, sortOrder: 2, ctaText: null, checkItems: "[]" },
    { id: "4", title: "Soluções Sob Medida", description: "Desenvolvimento de plataformas personalizadas para operações que exigem regras específicas e integrações complexas.", icon: "blocks", highlight: true, featured: false, sortOrder: 3, ctaText: null, checkItems: "[]" },
  ];

  return (
    <section className="py-24 md:py-36 bg-surface-container-low relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#001736 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Accent shapes */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-cjp-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-cjp-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <AnimatedSection>
            <SectionTag text="O Que Fazemos" />
            <h2
              className="text-3xl md:text-[44px] font-bold text-cjp-primary tracking-tight leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Soluções para Cada<br className="hidden md:block" /> Necessidade
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <a href="/solucoes">
              <Button
                variant="outline"
                className="border-cjp-primary/20 text-cjp-primary hover:bg-cjp-primary hover:text-on-primary h-11 px-6 rounded-xl font-medium text-sm transition-all duration-300 group"
              >
                Ver Todas as Soluções
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
          </AnimatedSection>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayServices.map((service, i) => {
            const isHighlight = service.highlight;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4 }}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-500 card-shine-hover ${
                  isHighlight
                    ? "bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#1a1048] text-on-primary border border-white/[0.06]"
                    : "bg-white border border-outline-variant/40 hover:border-cjp-accent/15 hover:shadow-2xl hover:shadow-cjp-primary/[0.04]"
                }`}
              >
                {/* Card content */}
                <div className="p-8 md:p-10 flex flex-col gap-5 relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 ${
                      isHighlight
                        ? "bg-cjp-accent/20 border-cjp-accent/25 text-cjp-accent-light"
                        : "bg-gradient-to-br from-cjp-accent/[0.08] to-cjp-accent/[0.02] border-cjp-accent/[0.08] text-cjp-accent"
                    }`}
                  >
                    {iconMap[service.icon] || (
                      <Cloud className="h-6 w-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className={`text-xl font-bold mb-3 ${
                        isHighlight
                          ? "text-white"
                          : "text-cjp-primary"
                      }`}
                      style={{
                        fontFamily: "'Hanken Grotesk', sans-serif",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-[15px] leading-relaxed ${
                        isHighlight
                          ? "text-white/55"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom action */}
                  {isHighlight ? (
                    <div className="mt-auto pt-6 border-t border-cjp-accent/15">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-cjp-accent-light uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5" />
                        Solução Personalizada
                      </span>
                    </div>
                  ) : (
                    <div className="mt-auto pt-6 border-t border-outline-variant/30 group-hover:border-cjp-accent/10 transition-colors duration-300">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-cjp-primary/70 group-hover:text-cjp-accent transition-colors duration-300">
                        Saiba mais
                        <ArrowDownRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isHighlight
                      ? "bg-gradient-to-br from-cjp-accent/[0.04] via-transparent to-cjp-accent/[0.06]"
                      : "bg-gradient-to-br from-cjp-accent/[0.01] via-transparent to-cjp-accent/[0.03]"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Image Gallery Section ─── */
function GallerySection({ contents }: { contents: SiteContent[] }) {
  return (
    <section className="py-24 md:py-36 bg-surface-container-lowest relative overflow-hidden">
      {/* Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="mb-16">
          <SectionTag text="Galeria" />
          <h2
            className="text-3xl md:text-[44px] font-bold text-cjp-primary tracking-tight mb-5"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Nossas Soluções em Ação
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Conheça visualmente como nossas plataformas e infraestrutura
            atendem operações corporativas de alta criticidade.
          </p>
        </AnimatedSection>

        <ImageGallery contents={contents} />
      </div>
    </section>
  );
}

/* ─── 5. Diferenciais Section ─── */
function DiferenciaisSection({
  contents,
}: {
  contents: ReturnType<typeof getContentValue>[] | any;
}) {
  const itemsStr = getContentValue(contents, "diferenciais_items");
  const items = itemsStr
    ? itemsStr.split("|").map((s: string) => s.trim())
    : [
        "Desenvolvimento próprio",
        "Infraestrutura própria",
        "Modelo SaaS",
        "Evolução contínua",
        "Integrações corporativas",
        "Segurança e backups",
        "Operação de longa duração",
        "Atendimento próximo",
        "Conhecimento operacional do negócio",
        "Arquitetura personalizada",
      ];

  const iconCycle = [
    <Cpu key="cpu" className="h-5 w-5" />,
    <Server key="server" className="h-5 w-5" />,
    <Cloud key="cloud" className="h-5 w-5" />,
    <Zap key="zap" className="h-5 w-5" />,
    <GitMerge key="git-merge" className="h-5 w-5" />,
    <Shield key="shield" className="h-5 w-5" />,
    <Globe key="globe" className="h-5 w-5" />,
    <Headphones key="headphones" className="h-5 w-5" />,
    <Search key="search" className="h-5 w-5" />,
    <Settings key="settings" className="h-5 w-5" />,
  ];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden aurora-bg">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-pattern opacity-[0.015] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 50%, rgba(88, 69, 204, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(88, 69, 204, 0.06) 0%, transparent 50%)",
        }}
      />
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-cjp-accent/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 border border-white/[0.08] px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cjp-accent pulse-dot" />
            <span
              className="text-[11px] text-white/60 tracking-[0.15em] uppercase font-semibold"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Diferenciais
            </span>
          </div>
          <h2
            className="text-3xl md:text-[44px] font-bold tracking-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            <span className="text-gradient">Por que a CJP NET</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item: string, i: number) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:bg-white/[0.06] hover:border-cjp-accent/20 transition-all duration-500 h-full group card-shine-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cjp-accent/20 to-cjp-accent/[0.05] flex items-center justify-center text-cjp-accent-light shrink-0 mt-0.5 group-hover:scale-110 transition-all duration-300 border border-cjp-accent/[0.1]">
                  {iconCycle[i % iconCycle.length]}
                </div>
                <span className="text-white/75 text-sm font-medium leading-snug">
                  {item}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── 6. CTA Section ─── */
function CTASection() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 circuit-pattern opacity-[0.015] pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cjp-accent/[0.06] rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cjp-accent/[0.03] rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-cjp-accent/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 border border-white/[0.08] px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-sm mb-8">
              <MessageCircle className="h-3.5 w-3.5 text-cjp-accent-light" />
              <span
                className="text-[11px] text-white/60 tracking-[0.15em] uppercase font-semibold"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Fale Conosco
              </span>
            </div>

            <h2
              className="text-3xl md:text-[48px] font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              <span className="text-gradient">
                Pronto para estruturar sua operação?
              </span>
            </h2>
            <p className="text-white/40 text-lg mb-12 leading-relaxed">
              Converse com nossos especialistas e descubra como podemos
              transformar processos operacionais complexos em soluções digitais
              eficientes e seguras.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5511914922773"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-14 px-10 font-semibold text-base rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cjp-accent/30 group glow-pulse">
                  <MessageCircle className="mr-2.5 h-5 w-5" />
                  Falar com um Especialista
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Button>
              </a>
              <a href="/contato">
                <Button
                  variant="outline"
                  className="border-white/[0.12] text-white hover:bg-white/[0.08] hover:border-white/[0.2] h-14 px-10 font-semibold text-base rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm"
                >
                  Formulário de Contato
                </Button>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function HomePage() {
  const { contents, services } = useSiteData();

  return (
    <PageLayout>
      <HeroSection contents={contents} />
      <QuemSomosSection contents={contents} />
      <ServicesSection services={services} />
      <GallerySection contents={contents} />
      <DiferenciaisSection contents={contents} />
      <CTASection />
    </PageLayout>
  );
}
