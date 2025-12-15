import { getCategorySummary } from "../../utils/expenseUtils";
import { categoryIcons } from "../../utils/categoryIcons";
import { Link } from "react-router-dom";

export default function DashboardExpenseSummary({ transactions = [] }) {
  const categories = [...new Set(transactions.map(tx => tx.category?.trim()))].filter(Boolean);

  const hasExpenses = categories.some((c) => {
    const { total } = getCategorySummary(c, transactions);
    return total > 0;
  });

  return (
    <Link to="/app/expenses" style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          cursor: "pointer",
        }}
      >
        {categories.map((category) => {
          const { total, changePercent } = getCategorySummary(category, transactions);
          if (total === 0) return null;

          const arrow = changePercent > 0 ? "↑" : changePercent < 0 ? "↓" : "";
          const arrowColor = changePercent > 0 ? "#dc2626" : changePercent < 0 ? "#16a34a" : "#6b7280";

          return (
            <div
              key={category}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 100px",
                alignItems: "center",
                columnGap: "12px",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "8px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{categoryIcons[category] || categoryIcons.Miscellaneous}</span>
                <span>{category}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline" }}>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                    fontVariantNumeric: "tabular-nums",
                    fontFeatureSettings: '"tnum" 1, "lnum" 1',
                    fontFamily:
                      'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                    textAlign: "left",
                    minWidth: "140px",
                    display: "inline-block",
                  }}
                >
                  ₱ {Number(total).toLocaleString()}
                </span>
              </div>

              <div style={{ fontSize: "14px", fontWeight: 600, color: arrowColor, textAlign: "right" }}>
                {changePercent === 0 ? "No change" : `${arrow} ${Math.abs(changePercent)}%`}
              </div>
            </div>
          );
        })}

        {!hasExpenses && (
          <p style={{ color: "#6b7280", fontSize: "14px" }}>No expenses recorded yet</p>
        )}
      </div>
    </Link>
  );
}
