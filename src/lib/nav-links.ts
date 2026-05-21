export const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/about", key: "about" as const },
] as const;

export type NavLinkKey = (typeof NAV_LINKS)[number]["key"];
