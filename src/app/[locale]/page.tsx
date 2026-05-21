import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/pages";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildHomeItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            locale,
            path: "",
            title: t("title"),
            description: t("description"),
          }),
          buildHomeItemListSchema(locale),
        ]}
      />
      <HomePage />
    </>
  );
}
