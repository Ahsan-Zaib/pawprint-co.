import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PetTypeSelect } from "./PetTypeSelect";
import {
  addOns,
  calculateQuote,
  money,
  pricingOptions,
  services,
  waLink,
  type Frequency,
  type PetSize,
} from "@/lib/site";

const chip =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors border-border bg-card hover:border-primary data-[on=true]:border-gold data-[on=true]:bg-gold data-[on=true]:text-gold-foreground";

export function QuoteCalculator({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [pets, setPets] = useState(1);
  const [size, setSize] = useState<PetSize>("medium");
  const [optionIds, setOptionIds] = useState<string[]>(["walk-30"]);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [postcode, setPostcode] = useState("");
  const [notes, setNotes] = useState("");
  const [shown, setShown] = useState(compact);

  const quote = useMemo(
    () => calculateQuote({ optionIds, pets, size, addOnIds, frequency, postcode }),
    [optionIds, pets, size, addOnIds, frequency, postcode],
  );
  const toggle = (arr: string[], id: string) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  const selectedLabels = pricingOptions.filter((o) => optionIds.includes(o.id)).map((o) => o.label);

  const continueToBooking = () => {
    sessionStorage.setItem("pawprint-quote", JSON.stringify({ petType, pets, size, optionIds, addOnIds, frequency, postcode, notes }));
    navigate({ to: "/book" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6 rounded-3xl bg-card p-6 shadow-soft md:p-8">
        <div>
          <Label htmlFor="quote-pet-type" className="mb-3 block font-semibold">Pet type</Label>
          <PetTypeSelect id="quote-pet-type" value={petType} onChange={setPetType} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pets" className="mb-2 block font-semibold">Number of pets</Label>
            <Input id="pets" type="number" min={1} max={6} value={pets} onChange={(e) => setPets(Math.max(1, Math.min(6, Number(e.target.value) || 1)))} />
          </div>
          <div>
            <Label className="mb-2 block font-semibold">Size (for grooming)</Label>
            <div className="flex flex-wrap gap-2">
              {(["small", "medium", "large", "giant"] as PetSize[]).map((s) => (
                <button key={s} type="button" data-on={size === s} className={chip + " px-3 py-1.5 capitalize"} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Label className="mb-3 block font-semibold">Services &amp; packages</Label>
          <div className="space-y-4">
            {services.map((s) => {
              const opts = pricingOptions.filter((o) => o.service === s.slug);
              return (
                <div key={s.slug}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.emoji} {s.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {opts.map((o) => (
                      <button key={o.id} type="button" data-on={optionIds.includes(o.id)} className={chip} onClick={() => setOptionIds(toggle(optionIds, o.id))}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {!compact && (
          <>
            <div>
              <Label className="mb-3 block font-semibold">Optional add-ons</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {addOns.map((a) => (
                  <label key={a.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
                    <Checkbox checked={addOnIds.includes(a.id)} onCheckedChange={() => setAddOnIds(toggle(addOnIds, a.id))} />
                    <span className="text-sm">{a.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{a.price ? `+${money(a.price)}` : "Free"}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-3 block font-semibold">How often?</Label>
              <div className="flex flex-wrap gap-2">
                {(["one-time", "daily", "weekly", "fortnightly", "monthly", "custom"] as Frequency[]).map((f) => (
                  <button key={f} type="button" data-on={frequency === f} className={chip + " capitalize"} onClick={() => setFrequency(f)}>
                    {f.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pc" className="mb-2 block font-semibold">Service postcode</Label>
                <Input id="pc" placeholder="e.g. AB1 2CD" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="notes" className="mb-2 block font-semibold">Special requirements</Label>
                <Textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Temperament, routines, needs…" />
              </div>
            </div>
          </>
        )}
        {!compact && (
          <Button size="lg" className="w-full rounded-full sm:w-auto" onClick={() => setShown(true)}>
            <Sparkles /> Calculate My Quote
          </Button>
        )}
      </div>

      <aside className="h-fit rounded-3xl bg-secondary p-6 shadow-soft md:p-8 lg:sticky lg:top-24" aria-live="polite">
        <p className="eyebrow">Your estimate</p>
        {shown && optionIds.length > 0 ? (
          <>
            <ul className="mt-4 space-y-2 text-sm">
              {quote.lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-3">
                  <span>{l.label}</span>
                  <span className="font-semibold">{money(l.amount)}</span>
                </li>
              ))}
              {quote.discount > 0 && (
                <li className="flex justify-between text-primary">
                  <span>Recurring discount ({Math.round(quote.discountRate * 100)}%)</span>
                  <span className="font-semibold">−{money(quote.discount)}</span>
                </li>
              )}
            </ul>
            <div className="mt-5 flex items-end justify-between border-t border-primary/20 pt-4">
              <span className="text-sm">
                {pets} pet{pets > 1 ? "s" : ""} · ~{Math.round(quote.minutes / 60 * 10) / 10}h
                {frequency !== "one-time" && ` · per visit, ${frequency}`}
              </span>
              <span className="font-display text-4xl font-semibold text-primary">{money(quote.total)}</span>
            </div>
            {quote.needsManual && (
              <p className="mt-3 rounded-xl bg-accent p-3 text-xs">Some selections need a personal assessment — this is an indicative estimate only.</p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Includes: {selectedLabels.join(", ")}. Estimate only — your booking is confirmed by our team. Example prices shown for demonstration.
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Choose at least one service{!compact && " and press Calculate"} to see your estimate.</p>
        )}
        <div className="mt-6 flex flex-col gap-2">
          <Button size="lg" className="rounded-full" onClick={continueToBooking} disabled={optionIds.length === 0}>
            Continue to Booking
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-card" asChild>
            <a href={waLink(`Hi Pawprint & Co., I'd like a custom quote for: ${selectedLabels.join(", ") || "pet care"}.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Request a Custom Quote
            </a>
          </Button>
        </div>
      </aside>
    </div>
  );
}
