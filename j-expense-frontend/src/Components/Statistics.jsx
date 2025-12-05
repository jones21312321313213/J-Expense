// The chart in the dashboard
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const mockData = {
  weekly: { labels: ["17 Sun", "18 Mon", "19 Tue", "20 Wed", "21 Thu", "22 Fri", "23 Sat"], thisPeriod: [13000, 0, 6000, 18000, 20000, 4000, 2000], lastPeriod: [40000, 10000, 6500, 32000, 13000, 9000, 21000] },
  monthly: { labels: ["Week 1", "Week 2", "Week 3", "Week 4"], thisPeriod: [12000, 18000, 25000, 19000], lastPeriod: [10000, 16000, 20000, 17000] },
  yearly: { labels: ["Q1", "Q2", "Q3", "Q4"], thisPeriod: [40000, 55000, 62000, 50000], lastPeriod: [35000, 50000, 58000, 48000] },
};

function Statistics() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [timePeriod, setTimePeriod] = useState("weekly");

  const getComparisonLabels = (period) => {
    switch (period) {
      case "weekly": return { current: "This week", previous: "Last week" };
      case "monthly": return { current: "This month", previous: "Last month" };
      case "yearly": return { current: "This year", previous: "Last year" };
      default: return { current: "Current", previous: "Previous" };
    }
  };

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const periodData = mockData[timePeriod];
    const comparisonLabels = getComparisonLabels(timePeriod);

    const data = {
      labels: periodData.labels,
      datasets: [
        { label: comparisonLabels.current, data: periodData.thisPeriod, backgroundColor: "#20A880", barPercentage: 0.8, categoryPercentage: 0.8 },
        { label: comparisonLabels.previous, data: periodData.lastPeriod, backgroundColor: "#E0E0E0", barPercentage: 0.8, categoryPercentage: 0.8 },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "top", align: "end", labels: { boxWidth: 10, padding: 20 } },
        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.formattedValue} users` } },
        title: { display: false },
      },
      scales: {
        y: { beginAtZero: true, grid: { display: true, drawBorder: false, color: "rgba(0,0,0,0.1)" }, ticks: { callback: (v) => (v === 0 ? "P 0" : "P " + v / 1000 + "k"), padding: 10, font: { size: 14 } } },
        x: { grid: { display: false, drawBorder: false }, ticks: { padding: 10, font: { size: 14 } } },
      },
    };

    chartInstanceRef.current = new Chart(chartRef.current, { type: "bar", data, options });

    return () => { if (chartInstanceRef.current) chartInstanceRef.current.destroy(); };
  }, [timePeriod]);

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box",backgroundColor:"white" }}>
      {/* Dropdown */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            style={{ appearance: "none", background: "transparent", border:"none", outline:"none", padding: "5px 25px 5px 10px", cursor: "pointer", fontSize: "1rem" }}
          >
            <option value="weekly">Weekly Comparison</option>
            <option value="monthly">Monthly Comparison</option>
            <option value="yearly">Yearly Comparison</option>
          </select>
          <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>⌄</span>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{ width: "100%", height: "400px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default Statistics;
