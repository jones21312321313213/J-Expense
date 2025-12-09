import React, { useState } from "react";
import AddGoal from "./AddGoal";
import SetAmount from "../SetAmount";
import DatePicker from "../DatePicker";

function SelectGoalType({ onClose, onSubmit}) {
  // ---- State ----
  const [selectedGoalType, setSelectedGoalType] = useState(null); // "savings" or "expense"
  const [name, setName] = useState("");
  const [amountValue, setAmountValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showSetAmount, setShowSetAmount] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDate, setActiveDate] = useState(null); // 'start' or 'end'

  // ---- Handlers ----
  const handleCardClick = (type) => setSelectedGoalType(type);

  const requestSetAmount = () => setShowSetAmount(true);
  const handleConfirmAmount = (val) => {
    setAmountValue(val);
    setShowSetAmount(false);
  };
  const handleCancelAmount = () => setShowSetAmount(false);

  const handleDateClick = (type) => {
    setActiveDate(type);
    setShowDatePicker(true);
  };
  const handleDateSelect = (dateStr) => {
    if (activeDate === "start") setStartDate(dateStr);
    if (activeDate === "end") setEndDate(dateStr);
    setShowDatePicker(false);
  };

  // ---- Styles ----
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "linear-gradient(135deg, #C0EBFF, #FFEFCB)",
    padding: "4vw",
    fontFamily: "Arial, sans-serif",
    borderRadius: "1.25rem",
    width: "100%",
    maxWidth: "900px",
    minHeight: "80vh",
    position: "relative",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    overflowY: "auto",
    margin: "auto",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    border: "none",
    background: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#333",
    zIndex: 2,
  };

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "0.625rem",
    backgroundColor: "#e0e0e0",
    cursor: "pointer",
    width: "100%",
    transition: "transform 0.2s",
  };

  // ---- Render ----
  if (selectedGoalType) {
    // Show AddGoal when a type is selected
    return (
      <div style={containerStyle}>
        {/* Close button */}
        <button style={closeButtonStyle} onClick={onClose}>
          &times;
        </button>

        <AddGoal
          name={name}
          setName={setName}
          amountValue={amountValue}
          setAmountValue={setAmountValue}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          goalType={selectedGoalType}
          onSubmit={onSubmit}
        />

        {/* SetAmount Modal */}
        {showSetAmount && (
          <SetAmount
            inline={true}
            initialValue={amountValue || 0}
            title="Set Goal Amount"
            onConfirm={handleConfirmAmount}
            onClose={handleCancelAmount}
          />
        )}

        {/* DatePicker Modal */}
        {showDatePicker && (
          <DatePicker
            selectedDate={activeDate === "start" ? startDate : endDate}
            onDateSelect={handleDateSelect}
            onClose={() => setShowDatePicker(false)}
          />
        )}
      </div>
    );
  }

  // Default selection screen
  return (
    <div style={containerStyle}>
      <button style={closeButtonStyle} onClick={onClose}>
        &times;
      </button>

      <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>
        Select Goal Type
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
        <div style={cardStyle} onClick={() => handleCardClick("savings")}>
          <i className="bi bi-piggy-bank" style={{ fontSize: "2.5rem", color: "grey" }}></i>
          <div>
            <h3>Savings Goal</h3>
            <p>Add income transactions to this goal</p>
          </div>
        </div>

        <div style={cardStyle} onClick={() => handleCardClick("expense")}>
          <i className="bi bi-wallet2" style={{ fontSize: "2.5rem", color: "grey" }}></i>
          <div>
            <h3>Expense Goal</h3>
            <p>Add expense transactions to this goal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectGoalType;
