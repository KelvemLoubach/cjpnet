"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cloud,
  GitMerge,
  ShieldCheck,
  Blocks,
  Check,
  ArrowRight,
  Zap,
  Globe,
  Database,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, StaggerContainer, StaggerItem, SectionTag } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue, parseCheckItems } from "@/lib/types";
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
};

function HeroSection({ contents }: { contents: ReturnType<typeof getContentValue>[] | any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroTag = getContentValue(contents, "hero_tag") || "Arquitetura Corporativa";
  const heroTitle = getContentValue(contents, "hero_title") || "Engenharia de Dados e Soluções Escaláveis";
  const heroDesc = getContentValue(contents, "hero_description") || "";
  const heroCta = getContentValue(contents, "hero_cta") || "Conhecer Portfólio";

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest via-surface to-primary-fixed/10 gradient-animate" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-fixed-dim rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        <motion.div style={{ opacity: textOpacity }} className="lg:col-span-6 flex flex-col gap-6">
          <AnimatedSection>
            <SectionTag text={heroTag} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-[48px] font-bold text-cjp-primary leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {heroTitle}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
              {heroDesc}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex gap-4 pt-4">
              <a href="/solucoes">
                <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-8 font-medium text-sm rounded transition-all duration-300 hover:shadow-lg hover:shadow-cjp-primary/20">
                  {heroCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </motion.div>

        <AnimatedSection delay={0.2} className="lg:col-span-6">
          <motion.div
            style={{ y: imageY }}
            className="h-[300px] lg:h-[500px] rounded-xl border border-outline-variant relative overflow-hidden shadow-2xl"
          >
            <img
              alt="Infraestrutura de servidor corporativo"
              className="absolute inset-0 w-full h-full object-cover"
              src="/hero-image.png"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-cjp-primary/60 via-cjp-primary/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <div className="text-white/60 text-xs font-medium">Uptime</div>
                <div className="text-white text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>99.9%</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <div className="text-white/60 text-xs font-medium">Latência</div>
                <div className="text-white text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>&lt;50ms</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <div className="text-white/60 text-xs font-medium">Segurança</div>
                <div className="text-white text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>AES-256</div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HomeServices({ services }: { services: Service[] }) {
  return (
    <section className="bg-surface-container-low py-20 md:py-28 border-y border-outline-variant relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#001736 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <SectionTag text="Soluções" />
          <h2 className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight mb-12" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Core Capabilities
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.slice(0, 4).map((service, index) => {
            const checkItems = parseCheckItems(service.checkItems);
            const isLarge = index === 0 || index === 3;
            const isHighlight = service.highlight;

            return (
              <StaggerItem
                key={service.id}
                className={`${isLarge ? "lg:col-span-7" : "lg:col-span-5"} ${
                  isHighlight ? "bg-cjp-primary text-on-primary relative overflow-hidden" : "bg-surface-container-lowest border border-outline-variant"
                } p-8 flex flex-col gap-6 hover:shadow-lg transition-all duration-500 rounded-xl group`}
              >
                {isHighlight && <div className="absolute inset-0 opacity-10 pointer-events-none circuit-pattern" />}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  isHighlight ? "bg-gradient-to-r from-white/0 via-white/5 to-white/0" : "bg-gradient-to-r from-primary-fixed/0 via-primary-fixed/5 to-primary-fixed/0"
                }`} />

                <div className={`w-12 h-12 flex items-center justify-center rounded-lg border z-10 ${
                  isHighlight ? "bg-primary-container border-on-primary/20 text-on-primary" : "bg-primary-fixed border-primary-fixed-dim text-cjp-primary"
                }`}>
                  {iconMap[service.icon] || <Cloud className="h-6 w-6" />}
                </div>

                <div className="z-10">
                  <h3 className={`text-xl font-bold mb-2 ${isHighlight ? "text-on-primary" : "text-cjp-primary"}`} style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p className={`text-base leading-relaxed ${isHighlight ? "text-inverse-primary" : "text-on-surface-variant"}`}>
                    {service.description}
                  </p>
                </div>

                {checkItems.length > 0 && (
                  <ul className="mt-auto pt-6 border-t border-outline-variant flex flex-col gap-2 z-10">
                    {checkItems.map((item: string, i: number) => (
                      <li key={i} className={`flex items-center gap-2 text-sm font-medium ${isHighlight ? "text-on-primary/80" : "text-cjp-secondary"}`}>
                        <Check className="h-4 w-4 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                )}

                {service.ctaText && (
                  <div className={`mt-auto pt-6 border-t z-10 ${isHighlight ? "border-on-primary/20" : "border-outline-variant"}`}>
                    <button className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                      isHighlight ? "text-on-primary hover:text-inverse-primary" : "text-cjp-primary"
                    }`}>
                      {service.ctaText}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <a href="/solucoes">
            <Button variant="outline" className="border-cjp-primary text-cjp-primary hover:bg-cjp-primary hover:text-on-primary h-12 px-8 rounded">
              Ver Todas as Soluções
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HomeMetrics() {
  const metrics = [
    { value: "150+", label: "Projetos Entregues", icon: <Blocks className="h-5 w-5" /> },
    { value: "99.9%", label: "Uptime Garantido", icon: <ShieldCheck className="h-5 w-5" /> },
    { value: "<50ms", label: "Latência Média", icon: <Zap className="h-5 w-5" /> },
    { value: "24/7", label: "Suporte Ativo", icon: <Globe className="h-5 w-5" /> },
  ];

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed/5 via-transparent to-tertiary-fixed/5" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <StaggerItem key={i} className="text-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-container-low border border-outline-variant hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                  {metric.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-cjp-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  {metric.value}
                </div>
                <div className="text-sm text-on-surface-variant font-medium">{metric.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <AnimatedSection>
          <motion.div whileHover={{ scale: 1.005 }} className="bg-cjp-primary rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 circuit-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-inverse-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex-1">
                <h2 className="text-3xl md:text-[32px] font-bold text-on-primary mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  Pronto para transformar sua infraestrutura?
                </h2>
                <p className="text-inverse-primary text-lg max-w-xl">
                  Fale com nossos engenheiros e descubra como podemos estruturar a base tecnológica para o crescimento seguro da sua corporação.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contato">
                  <Button className="bg-on-primary text-cjp-primary hover:bg-inverse-primary h-12 px-8 font-medium text-sm rounded transition-all duration-300 hover:shadow-lg">
                    Falar com Especialista
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { contents, services } = useSiteData();

  return (
    <PageLayout>
      <HeroSection contents={contents} />
      <HomeServices services={services} />
      <HomeMetrics />
      <HomeCTA />
    </PageLayout>
  );
}
