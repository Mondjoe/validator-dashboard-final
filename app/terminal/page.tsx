"use client";

import React, { useState, useEffect, useRef } from 'react';

const TerminalPage = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Charm Capsule OS [Version 1.0.4]' },
    { type: 'system', text: '(c) 2026 Charm Finance. All rights reserved.' },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'system', text: '' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'user', text: `> ${input}` }];
    const cmd = input.toLowerCase().trim();

    if (cmd === 'help') {
      newHistory.push({ type: 'system', text: 'Available commands: help, status, portfolio, clear, connect, exit' });
    } else if (cmd === 'status') {
      newHistory.push({ type: 'system', text: 'All systems operational. Node: Charm-Alpha-01 connected.' });
    } else if (cmd === 'portfolio') {
      newHistory.push({ type: 'system', text: 'Fetching balance... Total: 1.24 ETH ($3,968.00)' });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="p-6 bg-[#0d0d0d] min-h-screen font-mono text-green-400">
      <div className="mb-6 border-b border-green-900 pb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="animate-pulse">●</span> Charm Terminal v1.0
        </h1>
      </div>

      <div className="bg-black/50 border border-green-900/30 p-4 rounded-lg h-[60vh] overflow-y-auto mb-4 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'user' ? 'text-white' : 'text-green-400/80'}`}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/80 p-3 rounded border border-green-900/50">
        <span className="text-white">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white w-full"
          autoFocus
          placeholder="Enter command..."
        />
      </form>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
        <div className="text-xs border border-green-900/20 p-2 rounded">CPU: 12%</div>
        <div className="text-xs border border-green-900/20 p-2 rounded">MEM: 1.2GB</div>
        <div className="text-xs border border-green-900/20 p-2 rounded">NET: 128ms</div>
        <div className="text-xs border border-green-900/20 p-2 rounded">UPTIME: 42d</div>
      </div>
    </div>
  );
};