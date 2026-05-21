"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BentoPreviewVariant =
  | "sales"
  | "crm"
  | "telegram"
  | "support"
  | "content"
  | "analytics"
  | "api"
  | "leads";

type BentoPreviewProps = {
  variant: BentoPreviewVariant;
  active?: boolean;
};

export function BentoPreview({ variant, active }: BentoPreviewProps) {
  switch (variant) {
    case "sales":
      return <SalesPreview active={active} />;
    case "crm":
      return <CrmPreview active={active} />;
    case "telegram":
      return <TelegramPreview active={active} />;
    case "support":
      return <SupportPreview active={active} />;
    case "content":
      return <ContentPreview active={active} />;
    case "analytics":
      return <AnalyticsPreview active={active} />;
    case "api":
      return <ApiPreview active={active} />;
    case "leads":
      return <LeadsPreview active={active} />;
  }
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bento-mock-panel", className)}>{children}</div>;
}

function SalesPreview({ active }: { active?: boolean }) {
  const bars = [40, 65, 45, 80, 55, 92];
  return (
    <Panel>
      <div className="mb-2 flex justify-between font-mono text-[9px] text-muted">
        <span>Pipeline</span>
        <span className="text-primary">+24%</span>
      </div>
      <div className="flex h-14 items-end gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-primary/80"
            initial={false}
            animate={{ height: active ? `${h}%` : `${h * 0.6}%` }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          />
        ))}
      </div>
    </Panel>
  );
}

function CrmPreview({ active }: { active?: boolean }) {
  const cols = ["Lead", "Deal", "Won"];
  return (
    <Panel>
      <div className="flex gap-1.5">
        {cols.map((col, i) => (
          <motion.div
            key={col}
            className="flex-1 rounded-lg border border-white/6 bg-black/40 p-2"
            animate={{
              borderColor: active && i <= 1 ? "rgb(227 42 57 / 0.35)" : "rgb(255 255 255 / 0.06)",
            }}
          >
            <p className="text-[8px] text-muted">{col}</p>
            <div className="mt-1.5 h-1 rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: active ? `${(i + 1) * 30}%` : "20%" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function TelegramPreview({ active }: { active?: boolean }) {
  return (
    <Panel>
      <div className="space-y-1.5">
        {["Заявка · новий лід", "AI: уточнюю деталі…"].map((text, i) => (
          <motion.div
            key={i}
            className={cn(
              "rounded-lg px-2 py-1 text-[9px]",
              i === 1 ? "ml-auto max-w-[85%] bg-primary/15 text-off-white" : "bg-white/5 text-muted"
            )}
            animate={{ opacity: active ? 1 : 0.5 }}
            transition={{ delay: i * 0.1 }}
          >
            {text}
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function SupportPreview({ active }: { active?: boolean }) {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/15 text-[9px] font-bold text-primary">
          AI
        </div>
        <motion.p
          className="text-[9px] text-off-white/80"
          animate={{ opacity: active ? [0.5, 1, 0.5] : 0.6 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          94% resolved · escalate ready
        </motion.p>
      </div>
    </Panel>
  );
}

function ContentPreview({ active }: { active?: boolean }) {
  const lines = ["Post · ready", "Email 3/5", "SEO draft…"];
  return (
    <Panel>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            className="rounded border border-white/5 bg-black/40 px-2 py-1 font-mono text-[9px] text-off-white/75"
            animate={{ opacity: active ? 1 : i === 0 ? 0.65 : 0.35 }}
            transition={{ delay: i * 0.08 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function AnalyticsPreview({ active }: { active?: boolean }) {
  return (
    <Panel className="min-h-[100px]">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Leads", value: "128" },
          { label: "Conv.", value: "34%" },
          { label: "ROI", value: "4.2×" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-lg border border-white/6 bg-black/45 px-2 py-2 text-center"
            animate={{ borderColor: active ? "rgb(227 42 57 / 0.25)" : "rgb(255 255 255 / 0.06)" }}
            transition={{ delay: i * 0.06 }}
          >
            <p className="text-[8px] text-subtle">{m.label}</p>
            <p className="font-mono text-xs font-semibold text-primary">{m.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex h-8 items-end gap-0.5">
        {[30, 50, 40, 70, 55, 85, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-primary/50"
            style={{ height: active ? `${h}%` : `${h * 0.5}%` }}
          />
        ))}
      </div>
    </Panel>
  );
}

function ApiPreview({ active }: { active?: boolean }) {
  const nodes = ["CRM", "TG", "API"];
  return (
    <Panel>
      <div className="flex items-center justify-center gap-2 py-1">
        {nodes.map((n, i) => (
          <motion.span
            key={n}
            className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-[9px] text-primary"
            animate={{ opacity: active ? 1 : 0.45 }}
            transition={{ delay: i * 0.12 }}
          >
            {n}
          </motion.span>
        ))}
      </div>
      <div className="mx-auto mt-1 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </Panel>
  );
}

function LeadsPreview({ active }: { active?: boolean }) {
  return (
    <Panel>
      <div className="space-y-1.5">
        {[
          { name: "Lead #1842", score: "92%" },
          { name: "Lead #1843", score: "78%" },
        ].map((row, i) => (
          <motion.div
            key={row.name}
            className="flex items-center justify-between rounded-lg border border-white/6 bg-black/40 px-2 py-1"
            animate={{ opacity: active ? 1 : 0.4 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="font-mono text-[9px] text-muted">{row.name}</span>
            <span className="text-[9px] font-semibold text-primary">{row.score}</span>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}
