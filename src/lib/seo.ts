import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { routing } from "@/i18n/routing";

export type SitePath = "" | "/services" | "/about";

const PATHS: SitePath[] = ["", "/services", "/about"];

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

type BuildMetadataOptions = {
  locale: string;
  title: string;
  description: string;
  path?: SitePath;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
}: BuildMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const languages = getLanguageAlternates(path);
  const ogLocale = locale === "uk" ? "uk_UA" : "en_US";
  const ogAlternate = locale === "uk" ? ["en_US"] : ["uk_UA"];

  return {
    title: { absolute: title },
    description,
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
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: BRAND.logo,
          width: 512,
          height: 512,
          alt: BRAND.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/${locale}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export function buildOrganizationSchema(locale: string) {
  const url = `${getSiteUrl()}/${locale}`;
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
        ? "Преміальне агентство AI-автоматизації для бізнесу"
        : "Premium AI automation agency for business",
    sameAs: [
      BRAND.telegram,
      "https://www.instagram.com/maos_agency",
      "https://www.tiktok.com/@maos_agency",
      "https://www.threads.com/@maos_agency",
    ],
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

export function buildProfessionalServiceSchema(locale: string) {
  const url = getCanonicalUrl(locale, "/services");
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#service`,
    name:
      locale === "uk"
        ? "AI automation systems for business"
        : "AI automation systems for business",
    url,
    provider: { "@id": `${getSiteUrl()}/#organization` },
    areaServed: "Worldwide",
    serviceType: [
      "AI automation",
      "CRM integration",
      "Chatbot development",
      "Business process automation",
    ],
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
        languages: getLanguageAlternates(path),
      },
    }))
  );
}
