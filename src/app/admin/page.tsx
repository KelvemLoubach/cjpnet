"use client";

import { useState, useEffect, useSyncExternalStore, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Save, Plus, Trash2, Edit3, ChevronRight,
  Cloud, GitMerge, ShieldCheck, Blocks, Zap, Globe, Database, Lock, Cpu, BarChart3,
  LayoutDashboard, FileText, Settings, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { SiteContent, Service, NavLink, FooterLink } from "@/lib/types";
import { getContentValue, parseCheckItems } from "@/lib/types";

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

const ADMIN_EMAIL = "admin@cjpnet.com.br";
const ADMIN_PASSWORD = "admin123";

type AdminTab = "conteudo" | "servicos" | "navegacao" | "footer";

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
          <h1 className="text-3xl font-bold text-cjp-primary mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            CJP NET
          </h1>
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
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const { toast } = useToast();

  // Fetch data on mount - use null check pattern to run once
  const fetchDataRef = useRef<Promise<void> | null>(null);
  if (fetchDataRef.current == null) {
    fetchDataRef.current = (async () => {
      try {
        const [contentRes, servicesRes, navRes, footerRes] = await Promise.all([
          fetch("/api/content"), fetch("/api/services"), fetch("/api/navigation"), fetch("/api/footer"),
        ]);
        const [contentData, servicesData, navData, footerData] = await Promise.all([
          contentRes.json(), servicesRes.json(), navRes.json(), footerRes.json(),
        ]);
        setContents(contentData);
        setServices(servicesData);
        setNavLinks(navData);
        setFooterLinks(footerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }

  const fetchDataCb = useCallback(async () => {
    try {
      const [contentRes, servicesRes, navRes, footerRes] = await Promise.all([
        fetch("/api/content"), fetch("/api/services"), fetch("/api/navigation"), fetch("/api/footer"),
      ]);
      const [contentData, servicesData, navData, footerData] = await Promise.all([
        contentRes.json(), servicesRes.json(), navRes.json(), footerRes.json(),
      ]);
      setContents(contentData);
      setServices(servicesData);
      setNavLinks(navData);
      setFooterLinks(footerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Content handlers
  const updateContent = async (key: string, value: string) => {
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    fetchDataCb();
    toast({ title: "Conteúdo atualizado!", description: `"${key}" salvo com sucesso.` });
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
    { key: "servicos", label: "Serviços", icon: <Blocks className="h-4 w-4" /> },
    { key: "navegacao", label: "Navegação", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "footer", label: "Footer", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-cjp-primary text-on-primary flex flex-col shrink-0">
        <div className="p-6 border-b border-on-primary/20">
          <a href="/" className="text-xl font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            CJP NET
          </a>
          <p className="text-inverse-primary text-xs mt-1">Painel Administrativo</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
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
            {activeTab === "servicos" && (
              <ServicesTab key="servicos" services={services} onUpdate={updateService} onDelete={deleteService} />
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
    services: "Serviços",
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
          Gerenciar Serviços
        </h2>
        <Button onClick={startNew} className="bg-cjp-primary text-on-primary">
          <Plus className="h-4 w-4 mr-1" /> Novo Serviço
        </Button>
      </div>

      {(editingService || isNew) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-cjp-primary mb-4">
            {isNew ? "Novo Serviço" : `Editando: ${editingService?.title}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>CTA Texto</Label>
              <Input value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} placeholder="Ex: Iniciar Projeto" />
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
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.checked })} />
              <span className="text-sm">Destaque (fundo escuro)</span>
            </label>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Ordem:</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-20" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Checklist</Label>
            {form.checkItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={item} onChange={(e) => { const items = [...form.checkItems]; items[i] = e.target.value; setForm({ ...form, checkItems: items }); }} />
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, checkItems: form.checkItems.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input value={newCheckItem} onChange={(e) => setNewCheckItem(e.target.value)} placeholder="Novo item..."
                onKeyDown={(e) => { if (e.key === "Enter" && newCheckItem) { setForm({ ...form, checkItems: [...form.checkItems, newCheckItem] }); setNewCheckItem(""); } }} />
              <Button variant="outline" size="sm" onClick={() => { if (newCheckItem) { setForm({ ...form, checkItems: [...form.checkItems, newCheckItem] }); setNewCheckItem(""); } }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
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

      {/* Copyright */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-cjp-primary mb-4">Copyright</h3>
        <div className="flex gap-2">
          <Input value={copyright} onChange={(e) => setCopyright(e.target.value)} className="flex-1" />
          <Button onClick={handleCopyrightSave} className="bg-cjp-primary text-on-primary"><Save className="h-4 w-4 mr-1" /> Salvar</Button>
        </div>
      </div>

      {/* Links */}
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
  
  // useSyncExternalStore to detect client-side mounting
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Check auth after mount
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
