import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    // Only on desktop/pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { hovering.current = true; };
    const onLeave = () => { hovering.current = false; };

    const interactiveSelectors = "a, button, [role='button'], input, [tabindex]";

    const addListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Observe DOM changes to wire up new elements
    const mutObs = new MutationObserver(addListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });
    addListeners();

    window.addEventListener("mousemove", onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (dot) {
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringEl) {
        ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) scale(${hovering.current ? 1.8 : 1})`;
        ringEl.style.opacity = hovering.current ? "0.5" : "1";
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "var(--accent)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: "50%",
          border: "1px solid var(--accent)",
          opacity: 0.7,
          willChange: "transform, opacity",
          transition: "opacity 0.2s, scale 0.2s",
        }}
      />
    </>
  );
}
