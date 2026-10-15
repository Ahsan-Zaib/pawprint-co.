import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarHeart, Check, Heart, MessageCircle, ShieldCheck, Sparkles, Star, Repeat, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import hero from "@/assets/hero.jpg";
import { services, waLink } from "@/lib/site";
import { faqs } from "@/lib/faq";
import { PawIcon, PawTrail } from "@/components/site/Paw";
import { SectionTitle } from "@/components/site/PageHero";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pawprint & Co. — Because They're Family, Too" },
      { name: "description", content: "Premium dog grooming, walking, pet sitting, daycare and pet taxi. Get an instant quote and book online." },
      { property: "og:title", content: "Pawprint & Co. — Happy Pets. Happier Humans." },
      { property: "og:description", content: "Loving care for every paw, every day. Instant quotes and online booking." },
    ],
  }),
  component: Home,
});

const trust = ["Care tailored to every pet", "Convenient online bookings", "Clear, transparent pricing", "Friendly, attentive service"];

function Home() {
  return (
    <>
      <Hero />
      <section className="container-page py-20">
        <div className="grid items-center gap-10 rounded-4xl bg-secondary p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="eyebrow mb-3">Personal care</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Every Pet Has a Personality. Every Pet Deserves Personal Care.</h2>
          </div>
          <p className="text-lg text-foreground/80">
            No two pets are the same. We get to know your pet's needs, temperament and routine — and your preferences as an owner — so every
            groom, walk and visit feels familiar, calm and genuinely caring.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionTitle eyebrow="What we do" title="Care for every part of pet life" sub="From fresh grooming to joyful walks and cosy home visits." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group lift overflow-hidden rounded-3xl bg-card shadow-soft">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy" width={1024} height={768} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{s.emoji} {s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-hero py-20">
        <div className="container-page">
          <SectionTitle eyebrow="Quick quote" title="See your estimate in seconds" sub="Pick a service — prices update as you go." />
          <QuoteCalculator compact />
        </div>
      </section>

      <section className="container-page py-20">
        <SectionTitle eyebrow="Why Pawprint & Co." title="Care you can feel good about" />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            [Heart, "Pets treated as family", "Patience, kindness and attention at every visit."],
            [ShieldCheck, "Safety first", "Clear procedures, emergency contacts and careful handling."],
            [Sparkles, "Transparent pricing", "Instant estimates with no hidden surprises."],
            [MessageCircle, "Easy to reach", "Message us on WhatsApp or book online any time."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Heart;
            return (
              <div key={t as string} className="rounded-3xl bg-card p-6 shadow-soft">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-primary"><I /></span>
                <h3 className="mt-4 text-lg font-semibold">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionTitle eyebrow="How it works" title="Booking in four easy steps" />
        <ol className="grid gap-6 md:grid-cols-4">
          {["Choose a service", "Tell us about your pet", "Pick a date & time", "We confirm & care"].map((t, i) => (
            <li key={t} className="relative rounded-3xl border border-border bg-card p-6">
              <span className="font-display text-5xl font-semibold text-gold">0{i + 1}</span>
              <p className="mt-3 font-semibold text-primary">{t}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page py-20">
        <SectionTitle eyebrow="Reviews" title="What pet parents say" />
        <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-card p-10 text-center">
          <div className="flex justify-center gap-1 text-gold">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="fill-current" />)}</div>
          <p className="mt-4 text-lg text-muted-foreground">Genuine customer reviews will appear here once they're collected and approved.</p>
          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link to="/reviews">Share Your Experience</Link>
          </Button>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-4xl bg-accent p-10">
            <Repeat className="size-8 text-primary" />
            <h2 className="mt-4 text-3xl font-semibold">Regular routines, happier pets</h2>
            <p className="mt-3 text-foreground/80">Set up weekly walks, fortnightly grooms or daily visits. Recurring plans may include a discount.</p>
            <Button asChild className="mt-6 rounded-full"><Link to="/pricing">Explore recurring plans</Link></Button>
          </div>
          <div className="rounded-4xl bg-secondary p-10">
            <MapPin className="size-8 text-primary" />
            <h2 className="mt-4 text-3xl font-semibold">Local service area</h2>
            <p className="mt-3 text-foreground/80">We serve our local community. Check your postcode in the quote calculator — travel fees may apply further out.</p>
            <Button asChild variant="outline" className="mt-6 rounded-full bg-card"><Link to="/contact">Ask about your area</Link></Button>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionTitle eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-3xl bg-card px-6 shadow-soft">
          {faqs.slice(0, 5).map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-primary p-10 text-center text-primary-foreground md:p-16">
          <PawIcon className="absolute -right-6 -top-6 size-40 text-primary-foreground/10" />
          <h2 className="text-3xl font-semibold text-primary-foreground md:text-5xl">Ready to give them the best?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-85">Book online in a few minutes, or say hello on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/book">Book a Service</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Chat With Us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [pet, setPet] = useState("dog");
  const [service, setService] = useState<string>("dog-grooming");
  const [date, setDate] = useState("");
  return (
    <section className="bg-hero">
      <div className="container-page grid items-center gap-12 py-12 md:py-20 lg:grid-cols-2">
        <div>
          <PawTrail className="mb-6" />
          <p className="eyebrow mb-4">Happy Pets. Happier Humans.</p>
          <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
            Because They're <em className="text-foreground/80">Family</em>, Too.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/75">
            From fresh grooming and joyful walks to loving pet sitting and everyday care, Pawprint &amp; Co. makes it easier to give your best
            friend the attention, comfort, and happiness they deserve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full"><Link to="/book"><CalendarHeart /> Book a Service</Link></Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/pricing">Get a Quick Quote</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-card">
              <a href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Chat With Us</a>
            </Button>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium">
                <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <img src={hero} alt="Smiling carer hugging a golden retriever with a ginger cat beside them" width={1200} height={1408} className="aspect-[5/6] w-full object-cover" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/book", search: { service, pet, date } });
            }}
            className="relative z-10 mx-4 -mt-24 rounded-3xl bg-card p-5 shadow-lift md:absolute md:-bottom-8 md:-left-10 md:mx-0 md:mt-0 md:w-96"
          >
            <p className="font-display text-lg font-semibold text-primary">Start your booking</p>
            <div className="mt-3 grid gap-3">
              <select aria-label="Pet type" value={pet} onChange={(e) => setPet(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="dog">Dog</option><option value="cat">Cat</option><option value="other">Other pet</option>
              </select>
              <select aria-label="Service" value={service} onChange={(e) => setService(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
              <Input aria-label="Preferred date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Button type="submit" className="rounded-full">Continue <ArrowRight /></Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
