"use client";

import { motion } from "framer-motion";
import {
  Target, Eye, Heart, ShieldCheck, Zap, Blocks, Globe,
  ArrowRight, MessageCircle, RefreshCw, Users, Headphones,
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
import { getContentValue } from "@/lib/types";

export default function SobrePage() {
  const { contents } = useSiteData();

  const joaoPhotoUrl = getContentValue(contents, "img_about_joao");

  const sobreDescription =
    getContentValue(contents, "sobre_description") ||
    "Com mais de 16 anos de experiência, desenvolvemos plataformas SaaS sob medida para empresas que necessitam centralizar informações, automatizar rotinas operacionais, integrar sistemas e estruturar indicadores estratégicos para apoio à tomada de decisão.";
  const sobreJoaoBio =
    getContentValue(contents, "sobre_joao_bio") ||
    "João Pessolato, fundador e CEO da CJP, começou sua trajetória como desenvolvedor, o que lhe permitiu unir uma visão técnica profunda à capacidade de transformar processos empresariais em soluções digitais inteligentes. Hoje, lidera uma equipe que cria aplicações seguras, escaláveis e sob medida, integrando bancos de dados complexos, ERPs e fluxos corporativos.";
  const sobreAtuacao =
    getContentValue(contents, "sobre_atuacao") ||
    "Nossa atuação combina arquitetura de software, integração de dados e entendimento operacional das necessidades do cliente, permitindo a construção de soluções robustas, escaláveis e evolutivas para diferentes segmentos de mercado.";
  const sobreSaas =
    getContentValue(contents, "sobre_saas") ||
    "Operamos em modelo SaaS, sendo responsáveis por toda a infraestrutura tecnológica necessária ao funcionamento das plataformas, incluindo servidores, segurança, disponibilidade e continuidade operacional, permitindo que o cliente mantenha foco total em sua operação.";
  const sobreMissao =
    getContentValue(contents, "sobre_missao") ||
    "Desenvolver soluções digitais que simplifiquem operações, organizem informações e apoiem empresas na tomada de decisões com mais controle, agilidade e confiabilidade.";
  const sobreVisao =
    getContentValue(contents, "sobre_visao") ||
    "Ser reconhecida pela capacidade de transformar necessidades operacionais complexas em soluções digitais eficientes, estáveis e estrategicamente relevantes para nossos clientes.";
  const sobreValoresStr = getContentValue(contents, "sobre_valores");
  const sobreValores = sobreValoresStr
    ? sobreValoresStr.split("|").map((s) => s.trim())
    : [
        "Ética e transparência nas relações",
        "Compromisso com a continuidade operacional",
        "Confiabilidade e responsabilidade técnica",
        "Evolução contínua das soluções",
        "Proximidade com o cliente e entendimento do negócio",
      ];

  const valoresIcons = [
    <Heart key="heart" className="h-5 w-5" />,
    <RefreshCw key="refresh" className="h-5 w-5" />,
    <ShieldCheck key="shield" className="h-5 w-5" />,
    <Zap key="zap" className="h-5 w-5" />,
    <Users key="users" className="h-5 w-5" />,
  ];

  return (
    <PageLayout>
      <PageHero
        tag="Sobre"
        title="Quem Somos"
        description="A CJP atua no desenvolvimento e operação de soluções digitais corporativas voltadas à organização, integração e gestão de processos empresariais."
      />

      {/* Main About Section */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Photo placeholder */}
            <AnimatedSection>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0a1628] via-[#162744] to-[#0f1f3a] rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative">
                  {joaoPhotoUrl ? (
                    <img
                      src={joaoPhotoUrl}
                      alt="João Pessolato - Fundador e CEO"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      {/* Decorative grid */}
                      <div
                        className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                      {/* Content */}
                      <div className="relative z-10 text-center px-8">
                        <div className="w-20 h-20 rounded-full bg-cjp-accent/20 flex items-center justify-center mx-auto mb-4">
                          <span
                            className="text-3xl font-bold text-white"
                            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                          >
                            JP
                          </span>
                        </div>
                        <h3
                          className="text-xl font-bold text-white mb-1"
                          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                        >
                          João Pessolato
                        </h3>
                        <p className="text-white/60 text-sm">Fundador e CEO</p>
                      </div>
                      {/* Accent glow */}
                      <div className="absolute -top-8 -right-8 w-32 h-32 bg-cjp-accent/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cjp-accent/5 rounded-full blur-2xl pointer-events-none" />
                    </>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Text content */}
            <AnimatedSection delay={0.15}>
              <div className="flex flex-col gap-6">
                <p className="text-lg text-[#464750] leading-relaxed">
                  {sobreDescription}
                </p>
                <p className="text-lg text-[#464750] leading-relaxed">
                  {sobreJoaoBio}
                </p>
                <p className="text-lg text-[#464750] leading-relaxed">
                  {sobreAtuacao}
                </p>
                <p className="text-lg text-[#464750] leading-relaxed">
                  {sobreSaas}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 md:py-28 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <AnimatedSection className="mb-12">
            <SectionTag text="Propósito" />
            <h2
              className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Missão, Visão e Valores
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Missão */}
            <StaggerContainer>
              <StaggerItem>
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 40px rgba(0, 23, 54, 0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-8 rounded-xl border border-outline-variant bg-surface-container-lowest h-full"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cjp-accent/10 text-cjp-accent mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3
                    className="text-xl font-bold text-cjp-primary mb-3"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    Missão
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {sobreMissao}
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>

            {/* Visão */}
            <StaggerContainer>
              <StaggerItem>
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 40px rgba(0, 23, 54, 0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-8 rounded-xl border border-outline-variant bg-surface-container-lowest h-full"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cjp-accent/10 text-cjp-accent mb-4">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3
                    className="text-xl font-bold text-cjp-primary mb-3"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    Visão
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {sobreVisao}
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Valores */}
          <AnimatedSection className="mb-8">
            <h3
              className="text-2xl font-bold text-cjp-primary mb-2"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Valores
            </h3>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sobreValores.map((valor, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="bg-white border border-outline-variant rounded-xl p-5 flex items-start gap-3 hover:border-cjp-accent/30 transition-colors duration-300 h-full"
                >
                  <div className="w-8 h-8 rounded-lg bg-cjp-accent/10 flex items-center justify-center text-cjp-accent shrink-0 mt-0.5">
                    {valoresIcons[i % valoresIcons.length]}
                  </div>
                  <span className="text-[#1a1c23] text-sm font-medium leading-snug">
                    {valor}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <AnimatedSection>
            <h2
              className="text-3xl font-bold text-cjp-primary mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Quer conhecer mais sobre nossas soluções?
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
              Converse com nossos especialistas e descubra como podemos
              transformar sua operação.
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
