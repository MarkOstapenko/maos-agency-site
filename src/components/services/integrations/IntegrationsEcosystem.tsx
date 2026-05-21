"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { easeOut } from "@/lib/motion";
import {
  INTEGRATION_ICONS,
  INTEGRATION_POSITIONS,
} from "./integration-layout";
import { IntegrationsConnector } from "./IntegrationsConnector";
import { IntegrationNode } from "./IntegrationNode";

export function IntegrationsEcosystem() {
  const t = useTranslations("servicesPage.integrations");
  const items = t.raw("items") as string[];
  const reduceMotion = useReducedMotion();

  return (
    <div className="integrations-stage">
      <div className="integrations-stage-frame">
        <IntegrationsConnector />

        <motion.div
          className="integrations-hub absolute z-20"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <span className="integrations-hub-ring pointer-events-none" aria-hidden />
          <span className="integrations-hub-glow pointer-events-none" aria-hidden />
          <span className="integrations-hub-core-panel">
            <BrandLogo size={36} className="h-9 w-9" />
            <span className="integrations-hub-label">{t("hubLabel")}</span>
          </span>
        </motion.div>

        {items.map((label, index) => (
          <IntegrationNode
            key={label}
            label={label}
            icon={INTEGRATION_ICONS[index] ?? INTEGRATION_ICONS[0]}
            position={INTEGRATION_POSITIONS[index] ?? INTEGRATION_POSITIONS[0]}
            index={index}
          />
        ))}
      </div>

      <div className="integrations-mobile-grid md:hidden">
        {items.map((label, index) => {
          const Icon = INTEGRATION_ICONS[index] ?? INTEGRATION_ICONS[0];
          return (
            <span key={label} className="integrations-mobile-chip">
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary/80" strokeWidth={1.75} />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
