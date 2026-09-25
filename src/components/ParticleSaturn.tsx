import { useEffect, useRef } from "react";

interface Props {
  size?: number;
  className?: string;
}

interface SphereParticle {
  phi: number;
  theta: number;
  radiusOffset: number;
  alpha: number;
  size: number;
}

interface RingParticle {
  angle: number;
  band: number;
  jitter: number;
  alpha: number;
  size: number;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
}

function densityForViewport(width: number) {
  if (width < 640) return 0.5;
  if (width < 1024) return 0.7;
  return 1;
}

export default function ParticleSaturn({ size = 520, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const orbitalLabels = ["SOFTWARE", "AI", "AUTOMATION", "DATA", "WEB"];
    let width = size;
    let height = size;
    let radius = size * 0.28;
    let density = 0;
    let frame = 0;
    let isVisible = true;
    let colors = { r: 59, g: 130, b: 246 };
    let sphereParticles: SphereParticle[] = [];
    let ringParticles: RingParticle[] = [];
    let dustParticles: DustParticle[] = [];
    let bodyGradient: CanvasGradient;
    let haloGradient: CanvasGradient;

    const canAnimate = () => isVisible && !document.hidden && !motionPreference.matches;

    const refreshColors = () => {
      const raw = getComputedStyle(root).getPropertyValue("--accent-rgb").trim();
      const [r, g, b] = raw.split(",").map(Number);
      colors = { r: r || 59, g: g || 130, b: b || 246 };
    };

    const createParticles = (nextDensity: number) => {
      density = nextDensity;
      sphereParticles = Array.from({ length: Math.round(800 * density) }, () => ({
        phi: Math.random() * Math.PI * 2,
        theta: Math.acos(2 * Math.random() - 1),
        radiusOffset: (Math.random() - 0.5) * 4,
        alpha: Math.random() * 0.6 + 0.1,
        size: Math.random() * 1.2 + 0.3,
      }));
      ringParticles = Array.from({ length: Math.round(500 * density) }, () => ({
        angle: Math.random() * Math.PI * 2,
        band: Math.random(),
        jitter: (Math.random() - 0.5) * 10,
        alpha: Math.random() * 0.35 + 0.05,
        size: Math.random() * 0.9 + 0.2,
      }));
      dustParticles = Array.from({ length: Math.round(120 * density) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.15,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
      }));
    };

    const createGradients = () => {
      const cx = width / 2;
      const cy = height / 2;
      bodyGradient = context.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.05, cx, cy, radius * 1.1);
      bodyGradient.addColorStop(0, "rgba(28,32,44,0.95)");
      bodyGradient.addColorStop(0.6, "rgba(12,14,20,0.98)");
      bodyGradient.addColorStop(1, "rgba(8,10,16,1)");
      haloGradient = context.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.5);
      haloGradient.addColorStop(0, `rgba(${colors.r},${colors.g},${colors.b},0)`);
      haloGradient.addColorStop(0.7, `rgba(${colors.r},${colors.g},${colors.b},0.06)`);
      haloGradient.addColorStop(1, `rgba(${colors.r},${colors.g},${colors.b},0)`);
    };

    const draw = (timestamp: number) => {
      frame = 0;
      const cx = width / 2;
      const cy = height / 2;
      const time = timestamp * 0.0003;
      const mx = (mouseRef.current.x - 0.5) * 0.08;
      const my = (mouseRef.current.y - 0.5) * 0.06;
      const ringTilt = 0.38 + my * 0.3;
      const { r, g, b } = colors;

      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.arc(cx + mx * 30, cy + my * 20, radius, 0, Math.PI * 2);
      context.fillStyle = bodyGradient;
      context.fill();

      context.beginPath();
      context.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      context.fillStyle = haloGradient;
      context.fill();

      for (const particle of sphereParticles) {
        const phi = particle.phi + time * 0.4;
        const z = Math.sin(particle.theta) * Math.sin(phi);
        if (z <= -0.15) continue;
        const brightness = 0.3 + z * 0.7;
        const particleRadius = radius + particle.radiusOffset;
        const x = cx + mx * 30 + Math.sin(particle.theta) * Math.cos(phi) * particleRadius;
        const y = cy + my * 20 + Math.cos(particle.theta) * particleRadius * 0.9;
        context.beginPath();
        context.arc(x, y, Math.max(0.1, particle.size * brightness), 0, Math.PI * 2);
        context.fillStyle = `rgba(${r},${g},${b},${particle.alpha * brightness * 0.5})`;
        context.fill();
      }

      for (const front of [false, true]) {
        for (const particle of ringParticles) {
          const angle = particle.angle + time * 0.15;
          const ringRadius = radius * 1.35 + particle.band * radius * 0.75 + particle.jitter;
          const rx = Math.cos(angle) * ringRadius;
          const ry = Math.sin(angle) * ringRadius * ringTilt;
          if ((ry > 0) !== front) continue;
          const x = cx + mx * 20 + rx;
          const y = cy + my * 12 + ry;
          if (!front && Math.hypot(x - cx, y - cy) < radius) continue;
          const fade = front ? Math.max(0, 1 - Math.abs(Math.hypot(rx, ry) / (radius * 2.1) - 0.75) * 2) : 0.4;
          context.beginPath();
          context.arc(x, y, particle.size, 0, Math.PI * 2);
          context.fillStyle = `rgba(${r},${g},${b},${particle.alpha * fade})`;
          context.fill();
        }
      }

      const labelRadius = radius * 2.3;
      context.font = "500 10px var(--font-mono, monospace)";
      context.textAlign = "center";
      context.textBaseline = "middle";
      orbitalLabels.forEach((label, index) => {
        const angle = index / orbitalLabels.length * Math.PI * 2 + time * 0.12;
        context.fillStyle = `rgba(${r},${g},${b},${0.15 + Math.sin(time * 2 + index) * 0.07})`;
        context.fillText(label, cx + mx * 15 + Math.cos(angle) * labelRadius, cy + my * 10 + Math.sin(angle) * labelRadius * ringTilt);
      });

      for (const particle of dustParticles) {
        if (canAnimate()) {
          particle.x = (particle.x + particle.vx + width) % width;
          particle.y = (particle.y + particle.vy + height) % height;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${r},${g},${b},${particle.alpha})`;
        context.fill();
      }

      if (canAnimate()) frame = window.requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width || size);
      height = Math.max(1, bounds.height || size);
      radius = Math.min(width, height) * 0.28;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const nextDensity = densityForViewport(window.innerWidth);
      if (nextDensity !== density) createParticles(nextDensity);
      createGradients();
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      schedule();
    };

    const stopOrStart = () => {
      if (!canAnimate() && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      schedule();
    };
    const onMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight };
    };

    refreshColors();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      stopOrStart();
    });
    intersectionObserver.observe(canvas);
    const accentObserver = new MutationObserver(() => {
      refreshColors();
      createGradients();
      schedule();
    });
    accentObserver.observe(root, { attributes: true, attributeFilter: ["data-accent"] });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", stopOrStart);
    motionPreference.addEventListener("change", stopOrStart);
    resize();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      accentObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", stopOrStart);
      motionPreference.removeEventListener("change", stopOrStart);
    };
  }, [size]);

  return (
    <canvas ref={canvasRef} className={className} aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%", imageRendering: "auto" }} />
  );
}
