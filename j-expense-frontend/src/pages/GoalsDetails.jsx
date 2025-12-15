import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalsContext";
import { ChevronLeft, Edit2 } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

export default function GoalsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, updateGoal, deleteGoal } = useGoals();

  const goal = goals.find((g) => g.goalID === parseInt(id));
  if (!goal) return <p>Goal not found.</p>;

  const {
    goalID,
    goalName,
    targetAmount = 0,
    currentAmount = 0,
    startDate,
    endDate,
  } = goal;

  // Local state
  const [saved, setSaved] = useState(currentAmount);
  const [addAmount, setAddAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(goalName);
  const [editTarget, setEditTarget] = useState(targetAmount);

  const remaining = editTarget - saved;
  const progressPercentage =
    editTarget === 0 ? 0 : Math.min((saved / editTarget) * 100, 100);

  const today = new Date();
  const end = new Date(endDate);
  const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

  // Suggestion / surplus message
  let suggestionMessage = "";
  if (saved >= editTarget) {
    const surplus = saved - editTarget;
    suggestionMessage =
      surplus > 0
        ? `🎉 Goal reached! You saved ₱${surplus} extra.`
        : "🎉 Goal reached!";
  } else {
    suggestionMessage =
      remaining > 0 && daysLeft > 0
        ? `Save ₱${(remaining / daysLeft).toFixed(2)}/day for ${daysLeft} days`
        : "Goal period ended";
  }

  const getFormattedDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalID);
    }
  };

  // Fetch history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/goals/${goalID}/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
  
    fetchHistory();
  }, [goalID]);
  
  // Save edits
  const saveEdits = async () => {
    const updatedGoal = {
      ...goal,
      goalName: editName,
      targetAmount: editTarget,
    };
    try {
      await updateGoal(goalID, updatedGoal);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  const handleAddAmount = async () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/goals/${goalID}/history`,
          null,
          {
            params: { amount },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 include JWT
            },
          }
        );
  
        console.log("New history entry:", res.data);
  
        setHistory((prev) => [res.data, ...prev]);
        setSaved(saved + amount);
        setAddAmount("");
        updateGoalInContext(res.data);
      } catch (err) {
        console.error("Error adding history:", err);
      }
    }
  };
  

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #a8d8ea, #d4e9f7, #f5e6d3)",
        minHeight: "100vh",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "48px",
          }}
        >
          <button
            style={{
              width: "48px",
              height: "48px",
              border: "2px solid #1f2937",
              backgroundColor: "#fff",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} color="#1f2937" />
          </button>

          <div style={{ flex: 1, textAlign: "center", margin: "0 16px" }}>
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={saveEdits}
                onKeyDown={(e) => e.key === "Enter" && saveEdits()}
                style={{
                  border: "none",
                  borderBottom: "2px solid #1f2937",
                  background: "transparent",
                  outline: "none",
                  fontSize: "1.875rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  textAlign: "center",
                }}
              />
            ) : (
              <h1
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                {editName || "Untitled Goal"}
              </h1>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: "48px",
                height: "48px",
                border: "2px solid #1f2937",
                backgroundColor: "#fff",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Edit2 size={20} color="#1f2937" />
            </button>

            <button
              onClick={handleDelete} 
              style={{
                width: "48px",
                height: "48px",
                border: "2px solid #ef4444",
                backgroundColor: "#fff",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaTrash size={20} color="#ef4444" />
            </button>
          </div>
        </div>

        {/* Goal Summary */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "#374151",
                margin: 0,
              }}
            >
              ₱{saved} saved of{" "}
              {isEditing ? (
                <input
                  type="number"
                  value={editTarget}
                  onChange={(e) => setEditTarget(parseFloat(e.target.value))}
                  onBlur={saveEdits}
                  onKeyDown={(e) => e.key === "Enter" && saveEdits()}
                  style={{
                    border: "none",
                    borderBottom: "2px solid #374151",
                    background: "transparent",
                    outline: "none",
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    color: "#374151",
                    width: "100px",
                    textAlign: "center",
                  }}
                />
              ) : (
                editTarget
              )}
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "#374151",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Progress
            </p>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "48px",
                backgroundColor: "#e5e7eb",
                borderRadius: "24px",
                overflow: "hidden",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercentage}%`,
                  backgroundColor: "#4ade80",
                  transition: "width 0.5s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                  }}
                >
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1rem",
                color: "#374151",
              }}
            >
              <span>{getFormattedDate(startDate)}</span>
              <span>{getFormattedDate(endDate)}</span>
            </div>
          </div>

          {/* Suggestion / Surplus */}
          <p
            style={{
              textAlign: "center",
              color: "#374151",
              fontSize: "1rem",
              marginBottom: "24px",
            }}
          >
            {suggestionMessage}
          </p>

          {/* Add Amount Section */}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#1f2937",
                marginBottom: "12px",
              }}
            >
              Hey, do you have progress on your goal today? Add amount below.
            </p>
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="Enter amount"
              style={{
                padding: "8px 12px",
                border: "2px solid #1f2937",
                borderRadius: "8px",
                marginRight: "12px",
                width: "150px",
              }}
            />
            <button
              onClick={handleAddAmount}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4ade80",
                color: "#fff",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add Amount
            </button>
          </div>

          {/* History Section */}
          <div style={{ marginTop: "40px" }}>
            <h3
              style={{
                textAlign: "center",
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              History
            </h3>
            {history.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6b7280" }}>
                No amounts added yet.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {history.map((entry) => (
  <div
    key={entry.historyID || `${entry.date}-${entry.amount}`}
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      backgroundColor: "rgba(255,255,255,0.6)",
      borderRadius: "8px",
    }}
  >
    <span style={{ fontWeight: "500", color: "#1f2937" }}>
      +₱{Number(entry.amount).toFixed(2)}
    </span>
    <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
      {entry.date
        ? new Date(entry.date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : ""}
    </span>
  </div>
))}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
