"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/shared/page-layout";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  PageHero,
} from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue, parseHighlights } from "@/lib/types";

export default function CasesPage() {
  const { contents, cases } = useSiteData();

  const sortedCases = [...cases].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <PageLayout>
      <PageHero
        tag="Cases"
        title="Casos de Aplicação"
        description="Conheça projetos reais onde nossas soluções transformaram operações corporativas."
      />

      {/* Case Studies */}
      <section className="pb-0">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <StaggerContainer className="flex flex-col gap-0">
            {sortedCases.map((caseStudy, i) => {
              const highlights = parseHighlights(caseStudy.highlights);
              const paragraphs = caseStudy.description.split("\n\n");
              const isEven = i % 2 === 0;

              return (
                <StaggerItem key={caseStudy.id}>
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
                          {/* Segment Badge */}
                          <Badge
                            className="w-fit border-0 text-sm font-medium px-3.5 py-1.5 rounded-full"
                            style={{
                              backgroundColor: "rgba(88, 69, 204, 0.1)",
                              color: "#5845cc",
                            }}
                          >
                            {caseStudy.segment}
                          </Badge>

                          {/* Title */}
                          <h2
                            className="text-2xl md:text-3xl font-bold text-[#0a1628] tracking-tight"
                            style={{
                              fontFamily:
                                "'Hanken Grotesk', sans-serif",
                            }}
                          >
                            {caseStudy.title}
                          </h2>

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

                          {/* Highlights */}
                          {highlights.length > 0 && (
                            <div className="mt-4 pt-6 border-t border-outline-variant">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {highlights.map(
                                  (highlight: string, hIdx: number) => (
                                    <motion.div
                                      key={hIdx}
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      viewport={{ once: true }}
                                      transition={{
                                        delay: hIdx * 0.08,
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
                                        {highlight}
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cjp-accent/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center relative z-10">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Quer ser o próximo case de sucesso?
            </h2>
            <p className="text-lg text-[#8da4cc] mb-10 max-w-xl mx-auto">
              Entre em contato e descubra como podemos transformar sua
              operação com soluções digitais sob medida.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5511914922773"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-12 px-8 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cjp-accent/25">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar com um Especialista
                </Button>
              </a>
              <a href="/contato">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 h-12 px-8 rounded-lg font-medium text-sm bg-transparent"
                >
                  Fale Conosco
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
