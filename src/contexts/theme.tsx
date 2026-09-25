import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Accent = "blue" | "violet" | "emerald" | "amber";

interface ThemeCtx {
  accent: Accent;
  setAccent: (a: Accent) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(() => {
    const saved = localStorage.getItem("aa-accent");
    if (["blue", "violet", "emerald", "amber"].includes(saved ?? "")) return saved as Accent;
    return "blue";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.removeItem("aa-theme");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem("aa-accent", accent);
  }, [accent]);

  const setAccent = (a: Accent) => setAccentState(a);

  return (
    <Ctx.Provider value={{ accent, setAccent }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
