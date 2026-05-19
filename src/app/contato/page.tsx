"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, PageHero } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";

export default function ContatoPage() {
  const { contents } = useSiteData();

  return (
    <PageLayout>
      <PageHero
        tag="Contato"
        title="Fale com Nossos Engenheiros"
        description="Estamos prontos para entender seu desafio tecnológico e estruturar a solução ideal."
      />

      <section className="py-20 md:py-28 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-cjp-primary mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Informações de Contato
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                Entre em contato e agende uma conversa técnica com nossa equipe. 
                Respondemos em até 24 horas úteis.
              </p>

              <div className="flex flex-col gap-6">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 text-on-surface-variant"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant">Website</div>
                    <div className="text-sm font-medium text-cjp-primary">www.cjpnet.com.br</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 text-on-surface-variant"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant">Email</div>
                    <div className="text-sm font-medium text-cjp-primary">contato@cjpnet.com.br</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 text-on-surface-variant"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant">Telefone</div>
                    <div className="text-sm font-medium text-cjp-primary">+55 (11) 3456-7890</div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-8">
                <h3 className="text-xl font-bold text-cjp-primary mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  Envie sua Mensagem
                </h3>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Nome</Label>
                      <Input placeholder="Seu nome completo" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Empresa</Label>
                    <Input placeholder="Nome da empresa" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Segmento</Label>
                    <Input placeholder="Ex: Financeiro, Saúde, Varejo..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Mensagem</Label>
                    <Textarea placeholder="Descreva seu desafio tecnológico..." rows={5} />
                  </div>
                  <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 font-medium text-sm rounded mt-2 w-full">
                    Enviar Mensagem
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
