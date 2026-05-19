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

export interface Segment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  applications: string;
  icon: string;
  sortOrder: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  segment: string;
  description: string;
  highlights: string;
  sortOrder: number;
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
  segments: Segment[];
  cases: CaseStudy[];
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

export function parseApplications(applicationsStr: string): string[] {
  try {
    return JSON.parse(applicationsStr);
  } catch {
    return [];
  }
}

export function parseHighlights(highlightsStr: string): string[] {
  try {
    return JSON.parse(highlightsStr);
  } catch {
    return [];
  }
}
