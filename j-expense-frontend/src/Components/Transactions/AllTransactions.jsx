import React, { useEffect, useState } from "react";
import CategoryTile from "../../Components/Category/CategoryTile";
import foodBg from "../../assets/foodCategory.png"; // fallback icon
import { transactionService } from '../Services/TransactionsService';
import { useNavigate } from "react-router-dom";

function AllTransactions() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch transactions from backend
  useEffect(() => {
    transactionService.getTransactionsByUser(27) // hardcoded userID
      .then(mappedData => {
        console.log("Fetched transactions:", mappedData); // Debug print
        setData(mappedData);
      })
      .catch(err => console.error("Failed to fetch transactions:", err));
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

  const descriptionStyle = {
    whiteSpace: "normal", // allow wrapping
    wordBreak: "break-word", // break long words
    overflowWrap: "anywhere",
    maxWidth: "400px", // adjust as needed
  };

  return (
    <div style={containerStyle}>
      {/* Table Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr 1fr",
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
          onClick={() => navigate("/app/edit-transaction", { state: { transactionId: row.id } })}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr 1fr",
            padding: "12px 0",
            alignItems: "center",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f7")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {/* ITEM + ICON */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CategoryTile
              name=""
              icon={foodBg}
              bgColor="#f1f1f1"
              textColor="black"
            />
            <span>{row.name}</span>
          </div>

          <span>{row.date}</span>

          <span style={descriptionStyle}>{row.description || "-"}</span>

          <span
            style={{
              textAlign: "right",
              fontWeight: 500,
              color: row.type === "income" ? "green" : "red",
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

export default AllTransactions;
