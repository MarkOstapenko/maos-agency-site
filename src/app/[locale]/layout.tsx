import type { Metadata, Viewport } from "next";

import { NextIntlClientProvider, hasLocale } from "next-intl";

import { getMessages, setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { Geist, Geist_Mono, Unbounded } from "next/font/google";

import { routing } from "@/i18n/routing";

import { BRAND } from "@/lib/constants";

import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  getSiteUrl,
} from "@/lib/seo";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import {
  AiBackgroundSystem,
  CinematicLoader,
  FloatingTelegramButton,
} from "@/components/layout/DeferredLayoutUi";
import { DesktopCursor } from "@/components/layout/DesktopCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

import { JsonLd } from "@/components/seo/JsonLd";

import "../globals.css";



type LayoutProps = {

  children: React.ReactNode;

  params: Promise<{ locale: string }>;

};



export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    applicationName: BRAND.name,
    authors: [{ name: BRAND.name, url: siteUrl }],
    creator: BRAND.name,
    publisher: BRAND.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "32x32", type: "image/png" },
        { url: "/logo.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/icon.png",
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      title: BRAND.name,
      statusBarStyle: "black-translucent",
    },
    other: {
      "telegram:channel": BRAND.telegramHandle,
    },
  };
}



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});



export function generateViewport(): Viewport {
  return {
    themeColor: "#050505",
    colorScheme: "dark",
  };
}

export function generateStaticParams() {

  return routing.locales.map((locale) => ({ locale }));

}



export default async function LocaleLayout({ children, params }: LayoutProps) {

  const { locale } = await params;



  if (!hasLocale(routing.locales, locale)) {

    notFound();

  }



  setRequestLocale(locale);

  const messages = await getMessages();



  return (

    <html lang={locale} className="dark">

      <body
        className={`${geistSans.variable} ${unbounded.variable} ${geistMono.variable} min-h-screen font-sans`}
      >
        <SkipLink />

        <JsonLd

          data={[

            buildOrganizationSchema(locale),

            buildWebSiteSchema(locale),

          ]}

        />

        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <CinematicLoader />

            <DesktopCursor />

            <AiBackgroundSystem />

            <Navbar />

            <main id="main" tabIndex={-1} className="relative z-10 outline-none">
              {children}
            </main>

            <Footer className="relative z-10" />

            <FloatingTelegramButton />
          </SmoothScroll>
        </NextIntlClientProvider>

      </body>

    </html>

  );

}


