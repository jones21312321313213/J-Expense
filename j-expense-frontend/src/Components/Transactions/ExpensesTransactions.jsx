import React from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png";

function ExpensesTransactions() {
  const data = [
    { item: "Groceries", date: "2025-12-04", amount: "₱450", icon: "/icons/grocery.png" },
    { item: "Load", date: "2025-12-02", amount: "₱50", icon: "/icons/load.png" },
    { item: "Transport", date: "2025-12-01", amount: "₱120", icon: "/icons/transport.png" },
    // add more to test scrolling
  ];

  return (
    <div style={{ width: "100%", height: "370px" }}>
      
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
      <div
        style={{
          height: "330px",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "5px",
        }}
      >
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
            {/* ITEM + CATEGORY ICON */}
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

            {/* RED AMOUNT */}
            <span
              style={{
                textAlign: "right",
                fontWeight: 500,
                color: "red",
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

export default ExpensesTransactions;
