export interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: string;
  group: string | null;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  sortOrder: number;
  ctaText: string | null;
  highlight: boolean;
  checkItems: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  active: boolean;
  sortOrder: number;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
}

export interface SiteData {
  contents: SiteContent[];
  services: Service[];
  navLinks: NavLink[];
  footerLinks: FooterLink[];
}

export function getContentValue(contents: SiteContent[], key: string): string {
  return contents.find((c) => c.key === key)?.value || "";
}

export function parseCheckItems(checkItemsStr: string): string[] {
  try {
    return JSON.parse(checkItemsStr);
  } catch {
    return [];
  }
}
