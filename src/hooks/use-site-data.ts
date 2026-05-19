"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SiteContent, Service, Segment, CaseStudy, NavLink, FooterLink } from "@/lib/types";

interface SiteData {
  contents: SiteContent[];
  services: Service[];
  segments: Segment[];
  cases: CaseStudy[];
  navLinks: NavLink[];
  footerLinks: FooterLink[];
  loading: boolean;
}

async function safeFetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const data = await res.json();
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

export function useSiteData(): SiteData & { refetch: () => void } {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);
  const hasSeeded = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const [contentData, servicesData, segmentsData, casesData, navData, footerData] = await Promise.all([
        safeFetchJson<SiteContent[]>("/api/content", []),
        safeFetchJson<Service[]>("/api/services", []),
        safeFetchJson<Segment[]>("/api/segments", []),
        safeFetchJson<CaseStudy[]>("/api/cases", []),
        safeFetchJson<NavLink[]>("/api/navigation", []),
        safeFetchJson<FooterLink[]>("/api/footer", []),
      ]);

      // If content is empty, try to seed the database (only once)
      if (contentData.length === 0 && !hasSeeded.current) {
        hasSeeded.current = true;
        try {
          const seedRes = await fetch("/api/seed", { method: "POST" });
          if (seedRes.ok) {
            // Wait a moment and refetch
            await new Promise((r) => setTimeout(r, 800));
            const [c, s, seg, cas, nav, foot] = await Promise.all([
              safeFetchJson<SiteContent[]>("/api/content", []),
              safeFetchJson<Service[]>("/api/services", []),
              safeFetchJson<Segment[]>("/api/segments", []),
              safeFetchJson<CaseStudy[]>("/api/cases", []),
              safeFetchJson<NavLink[]>("/api/navigation", []),
              safeFetchJson<FooterLink[]>("/api/footer", []),
            ]);
            setContents(c);
            setServices(s);
            setSegments(seg);
            setCases(cas);
            setNavLinks(nav);
            setFooterLinks(foot);
            return;
          }
        } catch {
          // Seed failed, use empty arrays
        }
      }

      setContents(contentData);
      setServices(servicesData);
      setSegments(segmentsData);
      setCases(casesData);
      setNavLinks(navData);
      setFooterLinks(footerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { contents, services, segments, cases, navLinks, footerLinks, loading, refetch: fetchData };
}
