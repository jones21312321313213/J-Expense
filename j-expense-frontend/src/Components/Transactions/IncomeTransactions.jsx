/**
 * IncomeTransactions.jsx
 * ----------------------
 * A component to display a scrollable list of income transactions in a table-like layout.
 *
 * Features:
 * - Renders a header row with columns: Item, Date, Amount.
 * - Displays each transaction with an icon (via CategoryTile), name, date, and amount.
 * - Amounts are styled in green to indicate income.
 * - Scrollable content area for long lists of transactions.
 * - Responsive container that fills available vertical space without overflowing.
 *
 * Props / State:
 * - `data` (array): hardcoded list of income transactions with fields: item, date, amount, icon.
 *
 * Notes:
 * - Uses CSS Grid for column layout.
 * - Uses flexbox for item + icon alignment.
 * - Container and content areas use flex and overflow to ensure scrollable content.
 * - Supports dynamic addition of more transactions by extending the `data` array.
 */


import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png"; // placeholder icon

function IncomeTransactions() {
  const { transactions, removeTransaction } = useTransactions();

  // Carry original index along with each transaction
  const incomeTx = transactions
    .map((tx, idx) => ({ tx, idx }))
    .filter(({ tx }) => tx.type === "Income");

  const containerStyle = {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    paddingTop: "10px",
    paddingRight: "5px",
  };

  return (
    <div style={containerStyle}>
      {/* Table Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 80px",
          fontWeight: 600,
          padding: "10px 0",
        }}
      >
        <span>Item</span>
        <span>Date</span>
        <span style={{ textAlign: "right" }}>Amount</span>
        <span style={{ textAlign: "center" }}>Action</span>
      </div>

      {/* Scrollable Section */}
      <div style={contentStyle}>
        {incomeTx.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>No income transactions yet.</p>
        ) : (
          incomeTx.map(({ tx, idx }) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 80px",
                padding: "12px 0",
                alignItems: "center",
                borderBottom: "1px solid #f1f1f1",
              }}
            >
              {/* ITEM + ICON */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CategoryTile
                  name={tx.category}
                  icon={foodBg} // you can swap icons per category later
                  bgColor="#f1f1f1"
                  textColor="black"
                />
                <span>{tx.name || "Untitled"}</span>
              </div>

              {/* DATE */}
              <span>
                {tx.date
                  ? new Date(tx.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No date"}
              </span>

              {/* AMOUNT (green for income) */}
              <span
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  color: "green",
                }}
              >
                ₱ {Number(tx.amount ?? 0).toLocaleString()}
              </span>

              {/* DELETE BUTTON */}
              <button
                onClick={() => removeTransaction(idx)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default IncomeTransactions;
