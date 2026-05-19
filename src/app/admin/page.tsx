"use client";

import { useState, useSyncExternalStore, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Save, Plus, Trash2, Edit3, ImageIcon, ExternalLink, X,
  Cloud, GitMerge, ShieldCheck, Blocks, Zap, Globe, Database, Lock, Cpu, BarChart3,
  LayoutDashboard, FileText, Settings, ArrowLeft, Target, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { SiteContent, Service, Segment, CaseStudy, NavLink, FooterLink } from "@/lib/types";
import { getContentValue, parseCheckItems, parseApplications, parseHighlights } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  cloud: <Cloud className="h-5 w-5" />,
  "git-merge": <GitMerge className="h-5 w-5" />,
  "shield-check": <ShieldCheck className="h-5 w-5" />,
  blocks: <Blocks className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  lock: <Lock className="h-5 w-5" />,
  cpu: <Cpu className="h-5 w-5" />,
  "bar-chart": <BarChart3 className="h-5 w-5" />,
};
const iconNames = Object.keys(iconMap);

type AdminTab = "conteudo" | "imagens" | "servicos" | "segmentos" | "cases" | "navegacao" | "footer";

// ==================== LOGIN SCREEN ====================
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
        onLogin();
      } else {
        setError(data.error || "Credenciais inválidas");
      }
    } catch {
      setError("Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-container-lowest via-surface to-primary-fixed/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="CJP NET" className="h-10 mx-auto mb-4" />
          <p className="text-on-surface-variant">Painel Administrativo</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-lg">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cjpnet.com.br"
                required
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
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="bg-cjp-primary text-on-primary hover:bg-primary-container h-12 mt-2"
            >
              {loading ? "Entrando..." : "Entrar no Painel"}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-on-surface-variant hover:text-cjp-primary transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== ADMIN DASHBOARD ====================
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>("conteudo");
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const { toast } = useToast();

  // Fetch data on mount
  const fetchDataRef = useRef<Promise<void> | null>(null);
  if (fetchDataRef.current == null) {
    fetchDataRef.current = (async () => {
      try {
        const [contentRes, servicesRes, segmentsRes, casesRes, navRes, footerRes] = await Promise.all([
          fetch("/api/content"), fetch("/api/services"), fetch("/api/segments"), fetch("/api/cases"), fetch("/api/navigation"), fetch("/api/footer"),
        ]);
        const [contentData, servicesData, segmentsData, casesData, navData, footerData] = await Promise.all([
          contentRes.json(), servicesRes.json(), segmentsRes.json(), casesRes.json(), navRes.json(), footerRes.json(),
        ]);
        setContents(contentData);
        setServices(servicesData);
        setSegments(segmentsData);
        setCases(casesData);
        setNavLinks(navData);
        setFooterLinks(footerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }

  const fetchDataCb = useCallback(async () => {
    try {
      const [contentRes, servicesRes, segmentsRes, casesRes, navRes, footerRes] = await Promise.all([
        fetch("/api/content"), fetch("/api/services"), fetch("/api/segments"), fetch("/api/cases"), fetch("/api/navigation"), fetch("/api/footer"),
      ]);
      const [contentData, servicesData, segmentsData, casesData, navData, footerData] = await Promise.all([
        contentRes.json(), servicesRes.json(), segmentsRes.json(), casesRes.json(), navRes.json(), footerRes.json(),
      ]);
      setContents(contentData);
      setServices(servicesData);
      setSegments(segmentsData);
      setCases(casesData);
      setNavLinks(navData);
      setFooterLinks(footerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Content handlers
  const updateContent = async (key: string, value: string) => {
    const isImage = key.startsWith("img_");
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        value,
        ...(isImage ? { type: "image", group: "imagens" } : {}),
      }),
    });
    fetchDataCb();
    toast({ title: isImage ? "Imagem atualizada!" : "Conteúdo atualizado!", description: `"${key}" salvo com sucesso.` });
  };

  // Service handlers
  const updateService = async (data: Partial<Service> & { id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchDataCb();
    toast({ title: "Serviço salvo!" });
  };

  const deleteService = async (id: string) => {
    if (!confirm("Deseja realmente excluir este serviço?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    fetchDataCb();
    toast({ title: "Serviço excluído." });
  };

  // Segment handlers
  const updateSegment = async (data: Partial<Segment> & { id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/segments", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchDataCb();
    toast({ title: "Segmento salvo!" });
  };

  const deleteSegment = async (id: string) => {
    if (!confirm("Deseja realmente excluir este segmento?")) return;
    await fetch(`/api/segments?id=${id}`, { method: "DELETE" });
    fetchDataCb();
    toast({ title: "Segmento excluído." });
  };

  // Case handlers
  const updateCase = async (data: Partial<CaseStudy> & { id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/cases", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchDataCb();
    toast({ title: "Case salvo!" });
  };

  const deleteCase = async (id: string) => {
    if (!confirm("Deseja realmente excluir este case?")) return;
    await fetch(`/api/cases?id=${id}`, { method: "DELETE" });
    fetchDataCb();
    toast({ title: "Case excluído." });
  };

  // Nav handlers
  const updateNavLink = async (data: Partial<NavLink> & { id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/navigation", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchDataCb();
    toast({ title: "Link de navegação salvo!" });
  };

  const deleteNavLink = async (id: string) => {
    if (!confirm("Deseja realmente excluir este link?")) return;
    await fetch(`/api/navigation?id=${id}`, { method: "DELETE" });
    fetchDataCb();
    toast({ title: "Link excluído." });
  };

  // Footer handlers
  const updateFooterLink = async (data: Partial<FooterLink> & { id?: string }) => {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/footer", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchDataCb();
    toast({ title: "Link do footer salvo!" });
  };

  const deleteFooterLink = async (id: string) => {
    if (!confirm("Deseja realmente excluir este link?")) return;
    await fetch(`/api/footer?id=${id}`, { method: "DELETE" });
    fetchDataCb();
    toast({ title: "Link excluído." });
  };

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: "conteudo", label: "Conteúdo", icon: <FileText className="h-4 w-4" /> },
    { key: "imagens", label: "Imagens", icon: <ImageIcon className="h-4 w-4" /> },
    { key: "servicos", label: "Soluções", icon: <Blocks className="h-4 w-4" /> },
    { key: "segmentos", label: "Segmentos", icon: <Target className="h-4 w-4" /> },
    { key: "cases", label: "Cases", icon: <Briefcase className="h-4 w-4" /> },
    { key: "navegacao", label: "Navegação", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "footer", label: "Footer", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-cjp-primary text-on-primary flex flex-col shrink-0">
        <div className="p-6 border-b border-on-primary/20">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="CJP NET" className="h-7 brightness-0 invert" />
          </a>
          <p className="text-inverse-primary text-xs mt-2">Painel Administrativo</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-on-primary/20 text-on-primary"
                  : "text-inverse-primary hover:bg-on-primary/10 hover:text-on-primary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-on-primary/20">
          <a href="/" className="text-inverse-primary hover:text-on-primary text-sm flex items-center gap-2 mb-3 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Ver Site
          </a>
          <button
            onClick={onLogout}
            className="text-inverse-primary hover:text-on-primary text-sm flex items-center gap-2 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === "conteudo" && (
              <ContentTab key="conteudo" contents={contents} onUpdate={updateContent} />
            )}
            {activeTab === "imagens" && (
              <ImagesTab key="imagens" contents={contents} onUpdate={updateContent} />
            )}
            {activeTab === "servicos" && (
              <ServicesTab key="servicos" services={services} onUpdate={updateService} onDelete={deleteService} />
            )}
            {activeTab === "segmentos" && (
              <SegmentsTab key="segmentos" segments={segments} onUpdate={updateSegment} onDelete={deleteSegment} />
            )}
            {activeTab === "cases" && (
              <CasesTab key="cases" cases={cases} onUpdate={updateCase} onDelete={deleteCase} />
            )}
            {activeTab === "navegacao" && (
              <NavTab key="navegacao" navLinks={navLinks} onUpdate={updateNavLink} onDelete={deleteNavLink} />
            )}
            {activeTab === "footer" && (
              <FooterTab key="footer" footerLinks={footerLinks} onUpdate={updateFooterLink} onDelete={deleteFooterLink} contents={contents} onContentUpdate={updateContent} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ==================== IMAGES TAB ====================
const predefinedImageSlots = [
  { key: "img_logo", label: "Logo do Site", description: "Logo principal exibido na navbar e footer" },
  { key: "img_favicon", label: "Favicon", description: "Ícone exibido na aba do navegador" },
  { key: "img_og_image", label: "OG Image (Compartilhamento)", description: "Imagem exibida ao compartilhar o site em redes sociais" },
  { key: "img_hero_bg", label: "Hero Background", description: "Imagem de fundo da seção hero (opcional)" },
  { key: "img_gallery_1", label: "Galeria - Imagem 1", description: "Dashboards Estratégicos" },
  { key: "img_gallery_2", label: "Galeria - Imagem 2", description: "Integração de Dados" },
  { key: "img_gallery_3", label: "Galeria - Imagem 3", description: "Infraestrutura Própria" },
  { key: "img_gallery_4", label: "Galeria - Imagem 4", description: "Equipe Especializada" },
  { key: "img_gallery_5", label: "Galeria - Imagem 5", description: "Plataformas SaaS" },
  { key: "img_gallery_6", label: "Galeria - Imagem 6", description: "Segurança e Confiabilidade" },
  { key: "img_about_joao", label: "Sobre - Foto do Fundador", description: "Foto de João Pessolato para a página Sobre" },
  { key: "img_about_team", label: "Sobre - Foto da Equipe", description: "Foto da equipe para a página Sobre" },
];

function ImagesTab({ contents, onUpdate }: { contents: SiteContent[]; onUpdate: (key: string, value: string) => void }) {
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [newImageKey, setNewImageKey] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [previewErrors, setPreviewErrors] = useState<Record<string, boolean>>({});

  const getImageValue = (key: string): string => {
    return contents.find((c) => c.key === key)?.value || "";
  };

  const getEditValue = (key: string): string => {
    return editValues[key] ?? getImageValue(key);
  };

  const handleSave = (key: string) => {
    const value = getEditValue(key);
    onUpdate(key, value);
    setEditValues((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleClear = (key: string) => {
    onUpdate(key, "");
    setEditValues((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleAddNew = () => {
    if (!newImageKey.trim() || !newImageUrl.trim()) return;
    const key = newImageKey.startsWith("img_") ? newImageKey : `img_${newImageKey}`;
    onUpdate(key, newImageUrl);
    setNewImageKey("");
    setNewImageUrl("");
  };

  // Find custom image entries (not in predefined list)
  const predefinedKeys = new Set(predefinedImageSlots.map((s) => s.key));
  const customImages = contents.filter(
    (c) => (c.type === "image" || c.key.startsWith("img_")) && !predefinedKeys.has(c.key)
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cjp-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Gerenciar Imagens
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Cole as URLs públicas das imagens para cada posição do site
          </p>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-cjp-accent/[0.06] border border-cjp-accent/15 rounded-xl p-4 mb-8 flex items-start gap-3">
        <ImageIcon className="h-5 w-5 text-cjp-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-cjp-primary mb-1">Como funciona</p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Cole a URL pública de uma imagem (ex: <code className="bg-black/5 px-1 rounded text-[11px]">https://exemplo.com/imagem.png</code>) em cada campo.
            As imagens serão exibidas automaticamente no site. Use serviços como Imgur, Cloudinary, ou qualquer CDN de imagens.
          </p>
        </div>
      </div>

      {/* Predefined image slots */}
      <div className="flex flex-col gap-4 mb-10">
        {predefinedImageSlots.map((slot) => {
          const currentValue = getEditValue(slot.key);
          const savedValue = getImageValue(slot.key);
          const hasChanges = editValues[slot.key] !== undefined && editValues[slot.key] !== savedValue;

          return (
            <div
              key={slot.key}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-cjp-primary/20 transition-colors"
            >
              <div className="flex items-start gap-5">
                {/* Preview */}
                <div className="w-24 h-24 rounded-lg bg-surface-container border border-outline-variant/50 flex items-center justify-center overflow-hidden shrink-0">
                  {currentValue && !previewErrors[slot.key] ? (
                    <img
                      src={currentValue}
                      alt={slot.label}
                      className="w-full h-full object-cover"
                      onError={() => setPreviewErrors((prev) => ({ ...prev, [slot.key]: true }))}
                      onLoad={() => setPreviewErrors((prev) => ({ ...prev, [slot.key]: false }))}
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-outline-variant" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-cjp-primary">{slot.label}</h4>
                    <span className="text-[10px] font-mono text-on-surface-variant/50 bg-surface-container px-1.5 py-0.5 rounded">
                      {slot.key}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">{slot.description}</p>

                  <div className="flex gap-2">
                    <Input
                      value={currentValue}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, [slot.key]: e.target.value }))
                      }
                      placeholder="Cole a URL pública da imagem aqui..."
                      className="text-sm h-9"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSave(slot.key)}
                      disabled={!hasChanges && !!savedValue}
                      className="bg-cjp-primary text-on-primary h-9 px-3 shrink-0"
                    >
                      <Save className="h-3.5 w-3.5 mr-1" />
                      Salvar
                    </Button>
                    {savedValue && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClear(slot.key)}
                        className="h-9 px-3 shrink-0 text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  {savedValue && (
                    <a
                      href={savedValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cjp-accent hover:text-cjp-accent-light inline-flex items-center gap-1 mt-2 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Abrir imagem em nova aba
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom images section */}
      {customImages.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-on-surface-variant mb-4 uppercase tracking-wider text-sm">
            Imagens Personalizadas
          </h3>
          <div className="flex flex-col gap-3">
            {customImages.map((item) => {
              const currentValue = getEditValue(item.key);
              const hasChanges = editValues[item.key] !== undefined && editValues[item.key] !== item.value;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-cjp-primary/20 transition-colors"
                >
                  {/* Mini preview */}
                  <div className="w-14 h-14 rounded-lg bg-surface-container border border-outline-variant/50 flex items-center justify-center overflow-hidden shrink-0">
                    {currentValue && !previewErrors[item.key] ? (
                      <img
                        src={currentValue}
                        alt={item.key}
                        className="w-full h-full object-cover"
                        onError={() => setPreviewErrors((prev) => ({ ...prev, [item.key]: true }))}
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-outline-variant" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-on-surface-variant font-mono mb-1">{item.key}</div>
                    <Input
                      value={currentValue}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, [item.key]: e.target.value }))
                      }
                      placeholder="URL da imagem..."
                      className="text-sm h-8"
                    />
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <Button size="sm" onClick={() => handleSave(item.key)} disabled={!hasChanges} className="bg-cjp-primary text-on-primary h-8">
                      <Save className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleClear(item.key)} className="h-8 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add new image */}
      <Separator className="my-6" />
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
        <h3 className="text-sm font-bold text-cjp-primary mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Nova Imagem
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3">
          <div>
            <Label className="text-xs mb-1">Chave (identificador)</Label>
            <Input
              value={newImageKey}
              onChange={(e) => setNewImageKey(e.target.value)}
              placeholder="ex: banner_promocional"
              className="text-sm h-9"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">URL da Imagem</Label>
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.png"
                className="text-sm h-9"
              />
              <Button
                onClick={handleAddNew}
                disabled={!newImageKey.trim() || !newImageUrl.trim()}
                className="bg-cjp-primary text-on-primary h-9 px-4 shrink-0"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        {newImageUrl && (
          <div className="mt-4 flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-surface-container border border-outline-variant/50 overflow-hidden">
              <img
                src={newImageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            </div>
            <span className="text-xs text-on-surface-variant">Preview da nova imagem</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== CONTENT TAB ====================
function ContentTab({ contents, onUpdate }: { contents: SiteContent[]; onUpdate: (key: string, value: string) => void }) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const grouped = contents.reduce<Record<string, SiteContent[]>>((acc, c) => {
    const group = c.group || "geral";
    if (!acc[group]) acc[group] = [];
    acc[group].push(c);
    return acc;
  }, {});

  const groupLabels: Record<string, string> = {
    general: "Geral",
    hero: "Seção Hero",
    services: "Soluções",
    sobre: "Sobre",
    solucoes: "Soluções",
    conteudo: "Conteúdo",
    footer: "Footer",
    geral: "Geral",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-cjp-primary mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
        Gerenciar Conteúdo
      </h2>

      {editingKey ? (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-cjp-primary mb-4">Editando: {editingKey}</h3>
          {editValue.length > 100 ? (
            <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={6} className="mb-4" />
          ) : (
            <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="mb-4" />
          )}
          <div className="flex gap-2">
            <Button onClick={() => onUpdate(editingKey, editValue)} className="bg-cjp-primary text-on-primary">
              <Save className="h-4 w-4 mr-1" /> Salvar
            </Button>
            <Button variant="outline" onClick={() => setEditingKey(null)}>Cancelar</Button>
          </div>
        </div>
      ) : null}

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-8">
          <h3 className="text-lg font-bold text-on-surface-variant mb-3 uppercase tracking-wider text-sm">
            {groupLabels[group] || group}
          </h3>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-cjp-primary/30 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="text-xs text-on-surface-variant font-mono mb-1">{item.key}</div>
                  <div className="text-sm text-on-surface truncate">{item.value}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingKey(item.key);
                    setEditValue(item.value);
                  }}
                  className="shrink-0"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ==================== SERVICES TAB ====================
function ServicesTab({ services, onUpdate, onDelete }: { services: Service[]; onUpdate: (data: Partial<Service> & { id?: string }) => void; onDelete: (id: string) => void }) {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", icon: "cloud", highlight: false, ctaText: "", sortOrder: 0, checkItems: [] as string[],
  });
  const [newCheckItem, setNewCheckItem] = useState("");

  const startEdit = (service: Service) => {
    setEditingService(service);
    setIsNew(false);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      highlight: service.highlight,
      ctaText: service.ctaText || "",
      sortOrder: service.sortOrder,
      checkItems: parseCheckItems(service.checkItems),
    });
  };

  const startNew = () => {
    setEditingService(null);
    setIsNew(true);
    setForm({ title: "", description: "", icon: "cloud", highlight: false, ctaText: "", sortOrder: 0, checkItems: [] });
  };

  const handleSave = () => {
    onUpdate({
      ...(editingService?.id && { id: editingService.id }),
      ...form,
    });
    setEditingService(null);
    setIsNew(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cjp-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Gerenciar Soluções
        </h2>
        <Button onClick={startNew} className="bg-cjp-primary text-on-primary">
          <Plus className="h-4 w-4 mr-1" /> Nova Solução
        </Button>
      </div>

      {(editingService || isNew) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-cjp-primary mb-4">
            {isNew ? "Nova Solução" : `Editando: ${editingService?.title}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ordem</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Descrição</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Ícone</Label>
            <div className="flex flex-wrap gap-2">
              {iconNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setForm({ ...form, icon: name })}
                  className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
                    form.icon === name ? "border-cjp-primary bg-primary-fixed text-cjp-primary" : "border-outline-variant hover:border-cjp-primary"
                  }`}
                >
                  {iconMap[name]}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 mb-4">
            <input type="checkbox" checked={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.checked })} />
            <span className="text-sm">Destaque (fundo escuro)</span>
          </label>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
            <Button variant="outline" onClick={() => { setEditingService(null); setIsNew(false); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-primary-fixed text-cjp-primary shrink-0">
                {iconMap[service.icon] || <Cloud className="h-4 w-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-on-surface truncate">{service.title}</div>
                <div className="text-xs text-on-surface-variant truncate">{service.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => startEdit(service)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(service.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== SEGMENTS TAB ====================
function SegmentsTab({ segments, onUpdate, onDelete }: { segments: Segment[]; onUpdate: (data: Partial<Segment> & { id?: string }) => void; onDelete: (id: string) => void }) {
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({
    title: "", subtitle: "", description: "", icon: "globe", sortOrder: 0, applications: [] as string[],
  });
  const [newApp, setNewApp] = useState("");

  const startEdit = (segment: Segment) => {
    setEditingSegment(segment);
    setIsNew(false);
    setForm({
      title: segment.title,
      subtitle: segment.subtitle,
      description: segment.description,
      icon: segment.icon,
      sortOrder: segment.sortOrder,
      applications: parseApplications(segment.applications),
    });
  };

  const startNew = () => {
    setEditingSegment(null);
    setIsNew(true);
    setForm({ title: "", subtitle: "", description: "", icon: "globe", sortOrder: 0, applications: [] });
  };

  const handleSave = () => {
    onUpdate({
      ...(editingSegment?.id && { id: editingSegment.id }),
      ...form,
    });
    setEditingSegment(null);
    setIsNew(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cjp-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Gerenciar Segmentos
        </h2>
        <Button onClick={startNew} className="bg-cjp-primary text-on-primary">
          <Plus className="h-4 w-4 mr-1" /> Novo Segmento
        </Button>
      </div>

      {(editingSegment || isNew) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-cjp-primary mb-4">
            {isNew ? "Novo Segmento" : `Editando: ${editingSegment?.title}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Subtítulo</Label>
              <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Descrição</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Ícone</Label>
              <div className="flex flex-wrap gap-2">
                {iconNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => setForm({ ...form, icon: name })}
                    className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
                      form.icon === name ? "border-cjp-primary bg-primary-fixed text-cjp-primary" : "border-outline-variant hover:border-cjp-primary"
                    }`}
                  >
                    {iconMap[name]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ordem</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Aplicações</Label>
            {form.applications.map((app, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={app} onChange={(e) => { const apps = [...form.applications]; apps[i] = e.target.value; setForm({ ...form, applications: apps }); }} />
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, applications: form.applications.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input value={newApp} onChange={(e) => setNewApp(e.target.value)} placeholder="Nova aplicação..."
                onKeyDown={(e) => { if (e.key === "Enter" && newApp) { setForm({ ...form, applications: [...form.applications, newApp] }); setNewApp(""); } }} />
              <Button variant="outline" size="sm" onClick={() => { if (newApp) { setForm({ ...form, applications: [...form.applications, newApp] }); setNewApp(""); } }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
            <Button variant="outline" onClick={() => { setEditingSegment(null); setIsNew(false); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {segments.map((segment) => (
          <div key={segment.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-primary-fixed text-cjp-primary shrink-0">
                {iconMap[segment.icon] || <Globe className="h-4 w-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-on-surface truncate">{segment.title}</div>
                <div className="text-xs text-on-surface-variant truncate">{segment.subtitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => startEdit(segment)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(segment.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== CASES TAB ====================
function CasesTab({ cases, onUpdate, onDelete }: { cases: CaseStudy[]; onUpdate: (data: Partial<CaseStudy> & { id?: string }) => void; onDelete: (id: string) => void }) {
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({
    title: "", segment: "", description: "", sortOrder: 0, highlights: [] as string[],
  });
  const [newHighlight, setNewHighlight] = useState("");

  const startEdit = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
    setIsNew(false);
    setForm({
      title: caseStudy.title,
      segment: caseStudy.segment,
      description: caseStudy.description,
      sortOrder: caseStudy.sortOrder,
      highlights: parseHighlights(caseStudy.highlights),
    });
  };

  const startNew = () => {
    setEditingCase(null);
    setIsNew(true);
    setForm({ title: "", segment: "", description: "", sortOrder: 0, highlights: [] });
  };

  const handleSave = () => {
    onUpdate({
      ...(editingCase?.id && { id: editingCase.id }),
      ...form,
    });
    setEditingCase(null);
    setIsNew(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cjp-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Gerenciar Cases
        </h2>
        <Button onClick={startNew} className="bg-cjp-primary text-on-primary">
          <Plus className="h-4 w-4 mr-1" /> Novo Case
        </Button>
      </div>

      {(editingCase || isNew) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-cjp-primary mb-4">
            {isNew ? "Novo Case" : `Editando: ${editingCase?.title}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Segmento</Label>
              <Input value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Descrição (use parágrafos duplos para separar)</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Destaques</Label>
            {form.highlights.map((hl, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={hl} onChange={(e) => { const hls = [...form.highlights]; hls[i] = e.target.value; setForm({ ...form, highlights: hls }); }} />
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, highlights: form.highlights.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input value={newHighlight} onChange={(e) => setNewHighlight(e.target.value)} placeholder="Novo destaque..."
                onKeyDown={(e) => { if (e.key === "Enter" && newHighlight) { setForm({ ...form, highlights: [...form.highlights, newHighlight] }); setNewHighlight(""); } }} />
              <Button variant="outline" size="sm" onClick={() => { if (newHighlight) { setForm({ ...form, highlights: [...form.highlights, newHighlight] }); setNewHighlight(""); } }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
            <Button variant="outline" onClick={() => { setEditingCase(null); setIsNew(false); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {cases.map((caseStudy) => (
          <div key={caseStudy.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="min-w-0 mr-4">
              <div className="text-sm font-medium text-on-surface truncate">{caseStudy.title}</div>
              <div className="text-xs text-on-surface-variant">{caseStudy.segment}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => startEdit(caseStudy)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(caseStudy.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== NAV TAB ====================
function NavTab({ navLinks, onUpdate, onDelete }: { navLinks: NavLink[]; onUpdate: (data: Partial<NavLink> & { id?: string }) => void; onDelete: (id: string) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editHref, setEditHref] = useState("");
  const [isNew, setIsNew] = useState(false);

  const startEdit = (link: NavLink) => {
    setEditingId(link.id);
    setIsNew(false);
    setEditLabel(link.label);
    setEditHref(link.href);
  };

  const startNew = () => {
    setEditingId(null);
    setIsNew(true);
    setEditLabel("");
    setEditHref("/");
  };

  const handleSave = () => {
    onUpdate({
      ...(editingId && { id: editingId }),
      label: editLabel,
      href: editHref,
    });
    setEditingId(null);
    setIsNew(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cjp-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Links de Navegação
        </h2>
        <Button onClick={startNew} className="bg-cjp-primary text-on-primary"><Plus className="h-4 w-4 mr-1" /> Novo Link</Button>
      </div>

      {(editingId || isNew) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-cjp-primary mb-4">{isNew ? "Novo Link" : "Editar Link"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Texto</Label>
              <Input value={editLabel} onChange={(e) => setEditLabel(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Link (href)</Label>
              <Input value={editHref} onChange={(e) => setEditHref(e.target.value)} placeholder="/pagina" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
            <Button variant="outline" onClick={() => { setEditingId(null); setIsNew(false); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <div key={link.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div>
              <div className="text-sm font-medium text-on-surface">{link.label}</div>
              <div className="text-xs text-on-surface-variant font-mono">{link.href}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => startEdit(link)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(link.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== FOOTER TAB ====================
function FooterTab({ footerLinks, onUpdate, onDelete, contents, onContentUpdate }: { footerLinks: FooterLink[]; onUpdate: (data: Partial<FooterLink> & { id?: string }) => void; onDelete: (id: string) => void; contents: SiteContent[]; onContentUpdate: (key: string, value: string) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editHref, setEditHref] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [copyright, setCopyright] = useState(getContentValue(contents, "footer_copyright") || "");

  const currentCopyright = getContentValue(contents, "footer_copyright") || "";
  if (copyright !== currentCopyright && !editingId) {
    setCopyright(currentCopyright);
  }

  const startEdit = (link: FooterLink) => {
    setEditingId(link.id);
    setIsNew(false);
    setEditLabel(link.label);
    setEditHref(link.href);
  };

  const startNew = () => {
    setEditingId(null);
    setIsNew(true);
    setEditLabel("");
    setEditHref("#");
  };

  const handleSave = () => {
    onUpdate({
      ...(editingId && { id: editingId }),
      label: editLabel,
      href: editHref,
    });
    setEditingId(null);
    setIsNew(false);
  };

  const handleCopyrightSave = () => {
    onContentUpdate("footer_copyright", copyright);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-cjp-primary mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
        Footer
      </h2>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-cjp-primary mb-4">Copyright</h3>
        <div className="flex gap-2">
          <Input value={copyright} onChange={(e) => setCopyright(e.target.value)} className="flex-1" />
          <Button onClick={handleCopyrightSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-on-surface-variant">Links do Footer</h3>
        <Button onClick={startNew} size="sm" className="bg-cjp-primary text-on-primary"><Plus className="h-4 w-4 mr-1" /> Novo Link</Button>
      </div>

      {(editingId || isNew) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Texto</Label>
              <Input value={editLabel} onChange={(e) => setEditLabel(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Link (href)</Label>
              <Input value={editHref} onChange={(e) => setEditHref(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
            <Button variant="outline" onClick={() => { setEditingId(null); setIsNew(false); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {footerLinks.map((link) => (
          <div key={link.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div>
              <div className="text-sm font-medium text-on-surface">{link.label}</div>
              <div className="text-xs text-on-surface-variant font-mono">{link.href}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => startEdit(link)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(link.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== MAIN ADMIN PAGE ====================
const emptySubscribe = () => () => {};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [authChecked, setAuthChecked] = useState(false);
  if (mounted && !authChecked) {
    setAuthChecked(true);
    const auth = sessionStorage.getItem("cjp_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-2 border-cjp-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogin = () => {
    sessionStorage.setItem("cjp_admin_auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cjp_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
