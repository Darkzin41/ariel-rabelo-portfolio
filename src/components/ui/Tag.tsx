interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "mono";
}

export default function Tag({ children, variant = "default" }: TagProps) {
  const base = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide transition-colors";
  const variants = {
    default: "border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface)]",
    accent:  "border border-[var(--accent-soft)] text-[var(--accent)] bg-[var(--accent-soft)]",
    mono:    "font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface-el)] text-[10px] tracking-widest uppercase",
  };
  return (
    <span className={`${base} ${variants[variant]}`} style={{ fontFamily: variant === "mono" ? "var(--font-mono)" : undefined }}>
      {children}
    </span>
  );
}
