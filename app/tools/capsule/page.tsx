'use client'

import { useCapsuleIdentity } from "@/hooks/useCapsuleIdentity";

export default function CapsuleIdentityPage() {
  const capsule = useCapsuleIdentity();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Capsule Identity</h1>
      <p className="text-white/50 text-sm mb-6">
        Unified multi‑chain identity • Deterministic fingerprint • Sovereign capsule
      </p>

      <div
        className="rounded-xl p-5 mb-6"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        <h2 className="text-sm font-bold text-white mb-3">Identity Capsule</h2>

        <pre className="text-xs text-white/70 font-mono whitespace-pre-wrap">
{JSON.stringify(capsule, null, 2)}
        </pre>
      </div>
    </div>
  );
}
