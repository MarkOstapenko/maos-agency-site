"use client";

import { useTranslations } from "next-intl";
import { SubpageHero } from "@/components/layout/SubpageHero";

export function AboutHero() {
  const t = useTranslations("aboutPage.hero");

  return (
    <SubpageHero
      badge={t("badge")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      subtitle={t("subtitle")}
    />
  );
}
