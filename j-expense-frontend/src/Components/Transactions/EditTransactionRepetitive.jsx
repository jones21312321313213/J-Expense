

import React, { useState } from "react";
import DatePicker from "../DatePicker";
import SetPeriod from "../SetPeriod";
import SetPeriodLength from "../SetPeriodLength";

function EditTransactionRepetitive({
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

export default EditTransactionRepetitive;
