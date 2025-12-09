import React, { useState } from "react";
import DatePicker from "../DatePicker";
import SetPeriod from "../SetPeriod";
import SetPeriodLength from "../SetPeriodLength"; // import new component

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
  const [showPeriodLengthModal, setShowPeriodLengthModal] = useState(false); // new state

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
    const options = { 
      month: "short", 
      day: "numeric",
      timeZone: 'UTC' // FIX APPLIED HERE: Format the date using UTC timezone
    };
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

        {/* Frequency (replaced with SetPeriodLength modal) */}
        <input
          readOnly
          value={frequency}
          placeholder="1"
          onClick={() => setShowPeriodLengthModal(true)}
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

      {showPeriodLengthModal && (
        <SetPeriodLength
          initialValue={frequency}
          onConfirm={(val) => setFrequency(val)}
          onClose={() => setShowPeriodLengthModal(false)}
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