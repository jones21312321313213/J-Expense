/**
 * AddBudget Component
 * ------------------
 * This component renders the form for adding a budget's details.
 * It is typically displayed after the user selects a budget type in the parent component.
 * 
 * Props:
 * - `name` (string): The current name of the budget.
 * - `setName` (function): Setter for updating the budget name.
 * - `amountValue` (number): The currently selected amount for the budget.
 * - `frequency` (number): How often this budget repeats (e.g., every 1 Month).
 * - `setFrequency` (function): Setter for updating the frequency.
 * - `periodUnit` (string): Unit of the budget period (Day, Week, Month, Year).
 * - `setPeriodUnit` (function): Setter for updating the period unit.
 * - `beginning` (string/date): Starting date of the budget.
 * - `setBeginning` (function): Setter for updating the beginning date.
 * - `onRequestSetAmount` (function): Callback to open the SetAmount modal.
 * - `error` (string): Optional error message to display if validation fails.
 * - `setError` (function): Setter for updating the error message.
 * 
 * Features:
 * 1. Displays an optional error message at the top.
 * 2. Inputs for budget name, amount (read-only, triggers SetAmount modal), frequency, and period unit.
 * 3. A beginning date input that opens a DatePicker when clicked.
 * 4. Formats the selected date in "Month Day" format (e.g., "Dec 5").
 * 
 * Styling:
 * - Uses inline styles for layout, inputs, and error messages.
 * - Inputs have a transparent background with bottom borders for a clean look.
 */


import React, { useState } from "react";
import DatePicker from "../DatePicker";
import SetPeriod from "../SetPeriod";

function AddBudget({
  name,
  setName,
  amountValue,
  frequency,
  setFrequency,
  periodUnit,
  setPeriodUnit,
  beginning,
  setBeginning,
  onRequestSetAmount,
  error,
  setError,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);

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
    <div style={{ width: "100%", textAlign: "center" }}>
      {/* Error */}
      {error && (
        <div
          style={{
            color: "#dc2626",
            background: "#fee2e2",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <h1 style={{ marginBottom: "20px" }}>Add a Budget</h1>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={smallerInputStyle}
      />

      {/* Amount / Frequency / Period Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {/* Amount */}
        <input
          readOnly
          placeholder="P"
          value={amountValue ? `P ${amountValue}` : ""}
          onClick={onRequestSetAmount}
          style={{ ...inputStyle, width: "80px", textAlign: "center" }}
        />

        <span>/</span>

        {/* Frequency */}
        <input
          type="number"
          min={1}
          placeholder="1"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          style={{ ...inputStyle, width: "60px", textAlign: "center" }}
        />

        {/* Period Selection */}
        <input
          readOnly
          value={periodUnit}
          placeholder="Select Period"
          onClick={() => setShowPeriodModal(true)}
          style={{
            padding: "10px",
            border: "none",
            borderBottom: "2px solid #ccc",
            width: "120px",
            textAlign: "center",
            background: "transparent",
          }}
        />
      </div>

      {showPeriodModal && (
        <SetPeriod
          initialPeriod={periodUnit}
          onSelectPeriod={(selected) => setPeriodUnit(selected)}
          onClose={() => setShowPeriodModal(false)}
        />
      )}

      {/* Beginning date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
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
    </div>
  );
}

export default AddBudget;
