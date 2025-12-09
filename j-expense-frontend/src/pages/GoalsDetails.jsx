import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalsContext";
import { FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";

function GoalsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, deleteGoal } = useGoals();

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

  const saved = currentAmount;
  const remaining = targetAmount - saved;
  const progressPercentage =
    targetAmount === 0 ? 0 : Math.min((saved / targetAmount) * 100, 100);

  const today = new Date();
  const end = new Date(endDate);
  const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  const dailySuggestion =
    remaining > 0 && daysLeft > 0
      ? `Save ₱${(remaining / daysLeft).toFixed(2)}/day for ${daysLeft} days`
      : "Goal period ended";

  return (
    <div style={{ marginLeft: "280px", width: "calc(100% - 280px)" }}>
      <div
        style={{
          flex: "1 1 0%",
          minHeight: "100vh",
          overflow: "auto",
          position: "relative",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 🔙 Back Icon */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            color: "#000",
            cursor: "pointer",
            zIndex: 9999,
          }}
          title="Back"
        >
          <FaArrowLeft />
        </button>

        {/* ✏️ Edit + 🗑️ Trash Icons */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            gap: "12px",
            zIndex: 9999,
          }}
        >
          {/* Edit Button */}
          <button
            onClick={() => navigate(`/goals/edit/${goalID}`)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.2rem",
              color: "#333",
              cursor: "pointer",
            }}
            title="Edit Goal"
          >
            <FaEdit />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              if (window.confirm("Delete this goal?")) {
                deleteGoal(goalID);
                navigate("/goals");
              }
            }}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.2rem",
              color: "#ef4444",
              cursor: "pointer",
            }}
            title="Delete Goal"
          >
            <FaTrash />
          </button>
        </div>

        {/* 🏁 Header + Goal Name at Top */}
        <h1 style={{ fontSize: "2rem", marginTop: "40px", marginBottom: "10px" }}>
          Goals
        </h1>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          {goalName || "Untitled Goal"}
        </h2>

        {/* Centered Progress Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {/* 💰 Amount above progress bar */}
          <p style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "20px" }}>
            ₱{saved} / ₱{targetAmount}
          </p>

          {/* 📊 Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "#ccc",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercentage}%`,
                background: "#4ade80",
                transition: "0.3s",
              }}
            ></div>

            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#000",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              {Math.round(progressPercentage)}%
            </span>
          </div>

          {/* 📅 Dates aligned to tips of progress bar */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
              marginBottom: "40px",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                {new Date(startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>Today</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                {new Date(endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* 💡 Suggestion */}
          <p
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#333",
              marginTop: "20px",
            }}
          >
            {dailySuggestion}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoalsDetails;
