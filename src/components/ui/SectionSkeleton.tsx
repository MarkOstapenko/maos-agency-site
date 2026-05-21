import { cn } from "@/lib/utils";

type SectionSkeletonProps = {
  className?: string;
  /** Reserved height to limit layout shift while a section chunk loads */
  minHeight?: string;
};

export function SectionSkeleton({
  className,
  minHeight = "min-h-[22rem]",
}: SectionSkeletonProps) {
  return (
    <div
      className={cn("section-y section-defer w-full", minHeight, className)}
      aria-hidden
    />
  );
}
