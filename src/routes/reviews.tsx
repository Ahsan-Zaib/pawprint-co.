import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/site/PageHero";
import { services } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Pawprint & Co." },
      { name: "description", content: "Read genuine reviews from Pawprint & Co. customers and share your own experience." },
      { property: "og:title", content: "Reviews | Pawprint & Co." },
      { property: "og:description", content: "Share your experience with Pawprint & Co." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const [rating, setRating] = useState(5);
  return (
    <>
      <PageHero eyebrow="Reviews" title="Kind words from pet parents">
        We only publish genuine reviews from real customers, after approval.
      </PageHero>
      <div className="container-page grid gap-8 py-16 lg:grid-cols-2">
        <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-card p-10 text-center">
          <p className="font-display text-2xl text-primary">No reviews published yet</p>
          <p className="mt-2 text-muted-foreground">Be one of the first to share your experience.</p>
        </div>
        <form
          className="space-y-4 rounded-3xl bg-card p-8 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            (e.target as HTMLFormElement).reset();
            toast.success("Thank you! Your review will appear once approved.");
          }}
        >
          <h2 className="text-2xl font-semibold">Share Your Experience</h2>
          <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" aria-label={`${n} stars`} onClick={() => setRating(n)} className="text-gold">
                <Star className={n <= rating ? "fill-current" : ""} />
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label htmlFor="rn">Display name</Label><Input id="rn" required /></div>
            <div className="space-y-1.5"><Label htmlFor="pn">Pet name (optional)</Label><Input id="pn" /></div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sv">Service</Label>
            <select id="sv" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {services.map((s) => <option key={s.slug}>{s.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5"><Label htmlFor="rv">Your review</Label><Textarea id="rv" required rows={4} /></div>
          <Button type="submit" className="rounded-full">Submit review</Button>
        </form>
      </div>
    </>
  );
}
