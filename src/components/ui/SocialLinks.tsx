"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS, type SocialId } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/IconButton";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { easeOut, tapScale } from "@/lib/motion";

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

type SocialCardProps = {
  id: SocialId;
  href: string;
  handle: string;
  label: string;
  index: number;
};

function SocialCard({ id, href, handle, label, index }: SocialCardProps) {
  const Icon = iconMap[id];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (${handle}, opens in new tab)`}
      whileTap={tapScale}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: easeOut }}
      className={cn(
        "social-card group relative flex h-full min-h-[5.5rem] flex-col sm:min-h-[6.25rem]",
        index === 0 && "social-card-featured"
      )}
    >
      <div className="social-card-glow pointer-events-none" aria-hidden />
      <div className="social-card-edge pointer-events-none" aria-hidden />

      <div className="social-card-inner relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="social-card-icon flex shrink-0 items-center justify-center">
            <Icon className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
          </div>
          <ArrowUpRight
            className="social-card-arrow h-4 w-4 shrink-0 text-white/20"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>

        <div className="social-card-copy mt-5 min-w-0 flex-1 sm:mt-6">
          {label && (
            <p className="social-card-platform">{label}</p>
          )}
          <p className="social-card-handle truncate">{handle}</p>
        </div>
      </div>
    </motion.a>
  );
}

type SocialLinksProps = {
  variant?: "inline" | "cards" | "footer";
  className?: string;
  showLabels?: boolean;
};

export function SocialLinks({
  variant = "inline",
  className,
  showLabels = true,
}: SocialLinksProps) {
  const t = useTranslations("social");

  if (variant === "footer") {
    return (
      <div className={cn("footer-social-rail", className)}>
        {SOCIAL_LINKS.map(({ id, href }, index) => {
          const Icon = iconMap[id];
          return (
            <span key={id} className="contents">
              {index > 0 && (
                <span className="footer-social-sep" aria-hidden />
              )}
              <IconButton
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="footer-social-btn"
                label={`${t(id)} (opens in new tab)`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </IconButton>
            </span>
          );
        })}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <MotionStagger
        className={cn(
          "social-cards-grid grid gap-4 sm:grid-cols-3 sm:gap-5",
          className
        )}
      >
        {SOCIAL_LINKS.map(({ id, href, handle }, index) => (
          <MotionItem key={id} className="h-full">
            <SocialCard
              id={id}
              href={href}
              handle={handle}
              label={showLabels ? t(id) : ""}
              index={index}
            />
          </MotionItem>
        ))}
      </MotionStagger>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3.5", className)}>
      {SOCIAL_LINKS.map(({ id, href }) => {
        const Icon = iconMap[id];
        return (
          <IconButton
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            label={`${t(id)} (opens in new tab)`}
          >
            <Icon className="h-[17px] w-[17px]" />
          </IconButton>
        );
      })}
    </div>
  );
}
