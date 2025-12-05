/**
 * AddTransactionPage Component
 * ----------------------------
 * A page to create a new transaction with options for income/expenses,
 * plus the ability to select a category. Includes a back arrow,
 * a main AddTransaction form, a horizontally scrollable category selector,
 * and an "Add Transaction" button at the bottom.
 */

import { useState } from "react";
import SelectCategory from "../Components/Category/SelectCategory";
import AddTransaction from "../Components/Transactions/AddTransaction";

function AddTransactionPage() {
  // Track selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Optional: track selected amount per category if needed
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    console.log("Selected category:", categoryName);
  };

  const categoryContainerStyle = {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    background: "white",
    borderRadius: "20px",
    paddingTop: "15px",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 5px 12px rgba(0,0,0,0.08)",
  };

  const categoryScrollStyle = {
    width: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "10px 0",
  };

  const categoryTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  const addButtonStyle = {
    background: "#D9D9D9",
    border: "none",
    borderRadius: "10px",
    padding: "12px 25px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "30px",
    width: "350px",
    height: "80px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: "30px",
        padding: "20px",
      }}
    >
      {/* BACK ARROW */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <i className="bi-chevron-left" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
      </div>

      {/* TITLE */}
      <h1 style={{ margin: 0, textAlign: "center" }}>Add Transaction</h1>

      {/* ADD TRANSACTION CONTAINER */}
      <AddTransaction />


      <h2 style={categoryTitleStyle}>Select a Category</h2>
      <div style={categoryContainerStyle}>
        <div
          style={{
            ...categoryScrollStyle,
            display: "flex",
            justifyContent: "center",  // centers items horizontally
            gap: "20px",
          }}
        >
          <SelectCategory
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      </div>


      {/* ADD TRANSACTION BUTTON */}
      <button style={addButtonStyle} onClick={() => console.log("Adding transaction with category:", selectedCategory)}>
        Add Transaction
      </button>
    </div>
  );
}

export default AddTransactionPage;
