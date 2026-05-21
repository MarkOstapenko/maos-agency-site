import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/pages";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

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

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/about",
          title: t("title"),
          description: t("description"),
        })}
      />
      <AboutPage />
    </>
  );
}
