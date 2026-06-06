'use client'

import { useIdentity } from "@/hooks/useIdentity";
import { buildCapsuleIdentity } from "@/lib/identity/capsule";
import { createDelegationGrant } from "@/lib/governance/delegation/grant";
import { signDelegation } from "@/lib/governance/delegation/sign";
import { storeDelegation } from "@/lib/governance/delegation/store";
import { useCapsuleSigner } from "@/hooks/useCapsuleSigner";
import { useState } from "react";

export default function DelegationPage() {
  const id = useIdentity();
  const capsule = buildCapsuleIdentity(id);
  const { sign } = useCapsuleSigner();

  const [delegate, setDelegate] = useState("");
  const [actions, setActions] = useState("");
  const [hours, setHours] = useState("24");
  const [output, setOutput] = useState(null);

  async function handleDelegate() {
    const grant = createDelegationGrant({
      granterFingerprint: capsule.fingerprint,
      delegateFingerprint: delegate,
      allowedActions: actions.split(",").map(a => a.trim()),
      expiresAt: new Date(Date.now() + Number(hours) * 3600 * 1000).toISOString(),
    });

    const signed = await signDelegation(id, grant, { sign });
    const stored = storeDelegation(signed);

    setOutput(stored);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Delegation</h1>
      <p className="text-white/50 text-sm mb-6">
        Temporary authority • Capsule‑bound • Fully auditable
      </p>

      <input
        placeholder="Delegate Capsule Fingerprint"
        className="w-full p-2 mb-3 rounded bg-white/5 text-white text-xs"
        value={delegate}
        onChange={(e) => setDelegate(e.target.value)}
      />

      <input
        placeholder="Allowed actions (comma separated)"
        className="w-full p-2 mb-3 rounded bg-white/5 text-white text-xs"
        value={actions}
        onChange={(e) => setActions(e.target.value)}
      />

      <input
        placeholder="Duration (hours)"
        className="w-full p-2 mb-3 rounded bg-white/5 text-white text-xs"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <button
        onClick={handleDelegate}
        className="px-4 py-2 rounded bg-purple-600/40 hover:bg-purple-600/60 text-white text-xs font-mono"
      >
        Create Delegation Grant
      </button>

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
