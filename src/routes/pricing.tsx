import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Quote Calculator | Pawprint & Co." },
      { name: "description", content: "Get an instant estimate for grooming, walking, pet sitting, daycare and pet transport." },
      { property: "og:title", content: "Instant Pet Care Quote | Pawprint & Co." },
      { property: "og:description", content: "Transparent pricing — build your quote and continue straight to booking." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Transparent pricing" title="Build your quote">
        Select your pets, services and extras to see an instant estimate. Example prices are shown while we finalise our price list.
      </PageHero>
      <div className="container-page py-14">
        <QuoteCalculator />
      </div>
    </>
  ),
});
