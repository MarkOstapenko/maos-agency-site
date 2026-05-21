"use client";

import { motion } from "framer-motion";
import { Check, Cpu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const featureKeys = ["f1", "f2", "f3", "f4"] as const;

export function ServicesCore() {
  const t = useTranslations("servicesPage.core");

  return (
    <section className="relative -mt-2 pb-20 sm:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="premium-card border-glow relative overflow-hidden border-primary/20 p-5 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/10 blur-[60px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                <Cpu className="h-3.5 w-3.5" />
                {t("badge")}
              </span>
              <h2 className="text-display-sm mt-5 sm:mt-6">{t("title")}</h2>
              <p className="text-body-lg mt-4 max-w-xl sm:mt-5">
                {t("description")}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {featureKeys.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-black/40 px-4 py-3.5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm leading-relaxed text-off-white/85 sm:text-base">
                    {t(`features.${key}`)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
