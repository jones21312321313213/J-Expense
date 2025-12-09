import React, { useEffect, useState } from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png"; // fallback icon
import { transactionService } from "../../Components/TransactionsService";

function ExpensesTransactions() {
  const [data, setData] = useState([]);

  // Hardcoded userId for now
  const userId = 27;

  useEffect(() => {
    transactionService.getTransactionsByUser(userId)
      .then((transactions) => {
        // Filter only expense transactions
        const expenses = transactions
          .filter((t) => t.type === "expense")
          .map((t) => ({
            item: t.item,
            date: t.date,
            description: t.description || "-", // include description
            amount: t.amount,
            icon: foodBg, // placeholder icon
          }));

        console.log("Fetched expense transactions:", expenses); // Debug print
        setData(expenses);
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
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          fontWeight: 600,
          padding: "10px 0",
        }}
      >
        <span>Item</span>
        <span>Date</span>
        <span>Description</span>
        <span style={{ textAlign: "right" }}>Amount</span>
      </div>

      {/* Scrollable Section */}
      <div style={contentStyle}>
        {data.map((row, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              padding: "12px 0",
              alignItems: "center",
            }}
          >
            {/* ITEM + CATEGORY ICON */}
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
            <span>{row.description}</span>

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
