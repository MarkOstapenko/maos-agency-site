import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-off-white sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-muted">{t("description")}</p>
      <Link href="/" className="btn-ghost-premium mt-8 px-6 py-3 text-sm">
        {t("back")}
      </Link>
    </section>
  );
}
