import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const Features = dynamic(
  () =>
    import("@/components/home/Features").then((m) => ({
      default: m.Features,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[24rem]" /> }
);

const AiSystemsBento = dynamic(
  () =>
    import("@/components/home/AiSystemsBento").then((m) => ({
      default: m.AiSystemsBento,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[32rem]" /> }
);

const RoiCalculator = dynamic(
  () =>
    import("@/components/home/RoiCalculator").then((m) => ({
      default: m.RoiCalculator,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[28rem]" /> }
);

const CaseStudies = dynamic(
  () =>
    import("@/components/home/CaseStudies").then((m) => ({
      default: m.CaseStudies,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[36rem]" /> }
);

const Testimonials = dynamic(
  () =>
    import("@/components/home/Testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[24rem]" /> }
);

const AiWorkflow = dynamic(
  () =>
    import("@/components/home/AiWorkflow").then((m) => ({
      default: m.AiWorkflow,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[32rem]" /> }
);

const AiAuditQuiz = dynamic(
  () =>
    import("@/components/home/AiAuditQuiz").then((m) => ({
      default: m.AiAuditQuiz,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[28rem]" /> }
);

const VoiceAiDemo = dynamic(
  () =>
    import("@/components/home/VoiceAiDemo").then((m) => ({
      default: m.VoiceAiDemo,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[26rem]" /> }
);

const CtaSection = dynamic(
  () =>
    import("@/components/home/CtaSection").then((m) => ({
      default: m.CtaSection,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[18rem]" className="section-y-sm" /> }
);

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <AiSystemsBento />
      <RoiCalculator />
      <CaseStudies />
      <Testimonials />
      <AiWorkflow />
      <AiAuditQuiz />
      <VoiceAiDemo />
      <CtaSection />
    </>
  );
}
