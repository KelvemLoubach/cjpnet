"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Cloud, GitMerge, ShieldCheck, Blocks, ArrowRight,
  MessageCircle, BarChart3, Users, Zap, Shield,
  Database, Server, Settings, Headphones, Search,
  Cpu, Lock, Globe, Check, ChevronRight, Play,
  TrendingUp, Activity, Layers, Code2, ArrowDownRight,
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
  SectionTagDark,
} from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue } from "@/lib/types";
import type { Service } from "@/lib/types";

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
      className={`bg-white/[0.06] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-2xl shadow-black/10 group hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-500 ${className}`}
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

/* ─── 1. Hero Section (Redesigned) ─── */
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
    <section ref={ref} className="relative overflow-hidden -mt-20">
      {/* Multi-layer gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-[#070d1a] via-[#0c1a33] to-[#111f3c]"
      />

      {/* Mesh gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 50%, rgba(88, 69, 204, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(22, 39, 68, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(88, 69, 204, 0.08) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${8 + i * 17}%`,
              top: `${10 + (i % 3) * 30}%`,
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: i % 2 === 0 ? "rgba(88, 69, 204, 0.5)" : "rgba(123, 106, 255, 0.3)",
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

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

      {/* Content */}
      <motion.div style={{ scale }} className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-32 md:pt-44 pb-24 md:pb-40 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col gap-7"
          >
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
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
                className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em]"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {heroTitle}
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-xl">
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
                  <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-[52px] px-8 font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cjp-accent/30 group">
                    <MessageCircle className="mr-2.5 h-[18px] w-[18px]" />
                    Falar com um Especialista
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Button>
                </a>
                <a href="/cases">
                  <Button
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/10 hover:border-white/25 hover:text-white h-[52px] px-8 font-semibold text-sm rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm group"
                  >
                    Ver Cases de Aplicação
                    <ChevronRight className="ml-1.5 h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </Button>
                </a>
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
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-cjp-accent/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cjp-accent/4 rounded-full blur-3xl pointer-events-none" />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── 2. Quem Somos Section (Redesigned) ─── */
function QuemSomosSection({
  contents,
}: {
  contents: ReturnType<typeof getContentValue>[] | any;
}) {
  const summary =
    getContentValue(contents, "quem_somos_summary") ||
    "A CJP NET atua no desenvolvimento e operação de soluções digitais corporativas voltadas à organização, integração e gestão de processos empresariais.";

  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#0a1628 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Accent line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cjp-accent/30 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <SectionTag text="Quem Somos" />

          <h2
            className="text-3xl md:text-[40px] font-bold text-cjp-primary tracking-tight mb-8 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Tecnologia que estrutura operações
          </h2>

          <p
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {summary}
          </p>
        </AnimatedSection>

        {/* Stats row */}
        <AnimatedSection delay={0.2}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 16, suffix: "+", label: "Anos de Experiência", icon: <TrendingUp className="h-5 w-5" /> },
              { value: 100, suffix: "%", label: "Desenvolvimento Próprio", icon: <Code2 className="h-5 w-5" /> },
              { value: 99, suffix: ".9%", label: "Uptime Garantido", icon: <Shield className="h-5 w-5" /> },
              { value: 24, suffix: "/7", label: "Operação Contínua", icon: <Activity className="h-5 w-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-cjp-accent/8 flex items-center justify-center text-cjp-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div
                  className="text-3xl md:text-4xl font-bold text-cjp-primary mb-1"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-on-surface-variant font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── 3. Services Section (Redesigned) ─── */
function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-24 md:py-32 bg-surface-container-low relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#001736 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Accent shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-cjp-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-cjp-accent/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <AnimatedSection>
            <SectionTag text="O Que Fazemos" />
            <h2
              className="text-3xl md:text-[40px] font-bold text-cjp-primary tracking-tight leading-tight"
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(0, 4).map((service) => {
            const isHighlight = service.highlight;

            return (
              <StaggerItem
                key={service.id}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${
                  isHighlight
                    ? "bg-cjp-primary text-on-primary"
                    : "bg-surface-container-lowest border border-outline-variant hover:border-outline hover:shadow-xl hover:shadow-cjp-primary/5"
                }`}
              >
                {/* Card content */}
                <div className="p-8 md:p-9 flex flex-col gap-5 relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${
                      isHighlight
                        ? "bg-cjp-accent/20 border-cjp-accent/25 text-cjp-accent-light"
                        : "bg-primary-fixed border-primary-fixed-dim text-cjp-primary"
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
                          ? "text-on-primary"
                          : "text-cjp-primary"
                      }`}
                      style={{
                        fontFamily: "'Hanken Grotesk', sans-serif",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-base leading-relaxed ${
                        isHighlight
                          ? "text-white/65"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Highlight badge */}
                  {isHighlight && (
                    <div className="mt-auto pt-5 border-t border-cjp-accent/20">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-cjp-accent-light uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5" />
                        Solução Personalizada
                      </span>
                    </div>
                  )}

                  {/* Hover arrow */}
                  {!isHighlight && (
                    <div className="mt-auto pt-5 border-t border-outline-variant/50 group-hover:border-outline transition-colors duration-300">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-cjp-primary group-hover:text-cjp-accent transition-colors duration-300">
                        Saiba mais
                        <ArrowDownRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtle gradient overlay on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isHighlight
                      ? "bg-gradient-to-br from-white/0 via-white/[0.03] to-white/[0.06]"
                      : "bg-gradient-to-br from-primary-fixed/0 via-primary-fixed/[0.02] to-primary-fixed/[0.05]"
                  }`}
                />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── 4. Image Gallery Section ─── */
function GallerySection() {
  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden">
      {/* Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="mb-14">
          <SectionTag text="Galeria" />
          <h2
            className="text-3xl md:text-[40px] font-bold text-cjp-primary tracking-tight mb-4"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Nossas Soluções em Ação
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Conheça visualmente como nossas plataformas e infraestrutura
            atendem operações corporativas de alta criticidade.
          </p>
        </AnimatedSection>

        <ImageGallery />
      </div>
    </section>
  );
}

/* ─── 5. Diferenciais Section (Redesigned) ─── */
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
    <Cpu key="cpu" className="h-4.5 w-4.5" />,
    <Server key="server" className="h-4.5 w-4.5" />,
    <Cloud key="cloud" className="h-4.5 w-4.5" />,
    <Zap key="zap" className="h-4.5 w-4.5" />,
    <GitMerge key="git-merge" className="h-4.5 w-4.5" />,
    <Shield key="shield" className="h-4.5 w-4.5" />,
    <Globe key="globe" className="h-4.5 w-4.5" />,
    <Headphones key="headphones" className="h-4.5 w-4.5" />,
    <Search key="search" className="h-4.5 w-4.5" />,
    <Settings key="settings" className="h-4.5 w-4.5" />,
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#0a1628]">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-pattern opacity-[0.02] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 50%, rgba(88, 69, 204, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(88, 69, 204, 0.06) 0%, transparent 50%)",
        }}
      />
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cjp-accent/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cjp-accent pulse-dot" />
            <span
              className="text-[11px] text-white/70 tracking-[0.15em] uppercase font-semibold"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Diferenciais
            </span>
          </div>
          <h2
            className="text-3xl md:text-[40px] font-bold text-white tracking-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Por que a CJP NET
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
                className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 flex items-start gap-4 hover:bg-white/[0.08] hover:border-cjp-accent/25 transition-all duration-500 h-full group"
              >
                <div className="w-10 h-10 rounded-xl bg-cjp-accent/12 flex items-center justify-center text-cjp-accent-light shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-cjp-accent/20 transition-all duration-300">
                  {iconCycle[i % iconCycle.length]}
                </div>
                <span className="text-white/80 text-sm font-medium leading-snug">
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

/* ─── 6. CTA Section (Redesigned) ─── */
function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070d1a] via-[#0c1a33] to-[#111f3c]" />
      <div className="absolute inset-0 circuit-pattern opacity-[0.02] pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cjp-accent/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cjp-accent/[0.03] rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cjp-accent/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-8">
              <MessageCircle className="h-3.5 w-3.5 text-cjp-accent-light" />
              <span
                className="text-[11px] text-white/70 tracking-[0.15em] uppercase font-semibold"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Fale Conosco
              </span>
            </div>

            <h2
              className="text-3xl md:text-[44px] font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Pronto para estruturar sua operação?
            </h2>
            <p className="text-white/45 text-lg mb-12 leading-relaxed">
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
                <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-14 px-10 font-semibold text-base rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cjp-accent/30 group">
                  <MessageCircle className="mr-2.5 h-5 w-5" />
                  Falar com um Especialista
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Button>
              </a>
              <a href="/contato">
                <Button
                  variant="outline"
                  className="border-white/15 text-white hover:bg-white/10 hover:border-white/25 h-14 px-10 font-semibold text-base rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm"
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
      <GallerySection />
      <DiferenciaisSection contents={contents} />
      <CTASection />
    </PageLayout>
  );
}
