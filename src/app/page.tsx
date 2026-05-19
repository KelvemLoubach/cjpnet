"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Cloud,
  GitMerge,
  ShieldCheck,
  Blocks,
  Check,
  ArrowRight,
  Menu,
  X,
  LogIn,
  LogOut,
  Edit3,
  Save,
  Plus,
  Trash2,
  ChevronRight,
  Zap,
  Globe,
  Database,
  Lock,
  Cpu,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAdminStore } from "@/store/admin-store";
import { useToast } from "@/hooks/use-toast";
import type { SiteContent, Service, NavLink, FooterLink } from "@/lib/types";
import { getContentValue, parseCheckItems } from "@/lib/types";

// Icon mapping
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
};

const iconNames = Object.keys(iconMap);

// ==================== SECTION COMPONENTS ====================

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.12 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ==================== NAVIGATION ====================

function Navigation({
  navLinks,
  siteName,
  specialistCta,
  isEditMode,
  onEdit,
}: {
  navLinks: NavLink[];
  siteName: string;
  specialistCta: string;
  isEditMode: boolean;
  onEdit: (section: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-outline-variant"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-4 md:px-10 h-20">
        <div
          className={`text-2xl font-bold text-cjp-primary ${isEditMode ? "edit-mode-highlight" : ""}`}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          onClick={() => isEditMode && onEdit("site_name")}
        >
          {siteName}
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.active
                  ? "text-cjp-primary border-b-2 border-cjp-primary pb-1"
                  : "text-on-surface-variant hover:text-cjp-primary"
              } ${isEditMode ? "edit-mode-highlight" : ""}`}
              onClick={(e) => isEditMode && (e.preventDefault(), onEdit(`nav_${link.id}`))}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          className="hidden md:inline-flex bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-6 font-medium text-sm rounded"
          onClick={() => isEditMode ? onEdit("hero_cta_specialist") : undefined}
        >
          {specialistCta}
        </Button>

        <button className="md:hidden text-cjp-primary" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-outline-variant overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium ${link.active ? "text-cjp-primary" : "text-on-surface-variant"}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-cjp-primary text-on-primary hover:bg-primary-container w-full h-12 font-medium text-sm rounded">
                {specialistCta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ==================== HERO SECTION ====================

function HeroSection({
  tag,
  title,
  description,
  cta,
  isEditMode,
  onEdit,
}: {
  tag: string;
  title: string;
  description: string;
  cta: string;
  isEditMode: boolean;
  onEdit: (section: string) => void;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest via-surface to-primary-fixed/10 gradient-animate" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-fixed-dim rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        <motion.div style={{ opacity: textOpacity }} className="lg:col-span-6 flex flex-col gap-6">
          <AnimatedSection>
            <div
              className={`inline-flex items-center gap-2 border border-outline-variant px-3 py-1.5 rounded-full bg-surface-container-lowest self-start shadow-sm ${
                isEditMode ? "edit-mode-highlight" : ""
              }`}
              onClick={() => isEditMode && onEdit("hero_tag")}
            >
              <span className="w-2 h-2 rounded-full bg-cjp-primary pulse-dot" />
              <span className="text-xs text-on-surface-variant tracking-widest uppercase font-medium">
                {tag}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1
              className={`text-4xl md:text-5xl lg:text-[48px] font-bold text-cjp-primary leading-[1.1] tracking-tight ${
                isEditMode ? "edit-mode-highlight" : ""
              }`}
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              onClick={() => isEditMode && onEdit("hero_title")}
            >
              {title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p
              className={`text-lg text-on-surface-variant leading-relaxed max-w-xl ${
                isEditMode ? "edit-mode-highlight" : ""
              }`}
              onClick={() => isEditMode && onEdit("hero_description")}
            >
              {description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex gap-4 pt-4">
              <Button
                className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 px-8 font-medium text-sm rounded transition-all duration-300 hover:shadow-lg hover:shadow-cjp-primary/20"
                onClick={() => isEditMode ? onEdit("hero_cta") : undefined}
              >
                {cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </motion.div>

        <AnimatedSection delay={0.2} className="lg:col-span-6">
          <motion.div
            style={{ y: imageY }}
            className="h-[300px] lg:h-[500px] rounded-xl border border-outline-variant relative overflow-hidden shadow-2xl"
          >
            <img
              alt="Infraestrutura de servidor corporativo"
              className="absolute inset-0 w-full h-full object-cover"
              src="/hero-image.png"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-cjp-primary/60 via-cjp-primary/20 to-transparent" />
            
            {/* Overlay stats */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <div className="text-white/60 text-xs font-medium">Uptime</div>
                <div className="text-white text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>99.9%</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <div className="text-white/60 text-xs font-medium">Latência</div>
                <div className="text-white text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>&lt;50ms</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <div className="text-white/60 text-xs font-medium">Segurança</div>
                <div className="text-white text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>AES-256</div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ==================== SERVICES SECTION ====================

function ServicesSection({
  title,
  services,
  isEditMode,
  onEdit,
}: {
  title: string;
  services: Service[];
  isEditMode: boolean;
  onEdit: (section: string, id?: string) => void;
}) {
  return (
    <section className="bg-surface-container-low py-20 md:py-32 border-y border-outline-variant relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#001736 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection>
          <div
            className={`mb-12 border-b border-outline-variant pb-4 ${isEditMode ? "edit-mode-highlight" : ""}`}
            onClick={() => isEditMode && onEdit("services_title")}
          >
            <h2
              className="text-3xl md:text-[32px] font-bold text-cjp-primary tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {title}
            </h2>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((service, index) => {
            const checkItems = parseCheckItems(service.checkItems);
            const isLarge = index === 0 || index === 3;
            const isHighlight = service.highlight;

            return (
              <StaggerItem
                key={service.id}
                className={`${isLarge ? "lg:col-span-7" : "lg:col-span-5"} ${
                  isHighlight
                    ? "bg-cjp-primary text-on-primary relative overflow-hidden"
                    : "bg-surface-container-lowest border border-outline-variant"
                } p-8 flex flex-col gap-6 hover:shadow-lg transition-all duration-500 rounded-xl group ${
                  isEditMode ? "edit-mode-highlight" : ""
                }`}
                onClick={() => isEditMode && onEdit("service", service.id)}
              >
                {isHighlight && (
                  <div className="absolute inset-0 opacity-10 pointer-events-none circuit-pattern" />
                )}

                {/* Hover glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  isHighlight
                    ? "bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                    : "bg-gradient-to-r from-primary-fixed/0 via-primary-fixed/5 to-primary-fixed/0"
                }`} />

                <div className={`w-12 h-12 flex items-center justify-center rounded-lg border z-10 ${
                  isHighlight
                    ? "bg-primary-container border-on-primary/20 text-on-primary"
                    : "bg-primary-fixed border-primary-fixed-dim text-cjp-primary"
                }`}>
                  {iconMap[service.icon] || <Cloud className="h-6 w-6" />}
                </div>

                <div className="z-10">
                  <h3
                    className={`text-xl font-bold mb-2 ${isHighlight ? "text-on-primary" : "text-cjp-primary"}`}
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-base leading-relaxed ${isHighlight ? "text-inverse-primary" : "text-on-surface-variant"}`}>
                    {service.description}
                  </p>
                </div>

                {checkItems.length > 0 && (
                  <ul className="mt-auto pt-6 border-t border-outline-variant flex flex-col gap-2 z-10">
                    {checkItems.map((item, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm font-medium ${isHighlight ? "text-on-primary/80" : "text-cjp-secondary"}`}>
                        <Check className="h-4 w-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {service.ctaText && (
                  <div className={`mt-auto pt-6 border-t z-10 ${isHighlight ? "border-on-primary/20" : "border-outline-variant"}`}>
                    <button
                      className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                        isHighlight
                          ? "text-on-primary hover:text-inverse-primary"
                          : "text-cjp-primary hover:text-on-primary-fixed-variant"
                      }`}
                    >
                      {service.ctaText}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </StaggerItem>
            );
          })}

          {/* Add new service button in edit mode */}
          {isEditMode && (
            <StaggerItem className="lg:col-span-12">
              <button
                onClick={() => onEdit("service_new")}
                className="w-full border-2 border-dashed border-outline-variant rounded-xl p-8 flex items-center justify-center gap-2 text-on-surface-variant hover:text-cjp-primary hover:border-cjp-primary transition-colors"
              >
                <Plus className="h-5 w-5" />
                Adicionar Novo Serviço
              </button>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ==================== STATS/METRICS SECTION ====================

function MetricsSection() {
  const metrics = [
    { value: "150+", label: "Projetos Entregues", icon: <Blocks className="h-5 w-5" /> },
    { value: "99.9%", label: "Uptime Garantido", icon: <ShieldCheck className="h-5 w-5" /> },
    { value: "<50ms", label: "Latência Média", icon: <Zap className="h-5 w-5" /> },
    { value: "24/7", label: "Suporte Ativo", icon: <Globe className="h-5 w-5" /> },
  ];

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed/5 via-transparent to-tertiary-fixed/5" />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <StaggerItem key={i} className="text-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-container-low border border-outline-variant hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                  {metric.icon}
                </div>
                <div
                  className="text-3xl md:text-4xl font-bold text-cjp-primary"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-on-surface-variant font-medium">{metric.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ==================== CASES SECTION ====================

function CasesSection() {
  const cases = [
    {
      client: "Banco Institucional",
      segment: "Financeiro",
      result: "Redução de 60% no tempo de processamento de dados",
      description: "Implementação de data lake e pipelines de integração para consolidação de dados de múltiplas fontes legadas.",
    },
    {
      client: "Rede Hospitalar Nacional",
      segment: "Saúde",
      result: "99.97% de uptime no sistema crítico",
      description: "Arquitetura SaaS multi-tenant para gestão de prontuários e integração com sistemas de convênios.",
    },
    {
      client: "Operadora Logística",
      segment: "Indústria",
      result: "3x mais velocidade nas operações",
      description: "Automação de processos e dashboards operacionais em tempo real para rastreamento de frota.",
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-28 bg-cjp-primary relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-inverse-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-on-primary/20 px-3 py-1.5 rounded-full bg-on-primary/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-inverse-primary pulse-dot" />
            <span className="text-xs text-inverse-primary tracking-widest uppercase font-medium">
              Cases de Sucesso
            </span>
          </div>
          <h2
            className="text-3xl md:text-[32px] font-bold text-on-primary mb-4 tracking-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Resultados que Falam por Si
          </h2>
          <p className="text-inverse-primary text-lg max-w-2xl mx-auto">
            Conheça alguns dos projetos onde nossa engenharia fez a diferença.
          </p>
        </AnimatedSection>

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
                <h3
                  className="text-xl font-bold text-on-primary mb-3"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {caseItem.client}
                </h3>
                <p className="text-inverse-primary/80 text-sm leading-relaxed mb-6 flex-1">
                  {caseItem.description}
                </p>
                <div className="pt-4 border-t border-on-primary/20">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-inverse-primary" />
                    <span className="text-sm font-medium text-on-primary">{caseItem.result}</span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ==================== ABOUT / SEGMENTOS SECTION ====================

function AboutSection() {
  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Segurança Primeiro",
      description: "Proteção de dados com criptografia de ponta e conformidade com LGPD.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Alta Performance",
      description: "Infraestrutura otimizada para operações críticas com latência mínima.",
    },
    {
      icon: <Blocks className="h-6 w-6" />,
      title: "Escalabilidade",
      description: "Arquitetura preparada para crescer com seu negócio sem perda de eficiência.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Conectividade",
      description: "Integração nativa com APIs modernas e sistemas legados.",
    },
  ];

  return (
    <section id="sobre" className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <AnimatedSection className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1.5 rounded-full bg-surface-container-low mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cjp-primary pulse-dot" />
                <span className="text-xs text-on-surface-variant tracking-widest uppercase font-medium">
                  Sobre Nós
                </span>
              </div>
              <h2
                className="text-3xl md:text-[32px] font-bold text-cjp-primary mb-6 tracking-tight"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Engenharia com Precisão Institucional
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
            </div>
          </AnimatedSection>

          <StaggerContainer className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <h3
                    className="text-lg font-bold text-cjp-primary mb-2"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

// ==================== CLIENTS / SEGMENTOS SECTION ====================

function SegmentosSection() {
  const segments = [
    { name: "Financeiro", description: "Bancos, fintechs e seguradoras" },
    { name: "Saúde", description: "Hospitais e operadoras de planos" },
    { name: "Varejo", description: "E-commerce e redes de lojas" },
    { name: "Indústria", description: "Manufatura e logística" },
    { name: "Governo", description: "Órgãos públicos e estatais" },
    { name: "Energia", description: "Petróleo, gás e renováveis" },
  ];

  return (
    <section id="segmentos" className="py-20 md:py-28 bg-surface-container relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#001736 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1.5 rounded-full bg-surface-container-lowest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cjp-primary pulse-dot" />
            <span className="text-xs text-on-surface-variant tracking-widest uppercase font-medium">
              Segmentos
            </span>
          </div>
          <h2
            className="text-3xl md:text-[32px] font-bold text-cjp-primary mb-4 tracking-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Atuação por Segmento
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Soluções desenhadas para as particularidades de cada indústria, com expertise comprovada em setores de alta criticidade.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {segments.map((segment, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-xl border border-outline-variant bg-surface-container-lowest text-center hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cjp-primary text-on-primary mx-auto mb-3">
                  <span className="text-lg font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="text-base font-bold text-cjp-primary mb-1"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {segment.name}
                </h3>
                <p className="text-xs text-on-surface-variant">{segment.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ==================== CONTACT SECTION ====================

function ContactSection({ isEditMode, onEdit }: { isEditMode: boolean; onEdit: (section: string) => void }) {
  return (
    <section id="contato" className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1.5 rounded-full bg-surface-container-low mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cjp-primary pulse-dot" />
              <span className="text-xs text-on-surface-variant tracking-widest uppercase font-medium">
                Contato
              </span>
            </div>
            <h2
              className="text-3xl md:text-[32px] font-bold text-cjp-primary mb-6 tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Fale com Nossos Engenheiros
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              Estamos prontos para entender seu desafio tecnológico e estruturar a solução ideal. 
              Entre em contato e agende uma conversa técnica com nossa equipe.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant">Website</div>
                  <div className="text-sm font-medium text-cjp-primary">www.cjpnet.com.br</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-fixed text-cjp-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant">Email</div>
                  <div className="text-sm font-medium text-cjp-primary">contato@cjpnet.com.br</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-8">
              <h3
                className="text-xl font-bold text-cjp-primary mb-6"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Envie sua Mensagem
              </h3>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <Label>Nome</Label>
                  <Input placeholder="Seu nome completo" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Empresa</Label>
                  <Input placeholder="Nome da empresa" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Mensagem</Label>
                  <Textarea placeholder="Descreva seu desafio tecnológico..." rows={4} />
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
  );
}

// ==================== CTA SECTION ====================

function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="bg-cjp-primary rounded-2xl p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 circuit-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-inverse-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex-1">
                <h2
                  className="text-3xl md:text-[32px] font-bold text-on-primary mb-4"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  Pronto para transformar sua infraestrutura?
                </h2>
                <p className="text-inverse-primary text-lg max-w-xl">
                  Fale com nossos engenheiros e descubra como podemos estruturar a base tecnológica para o crescimento seguro da sua corporação.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-on-primary text-cjp-primary hover:bg-inverse-primary h-12 px-8 font-medium text-sm rounded transition-all duration-300 hover:shadow-lg">
                  Falar com Especialista
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================

function Footer({
  siteName,
  footerLinks,
  copyright,
  isEditMode,
  onEdit,
}: {
  siteName: string;
  footerLinks: FooterLink[];
  copyright: string;
  isEditMode: boolean;
  onEdit: (section: string, id?: string) => void;
}) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-16 md:py-20 px-4 md:px-10">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col items-center gap-8">
        <div
          className={`text-2xl font-bold text-cjp-primary ${isEditMode ? "edit-mode-highlight" : ""}`}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          onClick={() => isEditMode && onEdit("site_name")}
        >
          {siteName}
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium text-on-surface-variant hover:text-cjp-primary transition-colors ${
                isEditMode ? "edit-mode-highlight" : ""
              }`}
              onClick={(e) => isEditMode && (e.preventDefault(), onEdit(`footer_${link.id}`))}
            >
              {link.label}
            </a>
          ))}
          {isEditMode && (
            <button
              onClick={() => onEdit("footer_new")}
              className="text-sm font-medium text-on-surface-variant hover:text-cjp-primary transition-colors flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> Adicionar Link
            </button>
          )}
        </nav>

        <Separator className="max-w-xl" />

        <div
          className={`text-sm text-on-surface text-center ${isEditMode ? "edit-mode-highlight" : ""}`}
          onClick={() => isEditMode && onEdit("footer_copyright")}
        >
          {copyright}
        </div>
      </div>
    </footer>
  );
}

// ==================== ADMIN COMPONENTS ====================

function LoginDialog() {
  const { showLoginDialog, setShowLoginDialog, login } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        login();
        toast({ title: "Login realizado com sucesso!", description: "Modo de edição ativado. Clique em 'Editar' para começar." });
      } else {
        setError(data.error || "Email ou senha inválidos");
      }
    } catch {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Acesso Administrativo
          </DialogTitle>
          <DialogDescription>
            Faça login para editar o conteúdo do site.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cjpnet.com.br"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button onClick={handleLogin} disabled={loading} className="bg-cjp-primary text-on-primary hover:bg-primary-container">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AdminToolbar() {
  const { isLoggedIn, isEditMode, toggleEditMode, logout, setShowLoginDialog } = useAdminStore();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2"
    >
      {isLoggedIn && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 bg-cjp-primary text-on-primary rounded-full shadow-xl px-4 py-2"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleEditMode}
            className={`text-on-primary hover:bg-on-primary/10 ${isEditMode ? "bg-on-primary/20" : ""}`}
          >
            <Edit3 className="h-4 w-4 mr-1" />
            {isEditMode ? "Editando" : "Editar"}
          </Button>
          <Separator orientation="vertical" className="h-6 bg-on-primary/20" />
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-on-primary hover:bg-on-primary/10"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </motion.div>
      )}

      {!isLoggedIn && (
        <Button
          onClick={() => setShowLoginDialog(true)}
          className="bg-cjp-primary text-on-primary hover:bg-primary-container rounded-full shadow-xl h-12 px-6"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Admin
        </Button>
      )}

      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-amber-500 text-white rounded-full px-4 py-2 text-xs font-medium shadow-lg"
        >
          Modo Edição Ativo
        </motion.div>
      )}
    </motion.div>
  );
}

// ==================== EDIT DIALOGS ====================

function EditContentDialog({
  editingKey,
  contents,
  onClose,
  onSave,
}: {
  editingKey: string | null;
  contents: SiteContent[];
  onClose: () => void;
  onSave: (key: string, value: string) => void;
}) {
  const contentValue = editingKey ? (contents.find((c) => c.key === editingKey)?.value || "") : "";
  const [value, setValue] = useState(contentValue);

  // Reset value when editingKey changes
  if (editingKey && value !== contentValue && value === "") {
    setValue(contentValue);
  }

  if (!editingKey) return null;

  const isLongText = value.length > 100;

  return (
    <Dialog open={!!editingKey} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Editar: {editingKey}
          </DialogTitle>
          <DialogDescription>
            Altere o conteúdo abaixo e salve para atualizar o site.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLongText ? (
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={6}
              className="resize-none"
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => onSave(editingKey, value)}
            className="bg-cjp-primary text-on-primary hover:bg-primary-container"
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditServiceDialog({
  service,
  isOpen,
  onClose,
  onSave,
  isNew,
}: {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Partial<Service> & { id?: string }) => void;
  isNew?: boolean;
}) {
  const defaultForm = {
    title: "",
    description: "",
    icon: "cloud",
    highlight: false,
    ctaText: "",
    sortOrder: 0,
    checkItems: [] as string[],
  };
  const serviceForm = service ? {
    title: service.title,
    description: service.description,
    icon: service.icon,
    highlight: service.highlight,
    ctaText: service.ctaText || "",
    sortOrder: service.sortOrder,
    checkItems: parseCheckItems(service.checkItems),
  } : defaultForm;
  const [form, setForm] = useState(serviceForm);
  const [prevService, setPrevService] = useState(service);

  if (service !== prevService) {
    setPrevService(service);
    setForm(service ? serviceForm : defaultForm);
  }

  const [newCheckItem, setNewCheckItem] = useState("");

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            {isNew ? "Novo Serviço" : `Editar: ${service?.title}`}
          </DialogTitle>
          <DialogDescription>
            {isNew ? "Preencha os dados do novo serviço." : "Altere os dados do serviço abaixo."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Título</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Descrição</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Ícone</Label>
            <div className="grid grid-cols-5 gap-2">
              {iconNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setForm({ ...form, icon: name })}
                  className={`p-3 rounded-lg border flex items-center justify-center transition-colors ${
                    form.icon === name
                      ? "border-cjp-primary bg-primary-fixed text-cjp-primary"
                      : "border-outline-variant hover:border-cjp-primary"
                  }`}
                >
                  {iconMap[name]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Texto do CTA (deixe vazio se não houver)</Label>
            <Input
              value={form.ctaText}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
              placeholder="Ex: Iniciar Projeto"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="highlight"
              checked={form.highlight}
              onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="highlight">Destaque (fundo escuro)</Label>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Itens de Checklist</Label>
            {form.checkItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const items = [...form.checkItems];
                    items[i] = e.target.value;
                    setForm({ ...form, checkItems: items });
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const items = form.checkItems.filter((_, idx) => idx !== i);
                    setForm({ ...form, checkItems: items });
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newCheckItem}
                onChange={(e) => setNewCheckItem(e.target.value)}
                placeholder="Novo item..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newCheckItem) {
                    setForm({ ...form, checkItems: [...form.checkItems, newCheckItem] });
                    setNewCheckItem("");
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (newCheckItem) {
                    setForm({ ...form, checkItems: [...form.checkItems, newCheckItem] });
                    setNewCheckItem("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Ordem</Label>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() =>
              onSave({
                ...(service?.id && { id: service.id }),
                ...form,
              })
            }
            className="bg-cjp-primary text-on-primary hover:bg-primary-container"
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditNavOrFooterDialog({
  isOpen,
  onClose,
  onSave,
  initialLabel,
  initialHref,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (label: string, href: string) => void;
  initialLabel?: string;
  initialHref?: string;
  title: string;
}) {
  const [label, setLabel] = useState(initialLabel || "");
  const [href, setHref] = useState(initialHref || "");
  const [prevLabel, setPrevLabel] = useState(initialLabel);
  const [prevHref, setPrevHref] = useState(initialHref);

  if (initialLabel !== prevLabel || initialHref !== prevHref) {
    setPrevLabel(initialLabel);
    setPrevHref(initialHref);
    setLabel(initialLabel || "");
    setHref(initialHref || "");
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</DialogTitle>
          <DialogDescription>Altere os dados do link abaixo.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Texto</Label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Link (href)</Label>
            <Input value={href} onChange={(e) => setHref(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => onSave(label, href)}
            className="bg-cjp-primary text-on-primary hover:bg-primary-container"
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==================== MAIN PAGE ====================

export default function HomePage() {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isNewService, setIsNewService] = useState(false);
  const [editingNavLink, setEditingNavLink] = useState<{ id: string; label: string; href: string } | null>(null);
  const [editingFooterLink, setEditingFooterLink] = useState<{ id: string; label: string; href: string } | null>(null);
  const [isNavEditOpen, setIsNavEditOpen] = useState(false);
  const [isFooterEditOpen, setIsFooterEditOpen] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);

  const { isLoggedIn, isEditMode, setShowLoginDialog } = useAdminStore();
  const { toast } = useToast();

  // Fetch all data
  const fetchData = async () => {
    try {
      const [contentRes, servicesRes, navRes, footerRes] = await Promise.all([
        fetch("/api/content"),
        fetch("/api/services"),
        fetch("/api/navigation"),
        fetch("/api/footer"),
      ]);

      if (!contentRes.ok) {
        // Data might not be seeded yet
        const seedRes = await fetch("/api/seed", { method: "POST" });
        if (seedRes.ok) {
          setIsSeeded(true);
          fetchData();
          return;
        }
      }

      const [contentData, servicesData, navData, footerData] = await Promise.all([
        contentRes.json(),
        servicesRes.json(),
        navRes.json(),
        footerRes.json(),
      ]);

      setContents(contentData);
      setServices(servicesData);
      setNavLinks(navData);
      setFooterLinks(footerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Seed if no data
  useEffect(() => {
    if (!loading && contents.length === 0 && !isSeeded) {
      fetch("/api/seed", { method: "POST" })
        .then((res) => res.json())
        .then(() => {
          setIsSeeded(true);
          fetchData();
        })
        .catch(console.error);
    }
  }, [loading, contents.length, isSeeded]);

  // Handle edit clicks
  const handleEdit = (section: string, id?: string) => {
    if (!isEditMode) return;

    if (section === "service" && id) {
      const service = services.find((s) => s.id === id);
      if (service) {
        setEditingService(service);
        setIsNewService(false);
      }
    } else if (section === "service_new") {
      setEditingService(null);
      setIsNewService(true);
    } else if (section.startsWith("nav_")) {
      const link = navLinks.find((l) => l.id === section.replace("nav_", ""));
      if (link) {
        setEditingNavLink({ id: link.id, label: link.label, href: link.href });
        setIsNavEditOpen(true);
      }
    } else if (section.startsWith("footer_")) {
      const linkId = section.replace("footer_", "");
      if (linkId === "new") {
        setEditingFooterLink({ id: "", label: "", href: "#" });
        setIsFooterEditOpen(true);
      } else {
        const link = footerLinks.find((l) => l.id === linkId);
        if (link) {
          setEditingFooterLink({ id: link.id, label: link.label, href: link.href });
          setIsFooterEditOpen(true);
        }
      }
    } else {
      setEditingKey(section);
    }
  };

  // Save content
  const handleSaveContent = async (key: string, value: string) => {
    try {
      await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      setEditingKey(null);
      fetchData();
      toast({ title: "Conteúdo atualizado!", description: `"${key}" foi salvo com sucesso.` });
    } catch {
      toast({ title: "Erro ao salvar", description: "Tente novamente.", variant: "destructive" });
    }
  };

  // Save service
  const handleSaveService = async (serviceData: Partial<Service> & { id?: string }) => {
    try {
      const url = isNewService ? "/api/services" : "/api/services";
      const method = isNewService ? "POST" : "PUT";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      setEditingService(null);
      setIsNewService(false);
      fetchData();
      toast({ title: "Serviço salvo!", description: isNewService ? "Novo serviço criado." : "Serviço atualizado." });
    } catch {
      toast({ title: "Erro ao salvar", description: "Tente novamente.", variant: "destructive" });
    }
  };

  // Save nav link
  const handleSaveNavLink = async (label: string, href: string) => {
    if (!editingNavLink) return;
    try {
      await fetch("/api/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingNavLink.id, label, href }),
      });
      setIsNavEditOpen(false);
      setEditingNavLink(null);
      fetchData();
      toast({ title: "Link atualizado!" });
    } catch {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    }
  };

  // Save footer link
  const handleSaveFooterLink = async (label: string, href: string) => {
    if (!editingFooterLink) return;
    try {
      const method = editingFooterLink.id ? "PUT" : "POST";
      const body = editingFooterLink.id
        ? { id: editingFooterLink.id, label, href }
        : { label, href };

      await fetch("/api/footer", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsFooterEditOpen(false);
      setEditingFooterLink(null);
      fetchData();
      toast({ title: "Link atualizado!" });
    } catch {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    }
  };

  // Get content values
  const siteName = getContentValue(contents, "site_name") || "CJP NET";
  const heroTag = getContentValue(contents, "hero_tag") || "Arquitetura Corporativa";
  const heroTitle = getContentValue(contents, "hero_title") || "Engenharia de Dados e Soluções Escaláveis";
  const heroDesc = getContentValue(contents, "hero_description") || "";
  const heroCta = getContentValue(contents, "hero_cta") || "Conhecer Portfólio";
  const specialistCta = getContentValue(contents, "hero_cta_specialist") || "Falar com um Especialista";
  const servicesTitle = getContentValue(contents, "services_title") || "Core Capabilities";
  const footerCopyright = getContentValue(contents, "footer_copyright") || "© 2024 CJP NET";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-cjp-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-background antialiased">
      <Navigation
        navLinks={navLinks}
        siteName={siteName}
        specialistCta={specialistCta}
        isEditMode={isEditMode}
        onEdit={handleEdit}
      />

      <main className="flex-grow pt-20">
        <HeroSection
          tag={heroTag}
          title={heroTitle}
          description={heroDesc}
          cta={heroCta}
          isEditMode={isEditMode}
          onEdit={handleEdit}
        />

        <ServicesSection
          title={servicesTitle}
          services={services}
          isEditMode={isEditMode}
          onEdit={handleEdit}
        />

        <MetricsSection />

        <CasesSection />

        <AboutSection />

        <SegmentosSection />

        <ContactSection isEditMode={isEditMode} onEdit={handleEdit} />

        <CTASection />
      </main>

      <Footer
        siteName={siteName}
        footerLinks={footerLinks}
        copyright={footerCopyright}
        isEditMode={isEditMode}
        onEdit={handleEdit}
      />

      {/* Admin Components */}
      <AdminToolbar />
      <LoginDialog />

      {/* Edit Dialogs */}
      <EditContentDialog
        editingKey={editingKey}
        contents={contents}
        onClose={() => setEditingKey(null)}
        onSave={handleSaveContent}
      />

      <EditServiceDialog
        service={editingService}
        isOpen={!!editingService || isNewService}
        onClose={() => {
          setEditingService(null);
          setIsNewService(false);
        }}
        onSave={handleSaveService}
        isNew={isNewService}
      />

      <EditNavOrFooterDialog
        isOpen={isNavEditOpen}
        onClose={() => {
          setIsNavEditOpen(false);
          setEditingNavLink(null);
        }}
        onSave={handleSaveNavLink}
        initialLabel={editingNavLink?.label}
        initialHref={editingNavLink?.href}
        title="Editar Link de Navegação"
      />

      <EditNavOrFooterDialog
        isOpen={isFooterEditOpen}
        onClose={() => {
          setIsFooterEditOpen(false);
          setEditingFooterLink(null);
        }}
        onSave={handleSaveFooterLink}
        initialLabel={editingFooterLink?.label}
        initialHref={editingFooterLink?.href}
        title={editingFooterLink?.id ? "Editar Link do Footer" : "Novo Link do Footer"}
      />
    </div>
  );
}
