interface SectionHeaderProps {
  label: string;
  title: string;
  titleItalic?: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  titleItalic,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : ""}`}>
      <p
        className="text-[10px] tracking-[0.2em] uppercase mb-4 font-medium"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <h2
        className="text-4xl md:text-5xl font-semibold leading-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
        {titleItalic && (
          <>
            {" "}
            <span className="font-serif font-normal italic" style={{ color: "var(--text-secondary)" }}>
              {titleItalic}
            </span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
