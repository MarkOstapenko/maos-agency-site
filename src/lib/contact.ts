import { escapeTelegramHtml } from "@/lib/telegram";

export const CONTACT_LIMITS = {
  name: 100,
  company: 120,
  telegram: 64,
  message: 2000,
} as const;

export type ContactProjectType =
  | "automation"
  | "telegramBot"
  | "crm"
  | "aiSales"
  | "aiContent"
  | "aiSystem"
  | "other";

export type ContactBudgetRange =
  | "under5k"
  | "5k_15k"
  | "15k_50k"
  | "50k_plus"
  | "discuss";

export type ContactFormData = {
  name: string;
  company?: string;
  telegram: string;
  projectType: ContactProjectType;
  budget: ContactBudgetRange;
  message: string;
  locale?: string;
  source?: string;
  website?: string;
};

const TELEGRAM_USERNAME_RE = /^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/;

export const PROJECT_TYPES: ContactProjectType[] = [
  "automation",
  "telegramBot",
  "crm",
  "aiSales",
  "aiContent",
  "aiSystem",
  "other",
];

export const BUDGET_RANGES: ContactBudgetRange[] = [
  "under5k",
  "5k_15k",
  "15k_50k",
  "50k_plus",
  "discuss",
];

export type ContactValidationError =
  | "name_required"
  | "name_too_long"
  | "company_too_long"
  | "telegram_required"
  | "telegram_invalid"
  | "telegram_too_long"
  | "project_type_required"
  | "project_type_invalid"
  | "budget_required"
  | "budget_invalid"
  | "message_required"
  | "message_too_long"
  | "honeypot";

export function normalizeTelegramUsername(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

export function validateContactPayload(
  body: unknown
): { ok: true; data: ContactFormData } | { ok: false; error: ContactValidationError } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "name_required" };
  }

  const raw = body as Record<string, unknown>;

  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return { ok: false, error: "honeypot" };
  }

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const company =
    typeof raw.company === "string" ? raw.company.trim() : undefined;
  const telegramRaw =
    typeof raw.telegram === "string" ? raw.telegram.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const locale = typeof raw.locale === "string" ? raw.locale.trim() : undefined;
  const source = typeof raw.source === "string" ? raw.source.trim() : undefined;
  const projectTypeRaw =
    typeof raw.projectType === "string" ? raw.projectType.trim() : "";
  const budgetRaw = typeof raw.budget === "string" ? raw.budget.trim() : "";

  if (!name) return { ok: false, error: "name_required" };
  if (name.length > CONTACT_LIMITS.name) return { ok: false, error: "name_too_long" };

  if (company && company.length > CONTACT_LIMITS.company) {
    return { ok: false, error: "company_too_long" };
  }

  if (!telegramRaw) return { ok: false, error: "telegram_required" };
  const telegram = normalizeTelegramUsername(telegramRaw);
  if (telegram.length > CONTACT_LIMITS.telegram) {
    return { ok: false, error: "telegram_too_long" };
  }
  if (!TELEGRAM_USERNAME_RE.test(telegram)) {
    return { ok: false, error: "telegram_invalid" };
  }

  if (!projectTypeRaw) return { ok: false, error: "project_type_required" };
  if (!PROJECT_TYPES.includes(projectTypeRaw as ContactProjectType)) {
    return { ok: false, error: "project_type_invalid" };
  }

  if (!budgetRaw) return { ok: false, error: "budget_required" };
  if (!BUDGET_RANGES.includes(budgetRaw as ContactBudgetRange)) {
    return { ok: false, error: "budget_invalid" };
  }

  if (!message) return { ok: false, error: "message_required" };
  if (message.length > CONTACT_LIMITS.message) {
    return { ok: false, error: "message_too_long" };
  }

  return {
    ok: true,
    data: {
      name,
      company: company || undefined,
      telegram,
      projectType: projectTypeRaw as ContactProjectType,
      budget: budgetRaw as ContactBudgetRange,
      message,
      locale,
      source,
    },
  };
}

export function contactErrorField(
  error: ContactValidationError
): "name" | "company" | "telegram" | "projectType" | "budget" | "message" | null {
  switch (error) {
    case "name_required":
    case "name_too_long":
      return "name";
    case "company_too_long":
      return "company";
    case "telegram_required":
    case "telegram_invalid":
    case "telegram_too_long":
      return "telegram";
    case "project_type_required":
    case "project_type_invalid":
      return "projectType";
    case "budget_required":
    case "budget_invalid":
      return "budget";
    case "message_required":
    case "message_too_long":
      return "message";
    default:
      return null;
  }
}

export function formatContactTelegramMessage(
  data: ContactFormData,
  labels: { projectType: string; budget: string }
): string {
  const lines = [
    "<b>🆕 New lead — MaOs website</b>",
    "",
    `<b>Name:</b> ${escapeTelegramHtml(data.name)}`,
    `<b>Telegram:</b> ${escapeTelegramHtml(data.telegram)}`,
  ];

  if (data.company) {
    lines.push(`<b>Company:</b> ${escapeTelegramHtml(data.company)}`);
  }

  lines.push(
    `<b>Project:</b> ${escapeTelegramHtml(labels.projectType)}`,
    `<b>Budget:</b> ${escapeTelegramHtml(labels.budget)}`,
    "",
    `<b>Message:</b>`,
    escapeTelegramHtml(data.message),
    "",
    `<b>Locale:</b> ${escapeTelegramHtml(data.locale ?? "—")}`,
    `<b>Source:</b> ${escapeTelegramHtml(data.source ?? "contact-form")}`
  );

  return lines.join("\n");
}
