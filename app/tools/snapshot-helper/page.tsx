"use client";

import { useState } from "react";

export default function SnapshotHelper() {
  const [space, setSpace] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [choices, setChoices] = useState("For\nAgainst\nAbstain");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!space || !title || !body || !start || !end) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      space,
      type: "single-choice",
      title,
      body,
      choices: choices.split("\n").filter(Boolean),
      start: Math.floor(new Date(start).getTime() / 1000),
      end: Math.floor(new Date(end).getTime() / 1000),
      metadata: {
        plugins: {},
      },
    };

    setOutput(JSON.stringify(payload, null, 2));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Snapshot Proposal Helper</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left side inputs */}
        <div className="space-y-4">

          <input
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            placeholder="Space ID (e.g. charm.eth)"
            className="bg-black border border-[#333] p-3 rounded w-full"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Proposal Title"
            className="bg-black border border-[#333] p-3 rounded w-full"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Proposal Body (Markdown)"
            className="bg-black border border-[#333] p-3 rounded w-full h-32"
          />

          <textarea
            value={choices}
            onChange={(e) => setChoices(e.target.value)}
            placeholder="Choices (one per line)"
            className="bg-black border border-[#333] p-3 rounded w-full h-24"
          />

          <div className="space-y-2">
            <label className="text-gray-400">Start Time</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="bg-black border border-[#333] p-3 rounded w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400">End Time</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="bg-black border border-[#333] p-3 rounded w-full"
            />
          </div>

          <button
            onClick={generate}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Generate Snapshot Payload
          </button>
        </div>

        {/* Right side output */}
        <div>
          {output && (
            <>
              <h2 className="text-xl font-semibold mb-3">Generated JSON</h2>

              <textarea
                value={output}
                readOnly
                className="bg-[#111] border border-[#222] p-4 rounded w-full h-96 text-gray-300"
              />

              <button
                onClick={copy}
                className="mt-3 px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition"
              >
                Copy to Clipboard
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
