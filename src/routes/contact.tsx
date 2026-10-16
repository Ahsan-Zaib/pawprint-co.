import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT_EMAIL, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Pawprint & Co." },
      { name: "description", content: "Get in touch with Pawprint & Co. by WhatsApp, email or our contact form." },
      { property: "og:title", content: "Contact Pawprint & Co." },
      { property: "og:description", content: "Questions about pet care? We'd love to hear from you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Say hello">We'd love to hear about your pet.</PageHero>
      <div className="container-page grid gap-8 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="lift flex items-center gap-4 rounded-3xl bg-secondary p-6">
            <MessageCircle className="size-8 text-primary" />
            <div><p className="font-semibold text-primary">WhatsApp</p><p className="text-sm text-muted-foreground">Fastest way to reach us</p></div>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="lift flex items-center gap-4 rounded-3xl bg-accent p-6">
            <Mail className="size-8 text-primary" />
            <div><p className="font-semibold text-primary">Email</p><p className="text-sm text-muted-foreground">{CONTACT_EMAIL}</p></div>
          </a>
        </div>
        <form
          className="space-y-4 rounded-3xl bg-card p-8 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            (e.target as HTMLFormElement).reset();
            toast.success("Thanks! We'll be in touch soon.");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label htmlFor="n">Name</Label><Input id="n" required autoComplete="name" /></div>
            <div className="space-y-1.5"><Label htmlFor="e">Email</Label><Input id="e" type="email" required autoComplete="email" /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="m">Message</Label><Textarea id="m" rows={5} required /></div>
          <Button type="submit" className="rounded-full">Send message</Button>
        </form>
      </div>
    </>
  ),
});
