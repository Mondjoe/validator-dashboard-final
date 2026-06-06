'use client'

import { useAccount, useReadContract } from 'wagmi'

const erc721Abi = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  }
]

export default function ContractOwnership({ contract, label }) {
  const { address } = useAccount()

  const { data: balance } = useReadContract({
    address: contract,
    abi: erc721Abi,
    functionName: 'balanceOf',
    args: [address],
  })

  if (!address) return <p>Connect wallet first</p>
  if (balance === undefined) return <p>Checking ownership...</p>

  const owns = Number(balance) > 0

  return (
    <div>
      <p>{label}: {owns ? "Owned" : "Not Owned"}</p>
    </div>
  )
}