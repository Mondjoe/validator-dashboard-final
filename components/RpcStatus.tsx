'use client'

import { useBlockNumber } from 'wagmi'

export default function RpcStatus() {
  const { data, isLoading } = useBlockNumber()

  return (
    <div>
      {isLoading ? 'Loading block...' : `Latest block: ${data}`}
    </div>
  )
}