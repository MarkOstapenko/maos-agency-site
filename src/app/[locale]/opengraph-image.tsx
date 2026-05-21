import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BRAND } from "@/lib/constants";

export const alt = BRAND.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const tagline =
    locale === "uk"
      ? "AI automation systems for business"
      : "AI automation systems for business";

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
          <img src={logoSrc} width={96} height={96} alt="" />
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(248,248,242,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            AI Agency
          </span>
        </div>
        <div style={{ position: "relative", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#f8f8f2",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {BRAND.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              color: "rgba(248,248,242,0.65)",
              lineHeight: 1.35,
            }}
          >
            {tagline}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            fontSize: 24,
            color: "#e32a39",
            fontWeight: 600,
          }}
        >
          {BRAND.telegramHandle}
        </div>
      </div>
    ),
    { ...size }
  );
}
