import { getCategorySummary } from "../../utils/expenseUtils.jsx";
import { categoryIcons } from "../../utils/categoryIcons.jsx";

export default function ExpenseBreakdownCard({ category, transactions = [] }) {
  const { total, changePercent, recent } = getCategorySummary(category, transactions);

  const arrow = changePercent > 0 ? "↑" : changePercent < 0 ? "↓" : "";
  const arrowColor = changePercent > 0 ? "#dc2626" : changePercent < 0 ? "#16a34a" : "#6b7280";

  // Format date to stay within bounds
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // Handle hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        minWidth: "320px",
        maxWidth: "100%",
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        marginRight: "24px", // Added spacing between cards
        marginBottom: "16px", // Added bottom spacing
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header: Category + Total + Change */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <div
            style={{
              fontSize: "16px",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "500",
            }}
          >
            <span style={{ fontSize: "20px" }}>{categoryIcons[category] || categoryIcons.Miscellaneous}</span>
            <span style={{ color: "#1a1a1a", fontWeight: "600" }}>{category}</span>
          </div>

          {/* Total Amount with Currency */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#6b7280",
                fontWeight: "500",
                marginTop: "2px",
              }}
            >
              ₱
            </span>
            <span
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#111827",
                fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Change Percentage */}
        <div style={{ 
          textAlign: "right",
          minWidth: "120px",
          marginLeft: "20px"
        }}>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: "700", 
            color: arrowColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "4px"
          }}>
            {changePercent === 0 ? (
              <span style={{ fontSize: "16px", fontWeight: "500" }}>No change</span>
            ) : (
              <>
                <span>{arrow}</span>
                <span>{Math.abs(changePercent)}%</span>
              </>
            )}
          </div>
          <div style={{ 
            fontSize: "14px", 
            color: "#9ca3af",
            marginTop: "4px",
            fontWeight: "500"
          }}>
            vs last week
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  
        
        {recent.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recent.map((tx, index) => (
              <div
                key={tx.id || index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: index < recent.length - 1 ? "1px solid #f5f5f5" : "none",
                  gap: "16px",
                  minWidth: 0, // Prevents overflow
                }}
              >
                {/* Transaction Info - Updated with bigger, standout name */}
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  flex: 1,
                  minWidth: 0, // Allows text truncation
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    fontSize: "17px", // Bigger font size (from 15px)
                    fontWeight: "600", // Bolder (from 500)
                    color: "#0d47a1", // More standout blue color
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "180px", // Limit width for long names
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: "-0.2px",
                    lineHeight: 1.3,
                  }}>
                    {tx.name || "Unnamed Transaction"}
                  </div>
                  {tx.merchant && (
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#666",
                      marginTop: "4px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "180px", // Limit width for long merchant names
                      fontWeight: "500",
                    }}>
                      {tx.merchant}
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "baseline",
                  gap: "4px",
                  minWidth: "90px",
                  justifyContent: "flex-end",
                  marginRight: "12px", // Added spacing between amount and date
                }}>
                  <span style={{ 
                    fontSize: "14px", 
                    color: "#6b7280", 
                    fontWeight: "500" 
                  }}>
                    ₱
                  </span>
                  <span style={{ 
                    fontSize: "16px", 
                    fontWeight: "600", 
                    color: "#111827",
                    fontFamily: '"SF Mono", "Roboto Mono", monospace',
                    fontVariantNumeric: "tabular-nums"
                  }}>
                    {Number(tx.amount).toLocaleString()}
                  </span>
                </div>

                {/* Date - Fixed to prevent overflow */}
                <div style={{ 
                  fontSize: "13px", 
                  color: "#6b7280", 
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  minWidth: "50px",
                  maxWidth: "60px",
                  textAlign: "right",
                  paddingLeft: "8px"
                }}>
                  {formatDate(tx.date)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "24px 16px",
            backgroundColor: "#f9fafb",
            borderRadius: "12px"
          }}>
            <div style={{ 
              fontSize: "15px", 
              color: "#6b7280",
              fontWeight: "500"
            }}>
              No recent transactions
            </div>
            <div style={{ 
              fontSize: "13px", 
              color: "#9ca3af",
              marginTop: "4px"
            }}>
              Transactions will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
