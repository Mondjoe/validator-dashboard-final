export default function WalletCard({ data }) {
  if (!data) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p>No data yet.</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50">
        <p className="text-red-600">Error: {data.error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={data.logo}
          alt={data.chainName}
          className="w-6 h-6"
        />
        <h2 className="font-semibold text-lg">{data.chainName}</h2>
      </div>

      <p className="text-sm text-gray-600 break-all">
        {data.address}
      </p>

      <div className="mt-3">
        <p className="font-medium">
          Native Balance: {data.nativeBalance} {data.symbol}
        </p>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Chain Type: {data.chainType}
      </div>
    </div>
  );
}
