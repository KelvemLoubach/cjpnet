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
          name: "Administrador CJP",
          role: "admin",
        },
      });
    }

    // Seed site content - ALL content from the document
    const contentData = [
      // General
      { key: "site_name", value: "CJP", type: "text", group: "general" },
      { key: "site_razao_social", value: "CJP Tecnologia da Internet Ltda", type: "text", group: "general" },
      { key: "site_cnpj", value: "11.172.002/0001-84", type: "text", group: "general" },
      { key: "whatsapp_number", value: "+5511914922773", type: "text", group: "general" },
      { key: "contact_email", value: "contato@cjpnet.com.br", type: "text", group: "general" },
      { key: "instagram_url", value: "https://www.instagram.com/cjpnet", type: "text", group: "general" },
      { key: "linkedin_url", value: "https://www.linkedin.com/company/cjpnet/", type: "text", group: "general" },

      // Hero
      { key: "hero_tag", value: "Soluções Digitais Corporativas", type: "text", group: "hero" },
      { key: "hero_title", value: "Soluções Digitais para Operações que Exigem Controle, Integração e Confiabilidade", type: "text", group: "hero" },
      { key: "hero_description", value: "Desenvolvemos plataformas digitais sob medida para empresas que precisam centralizar informações, automatizar processos, integrar sistemas e estruturar operações com segurança, estabilidade e visão gerencial.", type: "text", group: "hero" },
      { key: "hero_cta_primary", value: "Falar com um Especialista", type: "text", group: "hero" },
      { key: "hero_cta_secondary", value: "Ver Casos de Aplicação", type: "text", group: "hero" },

      // Quem Somos (home page summary)
      { key: "quem_somos_summary", value: "A CJP atua no desenvolvimento e operação de soluções digitais corporativas voltadas à organização, integração e gestão de processos empresariais.", type: "text", group: "sobre" },

      // Sobre page
      { key: "sobre_description", value: "Com mais de 16 anos de experiência, desenvolvemos plataformas SaaS sob medida para empresas que necessitam centralizar informações, automatizar rotinas operacionais, integrar sistemas e estruturar indicadores estratégicos para apoio à tomada de decisão.", type: "text", group: "sobre" },
      { key: "sobre_joao_bio", value: "João Pessolato, fundador e CEO da CJP, começou sua trajetória como desenvolvedor, o que lhe permitiu unir uma visão técnica profunda à capacidade de transformar processos empresariais em soluções digitais inteligentes. Hoje, lidera uma equipe que cria aplicações seguras, escaláveis e sob medida, integrando bancos de dados complexos, ERPs e fluxos corporativos.", type: "text", group: "sobre" },
      { key: "sobre_atuacao", value: "Nossa atuação combina arquitetura de software, integração de dados e entendimento operacional das necessidades do cliente, permitindo a construção de soluções robustas, escaláveis e evolutivas para diferentes segmentos de mercado.", type: "text", group: "sobre" },
      { key: "sobre_saas", value: "Operamos em modelo SaaS, sendo responsáveis por toda a infraestrutura tecnológica necessária ao funcionamento das plataformas, incluindo servidores, segurança, disponibilidade e continuidade operacional, permitindo que o cliente mantenha foco total em sua operação.", type: "text", group: "sobre" },
      { key: "sobre_missao", value: "Desenvolver soluções digitais que simplifiquem operações, organizem informações e apoiem empresas na tomada de decisões com mais controle, agilidade e confiabilidade.", type: "text", group: "sobre" },
      { key: "sobre_visao", value: "Ser reconhecida pela capacidade de transformar necessidades operacionais complexas em soluções digitais eficientes, estáveis e estrategicamente relevantes para nossos clientes.", type: "text", group: "sobre" },
      { key: "sobre_valores", value: "Ética e transparência nas relações|Compromisso com a continuidade operacional|Confiabilidade e responsabilidade técnica|Evolução contínua das soluções|Proximidade com o cliente e entendimento do negócio", type: "text", group: "sobre" },

      // O Que Fazemos
      { key: "oquefazemos_intro_1", value: "Desenvolvemos plataformas digitais voltadas à organização e integração de operações empresariais, permitindo que informações dispersas em diferentes sistemas sejam centralizadas de forma estruturada, segura e acessível.", type: "text", group: "solucoes" },
      { key: "oquefazemos_intro_2", value: "Nossas soluções são utilizadas por empresas que necessitam automatizar processos, acompanhar indicadores estratégicos, integrar dados operacionais e estruturar rotinas críticas com maior controle e previsibilidade.", type: "text", group: "solucoes" },
      { key: "oquefazemos_intro_3", value: "Atuamos tanto no desenvolvimento de plataformas SaaS corporativas quanto na construção de soluções sob medida, sempre considerando as particularidades operacionais de cada negócio e a necessidade de evolução contínua das aplicações.", type: "text", group: "solucoes" },
      { key: "oquefazemos_intro_4", value: "Além do desenvolvimento das plataformas, somos responsáveis por toda a operação tecnológica necessária para garantir estabilidade, segurança, disponibilidade e continuidade dos sistemas utilizados pelos clientes.", type: "text", group: "solucoes" },

      // Problemas que Resolvemos
      { key: "problemas_title", value: "Problemas que Resolvemos", type: "text", group: "conteudo" },
      { key: "problemas_items", value: "Consolidar informações espalhadas em múltiplos sistemas|Eliminar controles manuais e retrabalho|Estruturar indicadores estratégicos|Integrar ERP, operação e BI|Garantir rastreabilidade operacional|Digitalizar processos críticos|Organizar operações multiunidades|Centralizar informações para tomada de decisão", type: "text", group: "conteudo" },

      // Experiência
      { key: "experiencia_title", value: "Experiência", type: "text", group: "conteudo" },
      { key: "experiencia_note", value: "Mostrar maturidade operacional sem necessariamente expor clientes sensíveis", type: "text", group: "conteudo" },
      { key: "experiencia_items", value: "Milhares de operações processadas mensalmente|Centenas de usuários simultâneos|Operações multiunidades|Integração com ERPs|Consolidação de indicadores estratégicos|Plataformas SaaS com evolução contínua", type: "text", group: "conteudo" },

      // Diferenciais
      { key: "diferenciais_title", value: "Diferenciais", type: "text", group: "conteudo" },
      { key: "diferenciais_items", value: "Desenvolvimento próprio|Infraestrutura própria|Modelo SaaS|Evolução contínua|Integrações corporativas|Segurança e backups|Operação de longa duração|Atendimento próximo|Conhecimento operacional do negócio|Arquitetura personalizada", type: "text", group: "conteudo" },

      // Footer
      { key: "footer_copyright", value: "© 2025 CJP Tecnologia da Internet Ltda. Todos os direitos reservados.", type: "text", group: "footer" },
      { key: "footer_cnpj", value: "CNPJ: 11.172.002/0001-84", type: "text", group: "footer" },
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
      { label: "Diferenciais", href: "/conteudo", active: false, sortOrder: 5 },
      { label: "Contato", href: "/contato", active: false, sortOrder: 6 },
    ];

    for (const link of navLinks) {
      const existing = await db.navLink.findFirst({ where: { label: link.label } });
      if (!existing) {
        await db.navLink.create({ data: link });
      }
    }

    // Seed services - exact content from the document
    const services = [
      {
        title: "Plataformas SaaS Corporativas",
        description: "Soluções web multiusuário desenvolvidas para operações que exigem acesso contínuo, centralização de informações e evolução constante das aplicações.",
        icon: "cloud",
        featured: true,
        sortOrder: 0,
        ctaText: null,
        highlight: false,
        checkItems: [],
      },
      {
        title: "Integração e Estruturação de Dados",
        description: "Integração entre sistemas corporativos, consolidação de informações operacionais e estruturação de indicadores estratégicos para apoio à tomada de decisão.",
        icon: "git-merge",
        featured: false,
        sortOrder: 1,
        ctaText: null,
        highlight: false,
        checkItems: [],
      },
      {
        title: "Governança e Controle Operacional",
        description: "Automação de processos, rastreabilidade operacional, padronização de rotinas e maior previsibilidade na gestão das informações.",
        icon: "shield-check",
        featured: false,
        sortOrder: 2,
        ctaText: null,
        highlight: false,
        checkItems: [],
      },
      {
        title: "Soluções Sob Medida",
        description: "Desenvolvimento de plataformas personalizadas para operações que exigem regras específicas, integrações complexas e acompanhamento contínuo da evolução do negócio.",
        icon: "blocks",
        featured: false,
        sortOrder: 3,
        ctaText: null,
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

    // Seed segments - exact content from the document
    const segments = [
      {
        title: "Indicadores de Saúde",
        subtitle: "Soluções voltadas à consolidação de indicadores estratégicos",
        description: "Soluções voltadas à consolidação de indicadores estratégicos, gestão operacional e apoio à tomada de decisão em ambientes hospitalares e operações de saúde pública.\n\nAtuamos no desenvolvimento de plataformas capazes de integrar dados de múltiplas unidades, estruturar informações assistenciais e operacionais e fornecer visão gerencial centralizada para coordenação, supervisão e gestão executiva.",
        applications: ["Indicadores hospitalares", "Consolidação multiunidades", "Gestão operacional em saúde", "Monitoramento de desempenho", "Painéis gerenciais e BI", "Integração de dados assistenciais e administrativos"],
        icon: "bar-chart",
        sortOrder: 0,
      },
      {
        title: "Distribuição e Operações Comerciais",
        subtitle: "Soluções desenvolvidas para apoiar equipes comerciais externas",
        description: "Soluções desenvolvidas para apoiar equipes comerciais externas, supervisores e gestores na administração estratégica de carteiras, setores e operações de vendas em campo.\n\nA plataforma integra-se ao ERP da empresa para disponibilizar informações operacionais e comerciais de forma rápida, organizada e acessível, permitindo que representantes e supervisores atuem com maior autonomia, controle e capacidade de tomada de decisão durante as rotinas comerciais.\n\nAlém do acompanhamento da carteira de clientes, o sistema oferece visão consolidada da operação comercial, facilitando o monitoramento de desempenho, oportunidades de venda, pendências financeiras e movimentações estratégicas da empresa.",
        applications: ["Gestão de representantes comerciais", "Supervisão de equipes em campo", "Administração de carteiras e setores", "Integração com ERP corporativo", "Histórico de compras e comportamento de clientes", "Informações financeiras e cobranças em aberto", "Monitoramento de metas e desempenho comercial", "Acompanhamento gerencial da operação de vendas", "Disponibilização estratégica de informações para equipes externas"],
        icon: "globe",
        sortOrder: 1,
      },
      {
        title: "Gestão Documental e Fiscal",
        subtitle: "Soluções para recepção, armazenamento e organização de documentos",
        description: "Soluções para recepção, armazenamento, organização e disponibilização segura de documentos fiscais eletrônicos e arquivos corporativos.\n\nAtuamos com automação de captura de XML, centralização documental e organização de informações para consulta, auditoria e rastreabilidade operacional.",
        applications: ["Armazenamento de XML e NF-e", "Centralização documental", "Organização fiscal eletrônica", "Distribuição automatizada de documentos", "Rastreabilidade e consulta histórica", "Automação de recebimento e processamento"],
        icon: "database",
        sortOrder: 2,
      },
      {
        title: "Operações Técnicas e Laboratoriais",
        subtitle: "Plataformas especializadas para controle operacional de análises técnicas",
        description: "Plataformas especializadas para controle operacional de análises técnicas, rastreamento de processos e gerenciamento do ciclo de vida de amostras e coletas.\n\nAs soluções são desenvolvidas para operações que exigem precisão operacional, padronização de processos e rastreabilidade contínua das informações.",
        applications: ["Gestão laboratorial", "Controle de amostras", "Fluxos operacionais técnicos", "Rastreabilidade de processos", "Controle de análises e coletas", "Consolidação de resultados e indicadores"],
        icon: "cpu",
        sortOrder: 3,
      },
      {
        title: "Soluções Corporativas Sob Medida",
        subtitle: "Desenvolvimento de plataformas web customizadas",
        description: "Desenvolvimento de plataformas web customizadas para operações que exigem regras específicas, integrações complexas e evolução contínua.\n\nCada solução é construída considerando a realidade operacional do cliente, permitindo escalabilidade, integração e adaptação às necessidades do negócio.",
        applications: ["Plataformas SaaS corporativas", "Sistemas web personalizados", "Integrações entre sistemas", "Automação de processos", "Consolidação de dados", "Arquitetura de soluções digitais"],
        icon: "blocks",
        sortOrder: 4,
      },
    ];

    for (const segment of segments) {
      const existing = await db.segment.findFirst({ where: { title: segment.title } });
      if (!existing) {
        await db.segment.create({
          data: {
            title: segment.title,
            subtitle: segment.subtitle,
            description: segment.description,
            applications: JSON.stringify(segment.applications),
            icon: segment.icon,
            sortOrder: segment.sortOrder,
          },
        });
      }
    }

    // Seed case studies - exact content from the document
    const caseStudies = [
      {
        title: "Gestão Hospitalar e Indicadores de Saúde",
        segment: "Indicadores de Saúde",
        description: "Plataforma desenvolvida para consolidação e acompanhamento de indicadores estratégicos em operações hospitalares multiunidades, apoiando coordenação operacional, supervisão e gestão executiva.\n\nA solução surgiu da necessidade de estruturar e centralizar informações provenientes de diferentes unidades em uma única visão gerencial, permitindo maior controle operacional, padronização de processos e acompanhamento estratégico dos dados.\n\nCom a evolução da operação, a plataforma acompanhou o crescimento da estrutura organizacional, ampliando o número de usuários, unidades atendidas e volume de informações processadas. Atualmente, a solução atende operações distribuídas em diferentes regiões do país, oferecendo acesso centralizado, segurança das informações e continuidade operacional.\n\nO modelo SaaS permite evolução contínua da plataforma, reduzindo a necessidade de investimentos em infraestrutura própria e garantindo flexibilidade de acesso para equipes distribuídas geograficamente.",
        highlights: ["Consolidação de indicadores em múltiplas unidades", "Visão gerencial centralizada", "Operações distribuídas em diferentes regiões", "Modelo SaaS com evolução contínua"],
        sortOrder: 0,
      },
      {
        title: "Integração Comercial e Supervisão de Campo",
        segment: "Distribuição e Operações Comerciais",
        description: "Empresas com operações comerciais distribuídas frequentemente enfrentam dificuldades para disponibilizar informações estratégicas de seus ERPs corporativos às equipes externas, especialmente quando utilizam estruturas internas complexas e restrições de acesso à rede corporativa.\n\nUm cliente do segmento farmacêutico nos procurou com esse desafio. Sua operação comercial, distribuída entre os estados de Minas Gerais e São Paulo, possuía limitações no acesso a informações fundamentais para a rotina da força de vendas, como posição financeira da carteira, mix de produtos, desempenho comercial e disponibilidade de estoque.\n\nA solução desenvolvida integrou-se ao ERP corporativo e estruturou uma camada web de acesso estratégico às informações operacionais, permitindo que representantes, supervisores e gerência passassem a atuar com maior autonomia, visibilidade e capacidade de tomada de decisão em campo.\n\nAlém de ampliar o suporte operacional às equipes comerciais, a solução contribuiu para aumento de aproximadamente 30% na recuperação de cobranças em atraso e crescimento de cerca de 15% no mix de produtos comercializados.",
        highlights: ["Integração com ERP corporativo", "Operação em Minas Gerais e São Paulo", "Aumento de ~30% na recuperação de cobranças", "Crescimento de ~15% no mix de produtos"],
        sortOrder: 1,
      },
      {
        title: "Gestão Laboratorial e Operacional",
        segment: "Operações Técnicas e Laboratoriais",
        description: "Plataforma voltada ao gerenciamento operacional de análises técnicas, rastreabilidade de processos e consolidação de informações laboratoriais e gerenciais.\n\nUm cliente do segmento de análises químicas, atuante no estado de São Paulo, buscava ampliar sua capacidade operacional e estruturar maior controle sobre o ciclo de vida das amostras e das rotinas de campo.\n\nDurante o levantamento operacional realizado junto à equipe, foram identificados processos manuais, ausência de padronização das rotinas, retrabalho na consolidação das informações coletadas em campo e limitações na rastreabilidade das amostras e visitas técnicas.\n\nA solução desenvolvida estruturou digitalmente todo o fluxo operacional da coleta e acompanhamento das amostras, permitindo que as equipes realizassem lançamentos diretamente em campo e garantindo rastreabilidade contínua das informações durante todas as etapas do processo.\n\nAlém da centralização das informações e padronização operacional, a plataforma proporcionou aumento significativo da capacidade de processamento da operação. Em três anos de utilização, o número anual de amostras analisadas evoluiu de 5.857 para 7.379, representando crescimento superior a 25% na capacidade operacional do cliente.\n\nA estrutura implantada também passou a fornecer maior visibilidade gerencial das rotinas de coleta e acompanhamento operacional das equipes externas.",
        highlights: ["Crescimento de >25% na capacidade operacional", "Amostras: de 5.857 para 7.379 por ano", "Digitalização completa do fluxo operacional", "Rastreabilidade contínua das informações"],
        sortOrder: 2,
      },
      {
        title: "Gestão Documental e Fiscal",
        segment: "Gestão Documental e Fiscal",
        description: "Empresas que operam com grande volume de documentos fiscais eletrônicos frequentemente enfrentam dificuldades relacionadas à organização, distribuição e rastreabilidade das informações, especialmente quando os XMLs e documentos ficam dispersos entre e-mails, computadores locais e diferentes setores da empresa.\n\nUm cliente do segmento de distribuição necessitava estruturar o armazenamento e a disponibilização centralizada de documentos fiscais eletrônicos, reduzindo falhas operacionais e eliminando a dependência de processos manuais para recebimento, consulta e distribuição de XMLs.\n\nA solução desenvolvida automatizou a captura e o processamento de documentos fiscais diretamente das fontes de recebimento eletrônico, organizando as informações em uma plataforma centralizada e acessível via web. O sistema passou a disponibilizar consultas rápidas, rastreabilidade histórica, distribuição automatizada por e-mail e maior controle operacional sobre os documentos processados.\n\nAlém da redução significativa de retrabalho operacional, a solução proporcionou maior segurança das informações, padronização dos processos internos e facilidade no acesso aos documentos por diferentes setores da empresa, reduzindo o risco de perdas e inconsistências no gerenciamento fiscal eletrônico.",
        highlights: ["Automação de captura de XML", "Plataforma centralizada via web", "Distribuição automatizada por e-mail", "Redução significativa de retrabalho operacional"],
        sortOrder: 3,
      },
    ];

    for (const caseStudy of caseStudies) {
      const existing = await db.caseStudy.findFirst({ where: { title: caseStudy.title } });
      if (!existing) {
        await db.caseStudy.create({
          data: {
            title: caseStudy.title,
            segment: caseStudy.segment,
            description: caseStudy.description,
            highlights: JSON.stringify(caseStudy.highlights),
            sortOrder: caseStudy.sortOrder,
          },
        });
      }
    }

    // Seed footer links
    const footerLinks = [
      { label: "Home", href: "/", sortOrder: 0 },
      { label: "Soluções", href: "/solucoes", sortOrder: 1 },
      { label: "Segmentos", href: "/segmentos", sortOrder: 2 },
      { label: "Cases", href: "/cases", sortOrder: 3 },
      { label: "Sobre", href: "/sobre", sortOrder: 4 },
      { label: "Contato", href: "/contato", sortOrder: 5 },
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
