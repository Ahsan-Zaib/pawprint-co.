import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Pawprint & Co." },
      { name: "description", content: "How Pawprint & Co. collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Policy | Pawprint & Co." },
      { property: "og:description", content: "How we handle your data." },
    ],
  }),
  component: () => (
    <Legal
      title="Privacy Policy"
      sections={[
        ["What we collect", "Only the details needed to provide our services: your contact details, address, and information about your pets."],
        ["How we use it", "To manage bookings, communicate with you and care for your pets safely. We never sell your data."],
        ["Your rights", "You can request access to, correction of, or deletion of your data at any time by contacting us."],
      ]}
    />
  ),
});
