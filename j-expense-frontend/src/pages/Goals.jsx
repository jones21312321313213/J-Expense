import { FaPiggyBank, FaWallet, FaPlus } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalsContext";

function Goals() {
  const navigate = useNavigate();
  const { goals } = useGoals();

  const savingsGoals = goals.filter((g) => g.type === "savings");
  const expenseGoals = goals.filter((g) => g.type === "expense");

  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    textAlign: "center",
  };

  const iconStyle = {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "#007bff",
  };

  const handleSelect = (type) => {
    navigate(`/goals/create/${type}`);
  };

  const renderGoalCard = (goal) => {
    const progress = goal.currentAmount || 0;
    const target = goal.targetAmount || 0;
    const percent = target > 0 ? Math.min((progress / target) * 100, 100) : 0;

    const start = goal.startDate || "—";
    const end = goal.endDate || "—";

    const daysLeft = (() => {
      if (!goal.startDate || !goal.endDate) return null;
      const endDate = new Date(goal.endDate);
      const today = new Date();
      const remaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      return remaining > 0 ? remaining : 0;
    })();

    let suggestion = "";
    if (goal.type === "savings" && daysLeft && target > 0) {
      suggestion = `Save ₱${(target / daysLeft).toFixed(2)}/day for ${daysLeft} days`;
    } else if (goal.type === "expense" && daysLeft && target > 0) {
      const remainingBudget = target - progress;
      const remainingPerDay = remainingBudget > 0 ? (remainingBudget / daysLeft).toFixed(2) : 0;
      suggestion = `Limit ₱${remainingPerDay}/day for ${daysLeft} days`;
    }

    return (
      <div
        key={goal.id}
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <strong style={{ fontSize: "1.1rem" }}>{goal.goalName}</strong>
        <p style={{ margin: "8px 0", color: "#6c757d" }}>{suggestion}</p>

        <div style={{ fontSize: "0.9rem", marginBottom: "8px" }}>
          <span>{goal.transactionCount || 0} transactions</span>
          <br />
          <span>
            ₱{progress.toLocaleString()} / ₱{target.toLocaleString()}
          </span>
        </div>

        <div
          style={{
            height: "8px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              backgroundColor: goal.type === "savings" ? "#007bff" : "#dc3545",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "0.85rem",
            color: "#6c757d",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Today</span>
          <span>
            {start} — {end}
          </span>
        </div>

        <div style={{ fontSize: "0.85rem", color: "#dc3545", marginTop: "8px" }}>
          No transaction within the time range {start} – {end}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #cce5ff, #ffe5b4)",
        position: "relative",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "left",
        }}
      >
        Goals
      </h2>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <Card style={cardStyle} onClick={() => handleSelect("savings")}>
          <div className="d-flex flex-column align-items-center">
            <FaPiggyBank style={iconStyle} />
            <h5>Savings Goal</h5>
            <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>
              Add income transactions to this goal
            </p>
          </div>
        </Card>

        <Card style={cardStyle} onClick={() => handleSelect("expense")}>
          <div className="d-flex flex-column align-items-center">
            <FaWallet style={iconStyle} />
            <h5>Expense Goal</h5>
            <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>
              Add expense transactions to this goal
            </p>
          </div>
        </Card>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h4 style={{ marginBottom: "20px" }}>My Goals</h4>

        <h5 style={{ marginTop: "20px", marginBottom: "10px" }}>Savings Goals</h5>
        {savingsGoals.length === 0 ? (
          <p style={{ color: "gray" }}>No savings goals yet</p>
        ) : (
          savingsGoals.map(renderGoalCard)
        )}

        <h5 style={{ marginTop: "30px", marginBottom: "10px" }}>Expense Goals</h5>
        {expenseGoals.length === 0 ? (
          <p style={{ color: "gray" }}>No expense goals yet</p>
        ) : (
          expenseGoals.map(renderGoalCard)
        )}
      </div>

      <button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "30px",
          backgroundColor: "#28a745",
          color: "white",
          fontSize: "1.5rem",
          border: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        aria-label="Quick Add Goal"
        onClick={() => handleSelect("quick")}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default Goals;
