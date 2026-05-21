import dynamic from "next/dynamic";
import { AboutHero, AboutStats, AboutStory } from "@/components/about";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const AboutValues = dynamic(
  () =>
    import("@/components/about/AboutValues").then((m) => ({
      default: m.AboutValues,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[22rem]" /> }
);

const AboutContact = dynamic(
  () =>
    import("@/components/about/AboutContact").then((m) => ({
      default: m.AboutContact,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[28rem]" /> }
);

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
      <AboutContact />
    </>
  );
}
