"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, StaggerContainer, StaggerItem, PageHero, SectionTag, SectionTagDark } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";

const cases = [
  {
    client: "Banco Institucional",
    segment: "Financeiro",
    result: "Redução de 60% no tempo de processamento de dados",
    description: "Implementação de data lake e pipelines de integração para consolidação de dados de múltiplas fontes legadas. Migração de sistemas on-premise para arquitetura cloud-native com alta disponibilidade.",
    metrics: ["60% mais rápido", "Zero downtime na migração", "3x mais consultas simultâneas"],
  },
  {
    client: "Rede Hospitalar Nacional",
    segment: "Saúde",
    result: "99.97% de uptime no sistema crítico",
    description: "Arquitetura SaaS multi-tenant para gestão de prontuários e integração com sistemas de convênios. Conformidade total com LGPD e normas de saúde digital.",
    metrics: ["99.97% uptime", "200+ hospitais integrados", "LGPD compliant"],
  },
  {
    client: "Operadora Logística",
    segment: "Indústria",
    result: "3x mais velocidade nas operações",
    description: "Automação de processos e dashboards operacionais em tempo real para rastreamento de frota. Integração com IoT para monitoramento contínuo.",
    metrics: ["3x mais rápido", "5.000+ ativos rastreados", "Tempo real"],
  },
];

export default function CasesPage() {
  const { contents } = useSiteData();

  return (
    <PageLayout>
      <PageHero
        tag="Cases"
        title="Resultados que Falam por Si"
        description="Conheça alguns dos projetos onde nossa engenharia fez a diferença em operações críticas."
      />

      {/* Dark featured section */}
      <section className="py-20 md:py-28 bg-cjp-primary relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-inverse-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((caseItem, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-on-primary/10 backdrop-blur-sm border border-on-primary/20 rounded-xl p-8 h-full flex flex-col"
                >
                  <Badge className="bg-inverse-primary/20 text-inverse-primary hover:bg-inverse-primary/30 w-fit mb-4 border-0">
                    {caseItem.segment}
                  </Badge>
                  <h3 className="text-xl font-bold text-on-primary mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {caseItem.client}
                  </h3>
                  <p className="text-inverse-primary/80 text-sm leading-relaxed mb-6 flex-1">
                    {caseItem.description}
                  </p>
                  <div className="pt-4 border-t border-on-primary/20 flex flex-col gap-2">
                    {caseItem.metrics.map((metric, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-inverse-primary shrink-0" />
                        <span className="text-sm font-medium text-on-primary">{metric}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-cjp-primary mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Quer ser o próximo case de sucesso?
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
              Entre em contato e descubra como podemos transformar sua operação.
            </p>
            <a href="/contato">
              <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-8 rounded">
                Iniciar Projeto <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
