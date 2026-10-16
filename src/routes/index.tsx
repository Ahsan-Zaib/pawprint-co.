import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarHeart, Check, Heart, MessageCircle, ShieldCheck, Sparkles, Repeat, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import hero from "@/assets/pets-hero.jpg";
import { services, waLink } from "@/lib/site";
import { faqs } from "@/lib/faq";
import { PawIcon } from "@/components/site/Paw";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Pawprint & Co. — Happy Pets. Happier Humans." },
    { name: "description", content: "Thoughtful pet grooming, joyful dog walks, sitting and daycare. Find your pet's perfect care with Pawprint & Co." },
    { property: "og:title", content: "Pawprint & Co. — Happy Pets. Happier Humans." },
    { property: "og:description", content: "Loving care for every paw, every day. Explore services, get a quote and request a booking." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

function Home() {
  return <>
    <Hero />
    <div className="bg-primary text-primary-foreground">
      <ul className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-5">
        {["A little care. A lot of love.", "Every personality welcome", "Their routine, our priority", "Loving care for every paw"].map((text) => <li key={text} className="flex items-center gap-3 text-sm font-medium"><PawIcon className="size-4 text-mint" />{text}</li>)}
      </ul>
    </div>

    <section className="container-page py-16 md:py-20">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div><p className="eyebrow mb-3">Good days start with good care</p><h2 className="text-4xl font-semibold md:text-5xl">Little paws. Big possibilities.</h2></div>
        <Button asChild variant="outline" className="rounded-full"><Link to="/services">All our services <ArrowRight className="size-4" /></Link></Button>
      </div>
      <div className="service-bento">
        {services.map((s, i) => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className={`service-tile group ${i < 2 ? "service-tile-featured" : ""} ${s.tone === "peach" ? "bg-accent" : "bg-secondary"}`}>
          <div className="service-photo"><img src={s.image} alt={s.name} loading="lazy" width={1024} height={768} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
          <div className="service-copy"><span className="text-xs font-semibold uppercase tracking-wider text-primary/70">0{i + 1} / {i === 0 ? "Fresh & fluffy" : i === 1 ? "Out & about" : i === 2 ? "Home sweet home" : i === 3 ? "Stay & play" : i === 4 ? "On the move" : "A little extra"}</span><h3 className="mt-2 text-2xl font-semibold">{s.name}</h3><p className="mt-2 max-w-sm text-sm text-foreground/75">{s.short}</p><span className="mt-5 flex items-center justify-between text-sm font-semibold">Explore service <span className="grid size-9 place-items-center rounded-full bg-card text-primary transition-transform group-hover:-rotate-45"><ArrowRight className="size-4" /></span></span></div>
        </Link>)}
      </div>
    </section>

    <section className="bg-secondary/40 py-16 md:py-20">
      <div className="container-page grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative"><img src={services[2]?.image} alt="A cat enjoying gentle care at home" width={1024} height={768} loading="lazy" className="aspect-[5/4] w-full rounded-lg object-cover" /><span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-card px-5 py-3 text-sm font-semibold text-primary"><Heart className="size-4 fill-current" /> More than a pet. Part of the family.</span></div>
        <div><p className="eyebrow mb-4">The Pawprint promise</p><h2 className="max-w-lg text-4xl font-semibold md:text-5xl">Their quirks.<br />Their comforts.<br /><span className="text-muted-foreground">Our kind of care.</span></h2><p className="mt-5 max-w-lg text-foreground/75">The enthusiastic tail-waggers. The shy little souls. The sofa-loving seniors. We get to know their personality, so every visit feels like it was made just for them.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">{[[Heart, "Kindness comes first"], [ShieldCheck, "Thoughtful handling"], [Sparkles, "Care that fits their routine"], [MessageCircle, "A friendly hello away"]].map(([Icon, text]) => { const I = Icon as typeof Heart; return <div key={text as string} className="flex items-center gap-3 text-sm font-semibold"><I className="size-5 shrink-0 text-primary" />{text as string}</div>; })}</div><Button asChild variant="link" className="mt-6 px-0"><Link to="/about">Get to know Pawprint & Co. <ArrowRight className="size-4" /></Link></Button></div>
      </div>
    </section>

    <section className="container-page py-16 md:py-20">
      <div className="mb-9"><p className="eyebrow mb-3">A little planning, a lot of tail-wagging</p><h2 className="text-4xl font-semibold md:text-5xl">Their next happy day starts here.</h2></div>
      <QuoteCalculator compact />
    </section>

    <section className="border-y border-border py-14">
      <div className="container-page"><div className="mb-9 flex flex-wrap items-center justify-between gap-5"><h2 className="text-3xl font-semibold">Less hassle. More happy.</h2><p className="text-sm text-muted-foreground">A simple start to a lovely routine.</p></div><ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{["Choose their care", "Tell us about your pet", "Pick a date & time", "We confirm & care"].map((text, i) => <li key={text} className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent font-display text-xl font-semibold text-primary">0{i + 1}</span><p className="font-semibold">{text}</p></li>)}</ol></div>
    </section>

    <section className="container-page grid gap-5 py-16 md:grid-cols-2">
      <div className="rounded-lg bg-accent p-8 md:p-10"><Repeat className="size-7 text-primary" /><h2 className="mt-5 text-3xl font-semibold">A routine they’ll love.</h2><p className="mt-3 max-w-md text-foreground/75">Regular walks, familiar faces and a little more peace of mind. Find the right recurring care for your pet.</p><Button asChild variant="outline" className="mt-6 rounded-full bg-card"><Link to="/pricing">Explore recurring plans <ArrowRight className="size-4" /></Link></Button></div>
      <div className="rounded-lg bg-secondary p-8 md:p-10"><MapPin className="size-7 text-primary" /><h2 className="mt-5 text-3xl font-semibold">Good care, close to home.</h2><p className="mt-3 max-w-md text-foreground/75">Let’s see if we’re in your neighbourhood. Tell us your postcode and the care you’re looking for.</p><Button asChild variant="outline" className="mt-6 rounded-full bg-card"><Link to="/contact">Ask about your area <ArrowRight className="size-4" /></Link></Button></div>
    </section>

    <section className="container-page grid gap-8 pb-16 md:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow mb-3">A few things you might wonder</p><h2 className="text-4xl font-semibold">All ears for<br />your questions.</h2><Button asChild variant="link" className="mt-5 px-0"><Link to="/faq">More questions answered <ArrowRight className="size-4" /></Link></Button></div><Accordion type="single" collapsible>{faqs.slice(0, 5).map((f) => <AccordionItem key={f.q} value={f.q}><AccordionTrigger className="py-5 text-left font-semibold">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion></section>

    <section className="bg-primary py-14 text-primary-foreground"><div className="container-page flex flex-wrap items-center justify-between gap-8"><div><p className="mb-3 text-sm text-mint">Happy Pets. Happier Humans.</p><h2 className="text-4xl font-semibold text-primary-foreground md:text-5xl">Let’s make their tail wag.</h2></div><div className="flex flex-wrap gap-3"><Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/book">Book a Service <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Say hello</a></Button></div></div></section>
  </>;
}

function Hero() {
  const navigate = useNavigate();
  const [pet, setPet] = useState("dog");
  const [service, setService] = useState("dog-grooming");
  const [date, setDate] = useState("");
  return <>
    <section className="home-hero relative overflow-hidden bg-secondary">
      <img src={hero} alt="Happy golden retriever and fluffy ginger cat sitting together" width={1920} height={1024} fetchPriority="high" className="hero-pets absolute inset-0 size-full object-cover" />
      <div className="container-page relative z-10"><div className="hero-copy"><p className="mb-5 flex items-center gap-2 text-sm font-semibold text-primary"><span className="h-2 w-2 rounded-full bg-primary" /> HAPPY PETS. HAPPIER HUMANS.</p><h1 className="hero-title font-semibold">Pawprint <span className="block">&amp; Co.</span></h1><h2 className="mt-4 text-2xl font-medium md:text-3xl">Big love for little paws.</h2><p className="mt-4 max-w-sm text-base leading-relaxed text-foreground/75">Fresh grooms, joyful walks and loving care. A happier everyday for your best friend.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full"><Link to="/book"><CalendarHeart className="size-4" /> Book a Service <ArrowRight className="size-4" /></Link></Button><Button asChild variant="outline" size="lg" className="rounded-full border-primary/25 bg-card/70"><Link to="/pricing">Get a Quote</Link></Button></div><p className="mt-5 flex items-center gap-2 text-xs font-medium text-primary/80"><Check className="size-4" /> Their personality. Their routine. Their care.</p></div></div>
    </section>
    <section className="border-y border-border bg-card"><form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/book", search: { service, pet, date } }); }} className="container-page grid items-end gap-4 py-6 sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_1.3fr_1fr_auto]"><div className="self-center"><p className="font-display text-xl font-semibold text-primary">A happy day awaits.</p><p className="mt-1 text-xs text-muted-foreground">Find their perfect care.</p></div><label className="space-y-2 text-xs font-semibold text-primary">Your companion<select aria-label="Pet type" value={pet} onChange={(e) => setPet(e.target.value)} className="booking-select"><option value="dog">Dog</option><option value="cat">Cat</option><option value="other">Other pet</option></select></label><label className="space-y-2 text-xs font-semibold text-primary">A little of what they love<select aria-label="Service" value={service} onChange={(e) => setService(e.target.value)} className="booking-select">{services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}</select></label><label className="space-y-2 text-xs font-semibold text-primary">Preferred date<Input aria-label="Preferred date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 bg-background" /></label><Button type="submit" className="h-11 rounded-full">Let’s go <ArrowRight className="size-4" /></Button></form></section>
  </>;
}
