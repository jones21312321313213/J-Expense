import React, { useEffect, useState } from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png"; 
import { transactionService } from "../Services/TransactionsService";
import { useNavigate } from "react-router-dom";

function ExpensesTransactions() {
  const [data, setData] = useState([]);
  const userId = 27;
  const navigate = useNavigate();

  useEffect(() => {
    transactionService.getTransactionsByUser(userId)
      .then((transactions) => {
        // Filter only expenses, BUT keep the transactionId
        const expenses = transactions
          .filter((t) => t.type === "expense")
          .map((t) => ({
            id: t.id,             
            name: t.name,
            date: t.date,
            description: t.description || "-",
            amount: t.amount,
            type: t.type,
            icon: foodBg,
          }));

        console.log("Expense transactions:", expenses);
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
      {/* Header */}
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

      {/* Scrollable Rows */}
      <div style={contentStyle}>
        {data.map((row, index) => (
          <div
            key={index}
            onClick={() =>
              navigate("/app/edit-transaction", { state: { transactionId: row.id } })
            }
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              padding: "12px 0",
              alignItems: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#f7f7f7")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {/* ITEM */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CategoryTile
                name=""
                icon={row.icon}
                bgColor="#f1f1f1"
                textColor="black"
              />
              <span>{row.name}</span>
            </div>

            <span>{row.date}</span>
            <span>{row.description}</span>

            {/* AMOUNT */}
            <span
              style={{
                textAlign: "right",
                fontWeight: 500,
                color: "red",
              }}
            >
              {row.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensesTransactions;
