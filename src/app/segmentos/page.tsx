"use client";

import { motion } from "framer-motion";
import {
  BarChart3, Globe, Database, Cpu, Blocks,
  ArrowRight, MessageCircle, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  PageHero,
  SectionTag,
} from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { parseApplications } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  "bar-chart": <BarChart3 className="h-6 w-6" />,
  globe: <Globe className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  cpu: <Cpu className="h-6 w-6" />,
  blocks: <Blocks className="h-6 w-6" />,
};

export default function SegmentosPage() {
  const { segments } = useSiteData();

  const sortedSegments = [...segments].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <PageLayout>
      <PageHero
        tag="Segmentos"
        title="Atuação por Segmento"
        description="Soluções desenhadas para as particularidades de cada segmento, com expertise comprovada em operações de alta criticidade."
      />

      {/* Segments */}
      <section className="py-0">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <StaggerContainer className="flex flex-col gap-0">
            {sortedSegments.map((segment, i) => {
              const applications = parseApplications(segment.applications);
              const isEven = i % 2 === 0;
              const paragraphs = segment.description.split("\n\n");

              return (
                <StaggerItem key={segment.id}>
                  <div
                    className={`py-16 md:py-20 ${
                      isEven
                        ? "bg-white"
                        : "bg-surface-container-low"
                    } -mx-4 md:-mx-10 px-4 md:px-10`}
                  >
                    <div className="max-w-[1280px] mx-auto">
                      <AnimatedSection>
                        <div className="flex flex-col gap-6">
                          {/* Icon + Title */}
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cjp-primary text-white shrink-0 mt-1">
                              {iconMap[segment.icon] || (
                                <Globe className="h-6 w-6" />
                              )}
                            </div>
                            <div>
                              <h2
                                className="text-2xl md:text-3xl font-bold text-cjp-primary tracking-tight"
                                style={{
                                  fontFamily:
                                    "'Hanken Grotesk', sans-serif",
                                }}
                              >
                                {segment.title}
                              </h2>
                              {segment.subtitle && (
                                <p className="text-on-surface-variant mt-1">
                                  {segment.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Description paragraphs */}
                          <div className="flex flex-col gap-4 max-w-4xl">
                            {paragraphs.map((paragraph, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-base md:text-lg text-[#464750] leading-relaxed"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {/* Applications */}
                          {applications.length > 0 && (
                            <div className="mt-4 pt-6 border-t border-outline-variant">
                              <h4
                                className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-4"
                                style={{
                                  fontFamily:
                                    "'Hanken Grotesk', sans-serif",
                                }}
                              >
                                Aplicações
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {applications.map(
                                  (app: string, aIdx: number) => (
                                    <motion.div
                                      key={aIdx}
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      viewport={{ once: true }}
                                      transition={{
                                        delay: aIdx * 0.05,
                                        duration: 0.4,
                                      }}
                                      className="flex items-start gap-3"
                                    >
                                      <div
                                        className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full shrink-0"
                                        style={{
                                          backgroundColor:
                                            "rgba(88, 69, 204, 0.12)",
                                        }}
                                      >
                                        <Check
                                          className="h-3 w-3"
                                          style={{
                                            color: "#5845cc",
                                          }}
                                        />
                                      </div>
                                      <span className="text-sm md:text-base font-medium text-[#0a1628]">
                                        {app}
                                      </span>
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cjp-accent/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center relative z-10">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-[36px] font-bold text-white mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Seu segmento precisa de uma solução específica?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Atendemos diversos setores com soluções customizadas. Fale com
              nossos especialistas.
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
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
