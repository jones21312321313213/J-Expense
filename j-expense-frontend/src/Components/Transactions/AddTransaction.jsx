import { useState } from "react";
import AddTransactionDefault from "./AddTransactionDefault";
import AddTransactionExpenses from "./AddTransactionExpenses";
import AddTransactionIncome from "./AddTransactionIncome";
import AddTransactionRepetitive from "./AddTransactionRepetitive";

function AddTransaction() {
  const [leftTab, setLeftTab] = useState("expenses");
  const [rightTab, setRightTab] = useState("default");

  // --- LIFTED STATE FOR TRANSACTION ---
  const [name, setName] = useState("");
  const [amountValue, setAmountValue] = useState(0);
  const [beginning, setBeginning] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

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
      {/* MAIN ROW */}
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
              <AddTransactionExpenses
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
              />
            )}
            {leftTab === "income" && (
              <AddTransactionIncome
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
              />
            )}
          </div>
        </div>

        {/* SEPARATOR */}
        <div
          style={{
            width: "1px",
            background: "#cfcfcf",
            margin: "0 20px",
          }}
        ></div>

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
            {rightTab === "default" && <AddTransactionDefault />}
            {rightTab === "repetitive" && <AddTransactionRepetitive />}
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
          marginBottom:"80px",
        }}
      ></div>
    </div>
  );
}

export default AddTransaction;
