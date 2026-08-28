"use client";

import { useEffect } from "react";

export function OperatorSessionRecorder() {
  function log(action: string, details?: any) {
    fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ action, details }),
    });
  }

  useEffect(() => {
    // Hotkey logging
    const keyHandler = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        log("hotkey", { key: e.key });
      }
    };

    // Hash navigation logging
    const hashHandler = () => {
      log("navigate", { target: location.hash });
    };

    // Fullscreen logging
    const fsHandler = () => {
      log("fullscreen-toggle", {
        active: Boolean(document.fullscreenElement),
      });
    };

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("hashchange", hashHandler);
    document.addEventListener("fullscreenchange", fsHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("hashchange", hashHandler);
      document.removeEventListener("fullscreenchange", fsHandler);
    };
  }, []);

  return null;
}