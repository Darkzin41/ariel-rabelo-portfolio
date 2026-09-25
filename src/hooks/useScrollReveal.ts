import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends Element = HTMLDivElement>(options: Options = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}

export function revealStyle(
  visible: boolean,
  delay = 0,
  direction: "up" | "left" | "right" | "none" = "up"
): React.CSSProperties {
  const translateMap = {
    up: "translateY(32px)",
    left: "translateX(-24px)",
    right: "translateX(24px)",
    none: "none",
  };

  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate(0,0)" : translateMap[direction],
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s ${delay}s cubic-bezier(0.16, 1, 0.3, 1)`,
  };
}
