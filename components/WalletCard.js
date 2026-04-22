export default function WalletCard({ data }) {
  return (
    <div>
      <div className="mt-2 text-xs text-gray-500">
        Chain Type: {data.chainType}
      </div>
    </div>
  );
}
