"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle, Instagram, Linkedin, Send, CheckCircle2, AlertCircle, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/shared/page-layout";
import { AnimatedSection, PageHero } from "@/components/shared/animations";
import { useSiteData } from "@/hooks/use-site-data";
import { getContentValue } from "@/lib/types";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContatoPage() {
  const { contents } = useSiteData();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
    getContentValue(contents, "site_cnpj") || "11.172.002/0001-84";
  const contactEmail =
    getContentValue(contents, "contact_email") || "contato@cjpnet.com.br";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "fa80c2ce-ec64-4db2-bd19-56f792c784aa");
      formData.append(
        "subject",
        `[CJP NET] ${form.subject || "Novo contato via site"}`
      );

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm(emptyForm);
        setErrorMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão");
    }
  };

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

            {/* ── Coluna esquerda: informações de contato ── */}
            <AnimatedSection>
              <div className="flex flex-col gap-8">
                <div>
                  <h2
                    className="text-2xl font-bold text-cjp-primary mb-4"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
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
                <motion.a
                  href="https://wa.me/5511914922773"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors shrink-0">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant mb-0.5">
                      WhatsApp
                    </div>
                    <span className="text-base font-semibold text-cjp-primary group-hover:text-cjp-accent transition-colors">
                      Falar com um Especialista
                    </span>
                  </div>
                </motion.a>

                {/* E-mail */}
                <motion.a
                  href={`mailto:${contactEmail}`}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cjp-accent/10 text-cjp-accent group-hover:bg-cjp-accent/20 transition-colors shrink-0">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant mb-0.5">
                      E-mail
                    </div>
                    <span className="text-base font-semibold text-cjp-primary group-hover:text-cjp-accent transition-colors">
                      {contactEmail}
                    </span>
                  </div>
                </motion.a>

                {/* Redes sociais */}
                <div>
                  <h3
                    className="text-lg font-bold text-cjp-primary mb-4"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    Redes Sociais
                  </h3>
                  <div className="flex gap-3">
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

                {/* Dados da empresa */}
                <div className="pt-6 border-t border-outline-variant">
                  <p className="text-sm text-on-surface-variant font-medium">
                    {razaoSocial}
                  </p>
                  <p className="text-sm text-on-surface-variant mt-1">
                    CNPJ: {cnpj}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* ── Coluna direita: formulário de e-mail ── */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm">
                <h3
                  className="text-xl font-bold text-cjp-primary mb-1"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  Envie uma Mensagem
                </h3>
                <p className="text-sm text-on-surface-variant mb-7">
                  Preencha o formulário e retornamos em até 1 dia útil.
                </p>

                {/* Sucesso */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Mensagem enviada com sucesso!
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Em breve um especialista entrará em contato.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Erro */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        Não foi possível enviar a mensagem.
                      </p>
                      {errorMessage && (
                        <p className="text-xs text-red-700 font-mono mt-1 break-all">
                          {errorMessage}
                        </p>
                      )}
                      <p className="text-xs text-red-600 mt-0.5">
                        Tente pelo WhatsApp ou envie para{" "}
                        <a
                          href={`mailto:${contactEmail}`}
                          className="underline"
                        >
                          {contactEmail}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Nome + E-mail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-sm font-medium text-cjp-primary">
                        Nome <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                        disabled={status === "loading"}
                        className="h-11"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-cjp-primary">
                        E-mail <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                        disabled={status === "loading"}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Telefone + Assunto */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium text-cjp-primary">
                        Telefone / WhatsApp
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        disabled={status === "loading"}
                        className="h-11"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="subject" className="text-sm font-medium text-cjp-primary">
                        Assunto
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Ex: Quero conhecer as soluções"
                        disabled={status === "loading"}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-sm font-medium text-cjp-primary">
                      Mensagem <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Descreva brevemente seu desafio ou como podemos ajudar..."
                      required
                      disabled={status === "loading"}
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-cjp-accent hover:bg-cjp-accent-light text-white h-12 font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cjp-accent/25 mt-1"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-on-surface-variant text-center">
                    Seus dados são tratados com sigilo e não serão compartilhados.
                  </p>
                </form>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
