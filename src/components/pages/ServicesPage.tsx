import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { ServicesHero, ServicesCore, ServicesGrid } from "@/components/services";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const ServicesProcess = dynamic(
  () =>
    import("@/components/services/ServicesProcess").then((m) => ({
      default: m.ServicesProcess,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[24rem]" /> }
);

const ServicesIntegrations = dynamic(
  () =>
    import("@/components/services/ServicesIntegrations").then((m) => ({
      default: m.ServicesIntegrations,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[20rem]" /> }
);

const ServicesCta = dynamic(
  () =>
    import("@/components/services/ServicesCta").then((m) => ({
      default: m.ServicesCta,
    })),
  { loading: () => <SectionSkeleton minHeight="min-h-[16rem]" className="section-y-sm" /> }
);

export function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesCore />
      <section className="section-y-sm section-defer relative overflow-hidden pt-0">
        <SectionAtmosphere variant="default" />
        <Container className="relative">
          <ServicesGrid />
        </Container>
      </section>
      <ServicesProcess />
      <ServicesIntegrations />
      <ServicesCta />
    </>
  );
}
