import React, { useState } from "react";
import SetAmount from "../SetAmount";
import DatePicker from "../DatePicker";
import goal1 from "../../Assets/goal1.png";
import goal2 from "../../Assets/goal2.png";

function AddGoal({
  name,
  setName,
  amountValue,
  setAmountValue,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  goalType = "savings", // default, can be passed from SelectGoalType
  onSubmit,
}) {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDate, setActiveDate] = useState(null);
  const [error, setError] = useState("");

  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "40px",
    marginTop: "20px",
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const inputStyle = {
    padding: "12px",
    border: "none",
    borderBottom: "2px solid #ccc",
    width: "240px",
    outline: "none",
    background: "transparent",
    fontSize: "1.1rem",
    textAlign: "center",
    cursor: "pointer",
  };

  const imageStyle = {
    width: "150px",
    height: "auto",
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleDateClick = (type) => {
    setActiveDate(type);
    setShowDatePicker(true);
  };

  const handleDateSelect = (dateStr) => {
    if (activeDate === "start") setStartDate(dateStr);
    if (activeDate === "end") setEndDate(dateStr);
    setShowDatePicker(false);
  };

  // ⭐ VALIDATE + SUBMIT
  const handleAddGoal = () => {
    if (!name.trim()) return setError("Please enter a goal name.");
    if (!amountValue || amountValue <= 0)
      return setError("Please enter a valid goal amount.");
    if (!startDate) return setError("Please select a start date.");
    if (!endDate) return setError("Please select an end date.");

    setError("");

    // ✅ send data with backend field names
    onSubmit({
      goalName: name,
      targetAmount: amountValue,
      currentAmount: 0,
      startDate,
      endDate,
      goalType, // "savings" or "expense"
      progress: 0,
    });
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h1>Add Goal</h1>

      {/* ERROR */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px", fontWeight: "600" }}>
          {error}
        </p>
      )}

      {/* MAIN LAYOUT */}
      <div style={container}>
        {/* LEFT IMG */}
        <div style={columnStyle}>
          <img
            src={goal1}
            style={{ ...imageStyle, marginRight: "100px" }}
            alt="goal-left"
          />
        </div>

        {/* MIDDLE */}
        <div style={{ ...columnStyle, gap: "25px" }}>
          <input
            type="text"
            placeholder="Goal Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ ...inputStyle, cursor: "text" }}
          />

          <input
            readOnly
            placeholder="₱"
            value={amountValue ? `₱ ${amountValue}` : "₱"}
            onClick={() => setShowAmountModal(true)}
            style={inputStyle}
          />

          <input
            readOnly
            placeholder="Select Start Date"
            value={startDate ? formatDate(startDate) : ""}
            onClick={() => handleDateClick("start")}
            style={{ ...inputStyle, fontWeight: "600" }}
          />

          <input
            readOnly
            placeholder="Select End Date"
            value={endDate ? formatDate(endDate) : ""}
            onClick={() => handleDateClick("end")}
            style={inputStyle}
          />
        </div>

        {/* RIGHT IMG */}
        <div style={columnStyle}>
          <img
            src={goal2}
            style={{ ...imageStyle, marginLeft: "100px" }}
            alt="goal-right"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleAddGoal}
        style={{
          marginTop: "40px",
          padding: "15px 20px",
          width: "300px",
          background: "#4ade80",
          border: "none",
          borderRadius: "12px",
          fontSize: "1.2rem",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Add Goal
      </button>

      {/* AMOUNT MODAL */}
      {showAmountModal && (
        <SetAmount
          initialValue={amountValue || 0}
          title="Set Goal Amount"
          onConfirm={(val) => {
            setAmountValue(val);
            setShowAmountModal(false);
          }}
          onClose={() => setShowAmountModal(false)}
        />
      )}

      {/* DATE PICKER */}
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

export default AddGoal;
