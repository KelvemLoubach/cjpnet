"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Blocks, Globe } from "lucide-react";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, StaggerContainer, StaggerItem, PageHero } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";

const values = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Segurança Primeiro",
    description: "Proteção de dados com criptografia de ponta e conformidade com LGPD. Cada sistema é projetado com segurança defense-in-depth.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Alta Performance",
    description: "Infraestrutura otimizada para operações críticas com latência mínima. SLA de 99.9% garantido em todos os projetos.",
  },
  {
    icon: <Blocks className="h-6 w-6" />,
    title: "Escalabilidade",
    description: "Arquitetura preparada para crescer com seu negócio sem perda de eficiência. Do MVP ao enterprise sem reescrita.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Conectividade",
    description: "Integração nativa com APIs modernas e sistemas legados. Conectamos o seu ecossistema digital completo.",
  },
];

const timeline = [
  { year: "2012", event: "Fundação da CJP NET com foco em infraestrutura de rede" },
  { year: "2015", event: "Expansão para engenharia de dados e integração de sistemas" },
  { year: "2018", event: "Lançamento das primeiras plataformas SaaS corporativas" },
  { year: "2020", event: "Marco de 100 projetos entregues em operações críticas" },
  { year: "2023", event: "Expansão para 6 segmentos verticais de atuação" },
  { year: "2024", event: "Consolidação como referência em arquitetura corporativa" },
];

export default function SobrePage() {
  const { contents } = useSiteData();

  return (
    <PageLayout>
      <PageHero
        tag="Sobre"
        title="Engenharia com Precisão Institucional"
        description="A CJP NET atua na interseção entre engenharia de dados e arquitetura de software corporativo."
      />

      {/* Values */}
      <section className="py-20 md:py-28 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-cjp-primary tracking-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Nossos Valores
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0, 23, 54, 0.08)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-6 rounded-xl border border-outline-variant bg-surface-container-lowest h-full"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-cjp-primary mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{value.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About text */}
      <section className="py-20 md:py-28 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-cjp-primary mb-6 tracking-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Quem Somos
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                A CJP NET atua na interseção entre engenharia de dados e arquitetura de software corporativo. 
                Nossa abordagem combina rigor operacional com inovação tecnológica, entregando soluções 
                que escalam com segurança.
              </p>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Com mais de uma década de experiência em projetos críticos, estruturamos a base tecnológica 
                para operações que não podem falhar. Cada linha de código é pensada para performance, 
                cada arquitetura é desenhada para evoluir.
              </p>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-bold text-cjp-primary mb-6 tracking-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Nossa Trajetória
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-outline-variant" />
                <div className="flex flex-col gap-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 relative"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cjp-primary text-on-primary text-xs font-bold shrink-0 z-10">
                        {item.year.slice(-2)}
                      </div>
                      <div className="pt-1">
                        <div className="text-sm font-bold text-cjp-primary">{item.year}</div>
                        <div className="text-sm text-on-surface-variant">{item.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
