import React, { useEffect, useState } from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png"; 
import { transactionService } from "../Services/TransactionsService";
import { useNavigate } from "react-router-dom";

function IncomeTransactions() {
  const [data, setData] = useState([]);
  const userId = 27;
  const navigate = useNavigate();

  useEffect(() => {
    transactionService.getTransactionsByUser(userId)
      .then((transactions) => {
        // Filter only income transactions + KEEP ID
        const incomes = transactions
          .filter((t) => t.type === "income")
          .map((t) => ({
            id: t.id, // ⭐ MUST KEEP SO WE CAN EDIT
            item: t.item,
            date: t.date,
            description: t.description || "-",
            amount: t.amount,
            type: t.type,
            icon: foodBg,
          }));

        console.log("Fetched income transactions:", incomes);
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

      {/* Scrollable Section */}
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
            <span>{row.description}</span>

            {/* GREEN AMOUNT */}
            <span
              style={{
                textAlign: "right",
                fontWeight: 600,
                color: "green",
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

export default IncomeTransactions;
