"use client";

import { motion } from "framer-motion";
import {
  Cloud, GitMerge, ShieldCheck, Blocks, Check, ArrowRight,
  Zap, Globe, Database, Lock, Cpu, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, StaggerContainer, StaggerItem, PageHero } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue, parseCheckItems } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  cloud: <Cloud className="h-6 w-6" />,
  "git-merge": <GitMerge className="h-6 w-6" />,
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  blocks: <Blocks className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  globe: <Globe className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  lock: <Lock className="h-6 w-6" />,
  cpu: <Cpu className="h-6 w-6" />,
  "bar-chart": <BarChart3 className="h-6 w-6" />,
};

export default function SolucoesPage() {
  const { contents, services } = useSiteData();
  const servicesTitle = getContentValue(contents, "services_title") || "Core Capabilities";

  return (
    <PageLayout>
      <PageHero
        tag="Soluções"
        title={servicesTitle}
        description="Conheça nossa stack completa de soluções para engenharia de dados e arquitetura corporativa."
      />

      <section className="py-20 md:py-28 bg-surface-container-low border-y border-outline-variant relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#001736 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const checkItems = parseCheckItems(service.checkItems);
              const isHighlight = service.highlight;

              return (
                <StaggerItem key={service.id}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0, 23, 54, 0.08)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`${
                      isHighlight
                        ? "bg-cjp-primary text-on-primary relative overflow-hidden"
                        : "bg-surface-container-lowest border border-outline-variant"
                    } p-8 flex flex-col gap-6 rounded-xl group h-full`}
                  >
                    {isHighlight && <div className="absolute inset-0 opacity-10 pointer-events-none circuit-pattern" />}

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
                        <button className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider ${
                          isHighlight ? "text-on-primary hover:text-inverse-primary" : "text-cjp-primary"
                        }`}>
                          {service.ctaText}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-cjp-primary mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Precisa de uma solução sob medida?
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
              Nossa equipe de engenheiros está pronta para desenhar a arquitetura ideal para o seu negócio.
            </p>
            <a href="/contato">
              <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-8 rounded">
                Falar com Especialista <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
