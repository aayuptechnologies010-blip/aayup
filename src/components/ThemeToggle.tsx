import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { applyTheme, getSavedTheme, toggleTheme, getCurrentTheme } from "@/lib/theme";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const saved = getSavedTheme();
    if (saved) {
      applyTheme(saved);
      setTheme(saved);
    } else {
      // respect prefers-color-scheme
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      applyTheme(initial);
      setTheme(initial);
    }
  }, []);

  const toggle = () => {
    
    const next = toggleTheme();
    setTheme(next);
  };

  return (
    <button onClick={toggle} className="p-2 rounded hover:bg-muted/20" title="Toggle theme">
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default ThemeToggle;
