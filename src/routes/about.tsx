import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import walking from "@/assets/walking.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Pawprint & Co." },
      { name: "description", content: "Meet Pawprint & Co. — caring, reliable pet care built around your pet's personality." },
      { property: "og:title", content: "About Pawprint & Co." },
      { property: "og:description", content: "Why we believe every pet deserves personal, patient care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="About us" title="Pet care with a whole lot of heart">
        Pawprint &amp; Co. was created for owners who want their pets looked after the way they would do it themselves.
      </PageHero>
      <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2">
        <img src={walking} alt="Carer walking two happy dogs" loading="lazy" width={1024} height={768} className="rounded-4xl object-cover shadow-lift" />
        <div className="space-y-5 text-lg text-foreground/80">
          <h2 className="text-3xl font-semibold">Our promise</h2>
          <p>We treat every pet as an individual — with patience, kindness and respect for their routine.</p>
          <p>We keep communication simple, pricing clear and care consistent, so you can relax knowing your best friend is happy.</p>
          <p className="rounded-2xl bg-accent p-4 text-base">Our team profiles, story and credentials will be added here with genuine information.</p>
          <Button asChild className="rounded-full"><Link to="/book">Book a Service</Link></Button>
        </div>
      </div>
    </>
  ),
});
