import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = 36,
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={BRAND.logo}
      alt={BRAND.name}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("object-contain", className)}
    />
  );
}
