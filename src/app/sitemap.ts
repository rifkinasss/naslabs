import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact"];
  const localizedRoutes = routing.locales.flatMap((locale) => routes.map((route) => ({
    url: `${siteConfig.url}${locale === routing.defaultLocale ? route : `/${locale}${route}`}`,
    lastModified: new Date(),
  })));
  return [...localizedRoutes, ...projects.flatMap((project) => routing.locales.map((locale) => ({
    url: `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}/work/${project.slug}`,
    lastModified: new Date(),
  })))];
}
