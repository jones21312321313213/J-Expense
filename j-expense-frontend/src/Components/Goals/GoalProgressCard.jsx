import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../../context/GoalsContext";
import { FaTrash } from "react-icons/fa"; 

function GoalProgressCard({ data }) {
  const { deleteGoal } = useGoals();
  const navigate = useNavigate();

  const {
    goalID,
    goalName,
    targetAmount = 0,
    currentAmount = 0,
    endDate,
    progress = 0,
  } = data;

  const goalAmount = targetAmount || 0;
  const saved = currentAmount || 0;

  const progressPercentage =
    goalAmount === 0 ? 0 : Math.min((saved / goalAmount) * 100, 100);

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent navigation when clicking delete
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalID);
    }
  };

  const handleClick = () => {
    navigate(`/app/goals/${goalID}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100%",
        maxWidth: "600px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* 🗑️ DELETE BUTTON */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#ef4444",
          fontSize: "1rem",
        }}
        title="Delete Goal"
      >
        <FaTrash />
      </button>

      {/* HEADER */}
      <div
        style={{
          padding: "20px",
          background: "linear-gradient(to right, #A8E6FF, #FFF0D6)",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#000",
            fontSize: "1.1rem",
            fontWeight: "700",
          }}
        >
          {goalName || "Untitled Goal"}
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          {saved >= goalAmount
            ? saved > goalAmount
              ? `Goal reached! You saved ₱${(saved - goalAmount).toFixed(2)} extra.`
              : "Goal reached!"
            : `Save ₱${(goalAmount - saved).toFixed(2)} remaining`}
        </p>
      </div>

      {/* GREY CONTENT SECTION */}
      <div
        style={{
          background: "#e5e5e5",
          padding: "18px 20px",
        }}
      >
        {/* Amount */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            fontSize: "0.95rem",
            fontWeight: "600",
          }}
        >
          <span>
            ₱{saved.toFixed(2)}/₱{goalAmount.toFixed(2)}
          </span>
        </div>

        {/* Progress Area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Today Label */}
          <div
            style={{
              width: "50px",
              textAlign: "center",
              fontSize: "0.75rem",
            }}
          >
            Today
          </div>

          {/* Progress Bar */}
          <div
            style={{
              flex: 1,
              height: "30px",
              background: "#777",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercentage}%`,
                background: progressPercentage === 100 ? "#22c55e" : "#444", 
                transition: "0.3s",
              }}
            ></div>

            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              {progressPercentage === 100
                ? "Goal reached!"
                : `${Math.round(progressPercentage)}%`}
            </span>
          </div>

          {/* End Date */}
          <div
            style={{
              width: "50px",
              textAlign: "center",
              fontSize: "0.75rem",
            }}
          >
            {endDate
              ? new Date(endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalProgressCard;
