"use client";

export default function ContractOwnership({ contract, label }: any) {
  return (
    <div className="p-4 bg-[#1a1a1a] rounded-xl border border-[#2affff20] text-white">
      <h2 className="text-lg font-bold mb-2">{label}</h2>
      <p className="text-gray-400 text-sm">Contract: {contract}</p>
      <p className="text-gray-500 text-xs mt-2">
        Ownership module placeholder
      </p>
    </div>
  );
}
