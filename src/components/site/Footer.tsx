import { Link } from "@tanstack/react-router";
import { MessageCircle, Mail } from "lucide-react";
import { PawLogo } from "./Paw";
import { CONTACT_EMAIL, services, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <div className="inline-block rounded-2xl bg-background px-3 py-2">
            <PawLogo />
          </div>
          <p className="font-display text-2xl font-semibold">Happy Pets. Happier Humans.</p>
          <p className="text-sm opacity-80">Loving Care for Every Paw, Every Day.</p>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-gold">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="opacity-85 hover:opacity-100 hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-gold">Explore</h3>
          <ul className="space-y-2 text-sm">
            {(
              [
                ["/pricing", "Pricing & Quote"],
                ["/book", "Book an Appointment"],
                ["/about", "About Us"],
                ["/reviews", "Reviews"],
                ["/faq", "FAQ"],
                ["/contact", "Contact"],
              ] as const
            ).map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="opacity-85 hover:opacity-100 hover:underline">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-gold">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
                <MessageCircle className="size-4" /> WhatsApp enquiry
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:underline">
                <Mail className="size-4" /> {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-3 py-6 text-xs opacity-80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pawprint &amp; Co. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms &amp; Conditions</Link>
            <Link to="/cancellation" className="hover:underline">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
