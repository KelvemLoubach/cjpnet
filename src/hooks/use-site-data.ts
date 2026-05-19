"use client";

import { useState, useEffect, useCallback } from "react";
import type { SiteContent, Service, NavLink, FooterLink } from "@/lib/types";

interface SiteData {
  contents: SiteContent[];
  services: Service[];
  navLinks: NavLink[];
  footerLinks: FooterLink[];
  loading: boolean;
}

export function useSiteData(): SiteData & { refetch: () => void } {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [contentRes, servicesRes, navRes, footerRes] = await Promise.all([
        fetch("/api/content"),
        fetch("/api/services"),
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { contents, services, navLinks, footerLinks, loading, refetch: fetchData };
}
