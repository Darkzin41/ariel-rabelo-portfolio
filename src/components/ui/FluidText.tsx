import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scale?: number;
}

export default function FluidText({ children, className, style, scale = 4 }: Props) {
  const filterId = useRef(`fluid-${Math.random().toString(36).slice(2)}`).current;
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const turbulence = turbRef.current;
    if (!container || !turbulence) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;

    const canAnimate = () => visible && !document.hidden && !motionPreference.matches;

    const tick = (time: number) => {
      frame = 0;
      if (!canAnimate()) return;
      const bfX = 0.005 + Math.sin(time * 0.00012) * 0.003;
      const bfY = 0.003 + Math.cos(time * 0.00017) * 0.002;
      turbulence.setAttribute("baseFrequency", `${bfX.toFixed(5)} ${bfY.toFixed(5)}`);
      frame = requestAnimationFrame(tick);
    };

    const syncAnimation = () => {
      if (!canAnimate()) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", syncAnimation);
    motionPreference.addEventListener("change", syncAnimation);
    syncAnimation();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncAnimation);
      motionPreference.removeEventListener("change", syncAnimation);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      <svg
        width="0"
        height="0"
        aria-hidden
        style={{ position: "absolute", overflow: "hidden", pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.005 0.003"
              numOctaves="2"
              seed="3"
              result="turb"
            />
            <feDisplacementMap
              in2="turb"
              in="SourceGraphic"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: `url(#${filterId})` }}>
        {children}
      </div>
    </div>
  );
}
