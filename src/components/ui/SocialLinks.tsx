"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS, type SocialId } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cardHover, tapScale } from "@/lib/motion";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.186 1.966c-2.62 0-4.712 2.13-4.712 4.756 0 2.627 2.092 4.758 4.712 4.758 2.62 0 4.713-2.131 4.713-4.758 0-2.626-2.093-4.756-4.713-4.756zm0 7.82c-1.693 0-3.066-1.39-3.066-3.104 0-1.713 1.373-3.103 3.066-3.103 1.692 0 3.065 1.39 3.065 3.103 0 1.714-1.373 3.104-3.065 3.104zm5.422-5.47c-.61 0-1.104.5-1.104 1.117 0 .617.494 1.118 1.104 1.118.61 0 1.105-.501 1.105-1.118 0-.617-.495-1.117-1.105-1.117zM1.966 12.186c0-2.62 2.13-4.712 4.756-4.712 2.627 0 4.758 2.092 4.758 4.712 0 2.62-2.131 4.713-4.758 4.713-2.626 0-4.756-2.093-4.756-4.713zm16.312 0c0-2.62 2.092-4.712 4.756-4.712 2.627 0 4.758 2.092 4.758 4.712 0 2.62-2.131 4.713-4.758 4.713-2.626 0-4.756-2.093-4.756-4.713zM12.186 22.034c-2.62 0-4.712-2.13-4.712-4.756 0-2.627 2.092-4.758 4.712-4.758 2.62 0 4.713 2.131 4.713 4.758 0 2.626-2.093 4.756-4.713 4.756zm0-7.82c1.693 0 3.066 1.39 3.066 3.104 0 1.713-1.373 3.103-3.066 3.103-1.692 0-3.065-1.39-3.065-3.103 0-1.714 1.373-3.104 3.065-3.104zm5.422 5.47c.61 0 1.104-.5 1.104-1.117 0-.617-.494-1.118-1.104-1.118-.61 0-1.105.501-1.105 1.118 0 .617.495 1.117 1.105 1.117z" />
    </svg>
  );
}

const iconMap: Record<SocialId, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  tiktok: TikTokIcon,
  threads: ThreadsIcon,
};

type SocialLinksProps = {
  variant?: "inline" | "cards";
  className?: string;
  showLabels?: boolean;
};

export function SocialLinks({
  variant = "inline",
  className,
  showLabels = true,
}: SocialLinksProps) {
  const t = useTranslations("social");

  if (variant === "cards") {
    return (
      <MotionStagger className={cn("grid gap-3 sm:grid-cols-3", className)}>
        {SOCIAL_LINKS.map(({ id, href, handle }) => {
          const Icon = iconMap[id];
          return (
            <MotionItem key={id}>
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={cardHover}
                whileTap={tapScale}
                className="glass group flex items-center gap-3 rounded-2xl border border-white/10 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.08 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <div className="min-w-0">
                  {showLabels && (
                    <p className="text-xs text-off-white/40">{t(id)}</p>
                  )}
                  <p className="truncate text-sm font-medium text-off-white">{handle}</p>
                </div>
              </motion.a>
            </MotionItem>
          );
        })}
      </MotionStagger>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {SOCIAL_LINKS.map(({ id, href }) => {
        const Icon = iconMap[id];
        return (
          <motion.a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(id)}
            title={t(id)}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={tapScale}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-off-white/60 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <Icon className="h-[18px] w-[18px]" />
          </motion.a>
        );
      })}
    </div>
  );
}
