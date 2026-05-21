import { getTranslations, setRequestLocale } from "next-intl/server";

import { ServicesPage } from "@/components/pages";

import { JsonLd } from "@/components/seo/JsonLd";

import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildProfessionalServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";



type Props = { params: Promise<{ locale: string }> };



export async function generateMetadata({ params }: Props) {

  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "servicesPage.meta" });



  return buildPageMetadata({

    locale,

    title: t("title"),

    description: t("description"),

    path: "/services",

  });

}



export default async function Page({ params }: Props) {

  const { locale } = await params;

  setRequestLocale(locale);



  const t = await getTranslations({ locale, namespace: "servicesPage.meta" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            locale,
            path: "/services",
            title: t("title"),
            description: t("description"),
          }),
          buildBreadcrumbSchema(locale, [
            { name: nav("home"), path: "" },
            { name: nav("services"), path: "/services" },
          ]),
          buildProfessionalServiceSchema(locale),
        ]}
      />

      <ServicesPage />

    </>

  );

}


