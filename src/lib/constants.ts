/** Canonical brand palette — keep in sync with @theme in globals.css */
export const BRAND = {
  name: "MaOs AI Agency",
  logo: "/logo.png",
  telegram: "https://t.me/MaOs_Agency",
  telegramHandle: "@MaOs_Agency",
  colors: {
    black: "#050505",
    primary: "#E32A39",
    offWhite: "#FBFBEF",
  },
} as const;

export const SOCIAL_LINKS = [
  {
    id: "instagram",
    href: "https://www.instagram.com/maos_agency",
    handle: "@maos_agency",
  },
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@maos_agency",
    handle: "@maos_agency",
  },
  {
    id: "threads",
    href: "https://www.threads.com/@maos_agency",
    handle: "@maos_agency",
  },
] as const;

export type SocialId = (typeof SOCIAL_LINKS)[number]["id"];
