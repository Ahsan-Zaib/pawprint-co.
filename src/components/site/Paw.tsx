export function PawIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="20" cy="18" rx="6" ry="8" />
      <ellipse cx="44" cy="18" rx="6" ry="8" />
      <ellipse cx="9" cy="33" rx="5.5" ry="7" />
      <ellipse cx="55" cy="33" rx="5.5" ry="7" />
      <path d="M32 30c-9 0-17 10-17 18 0 6 5 8 9 8 3 0 5-2 8-2s5 2 8 2c4 0 9-2 9-8 0-8-8-18-17-18z" />
    </svg>
  );
}

export function PawLogo() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid size-10 place-items-center rounded-2xl bg-primary text-gold">
        <PawIcon className="size-6" />
      </span>
      <span className="font-display text-xl font-semibold leading-none text-primary">
        Pawprint <span className="text-foreground/70">&amp; Co.</span>
      </span>
    </span>
  );
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
