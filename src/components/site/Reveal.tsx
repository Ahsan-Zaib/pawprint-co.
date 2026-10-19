import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Fades + slides content in when it scrolls into view. Honors
 * prefers-reduced-motion (content shows immediately).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as never}
      style={style}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </Comp>
  );
}
