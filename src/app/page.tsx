"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cloud, GitMerge, ShieldCheck, Blocks, ArrowRight,
  MessageCircle, BarChart3, Users, Zap, Shield,
  Database, Server, Settings, Headphones, Search,
  Cpu, Lock, Globe, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
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
      className={`bg-white/[0.07] backdrop-blur-md rounded-xl p-4 border border-white/[0.12] shadow-lg ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-cjp-accent/20 flex items-center justify-center text-cjp-accent-light">
          {icon}
        </div>
        <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div
        className="text-white text-xl font-bold"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {value}
      </div>
    </motion.div>
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
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

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
      {/* Dark blue gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#162744]"
      />

      {/* Subtle mesh overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(88, 69, 204, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(22, 39, 68, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(88, 69, 204, 0.06) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Tech grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating animated dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cjp-accent-light/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Data flow lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[30%] left-0 right-0 h-px data-flow-line"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[70%] left-0 right-0 h-px data-flow-line"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-32 md:pt-40 pb-20 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Text column */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <AnimatedSection>
            <SectionTagDark text={heroTag} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {heroTitle}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
              {heroDesc}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://wa.me/5511914922773"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-12 px-8 font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cjp-accent/25">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar com um Especialista
                </Button>
              </a>
              <a href="/cases">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white h-12 px-8 font-medium text-sm rounded-lg transition-all duration-300"
                >
                  Ver Casos de Aplicação
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                  icon={<Shield className="h-3.5 w-3.5" />}
                  delay={0.5}
                />
                <DashboardCard
                  label="Operações"
                  value="Processadas"
                  icon={<BarChart3 className="h-3.5 w-3.5" />}
                  delay={0.65}
                />
              </div>

              <DashboardCard
                label="Usuários Ativos"
                value="Centenas"
                icon={<Users className="h-3.5 w-3.5" />}
                className="mb-4"
                delay={0.8}
              />

              <div className="grid grid-cols-2 gap-4">
                <DashboardCard
                  label="Integrações"
                  value="ERP / BI"
                  icon={<Database className="h-3.5 w-3.5" />}
                  delay={0.95}
                />
                <DashboardCard
                  label="Segurança"
                  value="Ativa 24/7"
                  icon={<Lock className="h-3.5 w-3.5" />}
                  delay={1.1}
                />
              </div>

              <div className="absolute -top-8 -right-8 w-32 h-32 bg-cjp-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cjp-accent/5 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
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

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#0a1628 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-cjp-accent/40" />
            <div className="w-2 h-2 rounded-full bg-cjp-accent/60" />
            <div className="w-8 h-px bg-cjp-accent/40" />
          </div>

          <SectionTag text="Quem Somos" />

          <p
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {summary}
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-8 h-px bg-cjp-accent/40" />
            <div className="w-2 h-2 rounded-full bg-cjp-accent/60" />
            <div className="w-8 h-px bg-cjp-accent/40" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── 3. O Que Fazemos Section ─── */
function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-20 md:py-28 bg-surface-container-low relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#001736 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <SectionTag text="O Que Fazemos" />
          <h2
            className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight mb-12"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Soluções para Cada Necessidade
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(0, 4).map((service) => {
            const isHighlight = service.highlight;

            return (
              <StaggerItem
                key={service.id}
                className={`p-8 flex flex-col gap-4 transition-all duration-500 rounded-xl group relative overflow-hidden ${
                  isHighlight
                    ? "bg-cjp-primary text-on-primary border-2 border-cjp-accent"
                    : "bg-surface-container-lowest border border-outline-variant hover:shadow-lg hover:border-outline"
                }`}
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isHighlight
                      ? "bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                      : "bg-gradient-to-r from-primary-fixed/0 via-primary-fixed/5 to-primary-fixed/0"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border z-10 ${
                    isHighlight
                      ? "bg-cjp-accent/20 border-cjp-accent/30 text-cjp-accent-light"
                      : "bg-primary-fixed border-primary-fixed-dim text-cjp-primary"
                  }`}
                >
                  {iconMap[service.icon] || (
                    <Cloud className="h-6 w-6" />
                  )}
                </div>

                {/* Content */}
                <div className="z-10">
                  <h3
                    className={`text-xl font-bold mb-2 ${
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
                        ? "text-white/70"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Highlight badge */}
                {isHighlight && (
                  <div className="z-10 mt-auto pt-4 border-t border-cjp-accent/30">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cjp-accent-light uppercase tracking-wider">
                      <Zap className="h-3.5 w-3.5" />
                      Solução Personalizada
                    </span>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <a href="/solucoes">
            <Button
              variant="outline"
              className="border-cjp-primary text-cjp-primary hover:bg-cjp-primary hover:text-on-primary h-12 px-8 rounded-lg font-medium text-sm transition-all duration-300"
            >
              Ver Todas as Soluções
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── 4. Diferenciais Section ─── */
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
    <Cpu key="cpu" className="h-4 w-4" />,
    <Server key="server" className="h-4 w-4" />,
    <Cloud key="cloud" className="h-4 w-4" />,
    <Zap key="zap" className="h-4 w-4" />,
    <GitMerge key="git-merge" className="h-4 w-4" />,
    <Shield key="shield" className="h-4 w-4" />,
    <Globe key="globe" className="h-4 w-4" />,
    <Headphones key="headphones" className="h-4 w-4" />,
    <Search key="search" className="h-4 w-4" />,
    <Settings key="settings" className="h-4 w-4" />,
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#0a1628]">
      <div className="absolute inset-0 circuit-pattern opacity-[0.03] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(88, 69, 204, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(88, 69, 204, 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center mb-14">
          <SectionTagDark text="Diferenciais" />
          <h2
            className="text-3xl md:text-[32px] font-bold text-white tracking-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Por que a CJP NET
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item: string, i: number) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-xl p-5 flex items-start gap-3 hover:bg-white/[0.08] hover:border-cjp-accent/30 transition-colors duration-300 h-full"
              >
                <div className="w-8 h-8 rounded-lg bg-cjp-accent/15 flex items-center justify-center text-cjp-accent-light shrink-0 mt-0.5">
                  {iconCycle[i % iconCycle.length]}
                </div>
                <span className="text-white/85 text-sm font-medium leading-snug">
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

/* ─── 5. CTA Section ─── */
function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]" />
      <div className="absolute inset-0 circuit-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cjp-accent/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cjp-accent/[0.03] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-[36px] font-bold text-white mb-6"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Pronto para estruturar sua operação?
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Converse com nossos especialistas e descubra como podemos
              transformar processos operacionais complexos em soluções digitais
              eficientes e seguras.
            </p>
            <a
              href="https://wa.me/5511914922773"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-14 px-10 font-medium text-base rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cjp-accent/25">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com um Especialista
              </Button>
            </a>
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
      <DiferenciaisSection contents={contents} />
      <CTASection />
    </PageLayout>
  );
}
