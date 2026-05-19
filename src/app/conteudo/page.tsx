"use client";

import { motion } from "framer-motion";
import {
  Check, Cpu, Server, Cloud, Zap, GitMerge, Shield,
  Globe, Headphones, Search, Settings, Database,
  BarChart3, Layers, Activity, ArrowRight, MessageCircle,
  TrendingUp, Users, Link2, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  PageHero,
  SectionTag,
  SectionTagDark,
} from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue } from "@/lib/types";

export default function ConteudoPage() {
  const { contents } = useSiteData();

  // Problemas que Resolvemos
  const problemasItemsStr = getContentValue(contents, "problemas_items");
  const problemasItems = problemasItemsStr
    ? problemasItemsStr.split("|").map((s) => s.trim())
    : [
        "Consolidar informações espalhadas em múltiplos sistemas",
        "Eliminar controles manuais e retrabalho",
        "Estruturar indicadores estratégicos",
        "Integrar ERP, operação e BI",
        "Garantir rastreabilidade operacional",
        "Digitalizar processos críticos",
        "Organizar operações multiunidades",
        "Centralizar informações para tomada de decisão",
      ];

  // Experiência
  const experienciaItemsStr = getContentValue(contents, "experiencia_items");
  const experienciaItems = experienciaItemsStr
    ? experienciaItemsStr.split("|").map((s) => s.trim())
    : [
        "Milhares de operações processadas mensalmente",
        "Centenas de usuários simultâneos",
        "Operações multiunidades",
        "Integração com ERPs",
        "Consolidação de indicadores estratégicos",
        "Plataformas SaaS com evolução contínua",
      ];

  // Diferenciais
  const diferenciaisItemsStr = getContentValue(
    contents,
    "diferenciais_items"
  );
  const diferenciaisItems = diferenciaisItemsStr
    ? diferenciaisItemsStr.split("|").map((s) => s.trim())
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

  const problemaIcons = [
    <Database key="db" className="h-5 w-5" />,
    <RefreshCw key="refresh" className="h-5 w-5" />,
    <BarChart3 key="chart" className="h-5 w-5" />,
    <Link2 key="link" className="h-5 w-5" />,
    <Search key="search" className="h-5 w-5" />,
    <Zap key="zap" className="h-5 w-5" />,
    <Layers key="layers" className="h-5 w-5" />,
    <TrendingUp key="trend" className="h-5 w-5" />,
  ];

  const experienciaIcons = [
    <Activity key="act" className="h-5 w-5" />,
    <Users key="users" className="h-5 w-5" />,
    <Layers key="layers" className="h-5 w-5" />,
    <Link2 key="link" className="h-5 w-5" />,
    <BarChart3 key="chart" className="h-5 w-5" />,
    <Cloud key="cloud" className="h-5 w-5" />,
  ];

  const diferenciaisIcons = [
    <Cpu key="cpu" className="h-4 w-4" />,
    <Server key="server" className="h-4 w-4" />,
    <Cloud key="cloud" className="h-4 w-4" />,
    <Zap key="zap" className="h-4 w-4" />,
    <GitMerge key="git" className="h-4 w-4" />,
    <Shield key="shield" className="h-4 w-4" />,
    <Globe key="globe" className="h-4 w-4" />,
    <Headphones key="headphones" className="h-4 w-4" />,
    <Search key="search" className="h-4 w-4" />,
    <Settings key="settings" className="h-4 w-4" />,
  ];

  return (
    <PageLayout>
      <PageHero
        tag="Conteúdo"
        title="Problemas que Resolvemos e Nossos Diferenciais"
        description="Entenda os desafios que ajudamos a superar e o que nos torna diferentes no mercado de soluções digitais corporativas."
      />

      {/* Problemas que Resolvemos */}
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
          <AnimatedSection className="mb-12">
            <SectionTag text="Desafios" />
            <h2
              className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Problemas que Resolvemos
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problemasItems.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="bg-white border border-outline-variant rounded-xl p-6 flex items-start gap-3 hover:border-cjp-accent/30 hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-cjp-accent/10 flex items-center justify-center text-cjp-accent shrink-0 mt-0.5">
                    {problemaIcons[i % problemaIcons.length]}
                  </div>
                  <span className="text-[#1a1c23] text-sm font-medium leading-snug">
                    {item}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Experiência */}
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
          <AnimatedSection className="mb-12 text-center">
            <SectionTag text="Experiência" />
            <h2
              className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Maturidade Operacional
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Mostramos maturidade operacional sem necessariamente expor
              clientes sensíveis.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experienciaItems.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex items-center gap-4 hover:border-cjp-accent/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-cjp-primary flex items-center justify-center text-white shrink-0">
                    {experienciaIcons[i % experienciaIcons.length]}
                  </div>
                  <span className="text-[#1a1c23] text-base font-medium leading-snug">
                    {item}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Diferenciais */}
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
            {diferenciaisItems.map((item, i) => (
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
                    {diferenciaisIcons[i % diferenciaisIcons.length]}
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

      {/* CTA */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <AnimatedSection>
            <h2
              className="text-3xl font-bold text-cjp-primary mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Enfrenta algum desses desafios?
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
              Converse com nossos especialistas e descubra como podemos ajudar a
              estruturar sua operação.
            </p>
            <a
              href="https://wa.me/5511914922773"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-12 px-8 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cjp-accent/25">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com um Especialista
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
