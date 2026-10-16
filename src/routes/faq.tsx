import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/site/PageHero";
import { faqs } from "@/lib/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Pawprint & Co." },
      { name: "description", content: "Answers about booking, pricing, recurring visits, nervous pets and service areas." },
      { property: "og:title", content: "Frequently Asked Questions | Pawprint & Co." },
      { property: "og:description", content: "Everything you need to know before booking pet care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <div className="container-page py-16">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-3xl bg-card px-6 shadow-soft">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  ),
});
