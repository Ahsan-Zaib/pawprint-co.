import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";

export const Route = createFileRoute("/cancellation")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy | Pawprint & Co." },
      { name: "description", content: "How to cancel or reschedule a Pawprint & Co. appointment." },
      { property: "og:title", content: "Cancellation Policy | Pawprint & Co." },
      { property: "og:description", content: "Cancelling or rescheduling your booking." },
    ],
  }),
  component: () => (
    <Legal
      title="Cancellation Policy"
      sections={[
        ["Rescheduling", "Let us know as early as possible if you need to change your appointment — via WhatsApp or our contact form."],
        ["Cancellations", "Notice periods and any late-cancellation charges will be set out here once finalised."],
        ["Our cancellations", "If we ever need to cancel due to weather, illness or safety concerns, we'll contact you promptly to rearrange."],
      ]}
    />
  ),
});
