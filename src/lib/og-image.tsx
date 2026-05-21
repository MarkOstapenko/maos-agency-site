import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BRAND } from "@/lib/constants";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export type OgVariant = "home" | "services" | "about";

const COPY: Record<OgVariant, Record<"uk" | "en", { eyebrow: string; headline: string }>> = {
  home: {
    uk: {
      eyebrow: "AI automation agency · Ukraine",
      headline: "AI-системи під ключ для бізнесу",
    },
    en: {
      eyebrow: "AI automation agency · Ukraine",
      headline: "Turnkey AI systems for business",
    },
  },
  services: {
    uk: {
      eyebrow: "Telegram bots · CRM · AI assistants",
      headline: "Послуги автоматизації",
    },
    en: {
      eyebrow: "Telegram bots · CRM · AI assistants",
      headline: "Automation services",
    },
  },
  about: {
    uk: {
      eyebrow: "MaOs AI Agency",
      headline: "Про нас та контакти",
    },
    en: {
      eyebrow: "MaOs AI Agency",
      headline: "About & contact",
    },
  },
};

export async function createOgImage(locale: string, variant: OgVariant = "home") {
  const lang = locale === "uk" ? "uk" : "en";
  const copy = COPY[variant][lang];

  const logoBuffer = await readFile(
    path.join(process.cwd(), "public", "logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(227,42,57,0.35), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 10%, rgba(227,42,57,0.15), transparent 50%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={88} height={88} alt="" />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "rgba(248,248,242,0.45)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {copy.eyebrow}
          </span>
        </div>
        <div style={{ position: "relative", maxWidth: 920 }}>
          <div
            style={{
              fontSize: variant === "home" ? 64 : 56,
              fontWeight: 700,
              color: "#f8f8f2",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            {BRAND.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              color: "rgba(248,248,242,0.62)",
              lineHeight: 1.35,
            }}
          >
            {copy.headline}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            fontSize: 22,
            color: "#e32a39",
            fontWeight: 600,
          }}
        >
          {BRAND.telegramHandle}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
