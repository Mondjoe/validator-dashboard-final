import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark-mode" : "";
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? "🌙 Dark Mode On" : "☀️ Light Mode"}
    </button>
  );
}
