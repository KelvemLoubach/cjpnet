"use client";

import { motion } from "framer-motion";
import {
  Cloud, GitMerge, ShieldCheck, Blocks, Check, ArrowRight,
  Zap, Globe, Database, Lock, Cpu, BarChart3, Settings,
  MessageCircle,
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
  settings: <Settings className="h-6 w-6" />,
};

export default function SolucoesPage() {
  const { contents, services } = useSiteData();

  const intro1 =
    getContentValue(contents, "oquefazemos_intro_1") ||
    "Desenvolvemos plataformas digitais voltadas à organização e integração de operações empresariais, permitindo que informações dispersas em diferentes sistemas sejam centralizadas de forma estruturada, segura e acessível.";
  const intro2 =
    getContentValue(contents, "oquefazemos_intro_2") ||
    "Nossas soluções são utilizadas por empresas que necessitam automatizar processos, acompanhar indicadores estratégicos, integrar dados operacionais e estruturar rotinas críticas com maior controle e previsibilidade.";
  const intro3 =
    getContentValue(contents, "oquefazemos_intro_3") ||
    "Atuamos tanto no desenvolvimento de plataformas SaaS corporativas quanto na construção de soluções sob medida, sempre considerando as particularidades operacionais de cada negócio e a necessidade de evolução contínua das aplicações.";
  const intro4 =
    getContentValue(contents, "oquefazemos_intro_4") ||
    "Além do desenvolvimento das plataformas, somos responsáveis por toda a operação tecnológica necessária para garantir estabilidade, segurança, disponibilidade e continuidade dos sistemas utilizados pelos clientes.";

  return (
    <PageLayout>
      <PageHero
        tag="Soluções"
        title="O Que Fazemos"
        description="Desenvolvemos plataformas digitais sob medida para operações que exigem controle, integração e confiabilidade."
      />

      {/* O Que Fazemos - Introduction */}
      <section className="py-16 md:py-24 bg-surface-container-lowest relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#0a1628 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <div className="flex flex-col gap-6">
              <p className="text-lg md:text-xl text-[#464750] leading-relaxed">
                {intro1}
              </p>
              <p className="text-lg md:text-xl text-[#464750] leading-relaxed">
                {intro2}
              </p>
              <p className="text-lg md:text-xl text-[#464750] leading-relaxed">
                {intro3}
              </p>
              <p className="text-lg md:text-xl text-[#464750] leading-relaxed">
                {intro4}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 md:py-28 bg-surface-container-low border-y border-outline-variant relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(#001736 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
          <AnimatedSection className="mb-12">
            <SectionTag text="Nossas Soluções" />
            <h2
              className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Soluções para Cada Necessidade
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const checkItems = parseCheckItems(service.checkItems);
              const isHighlight = service.highlight;

              return (
                <StaggerItem key={service.id}>
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: "0 12px 40px rgba(0, 23, 54, 0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`${
                      isHighlight
                        ? "bg-cjp-primary text-on-primary relative overflow-hidden"
                        : "bg-surface-container-lowest border border-outline-variant"
                    } p-8 flex flex-col gap-6 rounded-xl group h-full`}
                  >
                    {isHighlight && (
                      <div className="absolute inset-0 opacity-10 pointer-events-none circuit-pattern" />
                    )}

                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-lg border z-10 ${
                        isHighlight
                          ? "bg-primary-container border-on-primary/20 text-on-primary"
                          : "bg-primary-fixed border-primary-fixed-dim text-cjp-primary"
                      }`}
                    >
                      {iconMap[service.icon] || (
                        <Cloud className="h-6 w-6" />
                      )}
                    </div>

                    <div className="z-10">
                      <h3
                        className={`text-xl font-bold mb-3 ${
                          isHighlight ? "text-on-primary" : "text-cjp-primary"
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
                            ? "text-white/80"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>

                    {checkItems.length > 0 && (
                      <ul className="mt-auto pt-6 border-t border-outline-variant flex flex-col gap-2 z-10">
                        {checkItems.map((item: string, i: number) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 text-sm font-medium ${
                              isHighlight
                                ? "text-on-primary/80"
                                : "text-cjp-secondary"
                            }`}
                          >
                            <Check className="h-4 w-4 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {service.ctaText && (
                      <div
                        className={`mt-auto pt-6 border-t z-10 ${
                          isHighlight
                            ? "border-on-primary/20"
                            : "border-outline-variant"
                        }`}
                      >
                        <button
                          className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider ${
                            isHighlight
                              ? "text-on-primary hover:text-inverse-primary"
                              : "text-cjp-primary"
                          }`}
                        >
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cjp-accent/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center relative z-10">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-[36px] font-bold text-white mb-6"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Precisa de uma solução sob medida?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
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
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
