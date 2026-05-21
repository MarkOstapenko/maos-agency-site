/** Primary SEO focus phrases — woven into titles, descriptions, and schema */
export const FOCUS_KEYWORDS = {
  en: [
    "AI agency Ukraine",
    "AI automation agency",
    "Telegram bot development",
    "CRM automation",
    "AI assistants for business",
  ],
  uk: [
    "AI agency Ukraine",
    "AI automation agency",
    "розробка Telegram-ботів",
    "CRM automation",
    "AI-асистенти для бізнесу",
  ],
} as const;

export type SeoPageKey = "home" | "services" | "about";

export function getPageKeywords(locale: string, page: SeoPageKey): string[] {
  const base = locale === "uk" ? [...FOCUS_KEYWORDS.uk] : [...FOCUS_KEYWORDS.en];
  const extra: Record<SeoPageKey, string[]> = {
    home: [],
    services: [
      locale === "uk" ? "автоматизація продажів" : "sales automation",
      locale === "uk" ? "інтеграція CRM" : "CRM integration",
    ],
    about: [locale === "uk" ? "контакти AI agency" : "contact AI agency"],
  };
  return [...base, ...extra[page]];
}
