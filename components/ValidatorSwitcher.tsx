"use client";

import { useState, useEffect } from "react";
import { VALIDATORS } from "@/lib/validators";

export function ValidatorSwitcher({ onSelect }: { onSelect: (v: any) => void }) {
  const [selected, setSelected] = useState(VALIDATORS[0].id);

 useEffect(() => {
  const v = VALIDATORS.find(x => x.id === selected);
  if (v) {
    onSelect(v);
  } else {
    onSelect(VALIDATORS[0]);
  }
}, []);

  function choose(id: string) {
    setSelected(id);
    localStorage.setItem("selected-validator", id);
    const v = VALIDATORS.find((x) => x.id === id);
    if (v) onSelect(v);
  }

  return (
    <div className="panel fade-in" style={{ display: "flex", gap: 10 }}>
      {VALIDATORS.map((v) => (
        <div
          key={v.id}
          onClick={() => choose(v.id)}
          style={{
            padding: "10px 15px",
            borderRadius: 8,
            cursor: "pointer",
            border: selected === v.id ? "1px solid #2affff" : "1px solid #1f1f28",
            color: selected === v.id ? "#2affff" : "#ccc",
            boxShadow:
              selected === v.id
                ? "0 0 15px rgba(0,255,255,0.2)"
                : "0 0 0 rgba(0,0,0,0)",
            transition: "0.2s",
          }}
        >
          {v.name}
        </div>
      ))}
    </div>
  );
}