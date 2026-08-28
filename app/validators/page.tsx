"use client";

import React from 'react';

export default function ValidatorsPage() {
  const validators = [
    { id: 1, name: "Charm Node Alpha", status: "Active", uptime: "99.99%", rewards: "1.24 ETH", health: "Excellent" },
    { id: 2, name: "Charm Node Beta", status: "Active", uptime: "99.95%", rewards: "0.85 ETH", health: "Good" },
    { id: 3, name: "Charm Node Gamma", status: "Inactive", uptime: "0.00%", rewards: "0.00 ETH", health: "Down" },
  ];

  return (
    <div className="p-6 bg-[#0d0d0d] min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Validators Management</h1>
        <p className="text-gray-400">Monitor and manage your active validator nodes across multiple chains.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2affff20]">
          <div className="text-gray-400 text-sm mb-1">Total Validators</div>
          <div className="text-2xl font-bold text-[#2affff]">3</div>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2affff20]">
          <div className="text-gray-400 text-sm mb-1">Active Nodes</div>
          <div className="text-2xl font-bold text-green-400">2</div>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2affff20]">
          <div className="text-gray-400 text-sm mb-1">Total Rewards</div>
          <div className="text-2xl font-bold text-purple-400">2.09 ETH</div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl border border-[#2affff10] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#08080b] text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Node Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Uptime</th>
              <th className="p-4">Rewards</th>
              <th className="p-4">Health</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2affff05]">
            {validators.map((node) => (
              <tr key={node.id} className="hover:bg-[#2affff05] transition-colors">
                <td className="p-4 font-medium">{node.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${node.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {node.status}
                  </span>
                </td>
                <td className="p-4 font-mono">{node.uptime}</td>
                <td className="p-4 text-[#2affff]">{node.rewards}</td>
                <td className="p-4">
                  <div className="w-full bg-gray-800 h-1.5 max-w-[100px] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${node.health === 'Excellent' ? 'bg-green-400' : node.health === 'Good' ? 'bg-yellow-400' : 'bg-red-400'}`} 
                      style={{ width: node.health === 'Excellent' ? '100%' : node.health === 'Good' ? '70%' : '10%' }}
                    ></div>
                  </div>
                </td>
                <td className="p-4">
                  <button className="text-xs bg-[#2affff10] text-[#2affff] px-3 py-1 rounded hover:bg-[#2affff20] transition-all">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}