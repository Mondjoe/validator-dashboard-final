import DashboardCard from "@/components/ui/DashboardCard";

async function getValidators() {
  // Mock data — replace with your real API later
  return [
    {
      id: "validator-01",
      status: "online",
      balance: "32.1 ETH",
      performance: "99.2%",
    },
    {
      id: "validator-02",
      status: "syncing",
      balance: "31.9 ETH",
      performance: "97.8%",
    },
    {
      id: "validator-03",
      status: "offline",
      balance: "32.0 ETH",
      performance: "88.4%",
    },
  ];
}

export default async function ValidatorsPage() {
  const validators = await getValidators();

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title="Your Validators">
        <p className="text-neutral-400 mb-4">
          Overview of all validators connected to your operator node.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {validators.map((v) => (
            <div
              key={v.id}
              className="border border-neutral-800 rounded-lg p-4 bg-neutral-900"
            >
              <h3 className="text-lg font-semibold mb-2">{v.id}</h3>

              <p>
                <span className="text-neutral-400">Status:</span>{" "}
                <span
                  className={
                    v.status === "online"
                      ? "text-green-400"
                      : v.status === "offline"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {v.status}
                </span>
              </p>

              <p>
                <span className="text-neutral-400">Balance:</span> {v.balance}
              </p>

              <p>
                <span className="text-neutral-400">Performance:</span>{" "}
                {v.performance}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}