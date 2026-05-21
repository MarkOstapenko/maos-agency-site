"use client";

import { useMemo, useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { MotionStagger, MotionItem, MotionReveal } from "@/components/ui/motion";
import { ROI_LIMITS, calculateRoi, clampRoiInput } from "@/lib/roi-calculator";
import { AnimatedValue } from "./roi/AnimatedValue";
import { RoiSlider } from "./roi/RoiSlider";

export function RoiCalculator() {
  const t = useTranslations("roiCalculator");
  const locale = useLocale();

  const [employees, setEmployees] = useState<number>(ROI_LIMITS.employees.default);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(ROI_LIMITS.hoursPerWeek.default);
  const [hourlyCost, setHourlyCost] = useState<number>(ROI_LIMITS.hourlyCost.default);
  const [automationPercent, setAutomationPercent] = useState<number>(
    ROI_LIMITS.automationPercent.default
  );

  const inputs = useMemo(
    () => ({
      employees: clampRoiInput(
        employees,
        ROI_LIMITS.employees.min,
        ROI_LIMITS.employees.max
      ),
      hoursPerWeek: clampRoiInput(
        hoursPerWeek,
        ROI_LIMITS.hoursPerWeek.min,
        ROI_LIMITS.hoursPerWeek.max
      ),
      hourlyCost: clampRoiInput(
        hourlyCost,
        ROI_LIMITS.hourlyCost.min,
        ROI_LIMITS.hourlyCost.max
      ),
      automationPercent: clampRoiInput(
        automationPercent,
        ROI_LIMITS.automationPercent.min,
        ROI_LIMITS.automationPercent.max
      ),
    }),
    [employees, hoursPerWeek, hourlyCost, automationPercent]
  );

  const results = useMemo(() => calculateRoi(inputs), [inputs]);

  const moneyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-US", {
        style: "currency",
        currency: locale === "uk" ? "UAH" : "USD",
        maximumFractionDigits: 0,
      }),
    [locale]
  );

  const formatMoney = (n: number) => moneyFormatter.format(Math.round(n));
  const formatHours = (n: number) =>
    Math.round(n).toLocaleString(locale === "uk" ? "uk-UA" : "en-US");

  const weeksPerMonthDisplay = (52 / 12).toFixed(2).replace(/\.?0+$/, "");

  return (
    <ParallaxSection id="roi-calculator" className="section-band section-y section-defer relative overflow-hidden">
      <SectionAtmosphere variant="roi" />
      <div className="roi-calculator-glow pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative">
        <Parallax speed="subtle" className="section-head">
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Parallax>

        <MotionStagger className="section-grid lg:grid-cols-2">
          <MotionItem>
            <PremiumCard as="section" className="h-full">
              <div className="card-pad">
                <div className="mb-6 flex items-center gap-3">
                  <div className="premium-card-icon h-11 w-11">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-off-white">{t("inputsTitle")}</h3>
                </div>

                <div className="space-y-6 sm:space-y-7">
                  <RoiSlider
                    id="roi-employees"
                    label={t("fields.employees")}
                    hint={t("hints.employees")}
                    value={inputs.employees}
                    min={ROI_LIMITS.employees.min}
                    max={ROI_LIMITS.employees.max}
                    displayValue={String(inputs.employees)}
                    onChange={setEmployees}
                  />
                  <RoiSlider
                    id="roi-hours"
                    label={t("fields.hoursPerWeek")}
                    hint={t("hints.hoursPerWeek")}
                    value={inputs.hoursPerWeek}
                    min={ROI_LIMITS.hoursPerWeek.min}
                    max={ROI_LIMITS.hoursPerWeek.max}
                    unit={t("units.hours")}
                    displayValue={String(inputs.hoursPerWeek)}
                    onChange={setHoursPerWeek}
                  />
                  <RoiSlider
                    id="roi-cost"
                    label={t("fields.hourlyCost")}
                    hint={t("hints.hourlyCost")}
                    value={inputs.hourlyCost}
                    min={ROI_LIMITS.hourlyCost.min}
                    max={ROI_LIMITS.hourlyCost.max}
                    step={5}
                    unit={locale === "uk" ? "₴/год" : "$/hr"}
                    displayValue={String(inputs.hourlyCost)}
                    onChange={setHourlyCost}
                  />
                  <RoiSlider
                    id="roi-automation"
                    label={t("fields.automationPercent")}
                    hint={t("hints.automationPercent")}
                    value={inputs.automationPercent}
                    min={ROI_LIMITS.automationPercent.min}
                    max={ROI_LIMITS.automationPercent.max}
                    step={5}
                    unit="%"
                    displayValue={String(inputs.automationPercent)}
                    onChange={setAutomationPercent}
                  />
                </div>
              </div>
            </PremiumCard>
          </MotionItem>

          <MotionItem>
            <PremiumCard featured as="section" className="roi-results-card h-full">
              <div className="card-pad flex h-full flex-col">
                <div className="mb-6 flex items-center gap-3">
                  <div className="premium-card-icon premium-card-icon-featured h-11 w-11">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-off-white">{t("outputsTitle")}</h3>
                </div>

                <div className="grid flex-1 gap-4 sm:grid-cols-1">
                  <div className="roi-output-block">
                    <p className="roi-output-label">{t("outputs.hoursMonth")}</p>
                    <p className="roi-output-value font-mono text-3xl font-semibold text-primary sm:text-4xl">
                      <AnimatedValue
                        value={results.monthlyHoursSaved}
                        format={(n) => formatHours(n)}
                      />
                      <span className="ml-2 text-base font-normal text-muted">
                        {t("units.hours")}
                      </span>
                    </p>
                  </div>

                  <div className="roi-output-block">
                    <p className="roi-output-label">{t("outputs.moneyMonth")}</p>
                    <p className="roi-output-value font-mono text-3xl font-semibold text-off-white sm:text-4xl">
                      <AnimatedValue
                        value={results.monthlyMoneySaved}
                        format={formatMoney}
                      />
                    </p>
                  </div>

                  <div className="roi-output-block roi-output-block-featured">
                    <p className="roi-output-label">{t("outputs.moneyYear")}</p>
                    <p className="roi-output-value font-mono text-3xl font-semibold text-primary sm:text-[2.5rem]">
                      <AnimatedValue
                        value={results.yearlyMoneySaved}
                        format={formatMoney}
                      />
                    </p>
                  </div>
                </div>

                <p className="text-caption mt-6 border-t border-white/6 pt-4 leading-relaxed">
                  {t("disclaimer")}
                </p>
              </div>
            </PremiumCard>
          </MotionItem>
        </MotionStagger>

        <MotionReveal className="mt-6 sm:mt-8">
          <div className="roi-formulas-panel rounded-2xl border border-white/8 bg-black/40 p-5 sm:p-6">
            <p className="premium-eyebrow text-primary/90">{t("formulas.title")}</p>
            <ul className="mt-4 space-y-4 font-mono text-xs leading-relaxed text-off-white/80 sm:text-sm">
              <li className="roi-formula-line">
                <span className="text-muted">{t("formulas.weeklyHours")}</span>
                <br />
                <span className="text-primary/90">
                  {inputs.employees} × {inputs.hoursPerWeek} ={" "}
                  {formatHours(results.weeklyRepetitiveHours)} {t("units.hours")}
                  /{t("units.week")}
                </span>
              </li>
              <li className="roi-formula-line">
                <span className="text-muted">{t("formulas.weeklySaved")}</span>
                <br />
                <span className="text-primary/90">
                  {formatHours(results.weeklyRepetitiveHours)} × ({inputs.automationPercent} ÷ 100) ={" "}
                  {formatHours(results.weeklyHoursSaved)} {t("units.hours")}
                  /{t("units.week")}
                </span>
              </li>
              <li className="roi-formula-line">
                <span className="text-muted">{t("formulas.monthlyHours")}</span>
                <br />
                <span className="text-primary/90">
                  {formatHours(results.weeklyHoursSaved)} × ({weeksPerMonthDisplay}) ≈{" "}
                  {formatHours(results.monthlyHoursSaved)} {t("units.hours")}
                  /{t("units.month")}
                </span>
              </li>
              <li className="roi-formula-line">
                <span className="text-muted">{t("formulas.monthlyMoney")}</span>
                <br />
                <span className="text-primary/90">
                  {formatHours(results.monthlyHoursSaved)} × {formatMoney(inputs.hourlyCost)} ≈{" "}
                  {formatMoney(results.monthlyMoneySaved)}
                </span>
              </li>
              <li className="roi-formula-line">
                <span className="text-muted">{t("formulas.yearlyMoney")}</span>
                <br />
                <span className="text-primary/90">
                  {formatHours(results.weeklyHoursSaved)} × 52 × {formatMoney(inputs.hourlyCost)} ≈{" "}
                  {formatMoney(results.yearlyMoneySaved)}
                </span>
              </li>
            </ul>
            <p className="text-caption mt-4 text-subtle">
              {t("formulas.note", { weeksPerMonth: weeksPerMonthDisplay })}
            </p>
          </div>
        </MotionReveal>
      </Container>
    </ParallaxSection>
  );
}
