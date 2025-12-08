/**
 * AddTransactionRepetitive.jsx
 * ------------------------
 * A component for setting up repetitive transactions in the Add Transaction flow.
 *
 * Features:
 * - Allows users to specify:
 *   - Repeat interval: numeric period length and unit (day, week, month, year).
 *   - End date for repetition.
 * - Read-only input fields trigger modals for selecting values:
 *   - `SetPeriodLength` modal for numeric period length.
 *   - `SetPeriod` modal for period unit selection.
 *   - `DatePicker` modal for end date selection.
 * - Displays formatted dates in a user-friendly style.
 * - Responsive layout with flexbox and wrapping for smaller screens.
 *
 * Props:
 * - `periodLength` (number): current numeric repetition interval.
 * - `setPeriodLength` (function): setter for periodLength state.
 * - `periodUnit` (string): current period unit (e.g., "Daily", "Weekly").
 * - `setPeriodUnit` (function): setter for periodUnit state.
 * - `endDate` (Date | string): selected end date for repetition.
 * - `setEndDate` (function): setter for endDate state.
 *
 * State:
 * - `showPeriodLengthModal` (boolean): controls visibility of numeric period modal.
 * - `showPeriodModal` (boolean): controls visibility of period unit modal.
 * - `showDatePicker` (boolean): controls visibility of end date picker modal.
 *
 * Notes:
 * - Uses inline styles for all layout and input elements.
 * - Input fields are styled to look interactive but are read-only, opening modals on click.
 * - Ensures user-friendly alignment and spacing between labels and inputs.
 * - Designed to integrate seamlessly with the AddTransaction component for lifted state management.
 */

import React, { useState } from "react";
import DatePicker from "../DatePicker";
import SetPeriod from "../SetPeriod";
import SetPeriodLength from "../SetPeriodLength";

function AddTransactionRepetitive({
  periodLength,
  setPeriodLength,
  periodUnit,
  setPeriodUnit,
  endDate,
  setEndDate
}) {
  const [showPeriodLengthModal, setShowPeriodLengthModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const inputStyle = {
    padding: "10px",
    border: "none",
    borderBottom: "2px solid #ccc",
    width: "100px",
    textAlign: "center",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>

      {/* Repeat every row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          marginTop:"80px",
          flexWrap: "wrap",
        }}
      >
        <span>Repeat every</span>

        <input
          readOnly
          placeholder="1"
          value={periodLength || ""}
          onClick={() => setShowPeriodLengthModal(true)}
          style={inputStyle}
        />

        <input
          readOnly
          placeholder="Period"
          value={periodUnit || ""}
          onClick={() => setShowPeriodModal(true)}
          style={{ ...inputStyle, width: "120px" }}
        />
      </div>

      {/* Until row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <span>Until</span>
        <input
          readOnly
          placeholder="Select Date"
          value={endDate ? formatDate(endDate) : ""}
          onClick={() => setShowDatePicker(true)}
          style={{ ...inputStyle, width: "150px" }}
        />
      </div>

      {/* Modals */}
      {showPeriodLengthModal && (
        <SetPeriodLength
          initialValue={periodLength}
          onConfirm={(val) => {
            setPeriodLength(val);
            setShowPeriodLengthModal(false);
          }}
          onClose={() => setShowPeriodLengthModal(false)}
        />
      )}

      {showPeriodModal && (
        <SetPeriod
          initialPeriod={periodUnit}
          onSelectPeriod={(val) => {
            setPeriodUnit(val);
            setShowPeriodModal(false);
          }}
          onClose={() => setShowPeriodModal(false)}
        />
      )}

      {showDatePicker && (
        <DatePicker
          selectedDate={endDate}
          onDateSelect={(val) => {
            setEndDate(val);
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}

export default AddTransactionRepetitive;
