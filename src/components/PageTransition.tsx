import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}
