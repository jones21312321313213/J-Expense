import React from "react";
import { FaTrophy, FaBullseye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LatestGoalCard({ goal }) {
  const {
    goalName,
    targetAmount = 0,
    currentAmount = 0,
    endDate,
  } = goal;

  const navigate = useNavigate();

  const goalAmount = targetAmount || 0;
  const saved = currentAmount || 0;

  const progressPercentage =
    goalAmount === 0 ? 0 : Math.min((saved / goalAmount) * 100, 100);

  const date = endDate ? new Date(endDate) : new Date();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const handleClick = () => {
    navigate("/app/goals"); 
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: "#fff",
        marginTop: "20px",
        borderRadius: "12px",
        padding: "20px",
        width: "500px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "system-ui, sans-serif",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Subtle Header */}
      <div style={{ fontSize: "0.85rem", fontWeight: 400, color: "#6b7280", marginBottom: "6px" }}>
        This is your latest goal
      </div>

      {/* Top row: Amount + Date */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#111827" }}>
          ₱{goalAmount.toLocaleString()}
        </div>
        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
          {month}, {year}
        </div>
      </div>

      {/* Goal Name */}
      <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "#6b7280", marginTop: "4px" }}>
        {goalName || "Untitled Goal"}
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />

      {/* Two-column section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Target Achieved */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaTrophy style={{ color: "#6b7280", fontSize: "0.85rem" }} />
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#374151" }}>
              Target Achieved
            </span>
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginTop: "4px" }}>
            ₱{saved.toLocaleString()}
          </div>
        </div>

        {/* This Month Target */}
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "6px" }}>
            <FaBullseye style={{ color: "#374151", fontSize: "0.85rem" }} />
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#6b7280" }}>
              This Month Target
            </span>
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#dc2626", marginTop: "4px" }}>
            ₱{goalAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginTop: "14px" }}>
        <div
          style={{
            height: "20px",
            background: "#f3f4f6",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercentage}%`,
              background: progressPercentage === 100 ? "#16a34a" : "#374151",
              transition: "width 0.3s ease",
            }}
          ></div>

          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {progressPercentage === 100
              ? "Goal reached!"
              : `${Math.round(progressPercentage)}%`}
          </span>
        </div>

        <div
          style={{
            fontSize: "0.7rem",
            color: "#6b7280",
            textAlign: "center",
            marginTop: "4px",
          }}
        >
          Target vs Achievement
        </div>
      </div>

      {/* Extra message if saved more than target */}
      {saved > goalAmount && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#16a34a",
            textAlign: "center",
          }}
        >
          🎉 You saved ₱{(saved - goalAmount).toLocaleString()} extra this month!
        </div>
      )}
    </div>
  );
}