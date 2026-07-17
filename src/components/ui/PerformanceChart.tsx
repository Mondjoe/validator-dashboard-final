"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function PerformanceChart({ title, labels, data }) {
  return (
    <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: title,
              data,
              borderColor: "#4ade80",
              backgroundColor: "rgba(74, 222, 128, 0.2)",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { ticks: { color: "#aaa" } },
            y: { ticks: { color: "#aaa" } },
          },
        }}
      />
    </div>
  );
}