import { Children, cloneElement, isValidElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Preserve semantic text and React ownership while revealing words individually.
function prepareContent(children: ReactNode, text = false, wordIndex = { value: 0 }): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" && text) {
      return child.split(/(\s+)/).map((word, i) => /^\s*$/.test(word) ? word : (
        <span key={i} className="reveal-word" style={{ "--word-delay": `${Math.min(wordIndex.value++ * 36, 720)}ms` } as CSSProperties}>{word}</span>
      ));
    }
    if (!isValidElement<{ children?: ReactNode; className?: string }>(child)) return child;
    if (typeof child.type !== "string") return child.props.children ? cloneElement(child, { children: prepareContent(child.props.children) }) : child;
    const isText = /^(h[1-3]|p)$/.test(child.type);
    const isPhoto = child.props.className?.split(" ").includes("service-photo") || (child.type === "div" && Children.toArray(child.props.children).some((node) => isValidElement(node) && node.type === "img"));
    const className = [child.props.className, isText ? "scroll-text" : isPhoto ? "scroll-photo" : ""].filter(Boolean).join(" ");
    return cloneElement(child, {
      className,
      children: prepareContent(child.props.children, text || isText, isText ? { value: 0 } : wordIndex),
    });
  });
}

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
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const targets = node.querySelectorAll<HTMLElement>(".scroll-text, .scroll-photo");
    targets.forEach((target) => target.classList.add("scroll-ready"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-shown");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
    );
    targets.forEach((target) => io.observe(target));
    return () => {
      io.disconnect();
      targets.forEach((target) => target.classList.remove("scroll-ready", "scroll-shown"));
    };
  }, []);

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as never}
      style={style}
      className={`reveal ${className}`}
    >
      {prepareContent(children)}
    </Comp>
  );
}
