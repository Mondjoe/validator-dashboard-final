'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { daoAbi } from '@/lib/daoAbi'
import { useState } from 'react'

export default function DaoGovernance({ contract }) {
  const { address } = useAccount()
  const [selected, setSelected] = useState(null)

  const { data: count } = useReadContract({
    address: contract,
    abi: daoAbi,
    functionName: 'proposalCount',
  })

  const { writeContract } = useWriteContract()

  if (!address) return <p>Connect wallet first</p>
  if (!count) return <p>Loading proposals...</p>

  const proposals = Array.from({ length: Number(count) }, (_, i) => i)

  return (
    <div>
      <h2>DAO Governance</h2>

      {proposals.map((id) => (
        <Proposal key={id} id={id} contract={contract} vote={writeContract} />
      ))}
    </div>
  )
}

function Proposal({ id, contract, vote }) {
  const { data } = useReadContract({
    address: contract,
    abi: daoAbi,
    functionName: 'proposals',
    args: [id],
  })

  if (!data) return <p>Loading...</p>

  const [description, votesFor, votesAgainst] = data as any[]

  return (
    <div>
      <h3>Proposal #{id}</h3>
      <p>{description}</p>
      <p>For: {votesFor.toString()}</p>
      <p>Against: {votesAgainst.toString()}</p>

      <button onClick={() => vote({ address: contract, abi: daoAbi, functionName: 'vote', args: [id, true] })}>
        Vote For
      </button>

      <button onClick={() => vote({ address: contract, abi: daoAbi, functionName: 'vote', args: [id, false] })}>
        Vote Against
      </button>
    </div>
  )
}