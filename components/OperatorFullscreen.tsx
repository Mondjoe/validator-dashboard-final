"use client";

import { useEffect, useState } from "react";

export function OperatorFullscreen() {
  const [active, setActive] = useState(false);

  // Toggle fullscreen
  function toggle() {
    if (!active) {
      document.documentElement.requestFullscreen?.();
      setActive(true);
    } else {
      document.exitFullscreen?.();
      setActive(false);
    }
  }

  // Keyboard shortcut: F11 or Ctrl+Shift+F
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        toggle();
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active]);

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        background: active ? "#2affff22" : "#0c0c10",
        border: "1px solid #2affff",
        color: "#2affff",
        padding: "8px 14px",
        borderRadius: 6,
        cursor: "pointer",
        boxShadow: active
          ? "0 0 20px rgba(0,255,255,0.4)"
          : "0 0 10px rgba(0,255,255,0.15)",
        transition: "0.2s",
      }}
    >
      {active ? "Exit Cockpit" : "Enter Cockpit"}
    </button>
  );
}