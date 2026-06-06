'use client'

import { useChainId, useSwitchChain } from 'wagmi'

export default function NetworkSwitcher() {
  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
      <p>Current chain: {chainId}</p>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          Switch to {chain.name}
        </button>
      ))}
    </div>
  )
}