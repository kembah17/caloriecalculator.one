"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.25rem",
        borderRadius: "9999px",
        border: "2px solid var(--color-border, #CBD5E1)",
        backgroundColor: dark ? "var(--color-primary, #10B981)" : "var(--color-border, #CBD5E1)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: "4rem",
        height: "2rem",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <span style={{ position: "absolute", left: "0.375rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.75rem", opacity: dark ? 0.4 : 1, transition: "opacity 0.3s ease", lineHeight: 1 }}>☀️</span>
      <span style={{ position: "absolute", right: "0.375rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.75rem", opacity: dark ? 1 : 0.4, transition: "opacity 0.3s ease", lineHeight: 1 }}>🌙</span>
      <span style={{ position: "absolute", top: "2px", left: dark ? "calc(100% - 1.625rem)" : "2px", width: "1.5rem", height: "1.5rem", borderRadius: "50%", backgroundColor: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", transition: "left 0.3s ease" }} />
    </button>
  );
}
