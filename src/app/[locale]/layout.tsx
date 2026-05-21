import type { Metadata } from "next";

import { NextIntlClientProvider, hasLocale } from "next-intl";

import { getMessages, setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { Geist, Geist_Mono } from "next/font/google";

import { routing } from "@/i18n/routing";

import { BRAND } from "@/lib/constants";

import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  getSiteUrl,
} from "@/lib/seo";

import { AmbientBackground, Navbar, Footer } from "@/components/layout";

import { CustomCursor, FloatingTelegramButton } from "@/components/ui";

import { JsonLd } from "@/components/seo/JsonLd";

import "../globals.css";



type LayoutProps = {

  children: React.ReactNode;

  params: Promise<{ locale: string }>;

};



export async function generateMetadata(): Promise<Metadata> {
  return {

    metadataBase: new URL(getSiteUrl()),

    applicationName: BRAND.name,

    authors: [{ name: BRAND.name, url: getSiteUrl() }],

    creator: BRAND.name,

    publisher: BRAND.name,

    formatDetection: {

      email: false,

      address: false,

      telephone: false,

    },

    icons: {
      icon: [
        { url: BRAND.logo, type: "image/png" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },

    manifest: "/manifest.webmanifest",

    other: {

      "telegram:channel": BRAND.telegramHandle,

    },

  };

}



const geistSans = Geist({

  variable: "--font-geist-sans",

  subsets: ["latin", "cyrillic"],

});



const geistMono = Geist_Mono({

  variable: "--font-geist-mono",

  subsets: ["latin", "cyrillic"],

});



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

        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}

      >

        <JsonLd

          data={[

            buildOrganizationSchema(locale),

            buildWebSiteSchema(locale),

          ]}

        />

        <NextIntlClientProvider messages={messages}>

          <CustomCursor />

          <AmbientBackground />

          <Navbar />

          <main className="relative z-10">{children}</main>

          <Footer className="relative z-10" />

          <FloatingTelegramButton />

        </NextIntlClientProvider>

      </body>

    </html>

  );

}


