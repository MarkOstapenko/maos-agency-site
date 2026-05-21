import { Container } from "@/components/ui";
import {
  ServicesHero,
  ServicesCore,
  ServicesGrid,
  ServicesProcess,
  ServicesIntegrations,
  ServicesCta,
} from "@/components/services";

export function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesCore />
      <section className="section-y-sm pt-0">
        <Container>
          <ServicesGrid />
        </Container>
      </section>
      <ServicesProcess />
      <ServicesIntegrations />
      <ServicesCta />
    </>
  );
}
