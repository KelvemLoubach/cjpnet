"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, StaggerContainer, StaggerItem, PageHero } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";

const segments = [
  { name: "Financeiro", description: "Bancos, fintechs e seguradoras", detail: "Soluções para conformidade regulatória, processamento de transações em alta frequência e proteção de dados sensíveis." },
  { name: "Saúde", description: "Hospitais e operadoras de planos", detail: "Plataformas SaaS para gestão de prontuários, integração de sistemas de convênios e conformidade com LGPD." },
  { name: "Varejo", description: "E-commerce e redes de lojas", detail: "Arquiteturas de alta disponibilidade para picos de acesso, integração omnichannel e pipelines de dados." },
  { name: "Indústria", description: "Manufatura e logística", detail: "Automação de processos industriais, dashboards operacionais em tempo real e rastreamento de ativos." },
  { name: "Governo", description: "Órgãos públicos e estatais", detail: "Sistemas com alta governança, rastreabilidade e conformidade com normas de segurança da informação." },
  { name: "Energia", description: "Petróleo, gás e renováveis", detail: "Monitoramento de infraestrutura crítica, análise preditiva e integração de sistemas SCADA." },
];

export default function SegmentosPage() {
  const { contents } = useSiteData();

  return (
    <PageLayout>
      <PageHero
        tag="Segmentos"
        title="Atuação por Segmento"
        description="Soluções desenhadas para as particularidades de cada indústria, com expertise comprovada em setores de alta criticidade."
      />

      <section className="py-20 md:py-28 bg-surface-container-low relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#001736 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.map((segment, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0, 23, 54, 0.08)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-8 rounded-xl border border-outline-variant bg-surface-container-lowest h-full flex flex-col"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cjp-primary text-on-primary mb-4">
                    <span className="text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-cjp-primary mb-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {segment.name}
                  </h3>
                  <p className="text-sm text-on-surface-variant mb-3">{segment.description}</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{segment.detail}</p>
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
              Seu segmento não está aqui?
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
              Atendemos diversos setores com soluções customizadas. Fale conosco.
            </p>
            <a href="/contato">
              <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-8 rounded">
                Entrar em Contato <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
