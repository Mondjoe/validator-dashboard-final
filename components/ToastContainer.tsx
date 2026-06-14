"use client";

import { useToastStore } from "../hooks/store/toastStore";
import { theme } from "../app/theme";
import { useEffect } from "react";
export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 3000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        zIndex: 9999,
      }}
    >
      {toasts.map((toast) => (
        <div
  key={toast.id}
  style={{
    padding: "12px 16px",
    background: theme.colors.card,
    borderRadius: theme.radius.md,
    border: `1px solid ${colors[toast.type ?? "info"]}`,
    color: colors[toast.type ?? "info"],
    fontSize: theme.font.base,
    minWidth: "220px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transform: "translateY(0)",
    transition: "all 0.25s ease",
  }}
>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
