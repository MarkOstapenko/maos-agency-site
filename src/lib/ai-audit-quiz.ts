export const QUIZ_STEPS = [
  "business",
  "processes",
  "leads",
  "crm",
  "automateFirst",
] as const;

export type QuizStepId = (typeof QUIZ_STEPS)[number];

export type BusinessType =
  | "ecommerce"
  | "services"
  | "agency"
  | "education"
  | "other";

export type ProcessType =
  | "leads"
  | "support"
  | "sales"
  | "content"
  | "operations"
  | "data";

export type LeadSource =
  | "telegram"
  | "instagram"
  | "website"
  | "phone"
  | "crm"
  | "mixed";

export type CrmUsage = "yesActive" | "yesBasic" | "spreadsheet" | "none";

export type AutomatePriority =
  | "leadCapture"
  | "crmSync"
  | "aiSupport"
  | "content"
  | "salesAssistant"
  | "reporting";

export type RecommendationId =
  | "telegramFunnel"
  | "crmAutomation"
  | "aiSupport"
  | "contentAutomation"
  | "salesAssistant"
  | "intakeWorkflow";

export type QuizAnswers = {
  business?: BusinessType;
  processes?: ProcessType;
  leads?: LeadSource;
  crm?: CrmUsage;
  automateFirst?: AutomatePriority;
};

export type AuditResult = {
  readinessScore: number;
  summaryKeys: string[];
  recommendations: RecommendationId[];
};

const PRIORITY_TO_REC: Record<AutomatePriority, RecommendationId> = {
  leadCapture: "telegramFunnel",
  crmSync: "crmAutomation",
  aiSupport: "aiSupport",
  content: "contentAutomation",
  salesAssistant: "salesAssistant",
  reporting: "intakeWorkflow",
};

export function isQuizComplete(answers: QuizAnswers): answers is Required<QuizAnswers> {
  return QUIZ_STEPS.every((step) => answers[step] !== undefined);
}

export function getAuditResult(answers: Required<QuizAnswers>): AuditResult {
  const scores: Partial<Record<RecommendationId, number>> = {};

  const add = (id: RecommendationId, points: number) => {
    scores[id] = (scores[id] ?? 0) + points;
  };

  add(PRIORITY_TO_REC[answers.automateFirst], 5);

  switch (answers.processes) {
    case "leads":
      add("telegramFunnel", 4);
      add("intakeWorkflow", 3);
      break;
    case "support":
      add("aiSupport", 4);
      break;
    case "sales":
      add("salesAssistant", 4);
      add("crmAutomation", 2);
      break;
    case "content":
      add("contentAutomation", 4);
      break;
    case "operations":
      add("intakeWorkflow", 3);
      add("crmAutomation", 2);
      break;
    case "data":
      add("intakeWorkflow", 3);
      add("crmAutomation", 2);
      break;
  }

  switch (answers.leads) {
    case "telegram":
      add("telegramFunnel", 4);
      break;
    case "instagram":
    case "website":
      add("telegramFunnel", 2);
      add("intakeWorkflow", 2);
      break;
    case "phone":
      add("intakeWorkflow", 3);
      break;
    case "crm":
      add("crmAutomation", 3);
      break;
    case "mixed":
      add("telegramFunnel", 2);
      add("crmAutomation", 2);
      add("intakeWorkflow", 2);
      break;
  }

  if (answers.crm === "none" || answers.crm === "spreadsheet") {
    add("crmAutomation", 4);
  } else if (answers.crm === "yesBasic") {
    add("crmAutomation", 2);
  }

  if (answers.business === "ecommerce") {
    add("telegramFunnel", 1);
    add("contentAutomation", 1);
  }
  if (answers.business === "education") {
    add("telegramFunnel", 2);
    add("aiSupport", 1);
  }
  if (answers.business === "agency") {
    add("contentAutomation", 2);
    add("crmAutomation", 1);
  }

  const ranked = (
    Object.entries(scores) as [RecommendationId, number][]
  ).sort((a, b) => b[1] - a[1]);

  const recommendations = [
    ...new Set(ranked.map(([id]) => id)),
  ].slice(0, 3) as RecommendationId[];

  while (recommendations.length < 2) {
    const fallback: RecommendationId[] = [
      "telegramFunnel",
      "crmAutomation",
      "aiSupport",
    ];
    const next = fallback.find((id) => !recommendations.includes(id));
    if (!next) break;
    recommendations.push(next);
  }

  const readinessScore = Math.min(
    95,
    Math.round(
      35 +
        (answers.crm === "yesActive" ? 15 : answers.crm === "yesBasic" ? 8 : 0) +
        (answers.leads === "crm" ? 12 : 6) +
        (answers.processes === "data" ? 5 : 10) +
        recommendations.length * 8
    )
  );

  const summaryKeys = [
    `business.${answers.business}`,
    `process.${answers.processes}`,
    `leads.${answers.leads}`,
    `crm.${answers.crm}`,
    `priority.${answers.automateFirst}`,
  ];

  return { readinessScore, summaryKeys, recommendations };
}
