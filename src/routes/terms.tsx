import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Pawprint & Co." },
      { name: "description", content: "The terms that apply to bookings and services with Pawprint & Co." },
      { property: "og:title", content: "Terms & Conditions | Pawprint & Co." },
      { property: "og:description", content: "Booking and service terms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Legal
      title="Terms & Conditions"
      sections={[
        ["Bookings", "Online bookings are requests until confirmed by Pawprint & Co. Quotes are estimates and may change after assessment."],
        ["Your pet's wellbeing", "You agree to provide accurate information about your pet's health, behaviour and needs."],
        ["Payment", "Payment terms and any deposit requirements will be confirmed with your booking."],
      ]}
    />
  ),
});
