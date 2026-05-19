"use client";

import { motion } from "framer-motion";
import {
  MessageCircle, Instagram, Linkedin, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, PageHero } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue } from "@/lib/types";

export default function ContatoPage() {
  const { contents } = useSiteData();

  const instagramUrl =
    getContentValue(contents, "instagram_url") ||
    "https://www.instagram.com/cjpnet";
  const linkedinUrl =
    getContentValue(contents, "linkedin_url") ||
    "https://www.linkedin.com/company/cjpnet/";
  const razaoSocial =
    getContentValue(contents, "site_razao_social") ||
    "CJP Tecnologia da Internet Ltda";
  const cnpj =
    getContentValue(contents, "site_cnpj") ||
    "CNPJ: 11.172.002/0001-84";

  return (
    <PageLayout>
      <PageHero
        tag="Contato"
        title="Fale com Nossos Especialistas"
        description="Estamos prontos para entender seu desafio e estruturar a solução ideal para sua operação."
      />

      <section className="py-20 md:py-28 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="flex flex-col gap-8">
                <div>
                  <h2
                    className="text-2xl font-bold text-cjp-primary mb-4"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                    }}
                  >
                    Entre em Contato
                  </h2>
                  <p className="text-lg text-on-surface-variant leading-relaxed">
                    Converse com nossos especialistas e descubra como podemos
                    transformar processos operacionais complexos em soluções
                    digitais eficientes e seguras.
                  </p>
                </div>

                {/* WhatsApp */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant mb-0.5">
                      WhatsApp
                    </div>
                    <a
                      href="https://wa.me/5511914922773"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-cjp-primary hover:text-cjp-accent transition-colors"
                    >
                      Falar com um Especialista
                    </a>
                  </div>
                </motion.div>

                {/* Social Media */}
                <div>
                  <h3
                    className="text-lg font-bold text-cjp-primary mb-4"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                    }}
                  >
                    Redes Sociais
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram CJP NET"
                    >
                      <motion.div
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-outline-variant bg-white hover:border-cjp-accent/30 hover:shadow-md transition-all duration-300"
                      >
                        <Instagram className="h-5 w-5 text-cjp-accent" />
                        <span className="text-sm font-medium text-cjp-primary">
                          Instagram
                        </span>
                      </motion.div>
                    </a>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn CJP NET"
                    >
                      <motion.div
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-outline-variant bg-white hover:border-cjp-accent/30 hover:shadow-md transition-all duration-300"
                      >
                        <Linkedin className="h-5 w-5 text-cjp-accent" />
                        <span className="text-sm font-medium text-cjp-primary">
                          LinkedIn
                        </span>
                      </motion.div>
                    </a>
                  </div>
                </div>

                {/* Company Info */}
                <div className="pt-6 border-t border-outline-variant">
                  <p className="text-sm text-on-surface-variant font-medium">
                    {razaoSocial}
                  </p>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {cnpj}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* WhatsApp CTA Card */}
            <AnimatedSection delay={0.2}>
              <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#162744] rounded-2xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
                {/* Decorative elements */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                  }}
                />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-cjp-accent/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cjp-accent/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="h-8 w-8 text-[#25D366]" />
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-white mb-4"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                    }}
                  >
                    Pronto para conversar?
                  </h3>
                  <p className="text-white/60 text-base mb-8 max-w-sm mx-auto leading-relaxed">
                    Fale diretamente com nossos especialistas pelo WhatsApp e
                    descubra como podemos ajudar sua operação.
                  </p>
                  <a
                    href="https://wa.me/5511914922773"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white h-14 px-10 font-medium text-base rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/25">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Iniciar Conversa no WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
