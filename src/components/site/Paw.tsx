import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

export function PawIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} fill="currentColor" aria-hidden="true">
      <ellipse cx="20" cy="18" rx="6" ry="8" />
      <ellipse cx="44" cy="18" rx="6" ry="8" />
      <ellipse cx="9" cy="33" rx="5.5" ry="7" />
      <ellipse cx="55" cy="33" rx="5.5" ry="7" />
      <path d="M32 30c-9 0-17 10-17 18 0 6 5 8 9 8 3 0 5-2 8-2s5 2 8 2c4 0 9-2 9-8 0-8-8-18-17-18z" />
    </svg>
  );
}

/**
 * Press feedback for a control: it dips like a paw stepping down and a few
 * paw prints pop out beside it, then fade. Skipped when the visitor has
 * asked for reduced motion.
 */
export function PawPress({ children, className = "" }: { children: ReactNode; className?: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const [prints, setPrints] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const fire = () => {
    if (prefersReducedMotion()) return;
    const node = (host.current?.querySelector("[data-paw-press]") ??
      host.current) as HTMLElement | null;
    if (node) {
      node.classList.remove("paw-pressed");
      void node.offsetWidth;
      node.classList.add("paw-pressed");
    }
    setPrints((p) => p + 1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPrints(0), 900);
  };

  return (
    <span
      ref={host}
      className={`relative inline-flex ${className}`}
      onPointerDown={fire}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") fire();
      }}
    >
      {children}
      {prints > 0 && (
        <span key={prints} className="paw-print-burst" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <PawIcon
              key={i}
              className={`paw-print size-3.5 ${i % 2 ? "paw-print-b" : "paw-print-a"}`}
              style={{ animationDelay: `${i * 110}ms`, left: `${i * 17}px`, bottom: `${i * 7}px` }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

export function PawLogo({ interactive = false }: { interactive?: boolean }) {
  const logo = (
    <span className="flex items-center gap-2">
      <span
        data-paw-press
        className="grid size-10 place-items-center rounded-2xl bg-primary text-gold"
      >
        <PawIcon className="size-6" />
      </span>
      <span className="font-display text-xl font-semibold leading-none text-primary">
        Pawprint <span className="text-foreground/70">&amp; Co.</span>
      </span>
    </span>
  );
  return interactive ? <PawPress className="w-full">{logo}</PawPress> : logo;
}

/** A trail of paw prints that "walk" in sequence. */
export function PawTrail({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-3 text-primary ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <PawIcon
          key={i}
          className={`size-5 animate-paw ${i % 2 ? "-translate-y-2 rotate-12" : "-rotate-12"}`}
          // stagger
          {...{ style: { animationDelay: `${i * 0.35}s` } }}
        />
      ))}
    </div>
  );
}
