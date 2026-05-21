import { NextResponse } from "next/server";
import {
  formatContactTelegramMessage,
  validateContactPayload,
  type ContactBudgetRange,
  type ContactFormData,
  type ContactProjectType,
} from "@/lib/contact";
import { sendTelegramMessage } from "@/lib/telegram";

/**
 * POST /api/contact — website lead form → Telegram.
 *
 * TODO: Configure Telegram in environment variables (see `.env.example`):
 *   - TELEGRAM_BOT_TOKEN — from @BotFather
 *   - TELEGRAM_CHAT_ID   — your user or group chat id (getUpdates after messaging the bot)
 *
 * Until both are set, submissions return 503 `{ error: "not_configured" }`.
 */

const PROJECT_TYPE_LABELS: Record<
  string,
  Record<ContactProjectType, string>
> = {
  uk: {
    automation: "Загальна автоматизація",
    telegramBot: "Telegram-бот",
    crm: "CRM automation",
    aiSales: "AI sales assistant",
    aiContent: "AI content system",
    aiSystem: "AI-система під ключ",
    other: "Інше",
  },
  en: {
    automation: "General automation",
    telegramBot: "Telegram bot",
    crm: "CRM automation",
    aiSales: "AI sales assistant",
    aiContent: "AI content system",
    aiSystem: "Full AI system",
    other: "Other",
  },
};

const BUDGET_LABELS: Record<string, Record<ContactBudgetRange, string>> = {
  uk: {
    under5k: "До $5 000",
    "5k_15k": "$5 000 – $15 000",
    "15k_50k": "$15 000 – $50 000",
    "50k_plus": "$50 000+",
    discuss: "Обговоримо на дзвінку",
  },
  en: {
    under5k: "Under $5,000",
    "5k_15k": "$5,000 – $15,000",
    "15k_50k": "$15,000 – $50,000",
    "50k_plus": "$50,000+",
    discuss: "Let's discuss on a call",
  },
};

function localizedLabels(data: ContactFormData) {
  const locale = data.locale === "en" ? "en" : "uk";
  return {
    projectType:
      PROJECT_TYPE_LABELS[locale][data.projectType] ?? data.projectType,
    budget: BUDGET_LABELS[locale][data.budget] ?? data.budget,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const validated = validateContactPayload(body);
  if (!validated.ok) {
    if (validated.error === "honeypot") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const text = formatContactTelegramMessage(
    validated.data,
    localizedLabels(validated.data)
  );

  // TODO: Requires TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID — see sendTelegramMessage()
  const result = await sendTelegramMessage(text);

  if (!result.ok) {
    if (result.error === "not_configured") {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
