export type SectionAtmosphereVariant =
  | "default"
  | "features"
  | "testimonials"
  | "cta"
  | "caseStudies"
  | "bento"
  | "workflow"
  | "roi"
  | "voice"
  | "values"
  | "services"
  | "subpage"
  | "audit"
  | "story";

export type VisualAnchorType = "holo-metric" | "holo-live" | "holo-spark" | "float-chip";
export type VisualAnchorPosition =
  | "top-right"
  | "top-left"
  | "center-right"
  | "bottom-left"
  | "bottom-right";

export type SectionAnchorSpec = {
  type: VisualAnchorType;
  position: VisualAnchorPosition;
};

export type SectionAtmosphereConfig = {
  glow: "center" | "left" | "right" | "soft";
  holoFrame?: boolean;
  anchors: SectionAnchorSpec[];
};

export const SECTION_ATMOSPHERE: Record<
  SectionAtmosphereVariant,
  SectionAtmosphereConfig
> = {
  default: {
    glow: "soft",
    anchors: [{ type: "float-chip", position: "top-right" }],
  },
  features: {
    glow: "right",
    holoFrame: true,
    anchors: [
      { type: "holo-spark", position: "top-right" },
      { type: "float-chip", position: "bottom-left" },
    ],
  },
  testimonials: {
    glow: "center",
    anchors: [
      { type: "holo-live", position: "top-left" },
      { type: "holo-metric", position: "bottom-right" },
    ],
  },
  cta: {
    glow: "soft",
    holoFrame: true,
    anchors: [
      { type: "holo-metric", position: "top-right" },
      { type: "float-chip", position: "bottom-left" },
    ],
  },
  caseStudies: {
    glow: "left",
    anchors: [{ type: "holo-spark", position: "center-right" }],
  },
  bento: {
    glow: "right",
    anchors: [
      { type: "holo-live", position: "top-right" },
      { type: "float-chip", position: "bottom-left" },
    ],
  },
  workflow: {
    glow: "center",
    holoFrame: true,
    anchors: [{ type: "holo-metric", position: "top-right" }],
  },
  roi: {
    glow: "left",
    anchors: [
      { type: "holo-spark", position: "top-right" },
      { type: "float-chip", position: "bottom-left" },
    ],
  },
  voice: {
    glow: "right",
    anchors: [{ type: "holo-live", position: "bottom-right" }],
  },
  values: {
    glow: "soft",
    anchors: [{ type: "holo-metric", position: "top-right" }],
  },
  services: {
    glow: "right",
    anchors: [
      { type: "holo-live", position: "top-left" },
      { type: "float-chip", position: "bottom-right" },
    ],
  },
  subpage: {
    glow: "soft",
    holoFrame: true,
    anchors: [{ type: "holo-spark", position: "center-right" }],
  },
  audit: {
    glow: "center",
    anchors: [{ type: "holo-live", position: "top-right" }],
  },
  story: {
    glow: "left",
    holoFrame: true,
    anchors: [{ type: "float-chip", position: "bottom-right" }],
  },
};
