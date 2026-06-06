'use client'

import { useIdentity } from "@/hooks/useIdentity";
import { resolveRole } from "@/lib/governance/resolveRole";
import { assignRole } from "@/lib/governance/assignRole";
import { revokeRole } from "@/lib/governance/revokeRole";
import { useState } from "react";

export default function ManageRolesPage() {
  const id = useIdentity();
  const myRole = resolveRole(id);

  const [target, setTarget] = useState("");
  const [role, setRole] = useState("");
  const [output, setOutput] = useState(null);

  function handleAssign() {
    try {
      const result = assignRole(id, target, role);
      setOutput(result);
    } catch (err: any) {
      setOutput({ error: err.message });
    }
  }

  function handleRevoke() {
    try {
      const result = revokeRole(id, target);
      setOutput(result);
    } catch (err: any) {
      setOutput({ error: err.message });
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Role Management</h1>
      <p className="text-white/50 text-sm mb-6">
        Escalation paths • Sovereign authority • Capsule‑bound roles
      </p>

      <div className="text-white/70 text-sm mb-4">
        Your Role: <span className="font-bold text-white">{myRole || "None"}</span>
      </div>

      <input
        placeholder="Target Capsule Fingerprint"
        className="w-full p-2 mb-3 rounded bg-white/5 text-white text-xs"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <input
        placeholder="Role to assign (owner/admin/operator/auditor)"
        className="w-full p-2 mb-3 rounded bg-white/5 text-white text-xs"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleAssign}
          className="px-4 py-2 rounded bg-blue-600/40 hover:bg-blue-600/60 text-white text-xs font-mono"
        >
          Assign Role
        </button>

        <button
          onClick={handleRevoke}
          className="px-4 py-2 rounded bg-red-600/40 hover:bg-red-600/60 text-white text-xs font-mono"
        >
          Revoke Role
        </button>
      </div>

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
