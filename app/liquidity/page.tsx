async function getLiquidity() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/status`, {
    cache: "no-store"
  });
  return res.json();
}

export default async function Page() {
  const data = await getLiquidity();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Liquidity Module</h1>

      <div className="border border-gray-700 p-4 rounded-lg mb-6">
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>TVL:</strong> {data.tvl}</p>
        <p><strong>APR:</strong> {data.apr}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Pools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.pools.map((pool: any, i: number) => (
          <div key={i} className="border border-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{pool.name}</h3>
            <p><strong>Chain:</strong> {pool.chain}</p>
            <p><strong>Address:</strong> {pool.address}</p>
            <p><strong>Liquidity:</strong> {pool.liquidity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}