import { useState } from "react";

export default function LanguageToggle({ setLanguage }) {
  return (
    <div>
      <button onClick={() => setLanguage("en")}>🇬🇧 English</button>
      <button onClick={() => setLanguage("mm")}>🇲🇲 မြန်မာ</button>
    </div>
  );
}
