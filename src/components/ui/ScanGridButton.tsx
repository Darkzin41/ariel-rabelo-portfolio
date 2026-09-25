import { type ReactNode, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: "md" | "lg";
  type?: "button" | "submit";
}

export default function ScanGridButton({ children, onClick, href, size = "lg", type = "button" }: Props) {
  const padding = size === "lg" ? "16px 24px" : "14px 24px";
  const fontSize = "14px";
  const minH = "52px";

  const baseStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding,
    minHeight: minH,
    borderRadius: "12px",
    background: "var(--accent)",
    color: "#fff",
    fontSize,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    letterSpacing: "-0.01em",
    transition: "transform 0.2s var(--ease-out-expo), box-shadow 0.2s",
    textDecoration: "none",
  };

  const inner = (
    <span className="relative flex items-center gap-2.5" style={{ zIndex: 1 }}>
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className="scan-grid-btn"
        style={baseStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className="scan-grid-btn"
      style={baseStyle}
    >
      {inner}
    </button>
  );
}
