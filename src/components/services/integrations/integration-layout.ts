import type { LucideIcon } from "lucide-react";
import {
  Database,
  FileText,
  Mail,
  MessageCircle,
  Plug,
  Sparkles,
  Table2,
  Zap,
} from "lucide-react";

export type IntegrationPosition = {
  x: number;
  y: number;
};

/** Constellation layout (viewBox 0–100) */
export const INTEGRATION_POSITIONS: IntegrationPosition[] = [
  { x: 50, y: 11 },
  { x: 83, y: 20 },
  { x: 91, y: 50 },
  { x: 77, y: 80 },
  { x: 50, y: 89 },
  { x: 23, y: 80 },
  { x: 9, y: 50 },
  { x: 17, y: 20 },
];

export const INTEGRATION_ICONS: LucideIcon[] = [
  MessageCircle,
  Database,
  Mail,
  Table2,
  Zap,
  Sparkles,
  FileText,
  Plug,
];

export const HUB_POSITION = { x: 50, y: 50 };
