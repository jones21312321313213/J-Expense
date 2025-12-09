import React, { useEffect, useState } from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png"; // fallback icon
import { transactionService } from "../../Components/TransactionsService";

function IncomeTransactions() {
  const [data, setData] = useState([]);

  // Hardcoded userId for now
  const userId = 27;

  useEffect(() => {
    transactionService.getTransactionsByUser(userId)
      .then((transactions) => {
        // Filter only income transactions
        const incomes = transactions
          .filter((t) => t.type === "income")
          .map((t) => ({
            item: t.item,
            date: t.date,
            amount: t.amount,
            icon: foodBg, // placeholder icon; you can replace with category-based icons later
          }));

        console.log("Fetched income transactions:", incomes); // Debug print
        setData(incomes);
      })
      .catch((err) => console.error("Failed to fetch transactions:", err));
  }, []);

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
                icon={row.icon}
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
