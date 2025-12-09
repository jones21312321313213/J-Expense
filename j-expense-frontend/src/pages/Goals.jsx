import React, { useState } from "react";
import Add from "../Components/Add";
import SelectGoalType from "../Components/Goals/SelectGoalType";
import GoalProgressCard from "../Components/Goals/GoalProgressCard";
import { useGoals } from "../context/GoalsContext";

function Goals() {
  const goalsContext = useGoals();

  if (!goalsContext) {
    return <div style={{ padding: "20px", color: "red" }}>GoalsContext not available</div>;
  }

  const { goals, addGoal } = goalsContext;
  const [showSelectGoalType, setShowSelectGoalType] = useState(false);

  const containerStyle = {
    marginLeft: "280px",              
    width: "calc(100% - 280px)",      
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    padding: "20px",
    position: "relative",
  };

  const scrollAreaStyle = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: goals.length === 0 ? "1fr" : "repeat(2, 1fr)",
    gap: "30px",
    paddingBottom: "20px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: "280px",                   
    width: "calc(100vw - 280px)",     
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const addButtonStyle = {
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  const handleAddGoal = (newGoal) => {
    addGoal(newGoal); 
    setShowSelectGoalType(false);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>My Goals</h1>

      {/* Scroll area */}
      <div style={scrollAreaStyle}>
        <div style={gridStyle}>
          {/* Render all goals */}
          {goals.map((goal) => (
            <GoalProgressCard key={goal.id} data={goal} />
          ))}

          {/* Add Button */}
          <div
            style={addButtonStyle}
            onClick={() => setShowSelectGoalType(true)}
            aria-label="Add new goal"
          >
            <Add />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showSelectGoalType && (
        <div style={overlayStyle}>
          <SelectGoalType
            onClose={() => setShowSelectGoalType(false)}
            onSubmit={handleAddGoal}
          />
        </div>
      )}
    </div>
  );
}

export default Goals;
