'use client'

import { useIdentity } from "@/hooks/useIdentity";
import { resolveRole } from "@/lib/governance/resolveRole";

export default function RolesPage() {
  const id = useIdentity();
  const role = resolveRole(id);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Access Control</h1>
      <p className="text-white/50 text-sm mb-6">
        Capsule‑based roles • Sovereign RBAC • Operator authority
      </p>

      <div className="rounded-xl p-5" style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(0,245,255,0.1)",
      }}>
        <div className="text-sm text-white/60 mb-2">Your Role</div>
        <div className="text-xl font-bold text-white">
          {role || "No role assigned"}
        </div>
      </div>
    </div>
  );
}
