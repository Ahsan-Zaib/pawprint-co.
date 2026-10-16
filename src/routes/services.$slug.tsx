import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getService, money, pricingOptions, services, waLink } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getService(loaderData.slug) : undefined;
    if (!s) return { meta: [{ title: "Service not found | Pawprint & Co." }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${s.name} | Pawprint & Co.` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.name} | Pawprint & Co.` },
        { property: "og:description", content: s.short },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const prices = pricingOptions.filter((o) => o.service === s.slug);
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <Link to="/services" className="eyebrow hover:underline">← All services</Link>
            <h1 className="mt-4 text-4xl font-semibold md:text-6xl">{s.name}</h1>
            <p className="mt-5 text-lg text-foreground/80">{s.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full"><Link to="/book" search={{ service: s.slug }}>Book This Service</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card">
                <a href={waLink(s.waMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Ask on WhatsApp</a>
              </Button>
            </div>
          </div>
          <img src={s.image} alt={s.name} width={1024} height={768} className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-lift" />
        </div>
      </section>

      <div className="container-page grid gap-8 py-16 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Block title="What's included">
            <ul className="grid gap-2 sm:grid-cols-2">
              {s.items.map((i) => (
                <li key={i} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{i}</li>
              ))}
            </ul>
          </Block>
          <Block title="Who it's for">
            <ul className="flex flex-wrap gap-2">{s.suitableFor.map((x) => <li key={x} className="rounded-full bg-secondary px-4 py-1.5 text-sm">{x}</li>)}</ul>
          </Block>
          <Block title="Before your appointment">
            <ul className="list-disc space-y-1 pl-5">{s.preparation.map((x) => <li key={x}>{x}</li>)}</ul>
          </Block>
          <Block title="Safety & limitations" icon={<ShieldCheck className="text-primary" />}>
            <ul className="list-disc space-y-1 pl-5">{s.safety.map((x) => <li key={x}>{x}</li>)}</ul>
          </Block>
          <Block title="FAQs">
            <Accordion type="single" collapsible>
              {s.faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Block>
        </div>
        <aside className="h-fit space-y-4 rounded-3xl bg-secondary p-6 lg:sticky lg:top-24">
          <p className="flex items-center gap-2 text-sm"><Clock className="size-4" /> {s.duration}</p>
          <h2 className="text-2xl font-semibold">Indicative pricing</h2>
          <ul className="space-y-2 text-sm">
            {prices.map((p) => (
              <li key={p.id} className="flex justify-between border-b border-primary/10 pb-2">
                <span>{p.label}</span>
                <span className="font-semibold">{p.quoteOnly ? "On request" : `from ${money(p.base)}`}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">Example prices for demonstration — final price confirmed on booking.</p>
          <Button asChild className="w-full rounded-full"><Link to="/pricing">Get an exact estimate</Link></Button>
        </aside>
      </div>

      <section className="container-page">
        <h2 className="mb-6 text-3xl font-semibold">Related services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="lift rounded-3xl bg-card p-6 shadow-soft">
              <p className="text-2xl">{r.emoji}</p>
              <h3 className="mt-2 text-lg font-semibold">{r.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Block({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">{icon}{title}</h2>
      {children}
    </section>
  );
}
