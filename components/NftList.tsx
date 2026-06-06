'use client'

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'

export default function NftList() {
  const { address } = useAccount()
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    if (!address) return

    async function loadNFTs() {
      const res = await fetch(
        `https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts`,
        {
          headers: {
            'X-API-KEY': '' // optional
          }
        }
      )

      const data = await res.json()
      setNfts(data.nfts || [])
    }

    loadNFTs()
  }, [address])

  if (!address) return <p>Connect wallet first</p>

  return (
    <div>
      {nfts.length === 0 && <p>No NFTs found</p>}
      {nfts.map((nft) => (
        <div key={nft.identifier}>
          <img src={nft.image_url} width="120" />
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  )
}