import DashboardCard from "@/components/ui/DashboardCard";

async function getValidator(id) {
  // Mock data — replace with your real API later
  return {
    id,
    status: "online",
    balance: "32.1 ETH",
    performance: "99.2%",
    pubkey: "0xabc123...789",
    index: 12345,
    attestationHistory: [
      { epoch: 123, status: "included" },
      { epoch: 122, status: "included" },
      { epoch: 121, status: "missed" },
      { epoch: 120, status: "included" },
    ],
  };
}

export default async function ValidatorDetailsPage({ params }) {
  const validator = await getValidator(params.id);

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title={`Validator ${validator.id}`}>
        <div className="mb-4">
          <p>
            <span className="text-neutral-400">Status:</span>{" "}
            <span
              className={
                validator.status === "online"
                  ? "text-green-400"
                  : validator.status === "offline"
                  ? "text-red-400"
                  : "text-yellow-400"
              }
            >
              {validator.status}
            </span>
          </p>

          <p>
            <span className="text-neutral-400">Balance:</span>{" "}
            {validator.balance}
          </p>

          <p>
            <span className="text-neutral-400">Performance:</span>{" "}
            {validator.performance}
          </p>
        </div>

        <div className="border-t border-neutral-800 pt-4">
          <h3 className="text-lg font-semibold mb-2">Validator Metadata</h3>

          <p>
            <span className="text-neutral-400">Pubkey:</span>{" "}
            {validator.pubkey}
          </p>

          <p>
            <span className="text-neutral-400">Index:</span>{" "}
            {validator.index}
          </p>
        </div>
      </DashboardCard>

      <DashboardCard title="Attestation History">
        <div className="flex flex-col gap-2">
          {validator.attestationHistory.map((a) => (
            <div
              key={a.epoch}
              className="flex justify-between border border-neutral-800 rounded-lg p-3 bg-neutral-900"
            >
              <span className="text-neutral-300">Epoch {a.epoch}</span>
              <span
                className={
                  a.status === "included"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}