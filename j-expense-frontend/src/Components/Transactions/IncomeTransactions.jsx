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
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png";

function IncomeTransactions() {
  const data = [
    { item: "Salary", date: "2025-12-01", amount: "₱15,000", icon: "/icons/salary.png" },
    { item: "Freelance Work", date: "2025-11-28", amount: "₱3,200", icon: "/icons/freelance.png" },
    { item: "Bonus", date: "2025-11-25", amount: "₱1,000", icon: "/icons/bonus.png" },
  ];

  // Container style: responsive height
  const containerStyle = {
    width: "100%",
    flex: 1,                 // take remaining space from parent
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",      // prevent overflow outside container
  };

  // Scrollable content style
  const contentStyle = {
    flex: 1,                 // fill remaining height
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
          gridTemplateColumns: "1fr 1fr 1fr",
          fontWeight: 600,
          padding: "10px 0",
        }}
      >
        <span>Item</span>
        <span>Date</span>
        <span style={{ textAlign: "right" }}>Amount</span>
      </div>

      {/* Scrollable Section */}
      <div style={contentStyle}>
        {data.map((row, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "12px 0",
              alignItems: "center",
            }}
          >
            {/* ITEM + ICON */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CategoryTile
                name=""
                icon={foodBg}
                bgColor="#f1f1f1"
                textColor="black"
              />
              <span>{row.item}</span>
            </div>

            <span>{row.date}</span>

            {/* GREEN AMOUNT */}
            <span
              style={{
                textAlign: "right",
                fontWeight: 600,
                color: "green",
              }}
            >
              {row.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeTransactions;
