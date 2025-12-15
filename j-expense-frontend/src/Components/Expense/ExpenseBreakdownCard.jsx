import { getCategorySummary } from "../../utils/expenseUtils.jsx";
import { categoryIcons } from "../../utils/categoryIcons.jsx";

export default function ExpenseBreakdownCard({ category, transactions = [] }) {
  const { total, changePercent, recent } = getCategorySummary(category, transactions);

  const arrow = changePercent > 0 ? "↑" : changePercent < 0 ? "↓" : "";
  const arrowColor = changePercent > 0 ? "#dc2626" : changePercent < 0 ? "#16a34a" : "#6b7280";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "250px",
        maxWidth: "100%",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Header: Category + Total + Change */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            style={{
              fontSize: "14px",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{categoryIcons[category] || categoryIcons.Miscellaneous}</span>
            <span>{category}</span>
          </div>

          {/* Aligned Total Amount */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "20px 1fr",
              alignItems: "baseline",
              width: "160px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#6b7280",
                justifySelf: "end",
                lineHeight: 1,
              }}
            >
              ₱
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#111827",
                fontVariantNumeric: "tabular-nums",
                fontFeatureSettings: '"tnum" 1, "lnum" 1',
                fontFamily:
                  'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                textAlign: "left",
                lineHeight: 1,
              }}
            >
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: "600", color: arrowColor }}>
            {changePercent === 0 ? "No change" : `${arrow} ${Math.abs(changePercent)}%`}
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>vs last week</div>
        </div>
      </div>

      {/* Body: Recent Transactions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {recent.length > 0 ? (
          recent.map((tx, index) => (
            <div
              key={tx.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 80px",
                alignItems: "center",
                fontSize: "14px",
                color: "#374151",
                paddingBottom: "8px",
                borderBottom: index < recent.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              {/* Name + Merchant */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>{tx.name || "Unnamed"}</div>
                {tx.merchant && (
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{tx.merchant}</div>
                )}
              </div>

              {/* Aligned Transaction Amount */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "20px 1fr",
                  alignItems: "baseline",
                  justifyContent: "end",
                  width: "120px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    justifySelf: "end",
                    lineHeight: 1,
                  }}
                >
                  ₱
                </span>
                <span
                  style={{
                    fontFamily: "Inter, monospace",
                    fontVariantNumeric: "tabular-nums",
                    fontFeatureSettings: '"tnum" 1, "lnum" 1',
                    textAlign: "left",
                    lineHeight: 1,
                  }}
                >
                  {Number(tx.amount).toLocaleString()}
                </span>
              </div>

              {/* Date */}
              <div style={{ fontSize: "12px", color: "#6b7280", textAlign: "right" }}>
                {new Date(tx.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
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
