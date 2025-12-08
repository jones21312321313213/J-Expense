import React, { useState } from "react";
import DatePicker from "../DatePicker";
import SetPeriod from "../SetPeriod";
import SetPeriodLength from "../SetPeriodLength";
import SetAmount from "../setAmount";
import SelectCategory from "../Category/SelectCategory"; // adjust path if needed

function EditBudget({
  name,
  setName,
  amountValue,
  setAmountValue,
  frequency,
  setFrequency,
  periodUnit,
  setPeriodUnit,
  beginning,
  setBeginning,
  until,
  setUntil,
  onRequestSetAmount,
  error,
  setError,
  onBack, 
  initialCategory,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUntilDatePicker, setShowUntilDatePicker] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showPeriodLengthModal, setShowPeriodLengthModal] = useState(false);
  const [showSetAmount, setShowSetAmount] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");




  const containerStyle = {
    width: "90%",
    maxWidth: "700px",
    minHeight: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "linear-gradient(135deg, #c7e8ff, #ffe6cc)",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    position: "relative",
    textAlign: "center",
  };

  const backStyle = {
    position: "absolute",
    top: "15px",
    left: "20px",
    fontSize: "24px",
    cursor: "pointer",
    fontWeight: "600",
  };

  const inputStyle = {
    padding: "10px",
    border: "none",
    borderBottom: "2px solid #ccc",
    width: "100%",
    marginBottom: "20px",
    outline: "none",
    fontSize: "1rem",
    background: "transparent",
  };

  const smallerInputStyle = { ...inputStyle, width: "200px" };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div style={containerStyle}>
      {/* BACK BUTTON */}
      <span style={backStyle} onClick={onBack}>&lt;</span>

      {/* TITLE */}
      {error && (
        <div style={{
          color: "#dc2626",
          background: "#fee2e2",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}>
          {error}
        </div>
      )}
      <h1 style={{ marginBottom: "20px", marginTop:"80px" }}>Edit Budget</h1>

      {/* NAME */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={smallerInputStyle}
      />

      {/* AMOUNT / FREQUENCY / PERIOD */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input
          readOnly
          placeholder="P"
          value={amountValue ? `P ${amountValue}` : ""}
          onClick={() => setShowSetAmount(true)} // <-- open SetAmount modal
          style={{ ...inputStyle, width: "80px", textAlign: "center" }}
        />
        
        <span>/</span>
        <input
          readOnly
          value={frequency}
          placeholder="1"
          onClick={() => setShowPeriodLengthModal(true)}
          style={{ ...inputStyle, width: "60px", textAlign: "center" }}
        />
        <input
          readOnly
          value={periodUnit}
          placeholder="Select Period"
          onClick={() => setShowPeriodModal(true)}
          style={{ ...inputStyle, width: "120px", textAlign: "center" }}
        />
      </div>

      {/* SetAmount Modal */}
      {showSetAmount && (
        <SetAmount
          initialValue={amountValue}
          onConfirm={(val) => setAmountValue(val)} // <-- this works now
          onClose={() => setShowSetAmount(false)}
          title="Set Budget Amount"
        />
      )}



      {showPeriodModal && (
        <SetPeriod
          initialPeriod={periodUnit}
          onSelectPeriod={(selected) => setPeriodUnit(selected)}
          onClose={() => setShowPeriodModal(false)}
        />
      )}

      {showPeriodLengthModal && (
        <SetPeriodLength
          initialValue={frequency}
          onConfirm={(val) => setFrequency(val)}
          onClose={() => setShowPeriodLengthModal(false)}
        />
      )}

      {/* BEGINNING */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "1rem" }}>Beginning</span>
        <input
          readOnly
          placeholder="Select Date"
          value={beginning ? formatDate(beginning) : ""}
          onClick={() => setShowDatePicker(true)}
          style={{ ...smallerInputStyle, flex: "none" }}
        />
      </div>
      {showDatePicker && (
        <DatePicker
          selectedDate={beginning}
          onDateSelect={(dateStr) => setBeginning(dateStr)}
          onClose={() => setShowDatePicker(false)}
        />
      )}

        {/* UNTIL */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "1rem" }}>Until</span>
          <input
            readOnly
            placeholder="Select Date"
            value={until ? formatDate(until) : ""}
            onClick={() => setShowUntilDatePicker(true)}
            style={{ ...smallerInputStyle, flex: "none" }}
          />
        </div>
        {showUntilDatePicker && (
          <DatePicker
            selectedDate={until}
            onDateSelect={(dateStr) => setUntil(dateStr)}
            onClose={() => setShowUntilDatePicker(false)}
          />
        )}

        {/* SELECT CATEGORY */}
        <div style={{ marginTop: "30px", textAlign: "left" /* align left */ }}>
          <span style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "10px", display: "block" }}>
            Select Category
          </span>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "10px",
            whiteSpace: "nowrap",
            paddingLeft: "5px", // optional: add a little padding from left edge
          }}>
            <SelectCategory
              selectedCategory={selectedCategory}
              onSelect={(category) => setSelectedCategory(category)}
            />
          </div>
        </div>

        {/* TODO not yet finished  */}
        <div style={{ marginTop: "40px", textAlign: "center", marginBottom:"50px" }}>
          <button
            onClick={() => {
              if (typeof onRequestSetAmount === "function") {
                onRequestSetAmount({
                  name,
                  amountValue,
                  frequency,
                  periodUnit,
                  beginning,
                  until,
                  category: selectedCategory
                });
              }
              alert("Changes saved!");
            }}
            style={{
              width: "300px",        // change width
              height: "70px",        // change height
              padding: "12px 25px",
              fontSize: "2rem",
              fontWeight: "600",
              borderRadius: "12px",
              border: "none",
              background: "#D9D9D9",
              color: "#000",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#CFCFCF"} // slightly darker hover
            onMouseOut={(e) => e.currentTarget.style.background = "#D9D9D9"}
          >
            Save Changes
          </button>
        </div>


    </div>
  );
}

export default EditBudget;
