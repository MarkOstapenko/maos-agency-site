import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { getPageKeywords, type SeoPageKey } from "@/lib/seo-keywords";

export type SitePath = "" | "/services" | "/about";

const PATHS: SitePath[] = ["", "/services", "/about"];

const PAGE_TO_KEY: Record<SitePath, SeoPageKey> = {
  "": "home",
  "/services": "services",
  "/about": "about",
};

export function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function getCanonicalUrl(locale: string, path: SitePath = "") {
  return `${getSiteUrl()}/${locale}${path}`;
}

export function getLanguageAlternates(path: SitePath = "") {
  const base = getSiteUrl();
  return {
    uk: `${base}/uk${path}`,
    en: `${base}/en${path}`,
    "x-default": `${base}/uk${path}`,
  };
}

function getOgImagePath(locale: string, path: SitePath): string {
  if (path === "/services") return `/${locale}/services/opengraph-image`;
  if (path === "/about") return `/${locale}/about/opengraph-image`;
  return `/${locale}/opengraph-image`;
}

type BuildMetadataOptions = {
  locale: string;
  title: string;
  description: string;
  path?: SitePath;
  keywords?: string[];
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
  keywords,
}: BuildMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const languages = getLanguageAlternates(path);
  const ogLocale = locale === "uk" ? "uk_UA" : "en_US";
  const ogAlternate = locale === "uk" ? ["en_US"] : ["uk_UA"];
  const ogImage = getOgImagePath(locale, path);
  const keywordList = keywords ?? getPageKeywords(locale, PAGE_TO_KEY[path]);

  return {
    title: { absolute: title },
    description,
    keywords: keywordList,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: ogAlternate,
      url: canonical,
      siteName: BRAND.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: ogImage.replace("opengraph-image", "twitter-image"),
          alt: title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "technology",
  };
}

export function buildOrganizationSchema(locale: string) {
  const url = `${getSiteUrl()}/${locale}`;
  const keywords = getPageKeywords(locale, "home");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: BRAND.name,
    url,
    logo: `${getSiteUrl()}${BRAND.logo}`,
    image: `${getSiteUrl()}${BRAND.logo}`,
    description:
      locale === "uk"
        ? "AI automation agency в Україні: Telegram-боти, CRM automation, AI-асистенти для бізнесу"
        : "AI automation agency in Ukraine: Telegram bot development, CRM automation, AI assistants for business",
    sameAs: [
      BRAND.telegram,
      "https://www.instagram.com/maos_agency",
      "https://www.tiktok.com/@maos_agency",
      "https://www.threads.com/@maos_agency",
    ],
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Place", name: "Worldwide" },
    ],
    knowsAbout: keywords,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: BRAND.telegram,
      availableLanguage: ["Ukrainian", "English"],
    },
  };
}

export function buildWebSiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: BRAND.name,
    url: `${getSiteUrl()}/${locale}`,
    inLanguage: locale === "uk" ? "uk-UA" : "en-US",
    description:
      locale === "uk"
        ? "AI agency Ukraine — автоматизація бізнесу"
        : "AI agency Ukraine — business automation",
    publisher: { "@id": `${getSiteUrl()}/#organization` },
  };
}

export function buildWebPageSchema({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: SitePath;
  title: string;
  description: string;
}) {
  const url = getCanonicalUrl(locale, path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: locale === "uk" ? "uk-UA" : "en-US",
  };
}

export function buildBreadcrumbSchema(
  locale: string,
  items: { name: string; path: SitePath }[]
) {
  const pagePath = items[items.length - 1]?.path ?? "";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${getCanonicalUrl(locale, pagePath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(locale, item.path),
    })),
  };
}

const SERVICE_OFFERS = {
  uk: [
    "Автоматизація продажів",
    "Інтеграція CRM",
    "Розробка Telegram-ботів",
    "AI-підтримка клієнтів",
    "Автоматизація контенту",
    "API-інтеграції",
  ],
  en: [
    "Sales automation",
    "CRM integration",
    "Telegram bot development",
    "AI customer support",
    "Content automation",
    "API integrations",
  ],
};

export function buildProfessionalServiceSchema(locale: string) {
  const url = getCanonicalUrl(locale, "/services");
  const offers = locale === "uk" ? SERVICE_OFFERS.uk : SERVICE_OFFERS.en;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#service`,
    name:
      locale === "uk"
        ? "AI automation agency — послуги для бізнесу"
        : "AI automation agency — business services",
    url,
    provider: { "@id": `${getSiteUrl()}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      "Worldwide",
    ],
    serviceType: [
      "AI automation agency",
      "Telegram bot development",
      "CRM automation",
      "AI assistants for business",
      "Business process automation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "uk" ? "Послуги MaOs" : "MaOs services",
      itemListElement: offers.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function buildHomeItemListSchema(locale: string) {
  const offers = locale === "uk" ? SERVICE_OFFERS.uk : SERVICE_OFFERS.en;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${getSiteUrl()}/${locale}#services-list`,
    name:
      locale === "uk"
        ? "AI-системи MaOs"
        : "MaOs AI systems",
    itemListElement: offers.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
    })),
  };
}

export function getSitemapEntries() {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${path}`])
        ),
      },
    }))
  );
}
