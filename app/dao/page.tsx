export default function Page() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">DAO Module</h1>

      <p className="text-gray-400 mb-6">
        Manage decentralized governance, proposals, voting power, and operator roles within the CharmCapsule DAO.
      </p>

      <div className="space-y-4">
        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Governance Status</h2>
          <p className="text-gray-300">DAO is active and synchronized across modules.</p>
        </div>

        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Operator Voting Power</h2>
          <ul className="text-gray-300 space-y-1">
            <li>CharmCapsule — 100%</li>
            <li>Charm Operator — Delegate</li>
            <li>Mondjoe — Delegate</li>
            <li>Triopath — Delegate</li>
            <li>Heinhtat — Delegate</li>
            <li>Mr.j — Delegate</li>
          </ul>
        </div>

        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Recent Proposals</h2>
          <p className="text-gray-300">No active proposals. Create one to begin governance flow.</p>
        </div>
      </div>
    </div>
  );
}