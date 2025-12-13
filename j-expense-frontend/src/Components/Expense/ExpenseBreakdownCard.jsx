import React from "react";
import { getCategorySummary } from "../../utils/expenseUtils.jsx";
import { categoryIcons } from "../../utils/utils/categoryIcons";

export default function ExpenseBreakdownCard({ category, transactions = [] }) {
  const { total, changePercent, recent } = getCategorySummary(category, transactions);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#f3f4f6",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div>{categoryIcons[category]}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>{category}</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#111827" }}>
              ₱{total.toLocaleString()}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: "14px",
          fontWeight: "600",
          color: changePercent > 0 ? "#dc2626" : changePercent < 0 ? "#16a34a" : "#6b7280",
          textAlign: "right",
        }}>
          {changePercent === 0
            ? "No change"
            : `${changePercent > 0 ? "↑" : "↓"} ${Math.abs(changePercent)}%`}
          <br />
          <span style={{ fontWeight: "400", fontSize: "12px", color: "#6b7280" }}>
            compared to last week
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {recent.length > 0 ? (
          recent.map((tx) => (
            <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", fontSize: "14px", color: "#374151" }}>
                <div>{tx.name}</div>
                {tx.merchant && <div>{tx.merchant}</div>}
              </div>
              <div style={{ textAlign: "right", fontSize: "14px", color: "#374151" }}>
                <div>₱{Number(tx.amount).toLocaleString()}</div>
                <div>{new Date(tx.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ fontSize: "14px", color: "#6b7280" }}>No recent transactions</div>
        )}
      </div>
    </div>
  );
}
