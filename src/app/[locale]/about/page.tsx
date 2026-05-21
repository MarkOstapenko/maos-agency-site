import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutPage } from "@/components/pages";

import { JsonLd } from "@/components/seo/JsonLd";

import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";



type Props = { params: Promise<{ locale: string }> };



export async function generateMetadata({ params }: Props) {

  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "aboutPage.meta" });



  return buildPageMetadata({

    locale,

    title: t("title"),

    description: t("description"),

    path: "/about",

  });

}



export default async function Page({ params }: Props) {

  const { locale } = await params;

  setRequestLocale(locale);



  const t = await getTranslations({ locale, namespace: "aboutPage.meta" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            locale,
            path: "/about",
            title: t("title"),
            description: t("description"),
          }),
          buildBreadcrumbSchema(locale, [
            { name: nav("home"), path: "" },
            { name: nav("about"), path: "/about" },
          ]),
        ]}
      />

      <AboutPage />

    </>

  );

}


