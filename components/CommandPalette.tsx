"use client";

import { useEffect, useState } from "react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands = [
    { label: "Open Logs", action: () => location.hash = "#logs" },
    { label: "Open Terminal", action: () => location.hash = "#terminal" },
    { label: "Reload Dashboard", action: () => location.reload() },
    { label: "Go to Validators", action: () => location.href = "/validators" },
    { label: "Go to Settings", action: () => location.href = "/settings" },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={() => setOpen(false)}
    >
      <div
        className="fade-in"
        style={{
          width: 400,
          background: "#0c0c10",
          border: "1px solid #1f1f28",
          borderRadius: 10,
          padding: 20,
          boxShadow: "0 0 25px rgba(0,255,255,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command..."
          style={{
            width: "100%",
            padding: "10px",
            background: "#08080b",
            border: "1px solid #1f1f28",
            borderRadius: 6,
            color: "#2affff",
            marginBottom: 15,
          }}
        />

        <div style={{ maxHeight: 200, overflowY: "auto" }}>
          {filtered.map((cmd, i) => (
            <div
              key={i}
              onClick={() => {
                cmd.action();
                setOpen(false);
              }}
              style={{
                padding: "10px",
                borderRadius: 6,
                cursor: "pointer",
                color: "#ddd",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,255,255,0.08)";
                e.currentTarget.style.color = "#2affff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ddd";
              }}
            >
              {cmd.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}