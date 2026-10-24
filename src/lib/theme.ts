export const THEME_KEY = "aayup_theme";

export function getSavedTheme(): "dark" | "light" | null {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "dark" || t === "light") return t;
  } catch (e) {}
  return null;
}

export function applyTheme(theme: "dark" | "light") {
  const el = document.documentElement;
  if (theme === "dark") el.classList.add("dark");
  else el.classList.remove("dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

export function toggleTheme() {
  const el = document.documentElement;
  const isDark = el.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  return next;
}

export function getCurrentTheme(): "dark" | "light" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
