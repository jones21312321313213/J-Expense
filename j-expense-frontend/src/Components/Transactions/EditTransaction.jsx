// src/pages/EditTransaction.jsx
import { useState, useEffect } from "react";
import SelectCategory from "../Category/SelectCategory";
import { transactionService } from "../Services/TransactionsService";
import { useLocation, useNavigate } from "react-router-dom";

// --- Sub-components (from AddTransaction) ---
import EditTransactionExpenses from "../Transactions/EditTransactionExpenses";
import EditTransactionIncome from "../Transactions/EditTransactionIncome";
import EditTransactionDefault from "../Transactions/EditTransactionDefault";
import EditTransactionRepetitive from "../Transactions/EditTransactionRepetitive";
import DeleteTransaction from "../Transactions/DeleteTransaction";


function EditTransaction() {
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
  const [showDelete, setShowDelete] = useState(false);

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

  const location = useLocation();
  const navigate = useNavigate();
  const transaction = location.state?.transaction || null;

  const transactionId = location.state?.transactionId;


useEffect(() => {
  if (!transactionId) return;

  transactionService.getTransactionById(transactionId)
    .then(data => {
      setName(data.name);
      setAmountValue(data.amount);
      setLeftTab(data.incomeFlag ? "income" : "expenses");
      setDescription(data.description || "");
      setSelectedCategory(data.categoryName || "");
      setPaymentMethod(data.paymentMethod || "");
      setIncomeType(data.incomeType || "");

      // Set repetitive transaction data FIRST
      setPeriodLength(data.periodLength ?? 1);
      setPeriodUnit(data.periodUnit ?? "Day");
      setEndDate(data.endDate ?? "");

      // Then set tab to repetitive if it's recurring
      setRightTab(data.isRecurring ? "repetitive" : "default");

      // Date for beginning
      if (data.creation_date) {
        try {
          const dateObj = new Date(data.creation_date);
          if (!isNaN(dateObj.getTime())) {
            setBeginning(dateObj.toISOString().split('T')[0]);
          } else {
            setBeginning("");
          }
        } catch (error) {
          console.error("Error parsing date:", error);
          setBeginning("");
        }
      } else {
        setBeginning("");
      }
    })
    .catch(err => console.error(err));
}, [transactionId]);





  // --- Submit transaction ---
  const handleSubmit = async () => {
    if (!transactionId) {
      console.error("Transaction ID is missing");
      return alert("Transaction ID is missing");
    }

const transactionData = {
  name,
  amount: amountValue,
  creation_date: new Date(beginning).toISOString(),
  description,
  categoryID: categoryMap[selectedCategory] || 0,
  userID: 27,
  isIncome: leftTab === "income",
  type: leftTab === "income" ? incomeType : undefined,
  paymentMethod: leftTab === "expenses" ? paymentMethod : undefined,
  isRecurring: rightTab === "repetitive",
  // Use backend DTO field names:
  intervalDays: rightTab === "repetitive" ? periodLength : undefined,
  recurringDate: rightTab === "repetitive" ? (endDate ? new Date(endDate) : undefined) : undefined,
};


    // --- Debugging logs ---
    console.log("Formatted date sent to API:", transactionData.creation_date);
    console.log("Transaction payload:", transactionData);

    try {
      const response = await transactionService.updateTransaction(transactionId, transactionData);
      console.log("Update response:", response);
      alert("Transaction updated successfully!");
    } catch (err) {
      console.error("Failed to update transaction.", err);

      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        alert(`Failed to update transaction: ${err.response.data?.message || 'Unknown error'}`);
      } else {
        alert(`Failed to update transaction: ${err.message || 'Unknown error'}`);
      }
    }
  };
  
  // --- Styles ---
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

  const saveButtonStyle = {
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
  };

  // --- Active tab styles ---
  const activeStyle = {
    borderBottom: "2px solid #21c7b8",
    color: "#21c7b8",
    fontWeight: "600",
  };

  const tabBase = {
    paddingBottom: "6px",
    cursor: "pointer",
    marginRight: "20px",
    borderBottom: "2px solid transparent",
    transition: "0.2s",
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
    {/* Top Bar: Back Arrow + Delete */}
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Back Arrow */}
      <i
        className="bi bi-chevron-left"
        style={{ fontSize: "1.5rem", cursor: "pointer" }}
        onClick={() => window.history.back()}
      ></i>

      {/* Trash / Delete */}
      <i
        className="bi bi-trash"
        style={{
          fontSize: "1.4rem",
          cursor: "pointer",
          color: "#e74c3c",
        }}
         onClick={() => setShowDelete(true)}
      ></i>
    </div>

  {showDelete && (
    <DeleteTransaction
      transactionName={name}   // ✅ FIXED
      onClose={() => setShowDelete(false)}
      onDelete={async () => {
        try {
          await transactionService.deleteTransaction(transactionId);
          setShowDelete(false);
          navigate("/transactions");
        } catch (err) {
          console.error("Delete failed", err);
          alert("Failed to delete transaction");
        }
      }}
    />
  )}



      {/* Page Title */}
      <h1 style={{ margin: 0, textAlign: "center" }}>Edit Transaction</h1>

      {/* MAIN EDIT TRANSACTION FORM */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          width: "100%",
          minHeight: "350px",
          boxShadow: "0 5px 12px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          {/* LEFT SIDE */}
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <span
                style={{ ...tabBase, ...(leftTab === "expenses" ? activeStyle : {}) }}
                onClick={() => setLeftTab("expenses")}
              >
                Expenses
              </span>
              <span
                style={{ ...tabBase, ...(leftTab === "income" ? activeStyle : {}) }}
                onClick={() => setLeftTab("income")}
              >
                Income
              </span>
            </div>

            <div style={{ marginTop: "20px" }}>
              {leftTab === "expenses" && (
                <EditTransactionExpenses
                  mode="edit"
                  name={name}
                  setName={setName}
                  amountValue={amountValue}
                  setAmountValue={setAmountValue}
                  beginning={beginning}
                  setBeginning={setBeginning}
                  description={description}
                  setDescription={setDescription}
                  error={error}
                  setError={setError}
                  category={category}
                  setCategory={setCategory}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              )}
              {leftTab === "income" && (
                <EditTransactionIncome
                  mode="edit"
                  name={name}
                  setName={setName}
                  amountValue={amountValue}
                  setAmountValue={setAmountValue}
                  beginning={beginning}
                  setBeginning={setBeginning}
                  description={description}
                  setDescription={setDescription}
                  error={error}
                  setError={setError}
                  category={category}
                  setCategory={setCategory}
                  type={incomeType}
                  setType={setIncomeType}
                />
              )}
            </div>
          </div>

          {/* SEPARATOR */}
          <div style={{ width: "1px", background: "#cfcfcf", margin: "0 20px" }}></div>

          {/* RIGHT SIDE */}
          <div style={{ width: "50%", paddingLeft: "20px" }}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <span
                style={{ ...tabBase, ...(rightTab === "default" ? activeStyle : {}) }}
                onClick={() => setRightTab("default")}
              >
                Default
              </span>

              <span
                style={{ ...tabBase, ...(rightTab === "repetitive" ? activeStyle : {}) }}
                onClick={() => setRightTab("repetitive")}
              >
                Repetitive
              </span>
            </div>

            <div style={{ marginTop: "20px" }}>
              {rightTab === "default" && <EditTransactionDefault mode="edit" />}
              {rightTab === "repetitive" && (
                <EditTransactionRepetitive
                  mode="edit"
                  periodLength={periodLength}
                  setPeriodLength={setPeriodLength}
                  periodUnit={periodUnit}
                  setPeriodUnit={setPeriodUnit}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#ccc",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        ></div>
      </div>

      {/* Category Selector */}
      <h2 style={categoryTitleStyle}>Select a Category</h2>
      <div style={categoryContainerStyle}>
        <div style={categoryScrollStyle}>
          <SelectCategory selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button style={saveButtonStyle} onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
}

export default EditTransaction;
