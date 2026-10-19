import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PawLogo, PawPress } from "./Paw";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing & Quote" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2" aria-label="Pawprint & Co. home">
          <PawLogo interactive />
        </Link>
        <nav className="hidden items-center gap-0 xl:gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-grow rounded-full px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="lg" className="hidden rounded-full sm:inline-flex">
            <Link to="/book">Book a Service</Link>
          </Button>
          <PawPress printsTo="left">
            <Button variant="ghost" size="icon"
              data-paw-press
              className="rounded-full p-2 text-primary hover:bg-secondary lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </PawPress>
        </div>
      </div>
      {open && (
        <nav className="container-page flex flex-col gap-1 pb-4 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium hover:bg-secondary">
              {n.label}
            </Link>
          ))}
          <Button asChild size="lg" className="mt-2 rounded-full">
            <Link to="/book" onClick={() => setOpen(false)}>
              Book a Service
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
