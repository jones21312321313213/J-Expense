// src/Components/Transactions/AddTransaction.jsx
import React, { useState } from "react";
import AddTransactionDefault from "./AddTransactionDefault";
import AddTransactionExpenses from "./AddTransactionExpenses";
import AddTransactionIncome from "./AddTransactionIncome";
import AddTransactionRepetitive from "./AddTransactionRepetitive";

function AddTransaction({
  leftTab,
  setLeftTab,
  rightTab,
  setRightTab,
  name,
  setName,
  amountValue,
  setAmountValue,
  beginning,
  setBeginning,
  description,
  setDescription,
  category,
  setCategory,
  error,
  setError,
  periodLength,
  setPeriodLength,
  periodUnit,
  setPeriodUnit,
  endDate,
  setEndDate,
  paymentMethod,
  setPaymentMethod,
  incomeType,
  setIncomeType,

}) {
  // --- INTERNAL STATE ONLY FOR MODALS ---
  // None here; modals are inside sub-components

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
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              
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
                type={incomeType}
                setType={setIncomeType}
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
            {rightTab === "repetitive" && (
              <AddTransactionRepetitive
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
          marginBottom: "80px",
        }}
      ></div>
    </div>
  );
}

export default AddTransaction;
