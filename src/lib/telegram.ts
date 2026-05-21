/**
 * Telegram Bot API helper for contact form notifications.
 *
 * TODO: Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in `.env` (see `.env.example`).
 */
const TELEGRAM_API = "https://api.telegram.org/bot";

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(
  text: string
): Promise<{ ok: true } | { ok: false; error: "not_configured" | "telegram_error" }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token?.trim() || !chatId?.trim()) {
    return { ok: false, error: "not_configured" };
  }

  const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    return { ok: false, error: "telegram_error" };
  }

  const data = (await res.json()) as { ok?: boolean };
  if (!data.ok) {
    return { ok: false, error: "telegram_error" };
  }

  return { ok: true };
}
