"use client";

import { useEffect } from "react";

export function OperatorHotkeys() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {// Shift + M → Mission Control
     if (e.key.toLowerCase() === "m") {
     location.href = "/mission-control";
      }
      if (!e.shiftKey) return;

      // Shift + L → Logs
      if (e.key.toLowerCase() === "l") {
        location.hash = "#logs";
      }

      // Shift + T → Terminal
      if (e.key.toLowerCase() === "t") {
        location.hash = "#terminal";
      }

      // Shift + S → Toggle sidebar collapse
      if (e.key.toLowerCase() === "s") {
        const event = new CustomEvent("toggle-sidebar");
        window.dispatchEvent(event);
      }

      // Shift + F → Fullscreen cockpit mode
      if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }

      // Shift + G → Gas Tracker
      if (e.key.toLowerCase() === "g") {
        location.hash = "#gas";
      }

      // Shift + R → Reward Analytics
      if (e.key.toLowerCase() === "r") {
        location.hash = "#rewards";
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
}