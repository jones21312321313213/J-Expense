import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getWeekData, getMonthData } from "../../utils/expenseUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WeeklyComparisonChart({ transactions = [] }) {
  const [view, setView] = useState("weekly");

  // Compute weekly or monthly data
  const { thisWeek, lastWeek, labels } =
    view === "weekly" ? getWeekData(transactions) : getMonthData(transactions);

  const data = {
    labels,
    datasets: [
      {
        label: "This week",
        data: thisWeek,
        backgroundColor: "#16a34a",
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: "Last week",
        data: lastWeek,
        backgroundColor: "#9ca3af",
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 20,
          font: { size: 14 },
          color: "#374151",
        },
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `₱${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 40000,
        ticks: {
          callback: (value) => `₱${Number(value).toLocaleString()}`,
        },
        grid: { color: "#e5e7eb" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "#f9fafb",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            cursor: "pointer",
          }}
        >
          <option value="weekly">Weekly Comparison</option>
          <option value="monthly">Monthly Comparison</option>
        </select>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
