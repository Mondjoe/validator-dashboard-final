"use client";

import React from 'react';
import { motion } from 'framer-motion';

const nfts = [
  { id: 1, name: "Charm Genesis #001", image: "https://via.placeholder.com/300/2affff/000000?text=Charm+NFT", rarity: "Legendary" },
  { id: 2, name: "Charm Genesis #002", image: "https://via.placeholder.com/300/ff2af0/000000?text=Charm+NFT", rarity: "Epic" },
  { id: 3, name: "Charm Genesis #003", image: "https://via.placeholder.com/300/2aff5e/000000?text=Charm+NFT", rarity: "Rare" },
];

const NFTGallery = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>🖼️</span> Your NFT Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {nfts.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 group cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#2affff]">
                {nft.rarity}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold mb-1 group-hover:text-[#2affff] transition-colors">
                {nft.name}
              </h3>
              <div className="text-xs text-gray-500">Floor: 0.5 ETH</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;
