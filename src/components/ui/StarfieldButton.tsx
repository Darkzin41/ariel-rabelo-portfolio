import { useEffect, useRef } from "react";

interface StarfieldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  size?: "md" | "lg";
  className?: string;
}

export default function StarfieldButton({
  children, onClick, href, external, size = "md", className = "",
}: StarfieldButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.offsetWidth || 200;
    const H = canvas.offsetHeight || 52;
    canvas.width = W;
    canvas.height = H;

    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random(),
      dAlpha: (Math.random() - 0.5) * 0.018,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);
      const rgb = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb").trim() || "59,130,246";
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        s.alpha += s.dAlpha;
        if (s.alpha <= 0 || s.alpha >= 1) s.dAlpha *= -1;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${s.alpha * 0.75})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Size variants — spec: min-h-[52px] px-[28px] py-[14px] text-[15px]
  const sizes = {
    md: "px-6 py-3 text-sm min-h-[46px]",
    lg: "px-7 py-[14px] text-[15px] font-semibold min-h-[52px]",
  };

  const cls = [
    "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full",
    "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
    sizes[size],
    className,
  ].join(" ");

  const style: React.CSSProperties = {
    background: "var(--accent)",
    color: "#fff",
    boxShadow: "0 0 24px var(--accent-glow)",
  };

  const inner = (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls} style={style}>
        {inner}
      </a>
    );
  }
  return <button onClick={onClick} className={cls} style={style}>{inner}</button>;
}
