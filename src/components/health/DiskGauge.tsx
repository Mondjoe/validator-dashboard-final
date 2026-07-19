"use client";

import { useEffect, useState } from "react";

export function DiskGauge({ value }: any) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const target = value * 100;
    let frame = 0;

    const interval = setInterval(() => {
      frame += 2;
      if (frame >= target) {
        setAnimated(target);
        clearInterval(interval);
      } else {
        setAnimated(frame);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-2">Disk Usage</h2>

      <div className="w-full bg-neutral-800 rounded-lg h-4 overflow-hidden">
        <div
          className="bg-purple-500 h-4 transition-all duration-300"
          style={{ width: `${animated}%` }}
        />
      </div>

      <p className="text-neutral-300 mt-2">{animated.toFixed(1)}%</p>
    </div>
  );
}