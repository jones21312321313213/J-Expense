import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoals } from "../context/GoalsContext";

function GoalsDetails() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addGoal } = useGoals(); // ✅ use context directly

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total days between start and end
    let daysTotal = 0;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      daysTotal = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }

    const newGoal = {
      id: Date.now(),
      type: type?.toLowerCase() === "savings" ? "savings" : "expense",
      goalName,
      targetAmount: Number(targetAmount),
      startDate,
      endDate,
      currentAmount: 0,      // ✅ initialize progress
      transactionCount: 0,   // ✅ initialize transactions
      // ✅ For expense goals, store daily limit
      dailyLimit:
        type?.toLowerCase() === "expense" && daysTotal > 0
          ? Number(targetAmount) / daysTotal
          : null,
    };

    addGoal(newGoal);   // save to context
    navigate("/goals"); // go back to goals list
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #cce5ff, #ffe5b4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "30px", fontWeight: "bold" }}>
          Add a {type === "savings" ? "Savings" : "Expense"} Goal
        </h3>

        {/* Goal Name */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Name</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
            placeholder="e.g. Emergency Fund"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Target Amount */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>₱ Target</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            placeholder="e.g. 10000"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Start Date */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Starts</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* End Date */}
        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Ends</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Goal
        </button>
      </form>
    </div>
  );
}

export default GoalsDetails;
