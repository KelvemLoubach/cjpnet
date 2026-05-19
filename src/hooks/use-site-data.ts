"use client";

import { useState, useEffect, useCallback } from "react";
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

export function useSiteData(): SiteData & { refetch: () => void } {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [contentRes, servicesRes, segmentsRes, casesRes, navRes, footerRes] = await Promise.all([
        fetch("/api/content"),
        fetch("/api/services"),
        fetch("/api/segments"),
        fetch("/api/cases"),
        fetch("/api/navigation"),
        fetch("/api/footer"),
      ]);

      if (!contentRes.ok) {
        const seedRes = await fetch("/api/seed", { method: "POST" });
        if (seedRes.ok) {
          await new Promise((r) => setTimeout(r, 500));
          return fetchData();
        }
      }

      const [contentData, servicesData, segmentsData, casesData, navData, footerData] = await Promise.all([
        contentRes.json(),
        servicesRes.json(),
        segmentsRes.json(),
        casesRes.json(),
        navRes.json(),
        footerRes.json(),
      ]);

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
