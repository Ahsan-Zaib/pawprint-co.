import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Pet Services — Grooming, Walking, Sitting & More | Pawprint & Co." },
      { name: "description", content: "Explore dog grooming, dog walking, pet sitting, daycare, boarding and pet transport from Pawprint & Co." },
      { property: "og:title", content: "Pet Services | Pawprint & Co." },
      { property: "og:description", content: "Every service tailored to your pet's needs, temperament and routine." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Thoughtful care for every paw">
        Choose one service or combine several — all tailored to your pet.
      </PageHero>
      <div className="container-page space-y-10 py-16">
        {services.map((s, i) => (
          <article key={s.slug} className={`grid items-center gap-8 overflow-hidden rounded-4xl p-6 md:grid-cols-2 md:p-10 ${s.tone === "mint" ? "bg-secondary" : "bg-accent"}`}>
            <img src={s.image} alt={s.name} loading="lazy" width={1024} height={768} className={`aspect-[4/3] w-full rounded-3xl object-cover shadow-soft ${i % 2 ? "md:order-2" : ""}`} />
            <div>
              <h2 className="text-3xl font-semibold">{s.emoji} {s.name}</h2>
              <p className="mt-3 text-foreground/80">{s.short}</p>
              <ul className="mt-5 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
                {s.items.slice(0, 8).map((it) => <li key={it}>• {it}</li>)}
              </ul>
              {s.note && <p className="mt-4 rounded-xl bg-card/70 p-3 text-xs">{s.note}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="outline" className="rounded-full bg-card"><Link to="/services/$slug" params={{ slug: s.slug }}>Learn More</Link></Button>
                <Button asChild className="rounded-full"><Link to="/book" search={{ service: s.slug }}>Book This Service</Link></Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
