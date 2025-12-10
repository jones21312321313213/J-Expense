// src/pages/AddTransactionPage.jsx
import { useState } from "react";
import AddTransaction from "../Components/Transactions/AddTransaction";
import SelectCategory from "../Components/Category/SelectCategory";
import { transactionService } from "../Components/Services/TransactionsService";

function AddTransactionPage() {
  // --- Transaction State ---
  const [leftTab, setLeftTab] = useState("expenses"); // expense or income
  const [name, setName] = useState("");
  const [amountValue, setAmountValue] = useState(0);
  const [beginning, setBeginning] = useState(""); // date
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [error, setError] = useState("");

  // --- Repetitive Transaction State ---
  const [rightTab, setRightTab] = useState("default");
  const [periodLength, setPeriodLength] = useState(1);
  const [periodUnit, setPeriodUnit] = useState("Day");
  const [endDate, setEndDate] = useState("");

  // --- Selected category for submission ---
  const [selectedCategory, setSelectedCategory] = useState("");

  // Map category names to IDs (example)
  const categoryMap = {
    Food: 1,
    Transport: 2,
    Entertainment: 3,
    Grocery: 4,
    Shopping: 5,
  };

  // --- Submit transaction ---
  const handleSubmit = async () => {
    if (!name) {
      alert("Please enter a Name for the transaction");
      return;
    }

    if (!amountValue || amountValue <= 0) {
      alert("Please enter a valid Amount greater than 0");
      return;
    }

    if (!selectedCategory) {
      alert("Please select a Category");
      return;
    }

    if (!beginning) {
      alert("Please select a Date for the transaction");
      return;
    }

    // Convert repetitive → intervalDays
    let intervalDays = null;
    if (rightTab === "repetitive") {
      if (!periodLength || !periodUnit) {
        alert("Please fill in the repetitive period.");
        return;
      }

      const unit = periodUnit.toLowerCase();

      if (unit === "day") intervalDays = periodLength * 1;
      else if (unit === "week") intervalDays = periodLength * 7;
      else if (unit === "month") intervalDays = periodLength * 30;
      else if (unit === "year") intervalDays = periodLength * 365;
      else intervalDays = null;
    }


    // ---- Build the payload ----
    const transactionData = {
      name,
      amount: amountValue,
      creation_date: beginning,
      description,
      categoryID: categoryMap[selectedCategory] || 0,
      userID: 27,
      isIncome: leftTab === "income",
      type: leftTab === "income" ? incomeType : undefined,
      paymentMethod: leftTab === "expenses" ? paymentMethod : undefined,

      // RECURRING FIELDS
      isRecurring: rightTab === "repetitive",
      recurringDate: rightTab === "repetitive" ? endDate : null,
      intervalDays: rightTab === "repetitive" ? intervalDays : null
    };


    try {
      const result = await transactionService.createTransaction(transactionData);
      console.log("Transaction saved:", result);
      alert("Transaction added successfully!");

      // Reset form
      setName("");
      setAmountValue(0);
      setBeginning("");
      setDescription("");
      setSelectedCategory("");
      setPaymentMethod("");
      setIncomeType("");
      setPeriodLength(1);
      setPeriodUnit("Day");
      setEndDate("");
      setRightTab("default");

    } catch (err) {
      console.error("Error saving transaction:", err);
      alert("Failed to add transaction.");
    }
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
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  };

  const categoryTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  const addButtonStyle = {
    background: "#21c7b8",
    border: "none",
    borderRadius: "10px",
    padding: "12px 25px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "30px",
    width: "350px",
    height: "80px",
    color: "white",
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    console.log("Selected category:", categoryName);
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
      {/* Back Arrow */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <i className="bi-chevron-left" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
      </div>

      {/* Page Title */}
      <h1 style={{ margin: 0, textAlign: "center" }}>Add Transaction</h1>

      {/* Add Transaction Form */}
      <AddTransaction
        leftTab={leftTab}
        setLeftTab={setLeftTab}
        rightTab={rightTab}
        setRightTab={setRightTab}
        name={name}
        setName={setName}
        amountValue={amountValue}
        setAmountValue={setAmountValue}
        beginning={beginning}
        setBeginning={setBeginning}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        error={error}
        setError={setError}
        periodLength={periodLength}
        setPeriodLength={setPeriodLength}
        periodUnit={periodUnit}
        setPeriodUnit={setPeriodUnit}
        endDate={endDate}
        setEndDate={setEndDate}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        incomeType={incomeType}
        setIncomeType={setIncomeType}
      />

      {/* Category Selector */}
      <h2 style={categoryTitleStyle}>Select a Category</h2>
      <div style={categoryContainerStyle}>
        <div style={categoryScrollStyle}>
          <SelectCategory selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
        </div>
      </div>

      {/* Submit Button */}
      <button style={addButtonStyle} onClick={handleSubmit}>
        Add Transaction
      </button>
    </div>
  );
}

export default AddTransactionPage;
