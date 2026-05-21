"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import {
  BUDGET_RANGES,
  CONTACT_LIMITS,
  PROJECT_TYPES,
  contactErrorField,
  validateContactPayload,
  type ContactValidationError,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const API_ERROR_KEYS = [
  "name_required",
  "name_too_long",
  "company_too_long",
  "telegram_required",
  "telegram_invalid",
  "telegram_too_long",
  "project_type_required",
  "project_type_invalid",
  "budget_required",
  "budget_invalid",
  "message_required",
  "message_too_long",
  "send_failed",
  "not_configured",
  "network",
] as const;

type ApiErrorKey = (typeof API_ERROR_KEYS)[number];
type FormField = "name" | "company" | "telegram" | "projectType" | "budget" | "message";
type FormStatus = "idle" | "submitting" | "success" | "error";

function isApiErrorKey(key: string): key is ApiErrorKey {
  return (API_ERROR_KEYS as readonly string[]).includes(key);
}

type ContactFormProps = {
  source?: string;
  className?: string;
};

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="form-field-error" role="alert">
      {message}
    </p>
  );
}

function fieldErrorId(source: string, field: FormField) {
  return `${source}-${field}-error`;
}

export function ContactForm({ source = "contact-form", className }: ContactFormProps) {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, string>>>({});

  const errorMessage = (key: string) =>
    isApiErrorKey(key) ? t(`errors.${key}`) : t("errors.send_failed");

  const applyValidationError = (error: ContactValidationError) => {
    const field = contactErrorField(error);
    if (field) {
      setFieldErrors({ [field]: errorMessage(error) });
    } else {
      setErrorKey(error);
    }
    setStatus("error");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorKey(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? "") || undefined,
      telegram: String(fd.get("telegram") ?? ""),
      projectType: String(fd.get("projectType") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      locale,
      source,
      website: String(fd.get("website") ?? ""),
    };

    const validated = validateContactPayload(payload);
    if (!validated.ok) {
      applyValidationError(validated.error);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok && data.ok !== false) {
        setStatus("success");
        form.reset();
        return;
      }

      const err = data.error ?? "send_failed";
      if (isApiErrorKey(err) && contactErrorField(err as ContactValidationError)) {
        applyValidationError(err as ContactValidationError);
      } else {
        setErrorKey(err);
        setStatus("error");
      }
    } catch {
      setErrorKey("network");
      setStatus("error");
    }
  }

  const inputClass = (field: FormField) =>
    cn("form-input", fieldErrors[field] && "form-input--error");

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "contact-form-panel contact-form-success premium-card flex flex-col items-center justify-center p-8 text-center sm:p-12",
          className
        )}
      >
        <div className="contact-form-success-icon flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-off-white">{t("success.title")}</h3>
        <p className="text-body mt-3 max-w-sm">{t("success.description")}</p>
        <a
          href={BRAND.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-premium mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm"
        >
          <MessageCircle className="h-4 w-4" />
          {t("success.telegram")}
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-caption mt-4 underline-offset-4 hover:text-off-white hover:underline"
        >
          {t("success.another")}
        </button>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "contact-form-panel premium-card relative overflow-hidden",
        className
      )}
    >
      <div className="premium-card-glow pointer-events-none" aria-hidden />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-40 w-40 rounded-full bg-primary/4 blur-3xl" />

      <form onSubmit={handleSubmit} className="contact-form relative" noValidate>
        <header className="contact-form-header">
          <div className="contact-form-header-main">
            <p className="premium-eyebrow text-primary/80">{t("badge")}</p>
            <h3 className="contact-form-title">{t("title")}</h3>
            <p className="contact-form-subtitle">{t("subtitle")}</p>
          </div>
          <span className="contact-form-secure">{t("secure")}</span>
        </header>

        <div className="contact-form-body card-pad-lg">

        <AnimatePresence>
          {status === "error" && errorKey && !Object.keys(fieldErrors).length && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="contact-form-banner mb-5 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm text-off-white/90">{errorMessage(errorKey)}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        <div className="contact-form-fields">
          <div>
            <label htmlFor={`${source}-name`} className="form-label">
              {t("fields.name")} <span className="text-primary">*</span>
            </label>
            <input
              id={`${source}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={CONTACT_LIMITS.name}
              disabled={status === "submitting"}
              className={inputClass("name")}
              placeholder={t("placeholders.name")}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={
                fieldErrors.name ? fieldErrorId(source, "name") : undefined
              }
            />
            {fieldErrors.name && (
              <FieldError
                id={fieldErrorId(source, "name")}
                message={fieldErrors.name}
              />
            )}
          </div>

          <div>
            <label htmlFor={`${source}-company`} className="form-label">
              {t("fields.company")}
            </label>
            <input
              id={`${source}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={CONTACT_LIMITS.company}
              disabled={status === "submitting"}
              className={inputClass("company")}
              placeholder={t("placeholders.company")}
              aria-invalid={!!fieldErrors.company}
              aria-describedby={
                fieldErrors.company ? fieldErrorId(source, "company") : undefined
              }
            />
            {fieldErrors.company && (
              <FieldError
                id={fieldErrorId(source, "company")}
                message={fieldErrors.company}
              />
            )}
          </div>

          <div>
            <label htmlFor={`${source}-telegram`} className="form-label">
              {t("fields.telegram")} <span className="text-primary">*</span>
            </label>
            <input
              id={`${source}-telegram`}
              name="telegram"
              type="text"
              required
              autoComplete="off"
              maxLength={CONTACT_LIMITS.telegram}
              disabled={status === "submitting"}
              className={cn(inputClass("telegram"), "font-mono")}
              placeholder={t("placeholders.telegram")}
              aria-invalid={!!fieldErrors.telegram}
              aria-describedby={
                fieldErrors.telegram ? fieldErrorId(source, "telegram") : undefined
              }
            />
            {fieldErrors.telegram && (
              <FieldError
                id={fieldErrorId(source, "telegram")}
                message={fieldErrors.telegram}
              />
            )}
          </div>

          <div>
            <label htmlFor={`${source}-projectType`} className="form-label">
              {t("fields.projectType")} <span className="text-primary">*</span>
            </label>
            <select
              id={`${source}-projectType`}
              name="projectType"
              required
              disabled={status === "submitting"}
              className={cn(inputClass("projectType"), "form-select")}
              defaultValue=""
              aria-invalid={!!fieldErrors.projectType}
              aria-describedby={
                fieldErrors.projectType
                  ? fieldErrorId(source, "projectType")
                  : undefined
              }
            >
              <option value="" disabled>
                {t("placeholders.projectType")}
              </option>
              {PROJECT_TYPES.map((key) => (
                <option key={key} value={key}>
                  {t(`projectTypes.${key}`)}
                </option>
              ))}
            </select>
            {fieldErrors.projectType && (
              <FieldError
                id={fieldErrorId(source, "projectType")}
                message={fieldErrors.projectType}
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={`${source}-budget`} className="form-label">
              {t("fields.budget")} <span className="text-primary">*</span>
            </label>
            <select
              id={`${source}-budget`}
              name="budget"
              required
              disabled={status === "submitting"}
              className={cn(inputClass("budget"), "form-select")}
              defaultValue=""
              aria-invalid={!!fieldErrors.budget}
              aria-describedby={
                fieldErrors.budget ? fieldErrorId(source, "budget") : undefined
              }
            >
              <option value="" disabled>
                {t("placeholders.budget")}
              </option>
              {BUDGET_RANGES.map((key) => (
                <option key={key} value={key}>
                  {t(`budgets.${key}`)}
                </option>
              ))}
            </select>
            {fieldErrors.budget && (
              <FieldError
                id={fieldErrorId(source, "budget")}
                message={fieldErrors.budget}
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={`${source}-message`} className="form-label">
              {t("fields.message")} <span className="text-primary">*</span>
            </label>
            <textarea
              id={`${source}-message`}
              name="message"
              required
              rows={5}
              maxLength={CONTACT_LIMITS.message}
              disabled={status === "submitting"}
              className={cn(inputClass("message"), "form-textarea resize-y")}
              data-lenis-prevent
              placeholder={t("placeholders.message")}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={
                fieldErrors.message ? fieldErrorId(source, "message") : undefined
              }
            />
            {fieldErrors.message && (
              <FieldError
                id={fieldErrorId(source, "message")}
                message={fieldErrors.message}
              />
            )}
          </div>
        </div>

        <div className="contact-form-footer">
          <p className="contact-form-privacy">{t("privacy")}</p>
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            whileHover={status === "submitting" ? undefined : { scale: 1.02, y: -2 }}
            whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
            className="btn-premium btn-shine btn-mobile-full inline-flex w-full shrink-0 items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden />
                <span>{t("submit")}</span>
              </>
            )}
          </motion.button>
        </div>

        <p className="contact-form-alt">
          {t("orTelegram")}{" "}
          <a
            href={BRAND.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {BRAND.telegramHandle}
          </a>
        </p>
        </div>
      </form>

      {status === "submitting" && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black/20 backdrop-blur-[1px]"
          aria-hidden
        />
      )}
    </div>
  );
}
