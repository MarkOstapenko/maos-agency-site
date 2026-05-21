import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesPage } from "@/components/pages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesPage />;
}
