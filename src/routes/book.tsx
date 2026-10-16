import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { addOns, calculateQuote, money, pricingOptions, services, waLink, type Frequency, type PetSize } from "@/lib/site";

type Search = { service?: string | undefined; pet?: string | undefined; date?: string | undefined };

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s["service"] === "string" ? (s["service"] as string) : undefined,
    pet: typeof s["pet"] === "string" ? (s["pet"] as string) : undefined,
    date: typeof s["date"] === "string" ? (s["date"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book an Appointment | Pawprint & Co." },
      { name: "description", content: "Request a grooming, walking, sitting, daycare or transport appointment online in a few easy steps." },
      { property: "og:title", content: "Book Pet Care Online | Pawprint & Co." },
      { property: "og:description", content: "Choose a service, add your pet, pick a time and submit your booking request." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const steps = ["Service", "Pets", "Extras", "Date & time", "Your details", "Pet notes", "Review"];
const slots = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00"];
type Pet = { name: string; type: string; breed: string; size: PetSize };

function BookPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [ref, setRef] = useState<string | null>(null);
  const [optionIds, setOptionIds] = useState<string[]>(() => {
    const first = pricingOptions.find((o) => o.service === search.service);
    return first ? [first.id] : [];
  });
  const [pets, setPets] = useState<Pet[]>([{ name: "", type: search.pet ?? "dog", breed: "", size: "medium" }]);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [date, setDate] = useState(search.date ?? "");
  const [time, setTime] = useState("");
  const [c, setC] = useState({ name: "", email: "", phone: "", address: "", postcode: "" });
  const [notes, setNotes] = useState({ temperament: "", feeding: "", handling: "", other: "" });
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("pawprint-quote");
    if (!raw) return;
    sessionStorage.removeItem("pawprint-quote");
    try {
      const q = JSON.parse(raw);
      setOptionIds(q.optionIds ?? []);
      setAddOnIds(q.addOnIds ?? []);
      setFrequency(q.frequency ?? "one-time");
      setC((p) => ({ ...p, postcode: q.postcode ?? "" }));
      setNotes((n) => ({ ...n, other: q.notes ?? "" }));
      setPets(Array.from({ length: q.pets ?? 1 }, () => ({ name: "", type: q.petType ?? "dog", breed: "", size: q.size ?? "medium" })));
    } catch {
      /* ignore */
    }
  }, []);

  const quote = useMemo(
    () => calculateQuote({ optionIds, pets: pets.length, size: pets[0]?.size ?? "medium", addOnIds, frequency, postcode: c.postcode }),
    [optionIds, pets, addOnIds, frequency, c.postcode],
  );
  const toggle = (arr: string[], id: string) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  const today = new Date().toISOString().slice(0, 10);

  const valid = [
    optionIds.length > 0,
    pets.every((p) => p.name.trim()),
    true,
    !!date && !!time,
    c.name.trim() && /\S+@\S+\.\S+/.test(c.email) && c.phone.trim().length >= 6 && c.postcode.trim(),
    true,
    agree,
  ];

  const submit = () => {
    const reference = "PAW-" + Date.now().toString(36).toUpperCase().slice(-6);
    const booking = { reference, status: "New request", optionIds, pets, addOnIds, frequency, date, time, customer: c, notes, estimate: quote.total, createdAt: new Date().toISOString() };
    const all = JSON.parse(localStorage.getItem("pawprint-bookings") ?? "[]");
    localStorage.setItem("pawprint-bookings", JSON.stringify([booking, ...all]));
    setRef(reference);
    toast.success("Booking request sent!");
    window.scrollTo({ top: 0 });
  };

  if (ref) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-4xl bg-card p-10 text-center shadow-lift">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold text-gold-foreground"><PartyPopper /></span>
          <h1 className="mt-6 text-4xl font-semibold">Request received!</h1>
          <p className="mt-3 text-muted-foreground">Thank you, {c.name.split(" ")[0]}. We'll review availability and confirm your appointment shortly.</p>
          <p className="mt-6 rounded-2xl bg-secondary p-4 font-display text-2xl font-semibold text-primary">{ref}</p>
          <p className="mt-2 text-xs text-muted-foreground">Your booking reference · Status: Awaiting confirmation</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full">
              <a href={waLink(`Hi, I'd like an update on my booking ${ref}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Message us about {ref}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/">Back home</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-hero">
      <div className="container-page py-12 md:py-16">
        <p className="eyebrow">Book an appointment</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Let's plan some loving care</h1>

        <ol className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Booking steps">
          {steps.map((s, i) => (
            <li key={s} className="shrink-0">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  i === step ? "bg-primary text-primary-foreground shadow-soft" : i < step ? "bg-secondary text-primary" : "bg-card text-muted-foreground"
                }`}
                aria-current={i === step ? "step" : undefined}
              >
                <span className="grid size-5 place-items-center rounded-full bg-background/30 text-xs">{i < step ? <Check className="size-3" /> : i + 1}</span>
                {s}
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div key={step} className="animate-in fade-in slide-in-from-bottom-2 rounded-3xl bg-card p-6 shadow-soft duration-300 md:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Choose your service(s)</h2>
                {services.map((s) => (
                  <div key={s.slug}>
                    <p className="mb-2 text-sm font-semibold">{s.emoji} {s.name}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {pricingOptions.filter((o) => o.service === s.slug).map((o) => (
                        <label key={o.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-3 py-2.5 has-[:checked]:border-gold has-[:checked]:bg-gold/20">
                          <Checkbox checked={optionIds.includes(o.id)} onCheckedChange={() => setOptionIds(toggle(optionIds, o.id))} />
                          <span className="text-sm">{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Tell us about your pet{pets.length > 1 && "s"}</h2>
                {pets.map((p, i) => (
                  <div key={i} className="grid gap-3 rounded-2xl bg-muted p-4 sm:grid-cols-2">
                    <Field label="Pet name *"><Input value={p.name} onChange={(e) => setPets(pets.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} /></Field>
                    <Field label="Breed"><Input value={p.breed} onChange={(e) => setPets(pets.map((x, j) => (j === i ? { ...x, breed: e.target.value } : x)))} /></Field>
                    <Field label="Type">
                      <select value={p.type} onChange={(e) => setPets(pets.map((x, j) => (j === i ? { ...x, type: e.target.value } : x)))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                        <option value="dog">Dog</option><option value="cat">Cat</option><option value="other">Other</option>
                      </select>
                    </Field>
                    <Field label="Size">
                      <select value={p.size} onChange={(e) => setPets(pets.map((x, j) => (j === i ? { ...x, size: e.target.value as PetSize } : x)))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                        <option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="giant">Giant</option>
                      </select>
                    </Field>
                    {pets.length > 1 && <button type="button" className="text-left text-sm text-destructive" onClick={() => setPets(pets.filter((_, j) => j !== i))}>Remove</button>}
                  </div>
                ))}
                <Button type="button" variant="outline" className="rounded-full" onClick={() => setPets([...pets, { name: "", type: "dog", breed: "", size: "medium" }])}>+ Add another pet</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Extras &amp; frequency</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {addOns.map((a) => (
                    <label key={a.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-3 py-2.5">
                      <Checkbox checked={addOnIds.includes(a.id)} onCheckedChange={() => setAddOnIds(toggle(addOnIds, a.id))} />
                      <span className="text-sm">{a.label}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{a.price ? `+${money(a.price)}` : "Free"}</span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["one-time", "daily", "weekly", "fortnightly", "monthly", "custom"] as Frequency[]).map((f) => (
                    <button key={f} type="button" onClick={() => setFrequency(f)} className={`rounded-full border px-4 py-2 text-sm capitalize ${frequency === f ? "border-gold bg-gold text-gold-foreground" : "border-border"}`}>
                      {f.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Preferred date &amp; time</h2>
                <Field label="Date *"><Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((s) => (
                    <button key={s} type="button" onClick={() => setTime(s)} className={`rounded-xl border py-2.5 text-sm font-medium ${time === s ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-primary"}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <p className="rounded-xl bg-secondary p-3 text-sm">Live availability isn't connected yet — we'll confirm your exact appointment time after you submit.</p>
              </div>
            )}
            {step === 4 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <h2 className="text-2xl font-semibold sm:col-span-2">Your details</h2>
                <Field label="Full name *"><Input value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} autoComplete="name" /></Field>
                <Field label="Email *"><Input type="email" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} autoComplete="email" /></Field>
                <Field label="Phone *"><Input type="tel" value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} autoComplete="tel" /></Field>
                <Field label="Postcode *"><Input value={c.postcode} onChange={(e) => setC({ ...c, postcode: e.target.value })} autoComplete="postal-code" /></Field>
                <div className="sm:col-span-2"><Field label="Service address / pickup location"><Input value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} autoComplete="street-address" /></Field></div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Anything we should know?</h2>
                <Field label="Temperament & behaviour"><Textarea value={notes.temperament} onChange={(e) => setNotes({ ...notes, temperament: e.target.value })} /></Field>
                <Field label="Feeding routine"><Textarea value={notes.feeding} onChange={(e) => setNotes({ ...notes, feeding: e.target.value })} /></Field>
                <Field label="Handling, access & health notes"><Textarea value={notes.handling} onChange={(e) => setNotes({ ...notes, handling: e.target.value })} /></Field>
                <Field label="Other instructions"><Textarea value={notes.other} onChange={(e) => setNotes({ ...notes, other: e.target.value })} /></Field>
              </div>
            )}
            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Review your request</h2>
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <Row k="Services" v={pricingOptions.filter((o) => optionIds.includes(o.id)).map((o) => o.label).join(", ")} />
                  <Row k="Pets" v={pets.map((p) => `${p.name} (${p.type})`).join(", ")} />
                  <Row k="When" v={`${date} at ${time}`} />
                  <Row k="Frequency" v={frequency} />
                  <Row k="Contact" v={`${c.name} · ${c.phone}`} />
                  <Row k="Location" v={`${c.address} ${c.postcode}`} />
                </dl>
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
                  <span>I agree to the <Link to="/terms" className="underline">terms</Link> and <Link to="/cancellation" className="underline">cancellation policy</Link>, and understand this is a request until confirmed.</span>
                </label>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <Button variant="ghost" className="rounded-full" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft /> Back</Button>
              {step < steps.length - 1 ? (
                <Button className="rounded-full" disabled={!valid[step]} onClick={() => setStep(step + 1)}>Next <ArrowRight /></Button>
              ) : (
                <Button className="rounded-full" disabled={!agree} onClick={submit}>Submit Booking Request</Button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-secondary p-6 shadow-soft lg:sticky lg:top-24">
            <p className="eyebrow">Booking summary</p>
            <ul className="mt-4 space-y-2 text-sm">
              {quote.lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-2"><span>{l.label}</span><span className="font-semibold">{money(l.amount)}</span></li>
              ))}
              {quote.discount > 0 && <li className="flex justify-between"><span>Recurring discount</span><span>−{money(quote.discount)}</span></li>}
            </ul>
            <div className="mt-4 flex items-end justify-between border-t border-primary/20 pt-4">
              <span className="text-sm">Estimated total</span>
              <span className="font-display text-3xl font-semibold text-primary">{money(quote.total)}</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Estimate only, using example prices. Final price confirmed by our team.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-semibold">{label}</Label>
      {children}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className="mt-1 font-medium capitalize">{v || "—"}</dd>
    </div>
  );
}
