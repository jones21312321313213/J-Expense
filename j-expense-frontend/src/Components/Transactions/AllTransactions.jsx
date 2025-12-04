import React from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png";

function AllTransactions() {
  // Mock data with `type`: "income" or "expense"
  const data = [
    { item: "Groceries", date: "2025-12-04", amount: "₱450", type: "expense" },
    { item: "Salary", date: "2025-12-01", amount: "₱15,000", type: "income" },
    { item: "Load", date: "2025-12-02", amount: "₱50", type: "expense" },
    { item: "Freelance Work", date: "2025-11-28", amount: "₱3,200", type: "income" },
    { item: "Bonus", date: "2025-11-25", amount: "₱1,000", type: "income" },
    { item: "Transport", date: "2025-12-01", amount: "₱120", type: "expense" },
  ];

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

            {/* DYNAMIC COLOR AMOUNT */}
            <span
              style={{
                textAlign: "right",
                fontWeight: 500,
                color: row.type === "income" ? "green" : "red",
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

export default AllTransactions;
