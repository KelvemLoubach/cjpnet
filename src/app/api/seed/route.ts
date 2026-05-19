import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    // Create default admin user
    const existingUser = await db.user.findUnique({ where: { email: "admin@cjpnet.com.br" } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await db.user.create({
        data: {
          email: "admin@cjpnet.com.br",
          password: hashedPassword,
          name: "Administrador CJP NET",
          role: "admin",
        },
      });
    }

    // Seed site content
    const contentData = [
      { key: "site_name", value: "CJP NET", type: "text", group: "general" },
      { key: "hero_tag", value: "Arquitetura Corporativa", type: "text", group: "hero" },
      { key: "hero_title", value: "Engenharia de Dados e Soluções Escaláveis", type: "text", group: "hero" },
      { key: "hero_description", value: "Desenvolvemos infraestruturas lógicas de alta performance para operações críticas. Da governança de dados à integração de sistemas complexos, estruturamos a base tecnológica para o crescimento seguro da sua corporação.", type: "text", group: "hero" },
      { key: "hero_cta", value: "Conhecer Portfólio", type: "text", group: "hero" },
      { key: "hero_cta_specialist", value: "Falar com um Especialista", type: "text", group: "hero" },
      { key: "services_title", value: "Core Capabilities", type: "text", group: "services" },
      { key: "footer_copyright", value: "© 2024 CJP NET. Todos os direitos reservados.", type: "text", group: "footer" },
    ];

    for (const item of contentData) {
      await db.siteContent.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: item,
      });
    }

    // Seed navigation links
    const navLinks = [
      { label: "Home", href: "/", active: false, sortOrder: 0 },
      { label: "Soluções", href: "/solucoes", active: false, sortOrder: 1 },
      { label: "Segmentos", href: "/segmentos", active: false, sortOrder: 2 },
      { label: "Cases", href: "/cases", active: false, sortOrder: 3 },
      { label: "Sobre", href: "/sobre", active: false, sortOrder: 4 },
      { label: "Contato", href: "/contato", active: false, sortOrder: 5 },
    ];

    for (const link of navLinks) {
      const existing = await db.navLink.findFirst({ where: { label: link.label } });
      if (!existing) {
        await db.navLink.create({ data: link });
      }
    }

    // Seed services
    const services = [
      {
        title: "Plataformas SaaS Corporativas",
        description: "Desenvolvimento de web solutions multi-usuário projetadas para alta disponibilidade e segurança. Arquitetura isolada (multi-tenant) ou dedicada, garantindo a integridade dos dados e performance consistente mesmo em picos de acesso.",
        icon: "cloud",
        featured: true,
        sortOrder: 0,
        ctaText: null,
        highlight: false,
        checkItems: ["Alta Disponibilidade (SLA 99.9%)", "Arquitetura Multi-Tenant Segura"],
      },
      {
        title: "Integração e Estruturação",
        description: "System integration robusto conectando legados a novas tecnologias. Estruturamos data lakes e pipelines garantindo que a informação flua sem perdas, padronizada e pronta para consumo analítico.",
        icon: "git-merge",
        featured: false,
        sortOrder: 1,
        ctaText: null,
        highlight: false,
        checkItems: [],
      },
      {
        title: "Governança Operacional",
        description: "Process automation com foco em controle rigoroso. Implementamos malhas de auditoria, rastreabilidade de ações (logs imutáveis) e dashboards operacionais para visibilidade total do ecossistema.",
        icon: "shield-check",
        featured: false,
        sortOrder: 2,
        ctaText: null,
        highlight: false,
        checkItems: [],
      },
      {
        title: "Soluções Sob Medida",
        description: "Personalized architecture desenhada para resolver gargalos específicos da sua operação. Não adaptamos o seu processo ao software; engenheiramos o software para potencializar a sua lógica de negócios única.",
        icon: "blocks",
        featured: false,
        sortOrder: 3,
        ctaText: "Iniciar Projeto",
        highlight: true,
        checkItems: [],
      },
    ];

    for (const service of services) {
      const existing = await db.service.findFirst({ where: { title: service.title } });
      if (!existing) {
        await db.service.create({
          data: {
            ...service,
            checkItems: JSON.stringify(service.checkItems),
          },
        });
      }
    }

    // Seed footer links
    const footerLinks = [
      { label: "XML Generator", href: "#", sortOrder: 0 },
      { label: "Políticas de Privacidade", href: "#", sortOrder: 1 },
      { label: "Termos de Uso", href: "#", sortOrder: 2 },
      { label: "Cases de Sucesso", href: "#", sortOrder: 3 },
    ];

    for (const link of footerLinks) {
      const existing = await db.footerLink.findFirst({ where: { label: link.label } });
      if (!existing) {
        await db.footerLink.create({ data: link });
      }
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
