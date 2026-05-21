"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { MotionReveal } from "@/components/ui/motion";
import {
  QUIZ_STEPS,
  getAuditResult,
  isQuizComplete,
  type QuizAnswers,
  type QuizStepId,
} from "@/lib/ai-audit-quiz";
import { QuizProgress } from "./audit-quiz/QuizProgress";
import { QuizResults } from "./audit-quiz/QuizResults";
import { QuizStepPanel } from "./audit-quiz/QuizStepPanel";

const STEP_OPTIONS: Record<QuizStepId, readonly string[]> = {
  business: ["ecommerce", "services", "agency", "education", "other"],
  processes: ["leads", "support", "sales", "content", "operations", "data"],
  leads: ["telegram", "instagram", "website", "phone", "crm", "mixed"],
  crm: ["yesActive", "yesBasic", "spreadsheet", "none"],
  automateFirst: [
    "leadCapture",
    "crmSync",
    "aiSupport",
    "content",
    "salesAssistant",
    "reporting",
  ],
};

export function AiAuditQuiz() {
  const t = useTranslations("aiAuditQuiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const activeStepId = QUIZ_STEPS[stepIndex];
  const result = useMemo(() => {
    if (!isQuizComplete(answers)) return null;
    return getAuditResult(answers);
  }, [answers]);

  const setAnswer = useCallback((step: QuizStepId, value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (!answers[activeStepId]) return;
    if (stepIndex >= QUIZ_STEPS.length - 1) {
      setShowResults(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }, [activeStepId, answers, stepIndex]);

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      setStepIndex(QUIZ_STEPS.length - 1);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  }, [showResults]);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setStepIndex(0);
    setShowResults(false);
  }, []);

  return (
    <ParallaxSection id="ai-audit" className="section-y section-defer relative overflow-hidden">
      <SectionAtmosphere variant="audit" />
      <div className="quiz-section-glow pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative">
        <Parallax speed="subtle" className="section-head">
          <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionReveal>
          <PremiumCard featured className="quiz-panel mx-auto max-w-3xl">
            <div className="card-pad">
              <div className="mb-6 flex items-center gap-3 border-b border-white/6 pb-6">
                <div className="premium-card-icon premium-card-icon-featured h-11 w-11">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-off-white">{t("panelTitle")}</p>
                  <p className="text-caption mt-0.5">{t("panelSubtitle")}</p>
                </div>
              </div>

              <QuizProgress
                currentStep={showResults ? QUIZ_STEPS.length - 1 : stepIndex}
                totalSteps={QUIZ_STEPS.length}
                activeStepId={showResults ? undefined : activeStepId}
                complete={showResults}
              />

              <div className="mt-8 min-h-[280px] sm:min-h-[300px]">
                <AnimatePresence mode="wait">
                  {showResults && result ? (
                    <QuizResults key="results" result={result} onRestart={handleRestart} />
                  ) : (
                    <QuizStepPanel
                      key={activeStepId}
                      stepId={activeStepId}
                      title={t(`steps.${activeStepId}.title`)}
                      subtitle={t(`steps.${activeStepId}.subtitle`)}
                      options={STEP_OPTIONS[activeStepId]}
                      selected={answers[activeStepId]}
                      onSelect={(value) => setAnswer(activeStepId, value)}
                      onNext={handleNext}
                      onBack={stepIndex > 0 ? handleBack : undefined}
                      isFirst={stepIndex === 0}
                      isLast={stepIndex === QUIZ_STEPS.length - 1}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </PremiumCard>
        </MotionReveal>
      </Container>
    </ParallaxSection>
  );
}
