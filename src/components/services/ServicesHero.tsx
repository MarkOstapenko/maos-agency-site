"use client";

import { useTranslations } from "next-intl";
import { SubpageHero } from "@/components/layout/SubpageHero";

export function ServicesHero() {
  const t = useTranslations("servicesPage.hero");

  return (
    <SubpageHero
      badge={t("badge")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      subtitle={t("subtitle")}
    />
  );
}
