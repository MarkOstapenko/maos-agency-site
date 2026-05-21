"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PreviewProps = {
  active?: boolean;
};

export function CampRegistrationPreview({ active }: PreviewProps) {
  const steps = [
    { label: "Register", done: true },
    { label: "Pay", done: true },
    { label: "Confirm", done: active },
  ];

  return (
    <div className="case-mock-panel">
      <div className="mb-2 flex items-center justify-between border-b border-white/6 pb-2">
        <span className="font-mono text-[10px] text-muted">Camp registration bot</span>
        <motion.span
          className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] text-primary"
          animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.6 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          live
        </motion.span>
      </div>
      <div className="mb-3 space-y-1.5">
        {[
          { from: "user", text: "Реєстрація на табір 12–18" },
          { from: "bot", text: "Оберіть зміну → оплата → підтвердження" },
        ].map((msg, i) => (
          <motion.div
            key={i}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "max-w-[92%] rounded-xl px-2.5 py-1.5 text-[10px]",
              msg.from === "bot"
                ? "ml-auto bg-primary/15 text-off-white"
                : "bg-white/5 text-muted"
            )}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex-1 rounded-lg border border-white/6 bg-black/40 px-2 py-1.5 text-center"
            animate={{
              borderColor:
                active && step.done ? "rgb(227 42 57 / 0.4)" : "rgb(255 255 255 / 0.06)",
            }}
            transition={{ delay: i * 0.08 }}
          >
            <p className="text-[8px] text-subtle">{step.label}</p>
            <motion.div
              className="mx-auto mt-1 h-1 w-4/5 overflow-hidden rounded-full bg-white/10"
              initial={false}
            >
              <motion.div
                className="h-full bg-primary"
                animate={{ width: active && step.done ? "100%" : "28%" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CrmAutomationPreview({ active }: PreviewProps) {
  const stages = ["Lead", "Qualified", "Deal", "Won"];

  return (
    <div className="case-mock-panel">
      <div className="mb-3 flex justify-between font-mono text-[10px] text-muted">
        <span>Sales CRM pipeline</span>
        <motion.span
          animate={active ? { color: ["#94948c", "#e32a39", "#94948c"] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          auto-sync
        </motion.span>
      </div>
      <div className="flex gap-1.5">
        {stages.map((stage, i) => (
          <motion.div
            key={stage}
            className="flex-1 rounded-lg border border-white/6 bg-black/40 p-2"
            animate={{
              borderColor: active
                ? i <= 2
                  ? "rgb(227 42 57 / 0.45)"
                  : "rgb(255 255 255 / 0.06)"
                : "rgb(255 255 255 / 0.06)",
              backgroundColor:
                active && i <= 2 ? "rgb(227 42 57 / 0.08)" : "rgb(0 0 0 / 0.4)",
            }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <p className="text-[9px] text-muted">{stage}</p>
            <motion.div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10" initial={false}>
              <motion.div
                className="h-full bg-primary"
                animate={{ width: active ? `${(i + 1) * 25}%` : "20%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AiSupportPreview({ active }: PreviewProps) {
  const tickets = [
    { id: "#1842", status: "Resolved", time: "2m" },
    { id: "#1843", status: "AI draft", time: "now" },
  ];

  return (
    <div className="case-mock-panel">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
          <span className="text-[10px] font-bold text-primary">AI</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-muted">Support assistant</p>
          <motion.p
            className="mt-0.5 text-[10px] text-off-white"
            animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.65 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            94% queries answered · escalate to human
          </motion.p>
        </div>
      </div>
      <div className="space-y-1.5">
        {tickets.map((ticket, i) => (
          <motion.div
            key={ticket.id}
            className="flex items-center justify-between rounded-lg border border-white/6 bg-black/45 px-2.5 py-1.5"
            initial={{ opacity: 0.35, x: -6 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: i === 0 ? 0.7 : 0.4, x: 0 }}
            transition={{ delay: active ? i * 0.12 : 0 }}
          >
            <span className="font-mono text-[10px] text-off-white">{ticket.id}</span>
            <span
              className={cn(
                "text-[9px]",
                ticket.status === "AI draft" ? "text-primary" : "text-muted"
              )}
            >
              {ticket.status}
            </span>
            <span className="font-mono text-[9px] text-subtle">{ticket.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AiContentPreview({ active }: PreviewProps) {
  const lines = [
    "▸ Instagram caption — ready",
    "▸ Email sequence — 3/5",
    "▸ Blog outline — generating…",
  ];

  return (
    <div className="case-mock-panel">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted">Content automation</span>
        <motion.span
          className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] text-primary"
          animate={active ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.6 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          batch
        </motion.span>
      </div>
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            className="rounded-lg border border-white/5 bg-black/40 px-2 py-1.5 font-mono text-[10px] text-off-white/80"
            initial={{ opacity: 0.3, x: -8 }}
            animate={
              active ? { opacity: 1, x: 0 } : { opacity: i === 0 ? 0.65 : 0.35, x: 0 }
            }
            transition={{ delay: active ? i * 0.15 : 0, duration: 0.35 }}
          >
            {line}
            {i === 2 && active && (
              <motion.span
                className="ml-1 inline-block h-2 w-0.5 bg-primary"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
