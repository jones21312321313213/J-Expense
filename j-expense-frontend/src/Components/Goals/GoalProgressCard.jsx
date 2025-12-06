/**
 * GoalProgressCard Component
 * --------------------------
 * This component displays a visual summary of a goal, showing:
 *  - Goal name
 *  - Current saved amount vs total goal amount
 *  - Start and end dates
 *  - A horizontal progress bar indicating the completion percentage
 *  - Number of transactions associated with this goal
 *  - "Today" marker showing the current day's position relative to progress
 *
 * Features:
 *  - Uses inline styles for layout, colors, and spacing
 *  - Dynamically calculates progress percentage based on saved vs goal amount
 *  - Progress bar visually represents completion and displays percentage
 *  - Ensures percentage does not exceed 100%
 *
 * Props:
 *  - data: object containing goal details
 *      - name: string, goal name
 *      - amount: number, total goal amount
 *      - saved: number, amount already saved (default 0)
 *      - progress: number, number of transactions (default 0)
 *      - startDate:*
*/
import React from "react";

function GoalProgressCard({ data }) {
  const {
    name,
    amount,
    startDate,
    endDate,
    saved = 0,
    progress = 0,
  } = data;

  const currentAmount = saved;
  const goalAmount = amount;

  const progressPercentage =
    goalAmount === 0 ? 0 : Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        fontFamily: "Arial, sans-serif",
      }}
    >
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
          {name}
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Save ₱{(goalAmount - currentAmount).toFixed(2)} remaining
        </p>
      </div>

      {/* GREY CONTENT SECTION */}
      <div
        style={{
          background: "#e5e5e5",
          padding: "18px 20px",
        }}
      >
        {/* Transactions + Amount */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontSize: "0.95rem",
            fontWeight: "600",
          }}
        >
          <span>{progress} transactions</span>
          <span>
            ₱{currentAmount}/₱{goalAmount}
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
                background: "#444",
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
              {Math.round(progressPercentage)}%
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
            {endDate ? new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalProgressCard;
